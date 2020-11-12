
import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form.js';
import TodoList from './components/TodoList.js';

function App() {
 
  //state variables
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //RUN ONCE retrieve saved todos
  useEffect( () => {
    getTodosLocal();
  }, []);

   // USEEFFECT
   useEffect( () => {
     console.log(filteredTodos);
     console.log(status);
    filtered()
    saveTodosLocal();
    console.log(localStorage.getItem("todos"));
    }, [todos, status]);

    

    // Save list to local


     const saveTodosLocal= () => {
       localStorage.setItem("todos", JSON.stringify(todos));

    }

    const getTodosLocal = () => {
      if(localStorage.getItem("todos") === null) {
        localStorage.setItem("todos", JSON.stringify([]));
      } else {
        let todoLocal = JSON.parse(localStorage.getItem("todos"));
        setTodos(todoLocal);
      }
    }


  //functions
  const filtered = ()=> {
    switch(status) {
      case 'completed' :
        setFilteredTodos(todos.filter( todo => todo.completed === true));
        break;
      case 'uncompleted' :
        setFilteredTodos(todos.filter( todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Todo list </h1>
      </header>
      <Form 
      todos={todos} 
      setTodos= {setTodos} 
      setInputText={setInputText} 
      inputText={inputText} 
      setStatus={setStatus}
      
      />
      <TodoList 
      todos= {todos}
      setTodos={setTodos}
      filteredTodos = {filteredTodos}
       
        />
    </div>
  );
}

export default App;
