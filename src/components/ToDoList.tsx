import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import CreateToDo from "./CreateToDo";
import { toDoState } from "./iToDo";
import ToDo from "./ToDo";

const TodoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 60px 40px;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoState);

  return (
    <TodoWrap>
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </TodoWrap>
  );
}
export default ToDoList;
