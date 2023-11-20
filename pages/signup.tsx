import { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
// page section & component
import Signup from "page-sections/sessions/Signup";
import SessionLayout from "components/layouts/SessionLayout";

const SignUpPage: NextPageWithLayout = () => <Signup />;

// ==============================================================
SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <SessionLayout>{page}</SessionLayout>;
};
// ==============================================================

export default SignUpPage;
