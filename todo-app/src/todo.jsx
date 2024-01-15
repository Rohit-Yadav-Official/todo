import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
export default function ToDo() {
  let [todo, setTodo] = useState([{ task: "sample task", id: uuidv4(), complete: false }]);
  let [newtodo, setnewTodo] = useState("");

  let updatetodo = () => {
    setTodo([...todo, { task: newtodo, id: uuidv4(), complete: false }]);
    setnewTodo("");
  };

  let updatetodovalue = (event) => {
    setnewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    setTodo((prevTodo) => prevTodo.filter((t) => t.id !== id));
  };

  let completetask = (id) => {
    setTodo((prevTodo) =>
      prevTodo.map((t) =>
        t.id === id ? { ...t, complete: !t.complete } : t
      )
    );
  };

  return (
    <div>
      <h2>to-do</h2>
      <input
        type="text"
        placeholder="enter task"
        value={newtodo}
        onChange={updatetodovalue}
      />
      &nbsp; &nbsp; &nbsp;
      <button type="submit" onClick={updatetodo}>
        add+
      </button>
      <ul>
        {todo.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => completetask(todo.id)}
            />
            &nbsp; &nbsp; &nbsp;
            <span style={{ color: todo.complete ? 'green' : 'black' }}>
              {todo.task}
            </span>
            &nbsp; &nbsp; &nbsp;
            <button onClick={() => deleteTodo(todo.id)} style={{color:'red'}}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
