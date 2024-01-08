**1.react-hook-form**
<br />
- form의 긴 코드를 간단하게 줄여주는 훅.<br />
- const {register} = useForm(); : submit이나 value값을 준다. <br />
  ❕ <input onChange={onChange} value={toDo} placeholder="Write a to do" /> 이 코드를 만들기 위해 들어가는 변수들을 작성 할 필요 없이<br />
    <input {...register("toDo")} placeholder="Write a to do" />이 한줄로 끝내준다.<br />
  ❕ required를 register 안에 넣어주면 작성하지 않은 인풋이 있을 시 자동으로 focus되게 해준다. <input {...register("email", {required: true})} /><br />
    이뿐만이 아니라 minLength도 바로 설정이 가능하다. <input {...register("email", {required: true, minLength: 10})} /> 이렇게 간단히 써주는 것 만으로 코드를 크게 줄일 수 있다. <br />
- const {formState} = useForm(); : form 안의 error를 확인할 수 있고, 에러에 따른 메세지 설정 등등 여러 설정을 할 수 있다.<br />
  ❕ 메세지 설정 : <input {...register("email", {required: "This is required", minLength: {value: 6, message: "too short",}})} /> <br />
  ❕ 정규식 패턴 : <input {...register("email", {required: "This is required", pattern: /^[A-Za-z0-9._%+-]+@naver.com$/})} /><br />
  ❕ const {formState: {errors} = useForm();이제 에러 메세지를 {errors?.email?.message as string}으로 UI에 나타내주자<br />
- const {setError} = useForm<IForm>(); : 에러를 설정할 수 있다. (IForm 안에 password와 passwordCheck 가 있는 상황)<br />
  const onValid = (data: IForm) => {<br />
    if(data.password !== data.passwordCheck){<br />
      setError("passwordCheck", {message: "not same"}, {souldFocus: true);<br />
    }<br />
  }<br />
  이렇게 해주면 password와 일치하지 않을 때 메세지가 뜨며 커서가 passwordCheck부분으로 이동된다.<br />
- const {setValue} = useForm<IForm>(); (IForm 안에 toDo가 있는 상황)<br />
  value도 막 조종할 수 있다.<br />
  const onSubmit = (data: IForm) => {<br />
    setValue("toDo", "");<br />
  }<br />
  이미 데이터를 넘겼는데도 input창에 아까 적은게 그대로 있는 킹받는 상황을 방지해주자<br />
- const {register} = useForm<IForm>({defaultValues} : {email: "@naver.com"}); : 이렇게 input 안에 필수값도 넣을 수 있다. (IForm 안에 email:string이 있는 상황)<br />
- const {watch} = useForm(); : form입력값들의 변화를 관찰할 수 있게 해주는 함수.<br />
- const {handleSubmit} = useForm(); :validation, 이벤트를 preventDefault 하는 것 을 담당<br />
  <form> 안에 onSubmit 넣는걸 잊지 말자!<br />
  const onSubmit = (data:IForm) => {}<br />
  <form onSubmit={handleSubmit(onSubmit)}><br />
- validate을 input 안에서 관리하는것도 가능하다.<br />
  <input {...register("name", {<br />
    validate: (value) =><br />
      value.includes("lynn") ? "no lynn allowd" : true,<br />
  } /><br />
  이제 사람들은 lynn이라는 이름을 쓰지 못하게 됐다.<br />
  validate를 마구마구 만들 수도 있다.<br />
  <input {...register("name", {<br />
    validate: {<br />
      noLynn: (value) =><br />
        value.includes("lynn") ? "no lynn allowd" : true,<br />
      noCat: (value) =><br />
        value.includes("cat") ? "no cat allowd" : true,<br />
  }} /><br />
<br /><br />
