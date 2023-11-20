import { CircularProgress } from "@mui/material";
import FlexCenter from "./flex-box/FlexCenter";

const Loading = ({ height = 300 }) => (
  <FlexCenter height={height}>
    <CircularProgress size={30} color="primary" />
  </FlexCenter>
);

export default Loading;
