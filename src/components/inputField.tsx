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

    return (
        <div>
            <form onSubmit={addTask}>
                <input
                    type="text"
                    value={inputData}
                    placeholder="Enter category"
                    onChange={(e) => setInputData(e.target.value)}
                    className="headline-input"
                />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {
                    tasksList.map((task: string, index: number) => (
                        <TaskComponent task={task} key={index} />
                    ))
                }
            </ul>
            {
                JSON.stringify(tasksList)
            }
        </div>
    );
}
