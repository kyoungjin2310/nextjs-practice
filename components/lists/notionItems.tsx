import React from "react";
import Image from "next/image";
import { NotionList } from "../../modules/notionDBType";

type NotionItemsProps = {
  data: NotionList;
};
const NotionItems = ({ data }: NotionItemsProps) => {
  const title = data.properties.Project.title[0].plain_text;
  const github = data.properties.github.url;
  const youtube = data.properties.youtube.url;
  const discription = data.properties.Description.rich_text[0].text.content;
  const imgSrc = data.cover?.external.url;
  return (
    <div className="flex flex-col m-3 bg-slate-700 rounded-xl">
      {imgSrc && (
        <Image
          className="rounded-t-xl"
          src={imgSrc}
          alt="cover image"
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="none"
          quality={100}
        />
      )}
      <h1>{title}</h1>
      <h3>{discription}</h3>
      <a href={github}>github 바로가기</a>
      <a href={youtube}>youtube 바로가기</a>
    </div>
  );
};

export default NotionItems;
