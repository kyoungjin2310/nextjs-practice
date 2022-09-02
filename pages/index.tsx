import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/common/layout";
import Visual from "../components/main/visual";

const Home: NextPage = () => {
  return (
    <Layout>
      <>
        <Head>
          <title>Next.js 연습하기</title>
          <meta name="description" content="오늘 연습하기" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Visual />
      </>
    </Layout>
  );
};

export default Home;
