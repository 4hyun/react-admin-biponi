import { FC } from "react";
import Link from "next/link";
import East from "@mui/icons-material/East";
import { Avatar, Box, IconButton } from "@mui/material";
// custom components
import TableRow from "components/TableRow";
import { FlexItemCenter } from "components/flex-box";
import { H5, Paragraph } from "components/Typography";
// product data type for typescript
import { Product } from "__types__/common";

// ==============================================================
type ProductRowProps = { product: Product };
// ==============================================================

const ProductRow: FC<ProductRowProps> = ({ product }) => {
  const { skus, item } = product;

  return (
    <Link href={`/admin/products/${product._id}`}>
      <TableRow sx={{ my: 2, padding: "6px 18px" }}>
        <FlexItemCenter gap={2.5} m={0.75} flex="2 2 220px !important">
          <Avatar src={skus[0].image[0]?.location} sx={{ height: 36, width: 36 }} />
          <Paragraph textAlign="left">{item}</Paragraph>
        </FlexItemCenter>

        <H5
          m={0.75}
          textAlign="left"
          fontWeight="600"
          color={skus[0].quantity < 6 ? "error.main" : "inherit"}
        >
          {skus[0].quantity.toString().padStart(2, "0")}
        </H5>

        <H5 m={0.75} textAlign="left" fontWeight="400">
          ${skus[0].price.base.toFixed(2)}
        </H5>

        <H5 m={0.75} textAlign="left" fontWeight="400">
          ${skus[0].price.base.toFixed(2)}
        </H5>

        <Box
          color="grey.600"
          textAlign="center"
          sx={{ flex: "0 0 0 !important", display: { xs: "none", md: "block" } }}
        >
          <IconButton>
            <East fontSize="small" color="inherit" />
          </IconButton>
        </Box>
      </TableRow>
    </Link>
  );
};

export default ProductRow;
