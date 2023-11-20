import { FC } from "react";
import { Box, BoxProps, styled } from "@mui/material";
import clsx from "clsx";

// ==============================================================
type Ellipsis = { ellipsis: number };
interface Props extends BoxProps {
  ellipsis?: boolean;
}
// ==============================================================

const StyledBox = styled(Box)<Ellipsis>(({ ellipsis }) => ({
  ...(ellipsis && {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  }),
}));

export const H1: FC<Props> = (props) => {
  const { ellipsis, children, className, ...others } = props;

  return (
    <StyledBox
      fontSize={30}
      component="h1"
      fontWeight={700}
      ellipsis={ellipsis ? 1 : 0}
      {...(className && { className: clsx({ [className]: true }) })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};

export const H2: FC<Props> = (props) => {
  const { ellipsis, children, className, ...others } = props;

  return (
    <StyledBox
      fontSize={25}
      component="h2"
      fontWeight={700}
      ellipsis={ellipsis ? 1 : 0}
      {...(className && { className: clsx({ [className]: true }) })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};

export const H3: FC<Props> = (props) => {
  const { ellipsis, children, className, ...others } = props;

  return (
    <StyledBox
      fontSize={20}
      component="h3"
      fontWeight={700}
      ellipsis={ellipsis ? 1 : 0}
      {...(className && { className: clsx({ [className]: true }) })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};

export const H4: FC<Props> = (props) => {
  const { ellipsis, children, className, ...others } = props;

  return (
    <StyledBox
      fontSize={17}
      component="h4"
      fontWeight={600}
      ellipsis={ellipsis ? 1 : 0}
      {...(className && { className: clsx({ [className]: true }) })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};

export const H5: FC<Props> = (props) => {
  const { ellipsis, children, className, ...others } = props;

  return (
    <StyledBox
      fontSize={16}
      component="h5"
      fontWeight={600}
      ellipsis={ellipsis ? 1 : 0}
      {...(className && { className: clsx({ [className]: true }) })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};

export const H6: FC<Props> = (props) => {
  const { ellipsis, children, className, ...others } = props;

  return (
    <StyledBox
      component="h6"
      fontSize={14}
      fontWeight={600}
      ellipsis={ellipsis ? 1 : 0}
      {...(className && { className: clsx({ [className]: true }) })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};

export const Paragraph: FC<Props> = (props) => {
  const { ellipsis, children, className, ...others } = props;

  return (
    <StyledBox
      component="p"
      fontSize={14}
      ellipsis={ellipsis ? 1 : 0}
      {...(className && { className: clsx({ [className]: true }) })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};

export const Small: FC<Props> = (props) => {
  const { ellipsis, children, className, ...others } = props;

  return (
    <StyledBox
      fontSize={12}
      component="small"
      ellipsis={ellipsis ? 1 : 0}
      {...(className && { className: clsx({ [className]: true }) })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};

export const Span: FC<Props> = (props) => {
  const { ellipsis, children, className, ...others } = props;

  return (
    <StyledBox
      component="span"
      lineHeight="1.5"
      ellipsis={ellipsis ? 1 : 0}
      {...(className && { className: clsx({ [className]: true }) })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};

export const Tiny: FC<Props> = (props) => {
  const { ellipsis, children, className, ...others } = props;

  return (
    <StyledBox
      fontSize={10}
      lineHeight="1.5"
      component="small"
      ellipsis={ellipsis ? 1 : 0}
      {...(className && { className: clsx({ [className]: true }) })}
      {...others}
    >
      {children}
    </StyledBox>
  );
};
