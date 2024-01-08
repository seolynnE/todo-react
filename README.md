**1.react-hook-form**
<br />
- form의 긴 코드를 간단하게 줄여주는 훅.
- const {register} = useForm(); : submit이나 value값을 준다. <br />
  <input onChange={onChange} value={toDo} placeholder="Write a to do" /> 이 코드를 만들기 위해 들어가는 변수들을 작성 할 필요 없이<br />
   <input {...register("toDo")} placeholder="Write a to do" />이 한줄로 끝내준다.
- const {watch} = useForm(); : form입력값들의 변화를 관찰할 수 있게 해주는 함수. 
<br /><br />
