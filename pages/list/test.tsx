import React from "react";
import { atom, selector, useRecoilValue } from "recoil";
import { DATABASE_ID, TOKEN } from "../../config";

const currentUserIDState = atom({
  key: "CurrentUserID",
  default: 1,
});

const currentUserNameState = selector({
  key: "CurrentUserName",
  get: ({ get }) => {
    return "Alicia";
  },
});

const currentUserNameQuery = selector({
  key: "CurrentUserName",
  get: async ({ get }) => {
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
    const response = await fetch(
      `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
      options
    );

    if (response.error) {
      throw response.error;
    }
    return response.json();
  },
});

const CurrentUserInfo = () => {
  const userName = useRecoilValue(currentUserNameState);
  return <div>{userName}</div>;
};

export default CurrentUserInfo;
