"use client"

import { useCallback, useEffect, useState } from "react";
import { DeleteIcon } from "./icons";
import { TaskCompnentType } from "@/Interfaces/taskObject";
import "@/style/todo.scss";
import { TextArea } from "./textArea";

export default function TaskComponent(props: TaskCompnentType) {
    const { task, arrayIndex, deleteTask, editTask, focus = false } = props;
    const [editValue, setEditValue] = useState<string>(task.name);

    const handleEdit = useCallback(() => {
        if (editValue === "") {
            deleteTask(arrayIndex);
            return;
        }
        editTask(arrayIndex, editValue);
    }, [editValue, arrayIndex, editTask, deleteTask]);

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            handleEdit();
        }, 300);
        return () => clearTimeout(timeoutID);
    }, [handleEdit]);

    return (
        <li className={`task-item ${task.status ? "completed" : ""}`}>
            <input
                type="checkbox"
                checked={task.status}
                onChange={() => props.statusComplete(arrayIndex)}
            />
            <TextArea
                value={editValue}
                setValue={setEditValue}
                focus={focus}
                placeholder="Enter task.." /> &nbsp;
            <span onClick={() => deleteTask(arrayIndex)}
                className="delete-icon"><DeleteIcon /></span>
        </li >
    )
}