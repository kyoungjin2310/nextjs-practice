import React, { useState, ChangeEvent, useRef } from "react";
import Layout from "../../components/common/layout";
import {
  atom,
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
} from "recoil";

//type
type atomArray<T> = Array<T>;

type TodoItem = {
  id: number;
  text: string;
  isComplete: boolean;
};

type TodoItemListProps = {
  key: number;
  item: TodoItem;
};

//atom
const todoListState = atom<atomArray<TodoItem>>({
  key: "todoListState",
  default: [
    {
      id: 1,
      text: "blablabla",
      isComplete: false,
    },
    {
      id: 2,
      text: "blablabla2222",
      isComplete: false,
    },
    {
      id: 3,
      text: "blablabla3333",
      isComplete: false,
    },
  ],
});

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState<string>("");
  const setTodoList = useSetRecoilState<atomArray<TodoItem>>(todoListState);
  const addItemId = useRef<number>(4);
  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: addItemId.current + 1,
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
  };

  const onChange = (event: ChangeEvent) => {
    setInputValue((event.target as HTMLTextAreaElement).value);
  };
  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

const TodoItem = ({ key, item }: TodoItemListProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [todoList, setTodoList] =
    useRecoilState<atomArray<TodoItem>>(todoListState);
  const onChange = (event: ChangeEvent) => {
    setInputValue((event.target as HTMLTextAreaElement).value);
  };

  const onClick = () => {
    setOpen(true);
  };

  const editItemText = (id: number) => {
    setTodoList(
      todoList.map((user: TodoItem) =>
        user.id === id ? { ...user, text: inputValue } : user
      )
    );
    setOpen(false);
  };

  return (
    <li onClick={onClick}>
      {!open && item.text}
      {open && (
        <>
          <input type="text" value={inputValue} onChange={onChange} />
          <button onClick={() => editItemText(item.id)}>submit</button>
        </>
      )}
    </li>
  );
};

const OtherList = () => {
  const todoList = useRecoilValue(todoListState);
  return (
    <Layout title={"Other List"}>
      <>
        <h1>blabla</h1>
        <TodoItemCreator />
        {todoList.map((todoItem: TodoItem) => (
          <TodoItem key={todoItem.id} item={todoItem} />
        ))}
      </>
    </Layout>
  );
};

export default OtherList;
