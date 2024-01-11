import styled from "styled-components";
import { IToDo, toDoState } from "./iToDo";
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
  };

  return (
    <ToDoLi>
      <span>{text}</span>
      <div>
        {category !== "DOING" && (
          <button name="DOING" onClick={onClick}>
            Doing
          </button>
        )}
        {category !== "TO_DO" && (
          <button name="TO_DO" onClick={onClick}>
            To Do
          </button>
        )}
        {category !== "DONE" && (
          <button name="DONE" onClick={onClick}>
            Done
          </button>
        )}
      </div>
    </ToDoLi>
  );
}

export default ToDo;
