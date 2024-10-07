// "use client"
// import { React, useRef, useState ,useEffect} from 'react'
// import Navbar from '@/components/Navbar';
// import { v4 as uuidv4 } from 'uuid';
// import { FaRegEdit } from "react-icons/fa";
// import { MdDelete } from 'react-icons/md';

// function App() {
//   const [Todo, setTodo] = useState("Add a todo...");
//   const [todos, setTodos] = useState([]);
//   const [showFinished, SetshowFinished] = useState(true);
//   useEffect(() => {
//     const newTodos = JSON.parse(localStorage.getItem("todos"))
//     if(newTodos){
//       setTodos(newTodos)
//     }
//     return () => {
//     };
//   }, []);  
//   const saveToLS = () =>{
//     localStorage.setItem("todos",JSON.stringify(todos));
//   }
//   const handleAdd = (e) => {
//     setTodos([...todos, {id:uuidv4(), Todo, isCompleted: false }])
//     setTodo("Add a todo...");
//     saveToLS();
//   }
//   const handleEdit = (e) => {
//     let newTodo = todos.filter(item => item.id == e.target.name);
//     setTodo(newTodo[0].Todo);
//     handleRemove(e);
//     saveToLS();
//   }
//   const handleRemove = (e) => {
//     let id = e.target.name;
//     let newTodo = todos.filter(item => item.id != id)
//     setTodos(newTodo)
//     saveToLS();
//   }
//   const handleInput = (e) => {
//     setTodo(e.target.value);
//   }
//   const handleCheckbox = (e)  => {
//     let id = e.target.name;
//     let idx = todos.findIndex(items=>items.id==id);
//     let newTodos = [...todos];
//     newTodos[idx].isCompleted = !todos[idx].isCompleted;
//     setTodos(newTodos);
//     saveToLS();
//   }
  
//   const handlFocus = e => {
//     if (e.target.value == "Add a todo...") {
//       setTodo("");
//     }
//     console.log("focus");

//   }
//   const handleBlur = (e) => {
//     if (e.target.value === "") {
//       setTodo("Add a todo...");
//     }
//   };
//   const handleshowFinished= (e) => {
//     SetshowFinished(!showFinished)
//   }
  
