"use client"

import { useState } from "react";
import TaskComponent from "@/components/task";

export default function InputField() {

    const [tasksList, setTasksList] = useState<string[]>([]);
    const [inputData, setInputData] = useState("");

    const addTask = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTasksList((prev) => [...prev, inputData]);
        setInputData("");
    }

    const deleteTask = (arrayIndex : number) => {
        const newArray = tasksList.filter((task:string, index:number) => (
            index != arrayIndex
        ))
        setTasksList(newArray);
    }
    
    const updateTask = (index:number, newTask:string) => {
        const updatedTasks = [...tasksList];
        updatedTasks[index] = newTask;
        setTasksList(updatedTasks);
    }

    return (
        <div>
            <form onSubmit={addTask}>
                <input
                    type="text"
                    value={inputData}
                    placeholder="Enter your text here"
                    onChange={(e) => setInputData(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {
                    tasksList.map((task: string, index: number) => (
                        <TaskComponent task={task} key={index} arrayIndex={index} deleteTask={deleteTask} updateTask={updateTask}/>
                    ))
                }
            </ul>
        </div>
    );
}
