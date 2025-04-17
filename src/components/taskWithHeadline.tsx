import { useState } from "react";
import { AddIcon } from "./icons";

interface TaskWithHeadlineObj {
    headline: string,
    tasks: string[],
    addTaskToHeadline: (headline: string, task: string) => void
}

export default function TaskWithHeadline(props: TaskWithHeadlineObj) {

    const { headline, tasks, addTaskToHeadline } = props;
    const [taskInput, setTaskInput] = useState<string>("");
    const [showAddTaskInput, setShowAddTaskInput] = useState<boolean>(false);

    const addTask = () => {
        addTaskToHeadline(headline, taskInput);
        setTaskInput("");
        setShowAddTaskInput(false);
    }

    return (
        <>
            <li>{headline} &nbsp; <span onClick={() => setShowAddTaskInput(true)}> <AddIcon /></span> </li>
            <ul>
                {
                    tasks.length > 0 ? tasks.map((task, index) => (
                        <li key={index}>{task}</li>
                    )) : ""
                }
                {
                    showAddTaskInput ? (
                        <>
                            <input
                                type="text"
                                value={taskInput}
                                onChange={(e) => setTaskInput(e.target.value)}
                                placeholder={`Add task to ${headline}`}
                            />
                            <button type="submit" onClick={addTask}>Add task</button> <br /><br /><br />
                        </>
                    ) : ""
                }
            </ul>
        </>
    )
}