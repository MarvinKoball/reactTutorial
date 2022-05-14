import React from 'react'
import Todo from './Todo'
import {useState, useEffect} from 'react'


const TodoList = () => {

    const [opencount, CountOpenTodos] = useState(0);
    const [todos, setTodos] = useState(() =>{
        const items =localStorage.getItem("items");
        const parsed =JSON.parse(items);
        return parsed || [];
    } 
    );
    const [textinput, settextinput] =  useState("")

    const changeText = (e) =>{
        settextinput(e.target.value);
    }

    const submit = (e) =>{
        e.preventDefault();
        const newTodos =[...todos, {description : textinput, done: false}];
        setTodos(newTodos);
        settextinput("");
    }

    const countOpen = () => {
        const donetodos = todos.filter((item) => {
            return !item.done
        })
        CountOpenTodos(donetodos.length);
    };

    const changeTodo = (index) => {
        const newTodos = [...todos];
        if(newTodos[index].done){
            newTodos[index].done=false;
        } else {
            newTodos[index].done=true;
        }
        setTodos(newTodos);
    };

    const  deleteTodo = (index) =>{
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos)
    }

    useEffect(() =>{
        countOpen();
        localStorage.setItem("items",JSON.stringify(todos));
    },[todos]);

  return (
    <div className = "shadow-sm hover:shadow-lg">
        <div className="text-center bg-gray-900 text-white text-3xl -py-4 font-semibold">
        <h1 className="text-3xl">Unsere Todos</h1>
        <h2 className="text-lg">Offende Todos: {opencount}</h2>
        <form>
           <input 
           onChange={changeText}
           type ="text"
           value ={textinput} 
           placeholder="neues Todo..." 
           className='col-span-2  text-gray-900'></input> 
           <input 
           onClick={submit}
           type="submit" 
           value="Add Todo" 
           className='col-span-2 text-gray-900 bg-gray-100 py-0.5 px-5 cursor-pointer' ></input>
        </form>
        </div>
        
        {todos.map((item, index) => {
        return<Todo 
        description={item.description}
        done={item.done}
        key={index}
        index={index}
        onChangeTodo={changeTodo}
        onDeleteTodo={deleteTodo}
        ></Todo>
        })}
    </div>
  )
}

export default TodoList