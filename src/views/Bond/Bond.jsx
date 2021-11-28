import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency, trim } from "../../helpers";
import { Backdrop, Box, Fade, Grid, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import TabPanel from "../../components/TabPanel";
import BondHeader from "./BondHeader";
import BondRedeem from "./BondRedeem";
import BondPurchase from "./BondPurchase";
import "./bond.scss";
import { useWeb3Context } from "src/hooks/web3Context";
import { Skeleton } from "@material-ui/lab";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Bond({ bond }) {
  const dispatch = useDispatch();
  const { provider, address, chainID } = useWeb3Context();

  const [slippage, setSlippage] = useState(0.5);
  const [recipientAddress, setRecipientAddress] = useState(address);

  const [view, setView] = useState(0);
  const [quantity, setQuantity] = useState();

  const isBondLoading = useSelector(state => state.bonding.loading ?? true);

  const onRecipientAddressChange = e => {
    return setRecipientAddress(e.target.value);
  };

  const onSlippageChange = e => {
    return setSlippage(e.target.value);
  };

  useEffect(() => {
    if (address) setRecipientAddress(address);
  }, [provider, quantity, address]);

  const changeView = (event, newView) => {
    setView(newView);
  };

  useEffect(() => {
    console.log(bond);
  }, []);

  return (
    <Fade in={true} mountOnEnter unmountOnExit>
      <Grid container id="bond-view">
        <Backdrop open={true}>
          <Fade in={true}>
            <Paper className="ohm-card ohm-modal">
              <BondHeader
                bond={bond}
                slippage={slippage}
                recipientAddress={recipientAddress}
                onSlippageChange={onSlippageChange}
                onRecipientAddressChange={onRecipientAddressChange}
              />

              <Box direction="row" className="bond-price-data-row">
                <div className="bond-price-data">
                  <Typography variant="h5" color="textSecondary">
                    Bond Price
                  </Typography>
                  <Typography variant="h3" className="price" color="primary">
                    {isBondLoading ? (
                      <Skeleton />
                    ) : (
                      // ) : bond.name === "sohm" ? (
                      //   `${bond.bondPrice} OHM`
                      // ) : (
                      formatCurrency(bond.bondPrice, 2)
                    )}
                  </Typography>
                </div>
                <div className="bond-price-data">
                  <Typography variant="h5" color="textSecondary">
                    Market Price
                  </Typography>
                  <Typography variant="h3" color="primary" className="price">
                    {isBondLoading ? <Skeleton /> : formatCurrency(bond.marketPrice, 2)}
                  </Typography>
                </div>
              </Box>

              <Tabs
                centered
                value={view}
                textColor="primary"
                indicatorColor="primary"
                onChange={changeView}
                aria-label="bond tabs"
              >
                <Tab label="Bond" {...a11yProps(0)} />
                <Tab label="Redeem" {...a11yProps(1)} />
              </Tabs>

              <TabPanel value={view} index={0}>
                <BondPurchase bond={bond} slippage={slippage} recipientAddress={recipientAddress} />
              </TabPanel>

              <TabPanel value={view} index={1}>
                <BondRedeem bond={bond} />
              </TabPanel>
            </Paper>
          </Fade>
        </Backdrop>
      </Grid>
    </Fade>
  );
}

export function DisplayBondPrice({ bond }) {
  const { chainID } = useWeb3Context();
  return (
    <>
      {!bond.isAvailable[chainID] ? (
        <>--</>
      ) : (
        `${new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(bond.bondPrice)}`
      )}
    </>
  );
}

<h4 class="MuiTypography-root MuiTypography-h4" style="text-align: center;">
  Powered by Olympus
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
      fill="#708B96"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.536 23.04L17.536 23.072H23.04V21.088H20.322C21.9573 19.849 23.008 17.923 23.008 15.76C23.008 12.0221 19.8704 8.992 16 8.992C12.1296 8.992 8.99199 12.0221 8.99199 15.76C8.99199 17.923 10.0427 19.849 11.678 21.088H8.95999V23.072H14.464V23.04V22.3649V20.4054C12.4585 19.7742 11.008 17.9401 11.008 15.776C11.008 13.0897 13.243 10.912 16 10.912C18.757 10.912 20.992 13.0897 20.992 15.776C20.992 17.9401 19.5414 19.7742 17.536 20.4054V23.04Z"
      fill="white"
    />
  </svg>
</h4>;

export function DisplayBondDiscount({ bond }) {
  const { chainID } = useWeb3Context();
  return <>{!bond.isAvailable[chainID] ? <>--</> : `${bond.bondDiscount && trim(bond.bondDiscount * 100, 2)}%`}</>;
}

export default Bond;
