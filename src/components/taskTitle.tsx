import React, { useCallback, useEffect, useState } from "react";
import { DeleteIcon, CloseIcon } from "./icons";
import TaskComponent from "./task";
import { TaskTitleObj, TaskItem } from "@/Interfaces/taskObject";
import "@/style/todo.scss";
import { TextArea } from "./textArea";

export default function TaskTitle(props: TaskTitleObj) {
    const { title, tasks, setTasksList } = props;
    const [currentTitle, setCurrentTItle] = useState<string>(title);
    const [taskInput, setTaskInput] = useState<string>("");
    const [editTitleInput, setEditTitleInput] = useState<string>(title);
    const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);

    const addTaskToTitle = useCallback(() => {
        if (taskInput != "") {
            const newTask: TaskItem = { name: taskInput, status: false }
            setTasksList((prev) => prev.map((obj) =>
                obj[title] ? { [title]: [...obj[title], newTask] } : obj
            ))
            setTaskInput("");
        }
    }, [setTasksList, taskInput, title])

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            addTaskToTitle();
        }, 100);
        return () => clearTimeout(timeoutID);
    }, [addTaskToTitle]);

    const deleteTitle = (title: string) => {
        setTasksList((prev) => prev.filter(obj => !obj[title]));
    }

    const editTitle = (title: string, newTitle: string) => {
        setTasksList(prev => prev.map(obj =>
            obj[title] ? { [newTitle]: obj[title] } : obj
        ))
        setCurrentTItle(newTitle);
    }

    const deleteTaskFromTitle = (title: string, index: number) => {
        setTasksList(prev => prev.map(obj =>
            obj[title] ? {
                [title]: obj[title].filter((task: TaskItem, taskIndex: number) =>
                    taskIndex !== index)
            } : obj
        ))
    }

    const editTaskInTitle = (title: string, index: number, taskName: string) => {
        setTasksList(prev => prev.map(obj =>
            obj[title] ? {
                [title]: obj[title].map((task: TaskItem, taskIndex: number) =>
                    (taskIndex === index ? { ...task, name: taskName } : task))
            } : obj
        ))
    }

    const submitEditTitle = () => {
        editTitle(title, editTitleInput);
        setIsEditingTitle(false);
    }

    const checkboxStatus = (index: number) => {
        setTasksList(prev => prev.map(obj => obj[title] ? {
            [currentTitle]: obj[currentTitle].map((task, taskIndex) => taskIndex === index ?
                { ...task, status: !task.status } : task)
        } : obj))
    }

    const arrangeTasks = [
        ...tasks.map((task, index) => ({ task, index })).filter(item => !item.task.status),
        ...tasks.map((task, index) => ({ task, index })).filter(item => item.task.status)
    ]

    return (
        <>
            <div className="title-name">
                {isEditingTitle ? (
                    <>
                        <input
                            type="text"
                            value={editTitleInput}
                            onChange={(e) => setEditTitleInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' ? submitEditTitle() : null}
                            className="heading-input"
                        />
                        <span onClick={() => setIsEditingTitle(false)}><CloseIcon /></span>
                    </>
                ) : (
                    <>
                        <span onClick={() => setIsEditingTitle(true)}>{title}</span> &nbsp;
                        <span onClick={() => deleteTitle(title)}
                            className="delete-icon"><DeleteIcon /></span>
                    </>
                )}
            </div>
            <ul className="task-list">
                {arrangeTasks.map(({ task, index }) => {
                    const focus = index === tasks.length - 1 ? true : false;
                    return (
                        <TaskComponent
                            key={index}
                            task={task}
                            arrayIndex={index}
                            deleteTask={(index) => deleteTaskFromTitle(title, index)}
                            editTask={(index, newTask) => editTaskInTitle(title, index, newTask)}
                            statusComplete={(index) => checkboxStatus(index)}
                            focus={focus}
                        />
                    )
                })}
                <li className="task-item">
                    <input type="checkbox" disabled />
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        addTaskToTitle();
                    }}
                        className="task-input-area">
                        <TextArea value={taskInput} setValue={setTaskInput} placeholder="Add task.." />
                    </form>
                </li>
            </ul>
        </>
    );
}