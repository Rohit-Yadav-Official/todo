import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function ToDo() {
  let [todo, setTodo] = useState([{ task: "sample task", id: uuidv4(), complete: false, priority: 0 }]);
  let [newtodo, setnewTodo] = useState("");
  let [priority, setpriority] = useState(0);

  let updatetodo = () => {
    setTodo([...todo, { task: newtodo, id: uuidv4(), complete: false, priority }]);
    setnewTodo("");
  };

  let updatetodovalue = (event) => {
    setnewTodo(event.target.value);
  };

  let incpriority = () => {
    setpriority(priority + 1);
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

  let changepriority = (index) => {
    if (index > 0 && index < todo.length) {
      let prev = todo[index - 1];
      let curr = todo[index];
      let updatedTodo = [...todo];
      updatedTodo[index - 1] = curr;
      updatedTodo[index] = prev;
      setTodo(updatedTodo);
    }
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
      <button type="submit" onClick={() => { updatetodo(); incpriority(); }}>
        add+
      </button>
      <ul>
        {todo.map((todo, index) => (
          <li key={todo.id}>
            <button onClick={() => changepriority(index)}>&#8593;</button>
            &nbsp; &nbsp; &nbsp;
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
            <button onClick={() => deleteTodo(todo.id)} style={{ color: 'red' }}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
