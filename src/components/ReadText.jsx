

const ReadText = ({ todosList }) => {
  const deleteItems = (index) => {
    todosList.setTodos(todosList.todos.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    todosList.setTodos(todosList.todos.map((todo, ind) => {
      if (index === ind) {
        return {
          ...todo,
          complete: !todo.complete ,
        };
      }else{
        return todo
      }
    }))
  };

  
  return (
    <>
      <div>
        {todosList.filteredTodo.map((todo, index) => {
          return (
            <div className="addItems">
              <p style={ todo.complete ? {textDecoration:"line-through",textDecorationColor:'black'} : {}} onClick={() => toggleComplete(index)}>{todo.text}</p>
              <button
                key={index}
                className="deletItem"
                onClick={() => deleteItems(index)}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ReadText;
