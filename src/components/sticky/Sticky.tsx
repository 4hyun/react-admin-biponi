import { FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
// custom styled component
import { StyledBox } from "./styled";

// ==============================================================
interface StickyProps extends PropsWithChildren {
  fixedOn: number;
  onSticky?: (isFixed: boolean) => void;
}
// ==============================================================

const Sticky: FC<StickyProps> = ({ fixedOn, children, onSticky }) => {
  const positionRef = useRef(0);
  const elementRef = useRef<HTMLDivElement>(null);

  const [fixed, setFixed] = useState(false);
  const [parentHeight, setParentHeight] = useState(0);

  const scrollListener = useCallback(() => {
    if (!window) return;

    const distance = window.pageYOffset - positionRef.current;
    let isFixed = distance >= fixedOn;

    setFixed(isFixed);
  }, [fixedOn, setFixed]);

  useEffect(() => {
    if (!window) return;

    window.addEventListener("scroll", scrollListener);
    window.addEventListener("resize", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
      window.removeEventListener("resize", scrollListener);
    };
  }, [scrollListener]);

  useEffect(() => {
    if (!positionRef.current) {
      positionRef.current = elementRef.current?.offsetTop as number;
    }

    setParentHeight(elementRef.current?.offsetHeight || 0);
  }, [children]);

  useEffect(() => {
    if (onSticky) onSticky(fixed);
  }, [fixed, onSticky]);

  return (
    <StyledBox fixed_on={fixedOn} component_height={parentHeight} fixed={fixed ? 1 : 0}>
      <div className={clsx({ hold: !fixed, fixed: fixed })} ref={elementRef}>
        {children}
      </div>
    </StyledBox>
  );
};

export default Sticky;
