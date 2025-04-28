"use client"

import { useState } from "react";
import { DeleteIcon, EditIcon, CloseIcon } from "./icons";
import { TaskCompnentType } from "@/Interfaces/taskObject";
import "@/style/todo.scss";

export default function TaskComponent(props: TaskCompnentType) {

    const { task, arrayIndex, deleteTask, editTask } = props;
    const [showInput, setShowInput] = useState<boolean>(false);
    const [editValue, setEditValue] = useState<string>(task.name);

    const handleEdit = () => {
        editTask(arrayIndex, editValue);
        setShowInput(false);
    };

    return (
        <li className={`task-item ${task.status ? "completed" : ""}`}>
            <input
                type="checkbox"
                checked={task.status}
                onChange={() => props.statusComplete(arrayIndex)}
            />
            {showInput ? (
                <>
                    <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? handleEdit() : null}
                        className="task-input"
                    />
                    <span onClick={() => setShowInput(false)}><CloseIcon /></span>
                </>
            ) : (
                <>
                    <span onClick={() => setShowInput(true)}
                        className={task.status ? "completed-task" : ""}
                    >
                        {task.name}
                    </span>
                </>
            )} &nbsp;
            <span onClick={() => deleteTask(arrayIndex)}
                className="delete-icon"><DeleteIcon /></span>
        </li >

    )
}