//   return (
//     <div>
//       <Navbar/>
//       <div className="container w-screen md:w-4/5 h-4/6 rounded-xl mx-auto my-5 pt-7 bg-violet-400 min-h-[80vh]">
//         <div className="logo text-center font-bold text-white text-2xl font-serif ">
//           <h1>Add a Todo</h1>
//           <input type="text" value={Todo} className='text-black max-w-[45vw]' onChange={handleInput} onFocus={handlFocus} onBlur={handleBlur} /> <button className='bg-green-500 rounded-lg p-1 text-xl' onClick={handleAdd} >Add</button>
//         </div>
//         <div className="body bg-violet-400 mt-5">
//           <div className="logo1 text-center font-bold text-white text-2xl font-serif">Your Todos</div>
//           <input type="checkbox" name="" id="" checked={showFinished} onChange={handleshowFinished} className='ml-5 mr-2'/><span className='font-semibold'>Show Finished</span>
//           <div className="todos mt-5">
//             {todos.length === 0 && <div className='mx-auto text-xl font-semibold text-center'> No Todos to display!</div>}
//           {todos.map(items=>{
//             return (showFinished || !items.isCompleted) && ((<div className="todo flex md:justify-around gap-6 my-2 font-medium justify-between px-4" key={items.id}>
//               <div className='flex  flex-start gap-2 min-w-[36%] max-w-[50%]'>
//                 <input type="checkbox" name={items.id} id="" checked={items.isCompleted} onChange={handleCheckbox} />
//               <div className={items.isCompleted? "text line-through":"text"}>{items.Todo}</div>
//               </div>
//               <div className='flex'>
//               <button className='bg-green-500 rounded-md px-1 max-h-6' onClick={handleEdit} name={items.id}><FaRegEdit style={{pointerEvents:'none'}} className='w-6 h-6' /></button>
//               <button className='bg-green-500 rounded-md px-1 mx-2 max-h-6'onClick={handleRemove} name={items.id}><MdDelete style={{pointerEvents:'none'}} className='w-6 h-6'/> </button>
//               </div>
//             </div>))
//           })}
//         </div>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default App
"use client"
import { React, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';
import Navbar from '@/components/Navbar';

function App() {
  const [Todo, setTodo] = useState("Add a todo...");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [priority, setPriority] = useState("Low"); // Default priority is "Low"
  const [todos, setTodos] = useState([]);
  const [showFinished, SetshowFinished] = useState(true);

  useEffect(() => {
    const newTodos = JSON.parse(localStorage.getItem("todos"));
    if (newTodos) {
      setTodos(newTodos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    if (startTime && endTime) {
      const newTodo = {
        id: uuidv4(),
        Todo,
        startTime,
        endTime,
        priority,
        isCompleted: false,
        isOverdue: false,
      };
      setTodos([...todos, newTodo]);
      setTodo("Add a todo...");
      setStartTime("");
      setEndTime("");
      setPriority("Low"); // Reset priority after adding a task
      saveToLS();
    }
  };

  const handleEdit = (e) => {
    let newTodo = todos.filter(item => item.id === e.target.name);
    setTodo(newTodo[0].Todo);
    setStartTime(newTodo[0].startTime);
    setEndTime(newTodo[0].endTime);
    setPriority(newTodo[0].priority);
    handleRemove(e);
    saveToLS();
  };

  const handleRemove = (e) => {
    let id = e.target.name;
    let newTodo = todos.filter(item => item.id !== id);
    setTodos(newTodo);
    saveToLS();
  };

  const handleInput = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let idx = todos.findIndex(items => items.id === id);
    let newTodos = [...todos];
    newTodos[idx].isCompleted = !todos[idx].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  const handleShowFinished = () => {
    SetshowFinished(!showFinished);
  };

  // Check overdue tasks based on time
  useEffect(() => {
    const checkOverdueTasks = () => {
      const currentTime = new Date();
      const updatedTodos = todos.map(task => {
        const taskEndTime = new Date();
        const [endHour, endMinutes] = task.endTime.split(':');
        taskEndTime.setHours(endHour);
        taskEndTime.setMinutes(endMinutes);

        if (!task.isCompleted && taskEndTime < currentTime) {
          return { ...task, isOverdue: true };
        }
        return { ...task, isOverdue: false };
      });
      setTodos(updatedTodos);
      saveToLS();
    };

    const interval = setInterval(checkOverdueTasks, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [todos]);

  return (
    <div className='bg-gray-100 h-screen'>
      <Navbar/>
      <div className="container containerTodo w-screen md:w-4/5 h-4/6 rounded-xl mx-auto my-5 pt-7  min-h-[80vh]">
        <div className="logo text-center font-bold text-black text-2xl font-serif">
          <h1>Add a Todo</h1>
          <input type="text" value={Todo} className='text-black max-w-[50vw] font-light text-xl min-w-[40vw] h-7 rounded-md px-3 BorderCSS' onChange={handleInput} onFocus={() => setTodo("")} onBlur={(e) => e.target.value === "" && setTodo("Add a todo...")} />
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} placeholder="Start Time" className="ml-2 text-black h-7 rounded-md px-3 BorderCSS" />
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} placeholder="End Time" className="ml-2 text-black h-7 rounded-md px-3 BorderCSS" />
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="ml-2 text-black font-thin text-xl h-7 rounded-md px-3 BorderCSS">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button className='bg-black rounded-lg text-xl ml-2 font-normal px-2 text-white' onClick={handleAdd}>Add</button>
        </div>
        <div className="body  mt-5">
          <div className="logo1 text-center font-bold text-black text-2xl font-serif">Your Todos</div>
          <input type="checkbox" checked={showFinished} onChange={handleShowFinished} className='ml-5 mr-2' /><span className='font-semibold'>Show Finished</span>
          <div className="todos mt-5">
            {todos.length === 0 && <div className='mx-auto text-xl font-semibold text-center'> No Todos to display!</div>}
            <table className='table-auto w-full text-black'>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Task</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Priority</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {todos.map(items => {
                  const taskClass = `${items.isCompleted ? 'line-through text-center' : 'text-center'} ${items.isOverdue ? 'text-red-600' : 'text-black'}`;
                  return (showFinished || !items.isCompleted) && (
                    <tr key={items.id} className=''>
                      <td className='text-center'><input type="checkbox" name={items.id} checked={items.isCompleted} onChange={handleCheckbox} /></td>
                      <td  className={taskClass}>{items.Todo}</td>
                      <td className='text-center'>{items.startTime}</td> 
                      <td className='text-center'>{items.endTime}</td>
                      <td className='text-center'>{items.priority}</td>
                      <td className='text-center'>
                        <button className=' rounded-md px-1 max-h-6' onClick={handleEdit} name={items.id}><FaRegEdit style={{ pointerEvents: 'none' }} className='w-6 h-6' /></button>
                        <button className=' rounded-md px-1 mx-2 max-h-6' onClick={handleRemove} name={items.id}><MdDelete style={{ pointerEvents: 'none' }} className='w-6 h-6' /> </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
