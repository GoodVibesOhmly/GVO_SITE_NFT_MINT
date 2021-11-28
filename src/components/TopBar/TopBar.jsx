import { useEffect, useState } from "react";
import { AppBar, Toolbar, Box, Button, SvgIcon, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as MenuIcon } from "../../assets/icons/hamburger.svg";
// import OhmMenu from "./OhmMenu.jsx";
import ConnectMenu from "./ConnectMenu.jsx";
import { useSelector } from "react-redux";
import "./topbar.scss";

const useStyles = makeStyles(theme => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      padding: "10px",
    },
    justifyContent: "flex-end",
    alignItems: "flex-end",
    background: "transparent",
    backdropFilter: "none",
    zIndex: 10,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("981")]: {
      display: "none",
    },
  },
}));

function TopBar({ theme, toggleTheme, handleDrawerToggle }) {
  const [saleMessage, setSaleMessage] = useState("");
  const classes = useStyles();

  const saleActive = useSelector(state => {
    return state.app.genesisMint.saleStarted;
  });

  useEffect(() => {
    if (saleActive) setSaleMessage("GΞNΞS1S mint is live!");
    else setSaleMessage("Season 0 coming soon");
  }, [saleActive]);

  return (
    <AppBar position="sticky" className={classes.appBar} elevation={0}>
      <Toolbar disableGutters className="dapp-topbar">
        <Button
          id="hamburger"
          aria-label="open drawer"
          edge="start"
          size="large"
          variant="contained"
          color="secondary"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <SvgIcon component={MenuIcon} />
        </Button>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Box>
            <Typography variant="h6" color="primary" className={`mint-text ${saleActive && "live"}`}>
              {saleMessage}
            </Typography>
          </Box>
          <ConnectMenu theme={theme} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
