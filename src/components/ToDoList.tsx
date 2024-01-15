import React from "react";
import { selector, useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import CreateToDo from "./CreateToDo";
import { Categories, categoryState, toDoSelector, toDoState } from "./iToDo";
import ToDo from "./ToDo";

const TodoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 60px 40px;
  h1 {
    text-align: center;
    margin-bottom: 40px;
    font-size: 32px;
  }
  select {
    width: 200px;
    padding: 4px;
    margin-bottom: 12px;
    border: 1px solid #fff;
    background-color: inherit;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    option {
      padding: 2px;
      background-color: #303030;
      color: #fff;
      cursor: pointer;
    }
  }
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  return (
    <TodoWrap>
      <h1>To Do List</h1>
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </TodoWrap>
  );
}
export default ToDoList;
