"use client"
import { useState } from "react";
import { CloseIcon, DeleteIcon, EditIcon } from "./icons";

interface TaskComponentType {
    task : string, 
    arrayIndex : number, 
    deleteTask : (arrayIndex : number) => void
}

export default function TaskComponent(props : TaskComponentType){

    const { task, arrayIndex, deleteTask } = props;

    const [showInput, setShowInput]     = useState<boolean>(false);
    
    return (
        <li>
            {task} &nbsp;
            { (showInput == true) ? 
                <>
                    <input type="text" />
                    <button>Submit</button>
                    <span onClick={() => setShowInput(false)}><CloseIcon /></span>
                </> 
                : <span onClick={() => setShowInput(true)}><EditIcon /></span> 
            } &nbsp;
        
             &nbsp;
            <span onClick={() => deleteTask(arrayIndex)}><DeleteIcon /></span>
        </li>
    )
}
