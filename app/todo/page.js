"use client"
import { React, useRef, useState ,useEffect} from 'react'
import Navbar from '@/components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';

function App() {
  const [Todo, setTodo] = useState("Add a todo...");
  const [todos, setTodos] = useState([]);
  const [showFinished, SetshowFinished] = useState(true);
  useEffect(() => {
    const newTodos = JSON.parse(localStorage.getItem("todos"))
    if(newTodos){
      setTodos(newTodos)
    }
    return () => {
    };
  }, []);  
  const saveToLS = () =>{
    localStorage.setItem("todos",JSON.stringify(todos));
  }
  const handleAdd = (e) => {
    setTodos([...todos, {id:uuidv4(), Todo, isCompleted: false }])
    setTodo("Add a todo...");
    saveToLS();
  }
  const handleEdit = (e) => {
    let newTodo = todos.filter(item => item.id == e.target.name);
    setTodo(newTodo[0].Todo);
    handleRemove(e);
    saveToLS();
  }
  const handleRemove = (e) => {
    let id = e.target.name;
    let newTodo = todos.filter(item => item.id != id)
    setTodos(newTodo)
    saveToLS();
  }
  const handleInput = (e) => {
    setTodo(e.target.value);
  }
  const handleCheckbox = (e)  => {
    let id = e.target.name;
    let idx = todos.findIndex(items=>items.id==id);
    let newTodos = [...todos];
    newTodos[idx].isCompleted = !todos[idx].isCompleted;
    setTodos(newTodos);
    saveToLS();
  }
  
  const handlFocus = e => {
    if (e.target.value == "Add a todo...") {
      setTodo("");
    }
    console.log("focus");

  }
  const handleBlur = (e) => {
    if (e.target.value === "") {
      setTodo("Add a todo...");
    }
  };
  const handleshowFinished= (e) => {
    SetshowFinished(!showFinished)
  }
  
  return (
    <div>
      <Navbar/>
      <div className="container w-screen md:w-4/5 h-4/6 rounded-xl mx-auto my-5 pt-7 bg-violet-400 min-h-[80vh]">
        <div className="logo text-center font-bold text-white text-2xl font-serif ">
          <h1>Add a Todo</h1>
          <input type="text" value={Todo} className='text-black max-w-[45vw]' onChange={handleInput} onFocus={handlFocus} onBlur={handleBlur} /> <button className='bg-green-500 rounded-lg p-1 text-xl' onClick={handleAdd} >Add</button>
        </div>
        <div className="body bg-violet-400 mt-5">
          <div className="logo1 text-center font-bold text-white text-2xl font-serif">Your Todos</div>
          <input type="checkbox" name="" id="" checked={showFinished} onChange={handleshowFinished} className='ml-5 mr-2'/><span className='font-semibold'>Show Finished</span>
          <div className="todos mt-5">
            {todos.length === 0 && <div className='mx-auto text-xl font-semibold text-center'> No Todos to display!</div>}
          {todos.map(items=>{
            return (showFinished || !items.isCompleted) && ((<div className="todo flex md:justify-around gap-6 my-2 font-medium justify-between px-4" key={items.id}>
              <div className='flex  flex-start gap-2 min-w-[36%] max-w-[50%]'>
                <input type="checkbox" name={items.id} id="" checked={items.isCompleted} onChange={handleCheckbox} />
              <div className={items.isCompleted? "text line-through":"text"}>{items.Todo}</div>
              </div>
              <div className='flex'>
              <button className='bg-green-500 rounded-md px-1 max-h-6' onClick={handleEdit} name={items.id}><FaRegEdit style={{pointerEvents:'none'}} className='w-6 h-6' /></button>
              <button className='bg-green-500 rounded-md px-1 mx-2 max-h-6'onClick={handleRemove} name={items.id}><MdDelete style={{pointerEvents:'none'}} className='w-6 h-6'/> </button>
              </div>
            </div>))
          })}
        </div>
      </div>
    </div>
    </div>
  )
}

export default App
