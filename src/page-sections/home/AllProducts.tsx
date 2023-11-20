import { FC, Fragment, useState } from "react";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
// custom component
import ProductCard from "components/product-cards/ProductCard";
import CategorySectionCreator from "components/CategorySectionCreator";
// product data type for typescript
import { Product } from "__types__/common";
// custom styled component
import { SubTitle } from "./styled";

// ================================================
type AllProductsProps = {
  heading?: string;
  loading?: boolean;
  products: Product[];
};
// ================================================

const AllProducts: FC<AllProductsProps> = ({ products, heading, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const checkOverflow = currentPage * 6 > products.length;
  const end = checkOverflow ? products.length : currentPage * 6;
  const filteredProduct = products.slice(0, end);

  return (
    <CategorySectionCreator title={heading || "All Products"}>
      <SubTitle>Best collection in 2021 for you!</SubTitle>

      {loading ? (
        <CircularProgress size={30} />
      ) : (
        <Fragment>
          <Grid container mb={-0.5} spacing={3}>
            {filteredProduct.map((product) => {
              const { item, skus, _id } = product;
              return (
                <Grid key={_id} item md={4} sm={6} xs={12}>
                  <ProductCard
                    id={_id}
                    hideRating
                    title={item}
                    unit={skus[0].unit}
                    stock={skus[0].quantity}
                    price={skus[0].price.base}
                    off={skus[0].price.discount}
                    imgUrl={skus[0]?.image[0]?.location || "/assets/images/Lemon.png"}
                  />
                </Grid>
              );
            })}
          </Grid>

          {!checkOverflow && (
            <Box mt={6} display="flex" justifyContent="center">
              <Button
                color="primary"
                variant="contained"
                sx={{ fontSize: "13px" }}
                onClick={() => setCurrentPage((state) => state + 1)}
              >
                Load More...
              </Button>
            </Box>
          )}
        </Fragment>
      )}
    </CategorySectionCreator>
  );
};

export default AllProducts;
