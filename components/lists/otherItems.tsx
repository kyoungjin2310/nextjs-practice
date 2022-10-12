import React, { useState, ChangeEvent, useRef } from "react";
import {
  atom,
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
  selector,
} from "recoil";

//type
type atomArray<T> = Array<T>;

export type TodoItem = {
  id: number;
  text: string;
  isComplete: boolean;
};

type TodoItemListProps = {
  key: number;
  item: TodoItem;
};

//atom
export const todoListState = atom<atomArray<TodoItem>>({
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

//todo create
export function TodoItemCreator() {
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

//todo list
export const TodoItems = ({ item }: TodoItemListProps) => {
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
            className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
          <label htmlFor={`${item.id}`}>{item.text}</label>
          <button onClick={() => onClick(item.text)}>수정</button>
        </div>
      )}
      {open && (
        <>
          <input
            type="text"
            value={inputValue}
            onChange={onChange}
            className="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
          <button onClick={() => editItemText(item.id)}>수정</button>
          <button onClick={onCancel}>취소</button>
        </>
      )}
      <button onClick={() => deleteItem(item.id)}>X</button>
    </li>
  );
};

export const TodoItemContainer = () => {
  const todoList = useRecoilValue(todoListState);
  return (
    <>
      {todoList.map((todoItem: TodoItem) => (
        <TodoItems key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
};

const todoListStatsState = selector({
  key: "todoListStatsState",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});

export function TodoListStats() {
  const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } =
    useRecoilValue(todoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted * 100);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
}

//filter
const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});

const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item: TodoItem) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item: TodoItem) => !item.isComplete);
      default:
        return list;
    }
  },
});

export function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(value);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={(e) => updateFilter(e)}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
}
