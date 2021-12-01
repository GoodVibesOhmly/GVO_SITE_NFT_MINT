import { BigNumber, ethers } from "ethers";
import { addresses } from "../constants";
import { abi as GoodVibesOhmlyStaking } from "../abi/GoodVibesOhmlyStaking.json";
// import { abi as GVO } from "../abi/Good Vibes OhmlyERC20.json";
import { abi as sGVO } from "../abi/sGoodVibesOhmlyERC20.json";
import { abi as Genesis1155Abi } from "../abi/Genesis1155.json";
import { setAll, getTokenPrice, getMarketPrice } from "../helpers";
// import { NodeHelper } from "../helpers/NodeHelper";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { IBaseAsyncThunk } from "./interfaces";

const initialState = {
  loading: true,
  loadingMarketPrice: true,
  marketPrices: { marketPrice: 0, ohmPrice: 0 },
  genesisMint: {
    saleStarted: false,
    totalMinted: 0,
    price: "0.333",
    totalSupply: 999,
    maxMint: 3,
    hoodie1Remaining: 0,
    hoodie2Remaining: 0,
    hoodie3Remaining: 0,
    contractAddress: "",
  },
};

export const loadAppDetails = createAsyncThunk(
  "app/loadAppDetails",
  async ({ networkID, provider }: IBaseAsyncThunk, { dispatch }) => {
    if (!provider) {
      console.error("failed to connect to provider, please connect your wallet");
      return {
        // stakingTVL,
        // marketPrice,
        // marketCap,
        // circSupply,
        // totalSupply,
        // treasuryMarketValue,
      };
    }
    const currentBlock = await provider.getBlockNumber();

    // Calculating staking
    let epoch;
    let stakingReward = 0;
    let circSupply = 0;
    let stakingRebase = 0;
    let fiveDayRate = 0;
    let stakingAPY = 0;
    let currentIndex = 0;
    let totalSupply = 0;
    let stakingTVL = 0;
    let marketPrices = { marketPrice: 0, ohmPrice: 0 };

    try {
      const originalPromiseResult = await dispatch(
        loadMarketPrice({ networkID: networkID, provider: provider }),
      ).unwrap();
      marketPrices = originalPromiseResult?.marketPrices;
    } catch (rejectedValueOrSerializedError) {
      console.error("Returned a null response from dispatch(loadMarketPrice)");
      return;
    }

    try {
      const stakingContract = new ethers.Contract(
        addresses[networkID].STAKING_ADDRESS as string,
        GoodVibesOhmlyStaking,
        provider,
      );
      const sGVOMainContract = new ethers.Contract(addresses[networkID].sGVO_ADDRESS as string, sGVO, provider);

      epoch = await stakingContract.epoch();
      currentIndex = await stakingContract.index();
      circSupply = (await sGVOMainContract.circulatingSupply()) / Math.pow(10, 9);
      totalSupply = await sGVOMainContract.totalSupply();
      stakingTVL = ((await stakingContract.contractBalance()) / Math.pow(10, 9)) * marketPrices.marketPrice;
      stakingReward = epoch.distribute / Math.pow(10, 9);
      stakingRebase = stakingReward / circSupply;

      // console.log("staking rebase: ", stakingRebase);
      // convenience log
      // console.log(
      //   "reward: " +
      //     stakingReward +
      //     "\ncirc: " +
      //     circSupply +
      //     "\ntotal: " +
      //     totalSupply +
      //     "\nstaking rebase: " +
      //     stakingRebase,
      // );

      fiveDayRate = Math.pow(1 + stakingRebase, 5 * 3) - 1;
      stakingAPY = Math.pow(1 + stakingRebase, 365 * 3) - 1;
    } catch (e) {
      console.error(e);
    }

    let genesisSaleStarted = false;
    let totalHoodiesMinted = 0;
    let genesisPrice = "0.333";
    let totalGenesisSupply = 999;
    let maxHoodieMint = 3;
    let hoodie1Remaining;
    let hoodie2Remaining;
    let hoodie3Remaining;

    let genesisAddress = addresses[networkID].GENESIS_1155;
    try {
      const genesisNFTContract = new ethers.Contract(genesisAddress, Genesis1155Abi, provider);
      genesisSaleStarted = await genesisNFTContract.saleIsActive();
      totalHoodiesMinted = await genesisNFTContract
        .totalHoodiesMinted()
        .then((n: BigNumber) => ethers.utils.formatUnits(n, "wei"));
      genesisPrice = await genesisNFTContract.price().then((p: BigNumber) => ethers.utils.formatEther(p));
      // totalGenesisSupply = await genesisNFTContract.totalSupply();
      maxHoodieMint = await genesisNFTContract
        .MAX_PER_WALLET()
        .then((n: BigNumber) => ethers.utils.formatUnits(n, "wei"));
      hoodie1Remaining = await genesisNFTContract
        .totalRemaining1()
        .then((p: BigNumber) => ethers.utils.formatUnits(p, "wei"));
      hoodie2Remaining = await genesisNFTContract
        .totalRemaining2()
        .then((p: BigNumber) => ethers.utils.formatUnits(p, "wei"));
      hoodie3Remaining = await genesisNFTContract
        .totalRemaining3()
        .then((p: BigNumber) => ethers.utils.formatUnits(p, "wei"));
    } catch (e) {
      console.log("Genesis contract error: ", e);
    }

    return {
      currentIndex: ethers.utils.formatUnits(currentIndex, "gwei"),
      currentBlock,
      fiveDayRate,
      stakingAPY,
      stakingTVL,
      stakingRebase,
      // marketCap,
      marketPrices,
      circSupply,
      totalSupply,
      // treasuryMarketValue,
      genesisMint: {
        saleStarted: genesisSaleStarted,
        totalMinted: totalHoodiesMinted,
        price: genesisPrice,
        totalSupply: totalGenesisSupply,
        maxMint: maxHoodieMint,
        hoodie1Remaining: hoodie1Remaining,
        hoodie2Remaining: hoodie2Remaining,
        hoodie3Remaining: hoodie3Remaining,
        contractAddress: genesisAddress,
      },
    } as IAppData;
  },
);

