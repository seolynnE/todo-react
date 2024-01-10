import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";
import styled from "styled-components";

const TodoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 60px 40px;
  form {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;

interface IForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setValue("toDo", "");
    setToDos((oldToDos) => [
      { text: toDo, category: "TO_DO", id: Date.now() },
      ...oldToDos,
    ]);
  };
  return (
    <TodoWrap>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", {
            required: "할 일이..없으신가요...?있다면 작성해주세요🥺",
          })}
          placeholder="할 일"
        />
        <span>{errors?.toDo?.message as string}</span>
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </TodoWrap>
  );
}
export default ToDoList;
