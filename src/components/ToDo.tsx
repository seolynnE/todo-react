import React from "react";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "./iToDo";
import { useSetRecoilState } from "recoil";

const ToDoLi = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #616161;
  font-size: 18px;
  span {
    width: calc(100% - 158px);
  }
  .btn-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: 4px;
    button {
      border: 1px solid #fff;
      background-color: inherit;
      color: #fff;
      &:hover {
        background-color: #fff;
        color: ${(props) => props.theme.bgColor};
      }
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
  const onDelete = () => {
    setToDos((oldToDos) => oldToDos.filter((toDo) => toDo.id !== id));
  };

  return (
    <ToDoLi>
      <span>{text}</span>
      <div className="btn-wrap">
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
        <button onClick={onDelete}>Delete</button>
      </div>
    </ToDoLi>
  );
}

export default ToDo;
