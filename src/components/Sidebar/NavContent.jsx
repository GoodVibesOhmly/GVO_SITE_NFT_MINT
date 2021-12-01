import { useCallback, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Social from "./Social";
// import externalUrls from "./externalUrls";
import { ReactComponent as StakeIcon } from "../../assets/icons/stake.svg";
import { ReactComponent as BondIcon } from "../../assets/icons/bond.svg";
import { ReactComponent as Logo } from "../../assets/icons/logo-gvo.svg";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { trim, shorten } from "../../helpers";
import { useAddress, useWeb3Context } from "src/hooks/web3Context";
// import useBonds from "../../hooks/Bonds";
import { Paper, Link, Box, Typography, SvgIcon } from "@material-ui/core";
// import { Skeleton } from "@material-ui/lab";
import { useSelector } from "react-redux";

import "./sidebar.scss";

function NavContent() {
  const [isActive] = useState();
  const address = useAddress();
  // const { bonds } = useBonds();
  // const { chainID } = useWeb3Context();

  const mintIsLive = useSelector(state => state.app.genesisMint.saleStarted);

  const checkPage = useCallback((match, location, page) => {
    const currentPath = location.pathname.replace("/", "");
    if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
      return true;
    }
    if (currentPath.indexOf("stake") >= 0 && page === "stake") {
      return true;
    }
    if ((currentPath.indexOf("bonds") >= 0 || currentPath.indexOf("choose_bond") >= 0) && page === "bonds") {
      return true;
    }
    return false;
  }, []);

  return (
    <Paper className="dapp-sidebar">
      <Box className="dapp-sidebar-inner" display="flex" justifyContent="space-between" flexDirection="column">
        <div className="dapp-menu-top">
          <Box className="branding-header">
            <Link href="https://goodvibesohmly.xyz" target="_blank">
              <SvgIcon
                color="primary"
                component={Logo}
                viewBox="0 0 36 32"
                style={{ maxWidth: "52px", width: "52px", height: "60px" }}
              />
            </Link>

            {address && (
              <div className="wallet-link">
                <Link href={`https://etherscan.io/address/${address}`} target="_blank">
                  <Typography>{shorten(address)}</Typography>
                </Link>
              </div>
            )}
          </Box>

          <div className="dapp-menu-links">
            <div className="dapp-nav" id="navbarNav">
              <Link
                component={NavLink}
                id="stake-nav"
                to="/"
                isActive={(match, location) => {
                  return checkPage(match, location, "stake");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Box display="flex" align="center">
                  <SvgIcon
                    style={{
                      height: "20px",
                      width: "28px",
                      verticalAlign: "middle",
                      marginRight: "5px",
                    }}
                    component={StakeIcon}
                  />
                  <Typography variant="h5" style={{ fontWeight: "600" }}>
                    Stake
                  </Typography>
                </Box>
              </Link>

              <Link
                component={NavLink}
                id="bond-nav"
                to="/bonds"
                isActive={(match, location) => {
                  return checkPage(match, location, "bonds");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Box display="flex" align="center">
                  <SvgIcon
                    style={{
                      height: "20px",
                      width: "28px",
                      verticalAlign: "middle",
                      marginRight: "5px",
                    }}
                    component={BondIcon}
                  />
                  <Typography variant="h5" style={{ fontWeight: "600" }}>
                    Bond
                  </Typography>
                </Box>
              </Link>

              <Link
                component={NavLink}
                id="mint-nav"
                to="/mint"
                isActive={(match, location) => {
                  return checkPage(match, location, "mint");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""} ${mintIsLive ? "glow" : ""}`}
              >
                <Box display="flex" align="center">
                  <SvgIcon
                    style={{
                      height: "20px",
                      width: "28px",
                      verticalAlign: "middle",
                      marginRight: "5px",
                    }}
                    viewBox="0 0 24 24"
                    htmlColor="inherit"
                    component={ShoppingCartIcon}
                  />
                  <Typography variant="h5" style={{ fontWeight: "600" }}>
                    Mint
                  </Typography>
                </Box>
              </Link>
            </div>
          </div>
        </div>
        <Box className="dapp-menu-bottom" display="flex" justifyContent="space-between" flexDirection="column">
          <div className="dapp-menu-social">
            <Social />
          </div>
        </Box>
      </Box>
    </Paper>
  );
}

export default NavContent;
