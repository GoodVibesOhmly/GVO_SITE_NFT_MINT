import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Box, Button, Container, Grid, Paper, Typography, Zoom } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useWeb3Context } from "src/hooks";
import { loadAppDetails } from "src/slices/AppSlice";
import { loadAccountDetails } from "src/slices/AccountSlice";
import { clearPendingTxn, fetchPendingTxns } from "src/slices/PendingTxnsSlice";
import { error, info } from "src/slices/MessagesSlice";
import { abi as Genesis1155Abi } from "src/abi/Genesis1155.json";
import CheckIcon from "@material-ui/icons/Check";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import "./mint.scss";

function Mint() {
  const dispatch = useDispatch();
  const [isMinting, setIsMinting] = useState(false);
  const { address, chainID, provider } = useWeb3Context();
  const accountData = useSelector(state => state.account.genesis);
  const genesisData = useSelector(state => state.app.genesisMint);
  let genesisContract;

  const pendingTransaction = useSelector(state => {
    return state.pendingTransactions;
  });

  const isDisabled = () => {
    return (
      pendingTransaction.length > 0 ||
      Number(accountData.totalClaimed) >= 3 ||
      !accountData.saleEligible ||
      !genesisData.saleStarted
    );
  };

  useEffect(() => {
    // console.log("account data loaded: ", accountData);
    // console.log("genesis data loaded: ", genesisData);
    if (genesisData.contractAddress)
      genesisContract = new ethers.Contract(genesisData.contractAddress, Genesis1155Abi, provider.getSigner());
  }, [accountData, genesisData, isMinting]);

  function handleMint(id) {
    setIsMinting(true);
    mint(id);
  }

  const mint = async id => {
    let mintTx;
    let curGas = await provider.getGasPrice();
    try {
      let ethAmt = ethers.utils.parseEther(genesisData.price);
      mintTx = await genesisContract.mint(id, { value: ethAmt, gasLimit: 250000 });
      // console.log(mintTx);

      dispatch(fetchPendingTxns({ txnHash: mintTx.hash, text: "Minting", type: "mint" }));
      await mintTx.wait();

      clearPendingTxn(mintTx);
    } catch (e) {
      let errorMessage = e.message;
      dispatch(error(errorMessage));
    } finally {
      // TODO: get updated contract data and show minted shrohm to user
      dispatch(loadAppDetails);
      dispatch(loadAccountDetails);
      setIsMinting(false);
      if (mintTx) dispatch(clearPendingTxn(mintTx.hash));
    }
  };

  return (
    <div className="mint-view">
      <Container maxWidth="md">
        <Box p={1} display="flex" flexDirect="row" justifyContent="space-between" style={{ width: "auto" }}>
          <Box style={{ width: "50%", textAlign: "left" }}>
            <Typography variant="h3" style={{ fontWeight: "600" }} className="title">
              SΞASON 0: GΞNΞS1S
            </Typography>
            <Box marginTop="10px">
              {genesisData && (
                <Typography variant="h6">
                  {genesisData.totalMinted} / {genesisData.totalSupply} Minted
                </Typography>
              )}
              <Typography variant="h6">0.333 ETH</Typography>
              <Typography variant="h6">Max 1 Per Mint / 3 Per Wallet</Typography>
            </Box>
          </Box>
          <Box style={{ width: "50%", textAlign: "right", fontWeight: "500 !important" }}>
            <Typography variant="h6" className={accountData.saleEligible ? "wallet-eligible" : ""}>
              {accountData.saleEligible ? (
                <CheckIcon
                  viewBox="0 0 24 24"
                  style={{ height: "11px", width: "11px", marginRight: "3px", color: "green" }}
                />
              ) : (
                <NotInterestedIcon
                  viewBox="0 0 24 24"
                  style={{ height: "11px", width: "11px", marginRight: "3px", color: "red" }}
                />
              )}
              {accountData.saleEligible ? "Wallet Eligible" : "Wallet Ineligible"}
            </Typography>
            <Typography variant="h6">Your balance: {accountData.totalClaimed}</Typography>
          </Box>
        </Box>
        <Box style={{ marginTop: "15px" }} p={1}>
          <Grid container spacing={3} className="grid-container">
            <Grid item lg={4} md={4} style={{ textAlign: "center" }}>
              <Zoom in={true}>
                <Paper className="ohm-card">
                  <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                    <Box>
                      <Typography variant="h5">Creation</Typography>
                      <Box className="preview gif-1"></Box>
                      {/* <Box className="mint-data" p={1}>
                      <Typography variant="body1" color="textSecondary">
                        The <strong>builder</strong>, you prefer a solid work station and divine inspiration, you’re
                        Edison with a lightbulb. You’re Dyson with a vacuum. You’re a creator in your own way, you bring
                        about revolutions and evolution for the human race. You may be a tinkerer for yourself first and
                        foremost, but the universe always has bigger plans in store for you. Your inventions, your
                        creations, will leave a mark on human history. You want to create something that stands long
                        after you pass. And, you will.
                      </Typography>
                    </Box> */}
                    </Box>
                    <Box m={1}>
                      {genesisData.hoodie1Remaining > 0 ? (
                        <Typography variant="h6">{genesisData.hoodie1Remaining} Available</Typography>
                      ) : (
                        <Typography variant="h6">Sold Out</Typography>
                      )}
                      <Typography>Youve minted: {accountData.hoodie1Claimed}</Typography>
                    </Box>
                    <Box>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isDisabled()}
                        onClick={() => handleMint(1)}
                        style={{ fontWeight: "600" }}
                      >
                        Mint
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Zoom>
            </Grid>

            <Grid item lg={4} md={4} style={{ textAlign: "center" }}>
              <Zoom in={true}>
                <Paper className="ohm-card">
                  <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                    <Box>
                      <Typography variant="h5">Abundance</Typography>
                      <Box className="preview gif-2"></Box>
                      {/* <Box className="mint-data" p={1}>
                        <Typography variant="body1" color="textSecondary">
                          The <strong>visionary</strong>, you’re someone that wants to walk into a room and raise a
                          hundred million in five minutes flat, you’ve never been the type of person to fit in and why
                          would you? You’re infinitely abundant in your being, a vortex of attraction, magnetism
                          unparalleled, everything you desire instantly manifests into your reality. You believe in
                          people. You believe in storytelling. You believe that empathy is the greatest advantage you
                          possess. And, you’re right.
                        </Typography>
                      </Box> */}
                    </Box>
                    <Box m={1}>
                      {genesisData.hoodie2Remaining > 0 ? (
                        <Typography variant="h6">{genesisData.hoodie2Remaining} Available</Typography>
                      ) : (
                        <Typography variant="h6">Sold Out</Typography>
                      )}
                      <Typography>Youve minted: {accountData.hoodie2Claimed}</Typography>
                    </Box>
                    <Box>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isDisabled()}
                        onClick={() => handleMint(2)}
                        style={{ fontWeight: "600" }}
                      >
                        Mint
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Zoom>
            </Grid>

            <Grid item lg={4} md={4} style={{ textAlign: "center" }}>
              <Zoom in={true}>
                <Paper className="ohm-card">
                  <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                    <Box>
                      <Typography variant="h5">Flow</Typography>
                      <Box className="preview gif-3"></Box>
                      {/* <Box className="mint-data" p={1}>
                        <Typography variant="body1" color="textSecondary">
                          The <strong>artist</strong>, you’re a creator that recognizes living in flow is the highest
                          path to walk in life. Every art piece you create, whether it’s a painting or song or something
                          else, is filled with emotion and passion and perfectly flows effortlessly through your hands,
                          mouth, and senses. It’s through this creation, this birth of manifestation from source you
                          truly feel alive. You create for yourself, you create for something higher than yourself, your
                          work resonates deeply with the collective. And, so it is.
                        </Typography>
                      </Box> */}
                    </Box>
                    <Box m={1}>
                      {genesisData.hoodie3Remaining > 0 ? (
                        <Typography variant="h6">{genesisData.hoodie3Remaining} Available</Typography>
                      ) : (
                        <Typography variant="h6">Sold Out</Typography>
                      )}
                      <Typography>Youve minted: {accountData.hoodie3Claimed}</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={isDisabled()}
                      onClick={() => handleMint(3)}
                      style={{ fontWeight: "600" }}
                    >
                      Mint
                    </Button>
                  </Box>
                </Paper>
              </Zoom>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Mint;
