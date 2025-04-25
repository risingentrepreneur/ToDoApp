"use client"

import { useState } from "react";
import { DeleteIcon, EditIcon, CloseIcon } from "./icons";
import {TaskCompnentType} from "@/Interfaces/taskObject";
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
        <li className="task-item">
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
                        className="task-input"
                    />
                    <button onClick={handleEdit}>Submit</button> &nbsp;
                    <span onClick={() => setShowInput(false)}><CloseIcon /></span>
                </>
            ) : (
                <>
                    {task.status ? (
                        <s onClick ={() => setShowInput(true)}>{task.name}</s>
                    ): ( 
                    <span onClick = {() => setShowInput(true)}>{task.name}</span>
                )}
                </>
            )} &nbsp;
                <span onClick={() => deleteTask(arrayIndex)}><DeleteIcon /></span>
        </li >

    )
}