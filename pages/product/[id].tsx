import { ReactElement, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Box, Container, Grid } from "@mui/material";
import ImageViewer from "react-simple-image-viewer";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
// custom components
import Loading from "components/Loading";
import LazyImage from "components/LazyImage";
import AppAvatar from "components/AppAvatar";
import AppButton from "components/AppButton";
import { FlexCenter, FlexBox, FlexContentCenter, FlexItemCenter } from "components/flex-box";
import { H1, H2, H3, Paragraph, Span } from "components/Typography";
// custom app context
import { useAppContext } from "contexts/AppContext";
// layouts
import { NextPageWithLayout } from "../_app";
import MainLayout from "components/layouts/MainLayout";

import connectDB from "__server__/db";
import ProductModel from "__server__/model/Product";
import stringify from "__server__/utils/stringify";
import { Product, CartItem } from "__types__/common";
import checkValidId from "utils/checkValidId";

// ==============================================================
type ProductDetailsProps = { product: Product };
// ==============================================================

const ProductDetails: NextPageWithLayout<ProductDetailsProps> = ({ product }) => {
  const { _id, item, skus, description } = product;
  const { quantity, image, price } = skus[0] || {};

  const afterDiscountPrice = price.base - (price.base * price.discount) / 100;

  const [currentImage, setCurrentImage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const { state, dispatch } = useAppContext();
  const cartList: CartItem[] = state.cart.cartList || {};
  const cartItem = cartList.find((item) => item.id === _id);

  // HANDLE IMAGE CLICK FOR OPEN FULL VIEW
  const handleImageClick = (ind: number) => () => setSelectedImage(ind);

  // HANDLE OPEN FULL VIEW IMAGE LIGHT BOX
  const openImageViewer = (index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  };

  // HANDLE CLOSE FULL VIEW IMAGE LIGHT BOX
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  // HANDLE ADD TO CART
  const handleCartAmountChange = (quantity: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        id: _id,
        name: item,
        qty: quantity,
        price: afterDiscountPrice,
        imgUrl: image[0]?.location,
      },
    });
  };

  // SHOW LOADING INDICATOR
  if (!product) return <Loading />;

  return (
    <Grid container spacing={3} justifyContent="space-around">
      <Grid item md={6} xs={12} alignItems="center">
        <Box sx={{ "& .styles-module_wrapper__1I_qj": { zIndex: 1201 } }}>
          <FlexContentCenter mb={6}>
            <LazyImage
              alt={item}
              width={300}
              height={300}
              loading="eager"
              src={image[selectedImage].location}
              onClick={() => openImageViewer(image.indexOf(image[selectedImage]))}
            />

            {isViewerOpen && (
              <ImageViewer
                onClose={closeImageViewer}
                currentIndex={currentImage}
                src={image.map(({ location }) => location)}
                backgroundStyle={{ backgroundColor: "rgba(0,0,0,0.9)" }}
              />
            )}
          </FlexContentCenter>

          <FlexBox overflow="auto">
            {image.map((img, ind) => (
              <FlexCenter
                key={ind}
                width={64}
                height={64}
                minWidth={64}
                bgcolor="white"
                border="1px solid"
                borderRadius="10px"
                ml={ind === 0 ? "auto" : 0}
                style={{ cursor: "pointer" }}
                mr={ind === image.length - 1 ? "auto" : "10px"}
                borderColor={selectedImage === ind ? "primary.main" : "grey.400"}
                onClick={handleImageClick(ind)}
              >
                <AppAvatar src={img.location} variant="square" height={40} />
              </FlexCenter>
            ))}
          </FlexBox>
        </Box>
      </Grid>

      <Grid item md={6} xs={12} alignItems="center">
        <H1 mb={2}>{item}</H1>

        <Box mb={3}>
          <H2 color="primary.main" mb={0.5} lineHeight="1">
            ${afterDiscountPrice.toFixed(2)}
            {price.discount > 0 && (
              <Span color="grey.600" fontSize={18}>
                {"  "}
                <del>${price.base.toFixed(2)}</del>
              </Span>
            )}
          </H2>

          <Box color={!quantity ? "red" : "inherit"}>
            {!quantity ? "Out of Stock" : "Stock Available"}
          </Box>
        </Box>

        {description && <Paragraph mb={4}>{product.description}</Paragraph>}

        {!cartItem?.qty ? (
          <AppButton
            color="primary"
            variant="contained"
            disabled={quantity === 0}
            onClick={handleCartAmountChange(1)}
            sx={{ mb: "36px", px: "1.75rem", height: "40px" }}
          >
            Add to Cart
          </AppButton>
        ) : (
          <FlexItemCenter mb={4.5}>
            <AppButton
              size="small"
              color="primary"
              variant="outlined"
              onClick={handleCartAmountChange(cartItem?.qty - 1)}
              sx={{ p: "9px" }}
            >
              <Remove fontSize="small" />
            </AppButton>

            <H3 fontWeight="600" mx={2.5}>
              {cartItem?.qty.toString().padStart(2, "0")}
            </H3>

            <AppButton
              size="small"
              color="primary"
              variant="outlined"
              onClick={handleCartAmountChange(cartItem?.qty + 1)}
              sx={{ p: "9px" }}
            >
              <Add fontSize="small" />
            </AppButton>
          </FlexItemCenter>
        )}
      </Grid>
    </Grid>
  );
};

// ==============================================================
ProductDetails.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Container sx={{ my: 4 }}>{page}</Container>
    </MainLayout>
  );
};
// ==============================================================

export const getStaticPaths: GetStaticPaths = async () => {
  await connectDB();
  const products = stringify(await ProductModel.find({}).sort("-createdAt"));
  const paths = products.map((product: Product) => ({ params: { id: product._id } }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;

  // CHECKING VALID PRODUCT ID
  if (!checkValidId(id)) return { notFound: true };

  await connectDB();
  const product = stringify(await ProductModel.findById(id));

  // NOT FOUND PRODUCT HANDLING
  if (!product) return { notFound: true };

  return {
    props: { product },
    revalidate: 10,
  };
};

export default ProductDetails;
