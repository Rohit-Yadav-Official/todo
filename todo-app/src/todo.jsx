import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
export default function ToDo(){
 let [todo,setTodo]=useState([{task: "sample task" ,id:uuidv4()}]);
 let [newtodo,setnewTodo]=useState("");
  
  let updatetodo=()=>{
    setTodo([...todo,{ task: newtodo, id: uuidv4() }]);
    setnewTodo("");
  };

 let updatetodovalue=(event)=>{
    setnewTodo(event.target.value);
 };
 let deleteTodo=(id)=>{
   let copy=setTodo((prevTodo) => prevTodo.filter((t) => t.id !== id));
   console.log(copy);
 };
return(<div>
    <h2>to-do</h2>
     <input type="text" placeholder="enter task" value={newtodo} onChange={updatetodovalue}/>
    
     
     <button type ="submit" onClick={updatetodo}> add+</button>
     
    <ul>
        {todo.map((todo)=>( 
            <li key={todo.id}>
                <span>{todo.task}</span>
                &nbsp; &nbsp; &nbsp;
                <button onClick={() => deleteTodo(todo.id)} >delete</button>
            
            
            </li>
            
            ))
        }
    </ul>

 </div>);

}