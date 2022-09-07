import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/common/layout";
import Visual from "../components/main/visual";
import { TOKEN, DATABASE_ID } from "../config/index";
import { GetStaticProps, InferGetStaticPropsType, NextApiResponse } from "next";

type Post = {
  author: string;
  content: string;
};

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

export async function getServerSideProps() {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      sorts: [
        {
          property: "Name",
          direction: "ascending",
        },
      ],
      page_size: 100,
    }),
  };

  const res = await fetch(
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    options
  );

  const projects = await res.json();

  const projectNames = projects.results?.map(
    (aProject: any) => aProject.properties.Name.title[0].plain_text
  );

  console.log(projects);
  return {
    props: { projects },
  };
}
