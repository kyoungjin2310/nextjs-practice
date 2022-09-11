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
      <div className="flex flex-col items-center justify-center min-h-screen px-6 mb-10">
        <h1 className="text-4xl font-bold sm:text-6xl">
          총 프로젝트:
          <span className="pl-4 text-blue-500">{projects.results.length}</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 py-10 m-6 gap-8 w-full">
          {projects.results.map((list) => (
            <NotionItems key={list.id} data={list} />
          ))}
        </div>
      </div>
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
