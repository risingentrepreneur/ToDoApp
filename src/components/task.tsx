import { DeleteIcon } from "./icons";

interface TaskComponentType {
    task : string, 
    arrayIndex : number, 
    deleteTask : (arrayIndex : number) => void
}

export default function TaskComponent(props : TaskComponentType){

    const { task, arrayIndex, deleteTask } = props;
    
    return (
        <li>
            {task}
            <span onClick={() => deleteTask(arrayIndex)}><DeleteIcon /></span>
        </li>
    )
}