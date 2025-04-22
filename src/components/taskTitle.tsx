import React, { useState } from "react";
import { EditIcon, DeleteIcon, AddIcon, CloseIcon } from "./icons";
import TaskComponent from "./task";
import { TaskObj } from "@/Interfaces/taskObject";

interface TaskTitleObj {
    title : string;
    tasks : string[];
    setTasksList: React.Dispatch<React.SetStateAction<TaskObj[]>>
}

export default function TaskTitle (props: TaskTitleObj) {
    const { title, tasks, setTasksList} = props;
    const [taskInput, setTaskInput] = useState<string>("");
    const [showAddTaskInput, setShowAddTaskInput]= useState<boolean>(false);
    const [editTitleInput, setEditTitleInput] = useState<string>(title);
    const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);

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

    const addTask = () => {
        addTaskToTitle(title, taskInput);
        setTaskInput("");
        setShowAddTaskInput(false);
    };

    const submitEditTitle = () => {
        editTitle(title, editTitleInput);
        setIsEditingTitle(false);
    };

return(
    <>
        <li> {isEditingTitle ? (
                <>
                    <input
                        type="text"
                        value={editTitleInput}
                        onChange={(e) => setEditTitleInput(e.target.value)}
                    />
                        <button onClick={submitEditTitle}>Update</button>
                        <span onClick={() => setIsEditingTitle(false)}><CloseIcon /></span>
                </>
                ) : (
                <>
                    {title} &nbsp;
                        <span onClick={() => setIsEditingTitle(true)}><EditIcon /></span> &nbsp;
                        <span onClick={() => deleteTitle(title)}><DeleteIcon /></span>
                </>
                )
            }
        </li>

        <ul>
            {tasks.map((task, index) => (
                <TaskComponent
                    key={index}
                    task={task}
                    arrayIndex={index}
                    deleteTask={(index) => deleteTaskFromTitle(title, index)}
                    editTask={(index, newTask) => editTaskInTitle(title, index, newTask)}
                />
            ))}

            {
                showAddTaskInput ? (
                <>
                    <input
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        placeholder={`Add task to ${title}`}
                    />
                    <button type="submit" onClick={addTask}>Add task</button>
                    <span onClick={() => setShowAddTaskInput(false)}><CloseIcon /></span>
                </>
                ) : (
                    <li onClick={() => setShowAddTaskInput(true)}><AddIcon /></li>
                )
            }
        </ul>
    </>
    );
}