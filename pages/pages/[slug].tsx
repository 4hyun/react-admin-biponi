import { ReactElement } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Box, Container } from "@mui/material";
// layout
import { NextPageWithLayout } from "../_app";
import MainLayout from "components/layouts/MainLayout";

import connectDB from "__server__/db";
import Page from "__server__/model/Page";
import stringify from "__server__/utils/stringify";

const Pages: NextPageWithLayout<any> = ({ page }) => {
  return (
    <Container sx={{ my: 4 }}>
      <Box dangerouslySetInnerHTML={{ __html: page.content }} />
    </Container>
  );
};

// ==============================================================
Pages.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
// ==============================================================

export const getStaticPaths: GetStaticPaths = async () => {
  await connectDB();
  const pages = stringify(await Page.find({}).sort("-createdAt"));
  const paths = pages.map((page: any) => ({ params: { slug: page.slug } }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  await connectDB();
  const page = stringify(await Page.findOne({ slug: params?.slug }));

  // HANDLING PAGE NOT FOUND ERROR
  if (!page) return { notFound: true };

  return {
    props: { page },
    revalidate: 10,
  };
};

export default Pages;
