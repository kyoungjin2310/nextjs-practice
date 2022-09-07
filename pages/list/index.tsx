import React from "react";
import Layout from "../../components/common/layout";
import { TOKEN, DATABASE_ID } from "../../config/index";
import { NotionList } from "../../modules/notionDBType";

const List = () => {
  return (
    <Layout title={"list"}>
      <h1>blabla</h1>
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
