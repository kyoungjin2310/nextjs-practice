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
      <button onClick={addItem}>추가</button>
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

  //li click
  const onClick = (text: string) => {
    setInputValue(text);
    setOpen(true);
  };

  //edit
  const editItemText = (id: number) => {
    setTodoList(
      todoList.map((todo: TodoItem) =>
        todo.id === id ? { ...todo, text: inputValue } : todo
      )
    );
    setOpen(false);
    setInputValue("");
  };

  const handleToggle = (id: number) => {
    setTodoList(
      todoList.map((todo: TodoItem) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  //취소
  const onCancel = () => {
    setOpen(false);
  };

  //delete
  const deleteItem = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <li>
      {!open && (
        <div className={item.isComplete ? `${"check"}` : undefined}>
          <input
            type="checkbox"
            onChange={() => handleToggle(item.id)}
            id={`${item.id}`}
          />
          <label htmlFor={`${item.id}`}>{item.text}</label>
          <button onClick={() => onClick(item.text)}>수정</button>
        </div>
      )}
      {open && (
        <>
          <input type="text" value={inputValue} onChange={onChange} />
          <button onClick={() => editItemText(item.id)}>수정</button>
          <button onClick={onCancel}>취소</button>
        </>
      )}
      <button onClick={() => deleteItem(item.id)}>X</button>
    </li>
  );
};

const OtherList = () => {
  const todoList = useRecoilValue(todoListState);
  return (
    <Layout title={"Other List"}>
      <>
        <h1>todo List</h1>
        <TodoItemCreator />
        {todoList.map((todoItem: TodoItem) => (
          <TodoItem key={todoItem.id} item={todoItem} />
        ))}
      </>
    </Layout>
  );
};

export default OtherList;
