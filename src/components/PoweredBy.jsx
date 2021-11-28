import { Box, Typography, Button, Link } from "@material-ui/core";

export default function PoweredBy() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Typography variant="h5">Powered by </Typography>
      <Button component={Link} href="https://www.olympusdao.finance/" target="_blank" rel="noref">
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          Olympus Ω
        </Typography>
      </Button>
    </Box>
  );
}
