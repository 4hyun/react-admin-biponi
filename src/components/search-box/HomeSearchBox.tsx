import Link from "next/link";
import { FC, useRef } from "react";
import { Box, Card, MenuItem, styled, TextField } from "@mui/material";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { Paragraph } from "components/Typography";
import useProductSearch from "hooks/useProductSearch";

// also used in the HomeSearchBox component
const SearchOutlinedIcon = styled(SearchOutlined)(({ theme }) => ({
  marginRight: 6,
  color: theme.palette.grey[600],
}));

// also used in the HomeSearchBox component
export const SearchResultCard = styled(Card)(() => ({
  zIndex: 99,
  top: "100%",
  width: "100%",
  position: "absolute",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
}));

const HomeSearchBox: FC = () => {
  const parentRef = useRef();
  const { search, resultList, notFoundResult } = useProductSearch();

  return (
    <Box mx="auto" flex="1 1 0" maxWidth="670px" position="relative" {...{ ref: parentRef }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Searching for..."
        onChange={search}
        InputProps={{
          startAdornment: <SearchOutlinedIcon fontSize="small" />,
          sx: {
            height: 44,
            paddingRight: 0,
            color: "grey.700",
            borderRadius: 300,
            overflow: "hidden",
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
          },
        }}
      />

      {resultList.length > 0 && (
        <SearchResultCard elevation={2}>
          {resultList.map((item) => (
            <Link href={`/product/${item._id}`} key={item._id}>
              <MenuItem>{item.item}</MenuItem>
            </Link>
          ))}
        </SearchResultCard>
      )}

      {notFoundResult && (
        <SearchResultCard elevation={2}>
          <Paragraph p={2}>Not Found Products</Paragraph>
        </SearchResultCard>
      )}
    </Box>
  );
};

export default HomeSearchBox;
