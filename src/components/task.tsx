"use client"

import { useState } from "react";
import { DeleteIcon, EditIcon, CloseIcon} from "./icons";

interface TaskCompnentType {
    task: string,
    arrayIndex: number,
    deleteTask: (arrayIndex: number) => void;
    // updateTask: (index:number, newTask:string) => void;
}

export default function TaskComponent(props: TaskCompnentType) {

    const { task, arrayIndex, deleteTask } = props;
    const [showInput, setShowInput] = useState<boolean>(false);
    // const [editValue, setEditValue] = useState<string>(task);

    return (
        <li>

            {task} &nbsp;
            { (showInput == true) ?
            <>
                <input type = "text" />
                <button> Submit </button>
                <span onClick = {() => setShowInput(false)}><CloseIcon/></span>
            </> 
            : <span onClick = {() => setShowInput(true)}><EditIcon/></span>
            } &nbsp;
            <span onClick = {() => deleteTask(arrayIndex)}><DeleteIcon/></span>           
        </li>
        
    )
}