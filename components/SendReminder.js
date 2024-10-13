"use client"
import React from 'react'
import {useState,useEffect} from "react"
function sendReminders() {
    const [todos, setTodos] = useState();
    useEffect(() => {
        const newTodos = JSON.parse(localStorage.getItem("todos"));
        if (newTodos) {
          setTodos(newTodos);
        }
      }, []);
    
      const saveToLS = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
      };
    useEffect(() => {
        const checkOverdueTasks = () => {
          const currentTime = new Date();
          const updatedTodos = todos.map(task => {
            const taskEndTime = new Date();
            const [endHour, endMinutes] = task.endTime.split(':');
            taskEndTime.setHours(endHour);
            taskEndTime.setMinutes(endMinutes);
    
            if (!task.isCompleted && taskEndTime < currentTime) {
              if (task.priority === "High" && Notification.permission === "granted") {
                // Send a notification if the task is high priority
                new Notification("Task Overdue", {
                  body: `Your high-priority task "${task.Todo}" is overdue!`,
                  icon: "/newLogo.png", 
                });
                Notification.onclick = function () {
                  // Redirect to the desired website
                  window.open("http://localhost:3000/todo", "_self");
                };
              }
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
    <div>
    </div>
  )
}

export default sendReminders