/**
 * checks if app.slice has marketPrice already
 * if yes then simply load that state
 * if no then fetches via `loadMarketPrice`
 *
 * `usage`:
 * ```
 * const originalPromiseResult = await dispatch(
 *    findOrLoadMarketPrice({ networkID: networkID, provider: provider }),
 *  ).unwrap();
 * originalPromiseResult?.whateverValue;
 * ```
 */
export const findOrLoadMarketPrice = createAsyncThunk(
  "app/findOrLoadMarketPrice",
  async ({ networkID, provider }: IBaseAsyncThunk, { dispatch, getState }) => {
    const state: any = getState();
    let marketPrices;
    // check if we already have loaded market price
    if (state.app.loadingMarketPrice === false && state.app.marketPrices) {
      // go get marketPrice from app.state
      marketPrices = state.app.marketPrices;
    } else {
      // we don't have marketPrice in app.state, so go get it
      try {
        const originalPromiseResult = await dispatch(
          loadMarketPrice({ networkID: networkID, provider: provider }),
        ).unwrap();
        marketPrices = originalPromiseResult?.marketPrices;
      } catch (rejectedValueOrSerializedError) {
        // handle error here
        console.error("Returned a null response from dispatch(loadMarketPrice)");
        return;
      }
    }
    return { marketPrices };
  },
);

/**
 * - fetches the OHM price from CoinGecko (via getTokenPrice)
 * - falls back to fetch marketPrice from ohm-dai contract
 * - updates the App.slice when it runs
 */
const loadMarketPrice = createAsyncThunk("app/loadMarketPrice", async ({ networkID, provider }: IBaseAsyncThunk) => {
  let marketPrices: { marketPrice: number; ohmPrice: number };
  try {
    marketPrices = await getMarketPrice({ networkID, provider });
  } catch (e) {
    let ohmPrices = await getTokenPrice("olympus");
    marketPrices = { marketPrice: 0, ohmPrice: ohmPrices };
  }
  return { marketPrices };
});

interface IAppData {
  readonly circSupply: number;
  readonly currentIndex?: string;
  readonly currentBlock?: number;
  readonly fiveDayRate?: number;
  readonly marketCap?: number;
  readonly marketPrices: { marketPrice: number; ohmPrice: number };
  readonly stakingAPY?: number;
  readonly stakingRebase?: number;
  readonly stakingTVL?: number;
  readonly totalSupply?: number;
  readonly treasuryBalance?: number;
  readonly treasuryMarketValue?: number;
  readonly genesisMint: IMintData;
}

interface IMintData {
  saleStarted: boolean;
  totalMinted: number;
  price: string;
  totalSupply: number;
  maxMint: number;
  genesisAddress: string;
  hoodie1Remaining: string;
  hoodie2Remaining: string;
  hoodie3Remaining: string;
  contractAddress: string;
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchAppSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAppDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadAppDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAppDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.error(error.name, error.message, error.stack);
      })
      .addCase(loadMarketPrice.pending, (state, action) => {
        state.loadingMarketPrice = true;
      })
      .addCase(loadMarketPrice.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loadingMarketPrice = false;
      })
      .addCase(loadMarketPrice.rejected, (state, { error }) => {
        state.loadingMarketPrice = false;
        console.error(error.name, error.message, error.stack);
      });
  },
});

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);
