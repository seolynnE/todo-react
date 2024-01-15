import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "./iToDo";
import styled from "styled-components";

const FormWrap = styled.form`
  display: flex;
  input {
    width: -webkit-fill-available;
    border: none;
    border-bottom: 1px solid #fff;
    background-color: inherit;
    color: #fff;
    font-size: 20px;
  }
  button {
    border: 1px solid #fff;
    color: #fff;
    font-size: 22px;
    &:hover {
      background-color: #fff;
      color: ${(props) => props.theme.bgColor};
    }
  }
`;
interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setValue("toDo", "");
    setToDos((oldToDos) => [
      { text: toDo, category, id: Date.now() },
      ...oldToDos,
    ]);
  };
  return (
    <FormWrap onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", {
          required: "할 일이..없으신가요...?있다면 작성해주세요🥺",
        })}
        placeholder="할 일"
      />
      {/* <span>{errors?.toDo?.message as string}</span> */}
      <button>Add</button>
    </FormWrap>
  );
}

export default CreateToDo;
