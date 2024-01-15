import React from "react";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "./iToDo";
import { useSetRecoilState } from "recoil";

const ToDoLi = styled.li`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-size: 18px;
  span {
    width: calc(100% - 158px);
  }
  button {
    margin-left: 4px;
    border: 1px solid #fff;
    background-color: inherit;
    color: #fff;
    &:hover {
      background-color: #fff;
      color: ${(props) => props.theme.bgColor};
    }
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <ToDoLi>
      <span>{text}</span>
      <div>
        {category !== Categories.DOING && (
          <button name={Categories.DOING} onClick={onClick}>
            Doing
          </button>
        )}
        {category !== Categories.TO_DO && (
          <button name={Categories.TO_DO} onClick={onClick}>
            To Do
          </button>
        )}
        {category !== Categories.DONE && (
          <button name={Categories.DONE} onClick={onClick}>
            Done
          </button>
        )}
      </div>
    </ToDoLi>
  );
}

export default ToDo;
