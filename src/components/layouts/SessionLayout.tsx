import { FC, PropsWithChildren } from "react";
// styled components
import { StyledContainer, StyledCard } from "page-sections/sessions/partial/styled";

const SessionLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StyledContainer>
      <StyledCard elevation={3}>{children}</StyledCard>
    </StyledContainer>
  );
};

export default SessionLayout;
