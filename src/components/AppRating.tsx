import { Rating } from "@mui/material";
import { compose, spacing, styled, typography } from "@mui/system";

const AppRating = styled(Rating)(compose(spacing, typography));

AppRating.defaultProps = { fontSize: "1.25rem" };

export default AppRating;
