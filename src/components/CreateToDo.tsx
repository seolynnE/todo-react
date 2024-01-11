import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "./iToDo";
interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setValue("toDo", "");
    setToDos((oldToDos) => [
      { text: toDo, category: "TO_DO", id: Date.now() },
      ...oldToDos,
    ]);
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", {
          required: "할 일이..없으신가요...?있다면 작성해주세요🥺",
        })}
        placeholder="할 일"
      />
      {/* <span>{errors?.toDo?.message as string}</span> */}
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
