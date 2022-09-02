import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/common/layout";

const Home: NextPage = () => {
  return (
    <Layout title={"home"}>
      <>
        <Head>
          <title>Next.js 연습하기</title>
          <meta name="description" content="오늘 연습하기" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </>
    </Layout>
  );
};

export default Home;
