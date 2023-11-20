import { FC } from "react";
import NextImage, { ImageProps } from "next/image";
import {
  bgcolor,
  borderRadius,
  BordersProps,
  compose,
  spacing,
  SpacingProps,
  styled,
} from "@mui/system";

const LazyImage = styled<FC<ImageProps & BordersProps & SpacingProps>>(
  ({ borderRadius, ...rest }) => <NextImage {...rest} />
)(compose(spacing, borderRadius, bgcolor));

export default LazyImage;
