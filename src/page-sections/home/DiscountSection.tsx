import { FC } from "react";
import Image from "next/image";
import { useTheme } from "@mui/material";
// custom component
import Carousel from "components/carousel/Carousel";
// styled component
import { DiscountWrapper } from "./styled";
// banner data type for typescript
import { BannerItem } from "__types__/common";

// ==============================================================
type DiscountSectionProps = { items: BannerItem[] };
// ==============================================================

const DiscountSection: FC<DiscountSectionProps> = ({ items }) => {
  const { palette } = useTheme();

  return (
    <DiscountWrapper>
      <Carousel
        showDots={true}
        autoPlay={true}
        showArrow={false}
        visibleSlides={1}
        dotClass="carousel-dot"
        totalSlides={items.length}
        dotColor={palette.primary.main}
        spacing="0px"
      >
        {items.map((item) => (
          <Image
            alt="slide"
            width={900}
            height={250}
            src={item.location}
            key={item.location}
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        ))}
      </Carousel>
    </DiscountWrapper>
  );
};

export default DiscountSection;
