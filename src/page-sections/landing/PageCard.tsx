import Link from "next/link";
import { FC, Fragment } from "react";
import Visibility from "@mui/icons-material/Visibility";
import { Card, IconButton, Box, styled } from "@mui/material";
import FlexBox from "components/flex-box/FlexBox";
import LazyImage from "components/LazyImage";
import { H3, Span } from "components/Typography";

// styled components
const Wrapper = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  position: "relative",
  borderRadius: "0.5rem",
  backgroundColor: theme.palette.grey[200],
  border: `1px solid ${theme.palette.grey[300]}`,
  "& .overlay": { transition: "0.3s ease-in-out" },
  "&:hover": { ".overlay": { opacity: 1 } },
}));

const StatusChipBox = styled(Box)(({ theme }) => ({
  top: 0,
  width: 42,
  zIndex: 11,
  height: 45,
  right: "30px",
  fontSize: "12px",
  position: "absolute",
  background: theme.palette.primary.main,
  "& .triangle-left": {
    width: 0,
    height: 0,
    borderTop: "0px solid transparent",
    borderBottom: "10px solid transparent",
    borderLeft: `21px solid ${theme.palette.primary.main}`,
  },
  "& .triangle-right": {
    width: 0,
    height: 0,
    borderTop: "0px solid transparent",
    borderBottom: "10px solid transparent",
    borderRight: `21px solid ${theme.palette.primary.main}`,
  },
}));

const StatusChip = styled(Span)({
  height: "100%",
  display: "flex",
  color: "#fff",
  fontSize: "13px",
  alignItems: "center",
  justifyContent: "center",
});

const StyledFlex = styled(FlexBox)({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0,
  borderRadius: "8px",
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0, 0.54)",
});

export interface PageCardProps {
  title: string;
  imgUrl: string;
  status?: string;
  previewUrl: string;
  disabled?: boolean;
}

const PageCard: FC<PageCardProps> = (props) => {
  const { title, imgUrl, previewUrl, disabled, status } = props;

  return (
    <Fragment>
      <Wrapper mb={3} overflow="hidden">
        <Card elevation={3}>
          <LazyImage
            width={600}
            height={400}
            src={imgUrl}
            alt="cover"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              objectPosition: "center center",
            }}
          />
        </Card>

        {status && (
          <StatusChipBox>
            <StatusChip>{status}</StatusChip>
            <Box width="100%" display="flex">
              <Box className="triangle-left" />
              <Box className="triangle-right" />
            </Box>
          </StatusChipBox>
        )}

        {!disabled && (
          <Link href={previewUrl} target="_blank">
            <StyledFlex className="overlay">
              <IconButton sx={{ bgcolor: "white", "&:hover": { bgcolor: "white" } }}>
                <Visibility fontSize="small" />
              </IconButton>
            </StyledFlex>
          </Link>
        )}
      </Wrapper>

      <H3 textAlign="center" lineHeight="1" fontSize="14px">
        {title}
      </H3>
    </Fragment>
  );
};

export default PageCard;
