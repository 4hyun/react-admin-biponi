import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingScreen({ open = false }) {
  return (
    <Backdrop
      open={open}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "white" }}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
}

export default LoadingScreen;
