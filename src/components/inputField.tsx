"use client"

import { useState } from "react";
import TaskWithHeadline from "./taskWithHeadline";

interface TaskObj {
    [key: string]: string[],
}

export default function InputField() {

    const [tasksList, setTasksList] = useState<TaskObj[]>([]);
    const [inputHeadline, setInputHeadline] = useState<string>("");

    const addHeadline = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTasksList(prev => [...prev, { [inputHeadline]: [] }])
        setInputHeadline("");
    }

    const addTaskToHeadline = (headline : string, task : string) => {

        setTasksList(
            prev => prev.map((taskWithHeadline : TaskObj) => {
                if (taskWithHeadline[headline]){
                    return {
                        [headline] : [...taskWithHeadline[headline], task]
                    }
                }
                return taskWithHeadline;
            })
        );

    }

    return (
        <div>
            {
                tasksList.map((taskWithHeadline: TaskObj, index: number) => (
                    <ul key={index}>
                        {
                            Object.entries(taskWithHeadline).map(([key, tasks], index: number) => (

                                <TaskWithHeadline 
                                    headline={key} 
                                    tasks={tasks} 
                                    key={index} 
                                    addTaskToHeadline={addTaskToHeadline} 
                                />

                            ))
                        }
                    </ul>
                ))
            }

            <form onSubmit={addHeadline}>
                <input
                    type="text"
                    value={inputHeadline}
                    placeholder="Enter healine here"
                    onChange={(e) => setInputHeadline(e.target.value)}
                />
                <button type="submit">Add Headline</button>&nbsp;&nbsp;&nbsp;
            </form>
        </div>
    );
}
