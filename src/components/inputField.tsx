"use client"

import { useState } from "react";
import TaskTitle from "./taskTitle";
import {TaskObj, TaskTitleObj, TaskItem} from "@/Interfaces/taskObject"

export default function InputField() {
    const [tasksList, setTasksList] = useState<TaskObj[]>([]);
    const [inputTitle, setInputTitle] = useState<string>("");

    const addTitle = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTasksList((prev) => [...prev, {[inputTitle]:[]}]);
        setInputTitle("");
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
                                setTasksList={setTasksList}
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
            {JSON.stringify(tasksList)}
        </div>
    );
}
