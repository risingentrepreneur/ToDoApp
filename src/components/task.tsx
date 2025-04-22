"use client"

import { useState } from "react";
import { DeleteIcon, EditIcon, CloseIcon} from "./icons";

interface TaskCompnentType {
    task: string,
    arrayIndex: number,
    deleteTask: (arrayIndex: number) => void;
    editTask: (index:number, newTask:string) => void;
}

export default function TaskComponent(props: TaskCompnentType) {

    const { task, arrayIndex, deleteTask, editTask } = props;
    const [showInput, setShowInput] = useState<boolean>(false);
    const [editValue, setEditValue] = useState<string>(task);

    const handleEdit = () => {
        editTask(arrayIndex, editValue);
        setShowInput(false);
    };

    return (
        <li>
            {showInput ? (
                <>
                    <input
                      type = "text"
                      value = {editValue}
                      onChange = {(e)=> setEditValue(e.target.value)}
                    />
                    <button onClick={handleEdit}>Submit</button>
                    <span onClick={() => setShowInput(false)}><CloseIcon/></span>
                </>
            ):(
                <>
                    {task} &nbsp;
                    <span onClick = {() => setShowInput(true)}><EditIcon/></span>
                </>
            )} &nbsp;
            <span onClick = {() => deleteTask(arrayIndex)}><DeleteIcon/></span>           
        </li>
        
    )
}