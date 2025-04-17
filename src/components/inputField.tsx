"use client"

import { useState } from "react";
import TaskComponent from "@/components/task";

export default function InputField() {
    const [tasksList, setTasksList] = useState<string[]>([]);
    const [inputData, setInputData] = useState(""); 

    const addTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //prevents page reload
        if (!inputData.trim()) return;
        setTasksList(prev => [...prev, inputData.trim()]);
        setInputData(""); // clear the input field after adding the task....
    };

    const deleteTask = (arrayindex: number) => {
        const updatedList = tasksList.filter((_, i) => i !== arrayindex);
        setTasksList(updatedList);
    };

    const updateTask = (index: number, newTask: string) => {
        const updatedList = tasksList.map((task, i) =>
            i === index ? newTask : task
        );
        setTasksList(updatedList);
    };

    return (
        <div>
            <form onSubmit={addTask}>
                <input
                    type="text"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    placeholder="Enter your task"
                />
                <button type="submit">Add Task</button>
                

            </form>

            <ul>
                {tasksList.map((task, index) => (
                    <TaskComponent
                        key={index}
                        task={task}
                        arrayIndex={index}
                        deleteTask={deleteTask}
                        updateTask={updateTask}
                    />   //how: The list is rendered by mapping tasks into TaskComponent. //why: Promotes reusable, readable, and modular code by splitting UI logic into separate components.
                ))}
            </ul>
        </div>
    );
}
