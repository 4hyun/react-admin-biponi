import { compose, display, spacing, styled } from "@mui/system";

const AppImage = styled("img")(compose(spacing, display));

AppImage.defaultProps = { display: "block" };

export default AppImage;
