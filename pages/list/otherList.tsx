import React from "react";
import { useRecoilValue } from "recoil";
import Layout from "../../components/common/layout";
import {
  TodoItem,
  TodoItemContainer,
  TodoItemCreator,
  TodoListFilters,
  TodoListStats,
} from "../../components/lists/otherItems";

//container
const OtherList = () => {
  return (
    <Layout title={"Other List"}>
      <>
        <h1>todo List</h1>
        <TodoItemCreator />
        <TodoItemContainer />
        <TodoListFilters />
        <TodoListStats />
      </>
    </Layout>
  );
};

export default OtherList;
