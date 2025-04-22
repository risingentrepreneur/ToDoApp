"use client";

import { useState } from "react";
import TaskWithHeadline from "./taskWithHeadline";
import { TaskObj } from "@/interfaces/taskObject";


export default function InputField() {
    
    const [tasksList, setTasksList] = useState<TaskObj[]>([]);
    const [inputHeadline, setInputHeadline] = useState<string>("");
    
    const addHeadline = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault(); //if (!inputHeadline.trim()) return;
        setTasksList(prev => [...prev,{[inputHeadline]:[]}]);
        setInputHeadline(""); 
    }
    
    const deleteHeadline=(indexToRenmove:number)=>{
        setTasksList(prev => prev.filter((_,index) =>index!==indexToRenmove));
    };
   
   
    const addTaskToHeadline = ( headline: string, task: string ) => {
        setTasksList( prev => (
                prev.map( taskWithHeadline => taskWithHeadline[headline] 
                    ? { [headline]: [...taskWithHeadline[headline], task] } 
                    : taskWithHeadline 

                )
            )
        )
    };

    const deleteTask = (headline: string, taskIndex: number) => {
        setTasksList(prev => prev.map(taskWithHeadline => {
                if (taskWithHeadline[headline]) {
                    const updatedTasks = taskWithHeadline[headline].filter((_, index1) => index1 !== taskIndex);
                    return { [headline]: updatedTasks };
                } return taskWithHeadline;
            })
        )
    };

    const updateHeadline = (index: number, newHeadline: string) => {
        setTasksList(prev =>
            prev.map((item, index1) => {
                if (index1 === index) {
                    const oldHeadline = Object.keys(item)[0];
                    const tasks = item[oldHeadline];
                    return { [newHeadline]: tasks };
                }
                return item;
            })
        );
    };

    const updateTask = (headline: string, taskIndex: number, newText: string) => {
        setTasksList(prev =>
            prev.map(taskWithHeadline => {
                if (taskWithHeadline[headline]) {
                    const updatedTasks = [...taskWithHeadline[headline]];
                    updatedTasks[taskIndex] = newText;
                    return { [headline]: updatedTasks };
                }
                return taskWithHeadline;
            })
        );
    };

    return (
        <div 
        style={{
          border: "2px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          maxWidth: "600px",
          margin: "40px auto",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
        }}>
            {tasksList.map((taskWithHeadline, index) => (
                <ul key={index}>
                    {Object.entries(taskWithHeadline).map(([key, tasks]) => (
                        <TaskWithHeadline
                            key={key}
                            headline={key}
                            tasks={tasks}
                            headlineIndex={index}
                            addTaskToHeadline={addTaskToHeadline}
                            deleteHeadline={deleteHeadline}
                            deleteTask={deleteTask}
                            updateHeadline={updateHeadline}
                            updateTask={updateTask}
                            setTasksList={setTasksList}
                        />
                    ))}
                </ul>
            ))}

            <form onSubmit={addHeadline}>
                <input
                    type="text"
                    value={inputHeadline}
                    placeholder="Enter headline here"
                    onChange={(e) => setInputHeadline(e.target.value)}
                />
                <button type="submit">Add Headline</button>
            </form>
            {JSON.stringify(tasksList)}
        </div>
    );
}



























