import React from 'react'
import Todo from './Todo'
import {useState, useEffect} from 'react'

const alltodos = [
    {"description": "Einkaufen", done: true},
    {"description": "Sport", done: false},
    {"description": "Programmieren", done: false},
];

const TodoList = () => {

    const [opencount, CountOpenTodos] = useState(0);
    const [todos, setTodos] = useState(alltodos);

    const countOpen = () => {
        const donetodos = todos.filter((item) => {
            return !item.done
        })
        CountOpenTodos(donetodos.length);
    };

    const changeTodo = (index) => {
        const newTodos = [...todos]
        if(newTodos[index].done){
            newTodos[index].done=false;
        } else {
            newTodos[index].done=true;
        }
        setTodos(newTodos);
    }

    useEffect(() =>{
        countOpen();
    },[opencount]);

  return (
    <div className = "shadow-sm hover:shadow-lg">
        <div className="text-center bg-gray-900 text-white text-3xl -py-4 font-semibold">
        <h1 className="text-3xl">Unsere Todos</h1>
        <h2 className="text-lg">Offende Todos: {opencount}</h2>
        </div>
        
        {todos.map((item, index) => {
        return<Todo 
        description={item.description}
        done={item.done}
        key={index}
        index={index}
        onChangeTodo={changeTodo}
        ></Todo>
        })}
    </div>
  )
}

export default TodoList