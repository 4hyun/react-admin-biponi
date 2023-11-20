import { NextPage } from "next";
import Card from "@mui/material/Card";
// custom components
import { H1, Paragraph } from "components/Typography";
// styled component
import { StyledContainer } from "page-sections/sessions/partial/styled";

const ResetPasswordEmailLink: NextPage = () => {
  return (
    <StyledContainer>
      <Card sx={{ padding: 4, maxWidth: 600, marginTop: 4, boxShadow: 1 }}>
        <H1 fontSize={24} fontWeight={700}>
          Reset your password
        </H1>
        <Paragraph>Please Check you email inbox</Paragraph>
      </Card>
    </StyledContainer>
  );
};

export default ResetPasswordEmailLink;
