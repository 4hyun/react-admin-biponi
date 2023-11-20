import { FC } from "react";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import Clear from "@mui/icons-material/Clear";
import { FlexCenter } from "components/flex-box";

// styled components
const StyledClear = styled(Clear)({
  top: 5,
  right: 5,
  fontSize: 14,
  cursor: "pointer",
  position: "absolute",
});

const Wrapper = styled(FlexCenter)(({ theme }) => ({
  width: 80,
  height: 80,
  overflow: "hidden",
  borderRadius: "8px",
  position: "relative",
  backgroundColor: theme.palette.primary.light,
}));

// ==============================================================
type Props = { image: string; handleClear: () => void };
// ==============================================================

const UploadImageBox: FC<Props> = ({ image, handleClear }) => {
  return (
    <Wrapper>
      <Image fill alt="product" src={image} style={{ objectFit: "contain" }} />
      <StyledClear onClick={handleClear} />
    </Wrapper>
  );
};

export default UploadImageBox;
