import Image from "next/image";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
// custom component
import { FlexItemCenter } from "components/flex-box";
// styled component
import { StyledContainer } from "page-sections/sessions/partial/styled";

const Error404: NextPage = () => {
  const { back, push } = useRouter();

  return (
    <StyledContainer sx={{ flexDirection: "column" }}>
      <Image
        alt="404"
        width={400}
        height={585}
        src="/assets/images/illustrations/404.svg"
        style={{ height: "auto", objectFit: "contain" }}
      />

      <FlexItemCenter mt={4} flexWrap="wrap" gap={2}>
        <Button color="primary" variant="outlined" onClick={back}>
          Go Back
        </Button>

        <Button variant="contained" color="primary" onClick={() => push("/")}>
          Go to Home
        </Button>
      </FlexItemCenter>
    </StyledContainer>
  );
};

export default Error404;
