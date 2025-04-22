import { useState } from "react";
import { EditIcon, DeleteIcon, AddIcon, CloseIcon } from "./icons";
import TaskComponent from "./task";

interface TaskTitleObj {
    title : string;
    tasks : string[];
    addTaskToTitle: (title: string, task: string) => void;
    editTitle: (title: string, newTitle: string) => void;
    deleteTitle: (title: string) => void;
    deleteTaskFromTitle: (title: string, index: number) => void;
    editTaskInTitle: (title: string, index: number, newTask: string) => void;
}

export default function TaskTitle (props: TaskTitleObj) {
    const { title, tasks, addTaskToTitle, editTitle, deleteTitle, deleteTaskFromTitle, editTaskInTitle } = props;
    const [taskInput, setTaskInput] = useState<string>("");
    const [showAddTaskInput, setShowAddTaskInput]= useState<boolean>(false);
    const [editTitleInput, setEditTitleInput] = useState<string>(title);
    const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);

    const addTask = () => {
        addTaskToTitle(title, taskInput);
        setTaskInput("");
        setShowAddTaskInput(false);
    };

    const submitEditTitle = () => {
        editTitle(title, editTitleInput);
        setIsEditingTitle(false);
    };

return(
    <>
        <li> {isEditingTitle ? (
                <>
                    <input
                        type="text"
                        value={editTitleInput}
                        onChange={(e) => setEditTitleInput(e.target.value)}
                    />
                        <button onClick={submitEditTitle}>Update</button>
                        <span onClick={() => setIsEditingTitle(false)}><CloseIcon /></span>
                </>
                ) : (
                <>
                    {title} &nbsp;
                        <span onClick={() => setIsEditingTitle(true)}><EditIcon /></span> &nbsp;
                        <span onClick={() => deleteTitle(title)}><DeleteIcon /></span>
                </>
                )
            }
        </li>

        <ul>
            {tasks.map((task, index) => (
                <TaskComponent
                    key={index}
                    task={task}
                    arrayIndex={index}
                    deleteTask={(index) => deleteTaskFromTitle(title, index)}
                    editTask={(index, newTask) => editTaskInTitle(title, index, newTask)}
                />
            ))}

            {
                showAddTaskInput ? (
                <>
                    <input
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        placeholder={`Add task to ${title}`}
                    />
                    <button type="submit" onClick={addTask}>Add task</button>
                    <span onClick={() => setShowAddTaskInput(false)}><CloseIcon /></span>
                </>
                ) : (
                    <li onClick={() => setShowAddTaskInput(true)}><AddIcon /></li>
                )
            }
        </ul>
    </>
    );
}