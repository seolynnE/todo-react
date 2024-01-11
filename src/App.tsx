import React from "react";
import GlobalStyle from "./atom/GlobalStyle";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <>
      <GlobalStyle />
      <ToDoList />
    </>
  );
}

export default App;
