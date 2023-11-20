import { FC, useEffect, useState } from "react";
import { useTheme } from "@mui/material";
// custom components
import Carousel from "components/carousel/Carousel";
import ProductCard from "components/product-cards/ProductCard";
import CategorySectionCreator from "components/CategorySectionCreator";
// custom hook
import useWindowSize from "hooks/useWindowSize";
// product data type for typescript
import { Product } from "__types__/common";
// custom styled component
import { SubTitle } from "./styled";

// ==============================================================
type ProductCarouselProps = {
  title: string;
  subTitle: string;
  products: Product[];
};
// ==============================================================

const ProductCarousel: FC<ProductCarouselProps> = ({ products, title, subTitle }) => {
  const width = useWindowSize();
  const { palette, shadows } = useTheme();
  const [visibleSlides, setVisibleSlides] = useState(3);

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(3);
  }, [width]);

  return (
    <CategorySectionCreator title={title}>
      <SubTitle>{subTitle}</SubTitle>

      <Carousel
        infinite={true}
        visibleSlides={visibleSlides}
        totalSlides={products.length}
        sx={{
          "& #backArrowButton, #backForwardButton": {
            width: 40,
            height: 40,
            background: "#fff",
            boxShadow: shadows[2],
            color: palette.primary.main,
          },
          "& .carousel__slider-tray-wrapper": { paddingBottom: 2.5 },
        }}
      >
        {products.map((item) => (
          <ProductCard
            hideRating
            id={item._id}
            key={item._id}
            title={item.item}
            unit={item.skus[0].unit}
            stock={item.skus[0].quantity}
            price={item.skus[0].price.base}
            off={item.skus[0].price.discount}
            imgUrl={item.skus[0].image[0].location}
          />
        ))}
      </Carousel>
    </CategorySectionCreator>
  );
};

export default ProductCarousel;
