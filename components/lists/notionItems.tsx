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
  const tags = data.properties.Tag.multi_select;
  return (
    <div className="customCard">
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
      <div className="p-4 flex flex-col">
        <h1 className="text-2xl  font-bold">{title}</h1>
        <h2 className="mt-4 text-xl">{discription}</h2>
        <a href={github}>github 바로가기</a>
        <a href={youtube}>youtube 바로가기</a>
        <div className="flex items-start mt-2">
          {tags.map((tag) => (
            <h3
              className="px-2 py-1 mr-2 rounded-md bg-sky-200 dark:bg-sky-700 w-30"
              key={tag.id}
            >
              {tag.name}
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotionItems;
