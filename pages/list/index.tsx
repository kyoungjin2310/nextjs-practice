import { NextPage } from "next";
import React from "react";
import Layout from "../../components/common/layout";
import NotionItems from "../../components/lists/notionItems";
import { TOKEN, DATABASE_ID } from "../../config/index";
import { NotionList, NotionDatabase } from "../../modules/notionDBType";
type PageProps = {
  projects: NotionDatabase;
};

const List: NextPage<PageProps> = ({ projects }) => {
  return (
    <Layout title={"list"}>
      <>
        <h1>blabla</h1>
        {projects.results.map((list) => (
          <NotionItems key={list.id} data={list} />
        ))}
      </>
    </Layout>
  );
};

export default List;

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
          property: "Project",
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
    (aProject: NotionList) => aProject.properties.Project.title[0].plain_text
  );

  console.log(projectNames);
  return {
    props: { projects },
  };
}
