"use client"

import { useState } from "react";
import { CloseIcon, DeleteIcon, EditIcon } from "./icons";

interface TaskComponentType {
    task: string;
    arrayIndex: number;
    deleteTask: (index: number) => void;
    updateTask: (index: number, newTask: string) => void;
} // props => How: Describes and receives task-related data and methods from the parent.

export default function TaskComponent(props: TaskComponentType) {

    const { task, arrayIndex, deleteTask, updateTask } = props;

    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task);
   



    const taskSubmit = () => {
        if (!editedText.trim()) return;
        updateTask(arrayIndex, editedText.trim());a
        setIsEditing(false);
    };

    return (
        <li>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                    />
                    <button onClick={taskSubmit}>Submit</button>
                    <span onClick={()=>setIsEditing(false)}>&nbsp;&nbsp;<CloseIcon />&nbsp;&nbsp;</span>
                </>
            ) : (
                <>
                    {task}
                    <span onClick={() =>setIsEditing(true)}>&nbsp;&nbsp;<EditIcon />&nbsp;&nbsp;</span>
                </>
            )}
            <span onClick={() => deleteTask(arrayIndex)}><DeleteIcon /></span>
        </li>
    );
}
