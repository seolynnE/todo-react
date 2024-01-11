import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const TodoWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  padding: 60px 40px;
  form {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;
// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(toDo);
//   };
//   return (
//     <>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write a to do" />
//         <button>Add</button>
//       </form>
//     </>
//   );
// }

interface IForm {
  toDo: string;
  email: string;
  firstName: string;
  lastName?: string;
  password: string;
  passwordCheck: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({ defaultValues: { email: "@naver.com" } });
  const onValid = (data: IForm) => {
    if (data.password !== data.passwordCheck) {
      setError(
        "passwordCheck",
        { message: "비밀번호가 틀려요!" },
        { shouldFocus: true }
      );
      console.log("it work");
    }
    // setError("extraError", { message: "server offline" });
  };
  console.log(errors);
  return (
    <TodoWrap>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", {
            required: "할 일을 작성해 주세요😥",
          })}
          placeholder="Write a to do"
        />
        <span>{errors?.toDo?.message as string}</span>
        <input
          {...register("email", {
            required: "이메일을 입력해 주세요",
            minLength: { value: 6, message: "too short" },
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "이메일은 naver만 가능합니다",
            },
          })}
        />
        <span>{errors?.email?.message as string}</span>
        <input
          {...register("firstName", {
            required: "성함을 입력해 주세요",
          })}
          placeholder="First name"
        />
        <span>{errors?.firstName?.message as string}</span>
        <input {...register("lastName")} placeholder="Last name" />
        <input
          {...register("password", {
            required: "비밀번호를 입력해 주세요",
            minLength: { value: 6, message: "6글자 이상 입력해 주세요" },
          })}
          placeholder="Pw"
        />
        <span>{errors?.password?.message as string}</span>
        <input
          {...register("passwordCheck", {
            required: "올바른 비밀번호를 입력해 주세요",
          })}
          placeholder="Pw Check"
        />
        <span>{errors?.passwordCheck?.message as string}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </TodoWrap>
  );
}
export default ToDoList;
