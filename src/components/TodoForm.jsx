import React, { useMemo, useState } from "react";
import ReadText from "./ReadText";

const TodoForm = () => {
  const storTodo =
    localStorage.getItem("todo") !== null
      ? JSON.parse(localStorage.getItem("todo"))
      : [];
  const [addText, setAddText] = useState({ id: "", text: "", complete: false });
  let [todos, setTodos] = useState(storTodo);
  const [todoToShow, setTodoToShow] = useState("All");
  const [toggleAllComplete,setToggleAllComplete] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((priv) => [...priv, addText]);
  };
  const removeCompleteTodos = () => {
    setTodos(todos.filter((todo) => !todo.complete));
  };

  localStorage.setItem("todo", JSON.stringify(todos));
  const handelUpdate = (show) => {
    setTodoToShow(show);
  };
  const filteredTodo = useMemo(() => {
    if (todoToShow === "Active") {
      return todos.filter((todo) => !todo.complete);
    } else if (todoToShow === "Complete") {
      return todos.filter((todo) => todo.complete);
    } else if (todoToShow === "All") {
      return todos;
    }
  }, [todoToShow,todos]);

  return (
    <>
      <section>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <input
              value={addText.text}
              onChange={(e) =>
                setAddText((prv) => ({ ...prv, text: e.target.value }))
              }
              type="text"
            />
            <button className="btn-add" onClick={handleSubmit}>
              add
            </button>
          </form>
          <ReadText todosList={{filteredTodo , todos, setTodos, addText, setAddText }} />
          {/* <ButtonUpdate showToDodos={todos}/> */}
      <div>
            <button
            className="btn-update btn"
            onClick={() => handelUpdate("All")}
          >
            All
          </button>
          <button
            className="btn-update btn"
            onClick={() => handelUpdate("Active")}
          >
            Active
          </button>
          <button
            className="btn-update btn"
            onClick={() => handelUpdate("Complete")}
          >
            complete
          </button>
      </div>
        {todos.some((todo)=>todo.complete)? <button className="btn-toggleTodos btn" onClick={removeCompleteTodos}>Remove all complete todos</button>:null}
        <button className="btn-toggleTodos btn" onClick={()=>{setTodos(
          todos.map((todo)=>({
           ...todo,
           complete: toggleAllComplete 
          }))
          
        )
        setToggleAllComplete(!toggleAllComplete)
      }
        }>Toggle all complete : {`${toggleAllComplete}`}</button>
        </div>
      </section>
    </>
  );
};

export default TodoForm;
