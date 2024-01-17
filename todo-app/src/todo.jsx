import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function ToDo() {
  let [todo, setTodo] = useState([{ task: "sample task", id: uuidv4(), complete: false, priority: 0 }]);
  let [newtodo, setnewTodo] = useState("");
  let [priority, setpriority] = useState(0);
  let [edittask, setedittask] = useState(null);
  let [writingEditTask, setWritingEditTask] = useState("");

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

  function startedit(id, task) {
    setedittask(id);
    setWritingEditTask(task);
  }

  function saveEditing(id) {
    setTodo((prevTodo) =>
      prevTodo.map((t) =>
        t.id === id ? { ...t, task: writingEditTask } : t
      )
    );
    setedittask(null);
  }

  function stopediting() {
    setedittask(null);
  }

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
        {todo.map((t, index) => (
          <li key={t.id}>
            <button onClick={() => changepriority(index)}>&#8593;</button>
            &nbsp; &nbsp; &nbsp;
            <input
              type="checkbox"
              checked={t.complete}
              onChange={() => completetask(t.id)}
            />
            &nbsp; &nbsp; &nbsp;

            {edittask === t.id ? (
              <>
                <input
                  type="text"
                  value={writingEditTask}
                  onChange={(e) => setWritingEditTask(e.target.value)}
                />
                <button onClick={() => saveEditing(t.id)}>save</button>-
                <button onClick={stopediting}>cancel</button>
              </>
            ) : (
              <>
                <span style={{ color: t.complete ? 'green' : 'black' }}>
                  {t.task}
                </span>
                <button onClick={() => startedit(t.id, t.task)}>edit</button>
              </>
            )}
            &nbsp; &nbsp; &nbsp;
            <button onClick={() => deleteTodo(t.id)} style={{ color: 'red' }}>delete</button>
            <br /><br />
          </li>
        ))}
      </ul>
    </div>
  );
}
