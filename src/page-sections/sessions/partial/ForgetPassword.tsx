import Link from "next/link";
import { H6, Paragraph } from "components/Typography";
import FlexContentCenter from "components/flex-box/FlexContentCenter";
import { FC } from "react";

const ForgetPassword: FC = () => {
  return (
    <FlexContentCenter gap={1} bgcolor="grey.200" py={2.5}>
      <Paragraph>Forgot your password?</Paragraph>

      <Link href="/reset-password">
        <H6 borderBottom="1px solid" borderColor="grey.900">
          Reset It
        </H6>
      </Link>
    </FlexContentCenter>
  );
};

export default ForgetPassword;
