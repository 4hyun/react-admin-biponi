import { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
// custom component
import Login from "page-sections/sessions/Login";
import SessionLayout from "components/layouts/SessionLayout";

const LoginPage: NextPageWithLayout = () => <Login />;

// ==============================================================
LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <SessionLayout>{page}</SessionLayout>;
};
// ==============================================================

export default LoginPage;
