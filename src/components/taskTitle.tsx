import { useState } from "react";
import { AddIcon } from "./icons";

interface TaskTitleObj {
    title : string,
    tasks : string[],
    addTaskToTitle: (title: string, task: string) => void
}

export default function TaskTitle (props: TaskTitleObj) {
    const { title, tasks, addTaskToTitle } = props;
    const [taskInput, setTaskInput] = useState<string>("");
    const [showAddTaskInput, setShowAddTaskInput]= useState<boolean>(false);

    const addTask = () => {
        addTaskToTitle(title, taskInput);
        setTaskInput("");
        setShowAddTaskInput(false);
    }

return(
    <>
        <li> {title} &nbsp;
            <span onClick={() => setShowAddTaskInput(true)}> <AddIcon/></span> 
        </li>
        <ul>
            {
                tasks.length > 0 ? tasks.map ((task, index)=> (
                    <li key={index}>{task}</li>
                )) : ""
            }
            {
                showAddTaskInput ? (
                    <>
                        <input
                            type="text"
                            value={taskInput}
                            onChange= {(e) => setTaskInput(e.target.value)}
                            placeholder={`Add task to ${title}`}
                        />
                        <button type="submit" onClick={addTask}>Add task</button>
                    </>
                ) : ""
            }

        </ul>
    </>
)
}