import { StableBond, LPBond, NetworkID, CustomBond, BondType } from "src/lib/Bond";
import { addresses } from "src/constants";
import { ReactComponent as MnfstOhmImg } from "src/assets/tokens/GVO-OHM.svg";
import { ReactComponent as wETHImg } from "src/assets/tokens/wETH.svg";
import { ReactComponent as sOhmImg } from "src/assets/tokens/token_sOHM.svg";

import { abi as EthBondContract } from "src/abi/bonds/EthContract.json";
import { abi as MnfstOhmBondContract } from "src/abi/bonds/MnfstOhmContract.json";

import { abi as ReserveMnfstOhmContract } from "src/abi/reserves/MnfstOhm.json";
import { abi as ReserveSohmContract } from "src/abi/reserves/sOhm.json";
import { abi as SohmBondContract } from "src/abi/bonds/sOhmContract.json";

import { abi as ierc20Abi } from "src/abi/IERC20.json";
import { getBondCalculator } from "src/helpers/BondCalculator";
import { getTokenPrice } from ".";

// TODO(zx): Further modularize by splitting up reserveAssets into vendor token definitions
//   and include that in the definition of a bond

export const eth = new CustomBond({
  name: "eth",
  displayName: "wETH",
  lpUrl: "",
  bondType: BondType.StableAsset,
  bondToken: "wETH",
  isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true },
  bondIconSvg: wETHImg,
  bondContractABI: EthBondContract,
  reserveContract: ierc20Abi, // The Standard ierc20Abi since they're normal tokens
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x4b53412beaad7d62cd00754757632f939391487b",
      reserveAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0xe6bc5e089FCc257E33e7341434C19dD99C72e07F",
      reserveAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
    },
  },
  customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
    const ethBondContract = this.getContractForBond(networkID, provider);
    let ethPrice = await ethBondContract.assetPrice();

    ethPrice = ethPrice / Math.pow(10, 8);
    // console.log("custom treasury balance eth price: ", ethPrice);
    const token = this.getContractForReserve(networkID, provider);

    let ethAmount = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
    // console.log("eth amount in treasury: ", ethAmount);
    ethAmount = ethAmount / Math.pow(10, 18);
    // console.log("eth amount in treasury 2: ", ethAmount);
    return ethAmount * ethPrice;
  },
});

export const gvo_ohm_lp = new CustomBond({
  name: "gvo_ohm_lp",
  displayName: "GVO-OHM LP",
  bondToken: "OHM",
  bondType: BondType.LP,
  isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true },
  bondIconSvg: MnfstOhmImg,
  bondContractABI: MnfstOhmBondContract,
  reserveContract: ReserveMnfstOhmContract,
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0x4c3B12152300091B813236bE7066A5759E581672",
      reserveAddress: "0x89c4d11dfd5868d847ca26c8b1caa9c25c712cef",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0x6e2fD14A6BE4F76B769CDeC5CCA8664849c03855",
      reserveAddress: "0x42F9e504eB2f6F9a3eE7B7630bEeC0C034DBE578",
    },
  },
  lpUrl:
    "https://app.sushi.com/add/0x383518188c0c6d7730d91b2c03a03c837814a899/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
    if (networkID === NetworkID.Mainnet) {
      // const BondContract = this.getContractForBond(networkID, provider);
      // console.log("sohm bond contract", BondContract);
      let ohmPrice = await getTokenPrice(); // BondContract.assetPrice();

      const token = this.getContractForReserve(networkID, provider);
      const tokenAddress = this.getAddressForReserve(networkID);
      const bondCalculator = getBondCalculator(networkID, provider);
      const tokenAmount = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);
      const valuation = await bondCalculator.valuation(tokenAddress, tokenAmount);
      const markdown = await bondCalculator.markdown(tokenAddress);
      let tokenUSD = (valuation / Math.pow(10, 9)) * (markdown / Math.pow(10, 9));
      return tokenUSD * ohmPrice;
    } else {
      let ohmPrice = await getTokenPrice(); // BondContract.assetPrice();
      const token = this.getContractForReserve(networkID, provider);
      const tokenAddress = this.getAddressForReserve(networkID);
      const bondCalculator = getBondCalculator(networkID, provider);
      const tokenAmount = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);

      // console.log("lp token amount: ", tokenAmount);
      const valuation = await bondCalculator.valuation(tokenAddress, tokenAmount);
      // console.log("lp token valuation: ", valuation / Math.pow(10, 9));

      const markdown = await bondCalculator.markdown(tokenAddress);
      // console.log("markdown: ", markdown);
      let tokenUSD = (valuation / Math.pow(10, 9)) * (markdown / Math.pow(10, 9));
      // console.log("tokenUSD: ", tokenUSD);
      return tokenUSD * ohmPrice;
    }
  },
});

export const sohm = new CustomBond({
  name: "sohm",
  displayName: "sOHM",
  bondType: BondType.StableAsset,
  bondToken: "sOHM",
  lpUrl: "",
  isAvailable: { [NetworkID.Mainnet]: true, [NetworkID.Testnet]: true },
  bondIconSvg: sOhmImg,
  bondContractABI: SohmBondContract,
  reserveContract: ReserveSohmContract, // The Standard ierc20Abi since they're normal tokens
  networkAddrs: {
    [NetworkID.Mainnet]: {
      bondAddress: "0xFEff98fdBd76B51Fd7Fd0E95eC1CD9c28DD1503F",
      reserveAddress: "0x04F2694C8fcee23e8Fd0dfEA1d4f5Bb8c352111F",
    },
    [NetworkID.Testnet]: {
      bondAddress: "0x45CBd8dE3beF01Bd6Ae4d889aeE31Fac0D699548",
      reserveAddress: "0x1Fecda1dE7b6951B248C0B62CaeBD5BAbedc2084",
    },
  },
  customTreasuryBalanceFunc: async function (this: CustomBond, networkID, provider) {
    // const sohmBondContract = this.getContractForBond(networkID, provider);
    // let sohmPrice = await sohmBondContract.assetPrice();
    // sohmPrice = sohmPrice / Math.pow(10, 8);
    // console.log("custom treasury balance fired for sohm");
    let sohmPrice = await getTokenPrice(); // BondContract.assetPrice();
    // console.log("sohmPrice: ", sohmPrice);
    const token = this.getContractForReserve(networkID, provider);
    // console.log("token: ", token);
    let sohmAmount = await token.balanceOf(addresses[networkID].TREASURY_ADDRESS);

    sohmAmount = sohmAmount / Math.pow(10, 9);
    // console.log("sohm amt: ", sohmAmount);
    return sohmAmount * sohmPrice;
  },
});

// HOW TO ADD A NEW BOND:
// Is it a stableCoin bond? use `new StableBond`
// Is it an LP Bond? use `new LPBond`
// Add new bonds to this array!!
export const allBonds = [eth, gvo_ohm_lp, sohm];
export const allBondsMap = allBonds.reduce((prevVal, bond) => {
  return { ...prevVal, [bond.name]: bond };
}, {});

// Debug Log
// console.log(allBondsMap);
export default allBonds;
