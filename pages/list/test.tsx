import React from "react";
import { atom, selector, useRecoilValue } from "recoil";

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

const CurrentUserInfo = () => {
  const userName = useRecoilValue(currentUserNameState);
  return <div>{userName}</div>;
};

export default CurrentUserInfo;
