"use client"

import { useState } from "react";
import TaskTitle from "./taskTitle";
import {TaskObj} from "@/Interfaces/taskObject"

export default function InputField() {
    const [tasksList, setTasksList] = useState<TaskObj[]>([]);
    const [inputTitle, setInputTitle] = useState<string>("");

    const addTitle = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTasksList((prev) => [...prev, {[inputTitle]:[]}]);
        setInputTitle("");
    }

    const addTaskToTitle = (title : string, task : string) => {
        setTasksList((prev) => prev.map((obj) => 
            obj[title] ? {[title] : [...obj[title], task]} : obj
            )
        )
    }

    const deleteTitle = (title: string) => {
        setTasksList((prev) => prev.filter(obj => !obj[title]));
    }

    const editTitle = (title: string, newTitle: string) => {
        setTasksList(prev => prev.map(obj => 
            obj[title] ? {[newTitle]: obj[title]}
            : obj
        ))
    }

    const deleteTaskFromTitle = (title: string, index: number) => {
        setTasksList(prev => prev.map(obj => 
            obj[title] ? {[title]:obj[title].filter((task:string, taskIndex:number) => 
                    taskIndex !== index)} : obj
            )
        )
    }

    const editTaskInTitle = (title: string, index:number, newTask: string)=> {
        setTasksList(prev => prev.map(obj => 
            obj[title] ? {[title]: obj[title].map((task: string, taskIndex: number) =>
            (taskIndex === index ? newTask : task))}
            : obj
            )
        )
    }

    return (
        <div>
            {tasksList.map((taskWithTitle: TaskObj, index: number) => (
                    <ul key={index}>
                        {Object.entries(taskWithTitle).map(([key,tasks], index: number) => (
                            <TaskTitle
                                title={key}
                                tasks={tasks}
                                key={index}
                                addTaskToTitle={addTaskToTitle}
                                deleteTitle={deleteTitle}
                                editTitle={editTitle}
                                deleteTaskFromTitle={deleteTaskFromTitle}
                                editTaskInTitle={editTaskInTitle}
                            />
                        ))}
                    </ul>
                ))
            } 
            <form onSubmit={addTitle}>
                <input
                    type="text"
                    value={inputTitle}
                    placeholder="Enter your title here"
                    onChange={(e) => setInputTitle(e.target.value)}
                />
                <button type="submit">Add Title</button>
            </form>
        </div>
    );
}
