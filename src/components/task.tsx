"use client"

import { useState } from "react";
import { DeleteIcon, EditIcon, CloseIcon} from "./icons";

interface TaskCompnentType {
    task: string,
    arrayIndex: number,
    deleteTask: (arrayIndex: number) => void;
    updateTask: (index:number, newTask:string) => void;
}

export default function TaskComponent(props: TaskCompnentType) {

    const { task, arrayIndex, deleteTask, updateTask } = props;
    const [showInput, setShowInput] = useState<boolean>(false);
    const [editValue, setEditValue] = useState<string>(task);

    const updateChanges = () => {
        updateTask(arrayIndex, editValue);
        setShowInput(false);
        console.log(arrayIndex, editValue);
    };

    return (
        <li>

            {task} &nbsp;
            { (showInput == true) ? 
            <>
                <input 
                type = "text"
                value = {editValue}
                placeholder="Enter your text here"
                onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick = {updateChanges}> Submit </button>
                <span onClick = {() => setShowInput(false)}><CloseIcon/></span>
            </> : <span onClick = {() => setShowInput(true)}><EditIcon/></span>} &nbsp;

            
            <span onClick = {() => deleteTask(arrayIndex)}><DeleteIcon/></span>
            
        </li >
        
    )
}