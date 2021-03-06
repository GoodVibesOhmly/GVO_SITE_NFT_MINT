import { BigNumber, ethers } from "ethers";
import { addresses } from "../constants";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as GoodVibesOhmlyERC20Abi } from "../abi/GoodVibesOhmlyERC20.json";
import { abi as sGoodVibesOhmlyERC20Abi } from "../abi/sGoodVibesOhmlyERC20.json";
import { abi as sOHMv2 } from "../abi/sOhmv2.json";
import { abi as Genesis1155Abi } from "../abi/Genesis1155.json";

import { setAll } from "../helpers";

import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
// import { Bond, NetworkID } from "src/lib/Bond"; // TODO: this type definition needs to move out of BOND.
import { RootState } from "src/store";
import { IBaseAddressAsyncThunk, ICalcUserBondDetailsAsyncThunk } from "./interfaces";

export const getBalances = createAsyncThunk(
  "account/getBalances",
  async ({ address, networkID, provider }: IBaseAddressAsyncThunk) => {
    const gvoContract = new ethers.Contract(
      addresses[networkID].GVO_ADDRESS as string,
      GoodVibesOhmlyERC20Abi,
      provider,
    );
    const gvoBalance = await gvoContract.balanceOf(address);

    const sGVOContract = new ethers.Contract(
      addresses[networkID].sGVO_ADDRESS as string,
      sGoodVibesOhmlyERC20Abi,
      provider,
    );
    const sGVOBalance = await sGVOContract.balanceOf(address);

    const sohmContract = new ethers.Contract(addresses[networkID].SOHM_ADDRESS as string, sOHMv2, provider);
    const sohmBalance = await sohmContract.balanceOf(address);

    return {
      balances: {
        sohm: ethers.utils.formatUnits(sohmBalance, "gwei"),
        gvo: ethers.utils.formatUnits(gvoBalance, "gwei"),
        sGVO: ethers.utils.formatUnits(sGVOBalance, "gwei"),
      },
    };
  },
);

interface IUserAccountDetails {
  balances: {
    sohm: string;
    gvo: string;
    sGVO: string;
  };
  staking: {
    gvoStake: number;
    gvoUnstake: number;
  };
  genesis: {
    saleEligible: boolean;
    claimed: string;
    balance: string;
  };
}

export const loadAccountDetails = createAsyncThunk(
  "account/loadAccountDetails",
  async ({ networkID, provider, address }: IBaseAddressAsyncThunk) => {
    let gvoBalance = 0;
    let sGVOBalance = 0;
    let sohmBalance = 0;
    let stakeAllowance = 0;
    let unstakeAllowance = 0;
    let sohmBondAllowance = 0;
    let genesisSaleEligible = false;
    let genesisClaimed = "0";
    let genesisBalance = "0";
    let genesisClaimed1 = 0;
    let genesisClaimed2 = 0;
    let genesisClaimed3 = 0;

    if (addresses[networkID].GVO_ADDRESS) {
      const gvoContract = new ethers.Contract(
        addresses[networkID].GVO_ADDRESS as string,
        GoodVibesOhmlyERC20Abi,
        provider,
      );

      gvoBalance = await gvoContract.balanceOf(address);
      stakeAllowance =
        (await gvoContract.allowance(address, addresses[networkID].STAKING_HELPER_ADDRESS)) / Math.pow(10, 18);
    }

    if (addresses[networkID].sGVO_ADDRESS) {
      const sGVOContract = new ethers.Contract(
        addresses[networkID].sGVO_ADDRESS as string,
        sGoodVibesOhmlyERC20Abi,
        provider,
      );

      sGVOBalance = await sGVOContract.balanceOf(address);

      try {
        unstakeAllowance =
          (await sGVOContract.allowance(address, addresses[networkID].STAKING_ADDRESS)) / Math.pow(10, 18);
      } catch (e) {
        console.error(e);
      }
    }

    if (addresses[networkID].SOHM_ADDRESS) {
      const sohmContract = new ethers.Contract(addresses[networkID].SOHM_ADDRESS as string, sOHMv2, provider);
      sohmBalance = await sohmContract.balanceOf(address);
    }

    if (addresses[networkID].GENESIS_1155) {
      const genesisContract = new ethers.Contract(
        addresses[networkID].GENESIS_1155 as string,
        Genesis1155Abi,
        provider,
      );
      genesisSaleEligible = await genesisContract.checkSaleEligiblity(address);
      genesisClaimed = await genesisContract
        .totalClaimedBy(address)
        .then((amt: BigNumber) => ethers.utils.formatUnits(amt, "wei"));
      genesisClaimed1 = await genesisContract
        .balanceOf(address, 1)
        .then((bal: BigNumber) => ethers.utils.formatUnits(bal, "wei"));
      genesisClaimed2 = await genesisContract
        .balanceOf(address, 2)
        .then((bal: BigNumber) => ethers.utils.formatUnits(bal, "wei"));
      genesisClaimed3 = await genesisContract
        .balanceOf(address, 3)
        .then((bal: BigNumber) => ethers.utils.formatUnits(bal, "wei"));
    }

    return {
      balances: {
        sohm: ethers.utils.formatUnits(sohmBalance, "gwei"),
        gvo: ethers.utils.formatUnits(gvoBalance, "gwei"),
        sGVO: ethers.utils.formatUnits(sGVOBalance, "gwei"),
      },
      staking: {
        gvoStake: +stakeAllowance,
        gvoUnstake: +unstakeAllowance,
      },
      genesis: {
        saleEligible: genesisSaleEligible,
        totalClaimed: genesisClaimed,
        hoodie1Claimed: genesisClaimed1,
        hoodie2Claimed: genesisClaimed2,
        hoodie3Claimed: genesisClaimed3,
      },
    };
  },
);

