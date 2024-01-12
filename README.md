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
  ``` const onSubmit = (data: IForm) => {<br />
    setValue("toDo", "");<br />
  } ```<br />
  이미 데이터를 넘겼는데도 input창에 아까 적은게 그대로 있는 킹받는 상황을 방지해주자<br />
- const {register} = useForm<IForm>({defaultValues} : {email: "@naver.com"}); : 이렇게 input 안에 필수값도 넣을 수 있다. (IForm 안에 email:string이 있는 상황)<br />
- const {watch} = useForm(); : form입력값들의 변화를 관찰할 수 있게 해주는 함수.<br />
- const {handleSubmit} = useForm(); :validation, 이벤트를 preventDefault 하는 것 을 담당<br />
  <form> 안에 onSubmit 넣는걸 잊지 말자!<br />
  const onSubmit = (data:IForm) => {}<br />
  <form onSubmit={handleSubmit(onSubmit)}><br />
- validate을 input 안에서 관리하는것도 가능하다.<br />
  ``` <input {...register("name", {<br />
    validate: (value) =><br />
      value.includes("lynn") ? "no lynn allowd" : true,<br />
  } /> ``` <br />
  이제 사람들은 lynn이라는 이름을 쓰지 못하게 됐다.<br />
  validate를 마구마구 만들 수도 있다.<br />
  ``` <input {...register("name", {<br />
    validate: {<br />
      noLynn: (value) =><br />
        value.includes("lynn") ? "no lynn allowd" : true,<br />
      noCat: (value) =><br />
        value.includes("cat") ? "no cat allowd" : true,<br />
  }} /> ```<br />
<br /><br />

**2.Recoil**
<br />
- atom의 값을 얻을 때 : useRecoilValue()
  atom의 값을 변경할 때 : useSetRecoilState() /react의 setState함수와 똑같이 동작한다.
<br /><br />

**3.onClick Event**
<br />
- 두 가지 방법이 있다.
- const onClick = (newCategory: IToDo["category"]) => {};  {category !== "DOING" && (<button onClick={() => onClick("DOING")>Doing</button>)} : 인자를 받는 함수를 직접 만들어, 새 익명 함수를 선언해 인자를 넘겨주는 방법
- const onClick = (event: React.MouseEvent<HTMLButtonElement>) => { const {currentTarget: {name}} = event;};  {category !== "DOING" && (<button name="DOING" onClick={onClick}>Doing</button>)} : name을 활용해 넘겨주는 방법
<br /><br />

**4.배열의 원소 교체**
<br />
- 원소 교체 이유 : 원소의 위치를 바꾸지 않으려고
- 1. 배열을 만들어주자
<br />
```
const color = ["red", "blue", "black", "orange", "white"];
```
<br />
여기서 blue를 지우고 pink로 바꾸고 싶다고 예시를 들어보자. ("추가"가 아니다.)
<br />
- 2. 배열을 두 개로 나눠준다. 
<br />
'blue'의 앞과 뒤로 나누는 거다. 예를 들면 이런식으로 만들어진다.
<br />
```
const front = ["red"];
<br />
const back = ["black", "orange", "white"];
<br />
const finalPart = [...front, "pink" , ...back];
```
<br />
여기서 '...front'의 '...'는  front 안에 있는 모든 원소를 풀어놓는다는 의미다.
<br />
만약 [front, "pink" , ...back] 이렇게 작성하면, 아래의 의미와 같다.
<br />
``` 
[["red"], "pink" , "black", "orange", "white"];
```
<br />
배열 안에 배열을 넣고싶은 것이 아니라면 "..."을 붙여주도록 하자.
<br />
하지만 이렇게 했는데 배열을 바꾸면 말짱 도로묵 아님? 맞음ㅎ; 이렇게 해보자
<br />
```
const color = ["red", "blue", "black", "orange", "white"];
<br />
const target = 1; // blue
color.slice(0, 1) // index 0부터 1이전까지 잘라줘! -> "red"
<br />
color.slice(target+1); // target에서 1을 더한 곳까지 잘라줘! -> "black", "orange", "white"
<br />
// 합쳐보자!
[...color.slice(0, target), "pink" , ...color.slice(target+1)]
```
<br />
요 방법을 활용해 To Do List의 버튼 클릭 시 변환되는 기능을 만들어 봤다.
