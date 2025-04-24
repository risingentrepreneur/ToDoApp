"use client"

import { useState } from "react";
import { DeleteIcon, EditIcon, CloseIcon} from "./icons";
import { TaskItem, TaskCompnentType } from "@/Interfaces/taskObject";

export default function TaskComponent(props: TaskCompnentType) {

    const { task, arrayIndex, deleteTask, editTask } = props;
    const [showInput, setShowInput] = useState<boolean>(false);
    const [editValue, setEditValue] = useState<string>(task.name);

    const handleEdit = () => {
        editTask(arrayIndex, editValue);
        setShowInput(false);
    };

    return (
        <li>
            <input 
                type="checkbox" 
                checked={task.status} 
                onChange={() => props.statusComplete(arrayIndex)}
            />
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
                    {task.status ? <s>{task.name}</s> : <span>{task.name}</span>} &nbsp;
                    <span onClick = {() => setShowInput(true)}><EditIcon/></span>
                </>
            )} &nbsp;
            <span onClick = {() => deleteTask(arrayIndex)}><DeleteIcon/></span>           
        </li>
        
    )
}