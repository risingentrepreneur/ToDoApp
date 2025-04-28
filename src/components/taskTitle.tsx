import React, { useState } from "react";
import { EditIcon, DeleteIcon, AddIcon, CloseIcon } from "./icons";
import TaskComponent from "./task";
import { TaskTitleObj, TaskItem } from "@/Interfaces/taskObject";
import "@/style/todo.scss";

export default function TaskTitle(props: TaskTitleObj) {
    const { title, tasks, setTasksList } = props;
    const [taskInput, setTaskInput] = useState<string>("");
    const [showAddTaskInput, setShowAddTaskInput] = useState<boolean>(false);
    const [editTitleInput, setEditTitleInput] = useState<string>(title);
    const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);

    const addTaskToTitle = (title: string, task: string) => {
        const newTask: TaskItem = { name: task, status: false }
        setTasksList((prev) => prev.map((obj) =>
            obj[title] ? { [title]: [...obj[title], newTask] } : obj
        )
        )
    }

    const deleteTitle = (title: string) => {
        setTasksList((prev) => prev.filter(obj => !obj[title]));
    }

    const editTitle = (title: string, newTitle: string) => {
        setTasksList(prev => prev.map(obj =>
            obj[title] ? { [newTitle]: obj[title] } : obj
        ))
    }

    const deleteTaskFromTitle = (title: string, index: number) => {
        setTasksList(prev => prev.map(obj =>
            obj[title] ? {
                [title]: obj[title].filter((task: TaskItem, taskIndex: number) =>
                    taskIndex !== index)
            } : obj
        )
        )
    }

    const editTaskInTitle = (title: string, index: number, taskName: string) => {
        const newTask: TaskItem = { name: taskName, status: false }
        setTasksList(prev => prev.map(obj =>
            obj[title] ? {
                [title]: obj[title].map((task: TaskItem, taskIndex: number) =>
                    (taskIndex === index ? newTask : task))
            }
                : obj
        )
        )
    }

    const addTask = () => {
        addTaskToTitle(title, taskInput);
        setTaskInput("");
        setShowAddTaskInput(false);
    }

    const submitEditTitle = () => {
        editTitle(title, editTitleInput);
        setIsEditingTitle(false);
    }

    const checkboxStatus = (title: string, index: number) => {
        setTasksList(prev => prev.map(obj => obj[title] ? {
            [title]: obj[title].map((task, taskIndex) => taskIndex === index ?
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
                )
                }
            </div>

            <ul className="task-list">
                {arrangeTasks.map(({ task, index }) => (
                    <TaskComponent
                        key={index}
                        task={task}
                        arrayIndex={index}
                        deleteTask={(index) => deleteTaskFromTitle(title, index)}
                        editTask={(index, newTask) => editTaskInTitle(title, index, newTask)}
                        statusComplete={(index) => checkboxStatus(title, index)}
                    />
                ))}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    addTask();
                }}>
                    <input
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        placeholder="Add task"
                        className="task-input"
                    />
                </form>
            </ul>
        </>
    );
}