export interface IUserBondDetails {
  allowance: number;
  interestDue: number;
  bondMaturationBlock: number;
  pendingPayout: string; //Payout formatted in gwei.
}
export const calculateUserBondDetails = createAsyncThunk(
  "account/calculateUserBondDetails",
  async ({ address, bond, networkID, provider }: ICalcUserBondDetailsAsyncThunk) => {
    if (!address) {
      return {
        bond: "",
        displayName: "",
        bondIconSvg: "",
        isLP: false,
        allowance: 0,
        balance: "0",
        interestDue: 0,
        bondMaturationBlock: 0,
        pendingPayout: "",
      };
    }
    // dispatch(fetchBondInProgress());

    // Calculate bond details.
    const bondContract = bond.getContractForBond(networkID, provider);
    const reserveContract = bond.getContractForReserve(networkID, provider);

    let interestDue, pendingPayout, bondMaturationBlock;

    const bondDetails = await bondContract.bondInfo(address);
    interestDue = bondDetails.payout / Math.pow(10, 9);
    bondMaturationBlock = +bondDetails.vesting + +bondDetails.lastBlock;
    pendingPayout = await bondContract.pendingPayoutFor(address);

    let allowance,
      balance = 0;
    allowance = await reserveContract.allowance(address, bond.getAddressForBond(networkID));
    balance = await reserveContract.balanceOf(address);
    // formatEthers takes BigNumber => String
    let balanceVal;
    if (bond.name === "sohm") balanceVal = ethers.utils.formatUnits(balance, "gwei");
    else balanceVal = ethers.utils.formatUnits(balance, "ether");
    // balanceVal should NOT be converted to a number. it loses decimal precision
    return {
      bond: bond.name,
      displayName: bond.displayName,
      bondIconSvg: bond.bondIconSvg,
      isLP: bond.isLP,
      allowance: Number(allowance),
      balance: balanceVal,
      interestDue,
      bondMaturationBlock,
      pendingPayout: ethers.utils.formatUnits(pendingPayout, "gwei"),
    };
  },
);

interface IAccountSlice {
  bonds: { [key: string]: IUserBondDetails };
  balances: {
    sohm: string;
    gvo: string;
    sGVO: string;
  };
  genesis: {
    saleEligible: boolean;
    claimed: string;
    balance?: string;
  };
  loading: boolean;
}

const initialState: IAccountSlice = {
  loading: true,
  bonds: {},
  balances: { sohm: "", gvo: "", sGVO: "" },
  genesis: { saleEligible: false, claimed: "0", balance: "0" },
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    fetchAccountSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAccountDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadAccountDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAccountDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      .addCase(getBalances.pending, state => {
        state.loading = true;
      })
      .addCase(getBalances.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(getBalances.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      .addCase(calculateUserBondDetails.pending, state => {
        state.loading = true;
      })
      .addCase(calculateUserBondDetails.fulfilled, (state, action) => {
        if (!action.payload) return;
        const bond = action.payload.bond;
        state.bonds[bond] = action.payload;
        state.loading = false;
      })
      .addCase(calculateUserBondDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      });
  },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
