import { useState,  useCallback, useEffect } from "react";
import { AddIcon, DeleteIcon, CloseIcon, EditIcon } from "./icons";
import { TaskObj } from "@/interfaces/taskObject";
import { Textarea } from "./textarea";

interface TaskWithHeadlineObj {
    headline: string;
    tasks: { text: string; status: boolean }[];
    headlineIndex: number;
    setTasksList: React.Dispatch<React.SetStateAction<TaskObj[]>>;
}

export default function TaskWithHeadline(props: TaskWithHeadlineObj) {
    const { headline, tasks, headlineIndex, setTasksList } = props;

    const [taskInput, setTaskInput] = useState("");
    const [editingHeadline, setEditingHeadline] = useState(false);
    const [headlineInput, setHeadlineInput] = useState(headline);
    const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
    const [taskEditInput, setTaskEditInput] = useState("");

    // const headlineInputRef = useRef<HTMLTextAreaElement | null>(null);

    // Update headline
    const updateHeadline = (index: number, newHeadline: string) => {
        setTasksList(prev =>
            prev.map((item, i) => {
                if (i === index) {
                    const oldHeadline = Object.keys(item)[0];
                    const taskList = item[oldHeadline];
                    return { [newHeadline]: taskList };
                }
                return item;
            })
        );
    };

    // Save headline edits
    const saveHeadlineEdit = () => {
        updateHeadline(headlineIndex, headlineInput);
        setEditingHeadline(false);
    };

    // Add new task
    const addTask = useCallback(() => {
        if (!taskInput.trim()) return;
        setTasksList(prev =>
            prev.map(taskWithHeadline => {
                if (taskWithHeadline[headline]) {
                    return {
                        [headline]: [...taskWithHeadline[headline], { text: taskInput.trim(), status: false }]
                    };
                }
                return taskWithHeadline;
            })
        );
        setTaskInput("");
    }, [taskInput, headline, setTasksList]);

    // Edit a task's text
    const updateTask = (taskIndex: number, newText: string) => {
        setTasksList(prev =>
            prev.map(taskWithHeadline => {
                if (taskWithHeadline[headline]) {
                    const updatedTasks = [...taskWithHeadline[headline]];
                    updatedTasks[taskIndex] = {
                        ...updatedTasks[taskIndex],
                        text: newText
                    };
                    return { [headline]: updatedTasks };
                }
                return taskWithHeadline;
            })
        );
    };

    // Save task edit
    const saveTaskEdit = useCallback(() => {
        if (editingTaskIndex !== null && taskEditInput.trim()) {
            updateTask(editingTaskIndex, taskEditInput.trim());
            setEditingTaskIndex(null);
            setTaskEditInput("");
        }
    }, [editingTaskIndex, taskEditInput, headline]);

    // Autosave edited task
    useEffect(() => {
        if (!taskEditInput) return;
        const timeout = setTimeout(saveTaskEdit, 300);
        return () => clearTimeout(timeout);
    }, [taskEditInput, saveTaskEdit]);

    // Toggle task completion
    const toggleCheck = (taskIndex: number) => {
        setTasksList(prev =>
            prev.map(taskWithHeadline => {
                if (taskWithHeadline[headline]) {
                    const updatedTasks = [...taskWithHeadline[headline]];
                    updatedTasks[taskIndex] = {
                        ...updatedTasks[taskIndex],
                        status: !updatedTasks[taskIndex].status
                    };
                    return { [headline]: updatedTasks };
                }
                return taskWithHeadline;
            })
        );
    };

    // Delete task
    const deleteTask = (taskIndex: number) => {
        setTasksList(prev =>
            prev.map(taskWithHeadline => {
                if (taskWithHeadline[headline]) {
                    const updatedTasks = taskWithHeadline[headline].filter((_, i) => i !== taskIndex);
                    return { [headline]: updatedTasks };
                }
                return taskWithHeadline;
            })
        );
    };

    // Delete headline
    const deleteHeadline = () => {
        setTasksList(prev => prev.filter((_, i) => i !== headlineIndex));
    };

    return (
        <div className="todo-subcontainer">
            {/* Headline */}
            <div>
                {editingHeadline ? (
                    <>
                        <Textarea
                            value={headlineInput}
                            setValue={setHeadlineInput}
                            placeholder="Edit headline..."
                        />
                        <button onClick={saveHeadlineEdit}>Save</button>
                        <button onClick={() => {
                            setHeadlineInput(headline);
                            setEditingHeadline(false);
                        }}><CloseIcon /></button>
                    </>
                ) : (
                    <p>
                        {headlineIndex + 1}. {headline}
                        <button onClick={deleteHeadline}><DeleteIcon /></button>
                        <button onClick={() => setEditingHeadline(true)}><EditIcon /></button>
                    </p>
                )}
            </div>

            {/* Task list */}
            <ul>
                {tasks
                    .sort((a, b) => Number(a.status) - Number(b.status))
                    .map((task, index) => (
                        <li key={index}>
                            <input
                                type="checkbox"
                                checked={task.status}
                                onChange={() => toggleCheck(index)}
                            />
                            {editingTaskIndex === index ? (
                                <>
                                    <Textarea
                                        value={taskEditInput}
                                        setValue={setTaskEditInput}
                                        placeholder="Edit task..."
                                    />
                                    <button onClick={saveTaskEdit}>Save</button>
                                    <button onClick={() => {
                                        setEditingTaskIndex(null);
                                        setTaskEditInput("");
                                    }}><CloseIcon /></button>
                                </>
                            ) : (
                                <>
                                    <span onClick={() => {
                                        setEditingTaskIndex(index);
                                        setTaskEditInput(task.text);
                                    }}>{task.text}</span>
                                    <button onClick={() => deleteTask(index)}><DeleteIcon /></button>
                                </>
                            )}
                        </li>
                    ))}
            </ul>

            {/* Always-visible subtask input */}
            <div style={{ marginTop: "1rem" }}>
                <Textarea
                    value={taskInput}
                    setValue={setTaskInput}
                    placeholder={`Add task to "${headline}"`}
                   
                    // onKeyDown={(e) => {
                    //     if (e.key === 'Enter' && !e.shiftKey) {
                    //         e.preventDefault();
                    //         addTask();
                    //     }
                    // }}
                />
                <button onClick={addTask}><AddIcon /></button>
            </div>
        </div>
    );
}



// import { useState, useRef, useCallback, useEffect } from "react";
// import { AddIcon, DeleteIcon, CloseIcon, EditIcon } from "./icons";
// import { TaskObj } from "@/interfaces/taskObject";
// import { Textarea } from "./textarea";

// interface TaskWithHeadlineObj {
//     headline: string;
//     tasks: { text: string; status: boolean }[];
//     headlineIndex: number;
//     setTasksList: React.Dispatch<React.SetStateAction<TaskObj[]>>
// }// props interface 
// export default function TaskWithHeadline(props: TaskWithHeadlineObj) {   // component definition 
//     const { headline, tasks, headlineIndex, setTasksList } = props; // destructuring props
//     const [taskInput, setTaskInput] = useState<string>("");
//     const [showAddTaskInput, setShowAddTaskInput] = useState<boolean>(false);
//     const [editingHeadline, setEditingHeadline] = useState(false);
//     const [headlineInput, setHeadlineInput] = useState(headline);
//     const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
//     const [taskEditInput, setTaskEditInput] = useState(""); // local state variables

//     const headlineInputRef = useRef<HTMLTextAreaElement | null>(null);
//     const taskInputRef = useRef<HTMLTextAreaElement | null>(null);


//     const addTask = useCallback(() => {
//         addTaskToHeadline(headline, taskInput);
//         setTaskInput("");
//         setShowAddTaskInput(false);
//         // Optionally, refocus the task input
//     }, [headline, taskInput]); // addtask function =>Calls the addTaskToHeadline prop function.Clears the input.Hides the input field.
    
//     const saveHeadlineEdit = () => {
//         updateHeadline(headlineIndex, headlineInput);
//         setEditingHeadline(false);
//         headlineInputRef.current?.focus();// Focus back on the headline input after save
//     }; // Function: Save Edited Headline =>Calls updateHeadline to save it.Exits edit mode.


//     const saveTaskEdit = useCallback(() => {
//         if (editingTaskIndex !== null && taskEditInput) {
//             updateTask(headline, editingTaskIndex, taskEditInput);
//             // setEditingTaskIndex(null);
//             setTaskEditInput("");
//         }
//     }, [headline, taskEditInput, editingTaskIndex]); //Function: Save Edited Task =>Calls updateTask to update task text.Resets input and closes edit mode.

//     useEffect(() => {
//         const timeoutID = setTimeout(() => {
//             saveTaskEdit();
//         }, 300);
//         return () => clearTimeout(timeoutID);
//     }, [saveTaskEdit]);


//     const addTaskToHeadline = useCallback((headline: string, task: string) => {
//         setTasksList(prev => (
//             prev.map(taskWithHeadline => taskWithHeadline[headline]
//                 ? {
//                     [headline]: [...taskWithHeadline[headline], { text: task, status: false }]
//                 }
//                 : taskWithHeadline
//             )))
//     }, [headline, setTasksList]);

//     useEffect(() => {
//         if (taskInput.trim()) {
//             const timeoutID = setTimeout(() => {
//                 addTaskToHeadline(headline, taskInput);
//             }, 300);
//             return () => clearTimeout(timeoutID);
//         }
//     }, [addTaskToHeadline, headline]);


//     const deleteTask = (headline: string, taskIndex: number) => {
//         setTasksList(prev => prev.map(taskWithHeadline => {
//             if (taskWithHeadline[headline]) {
//                 const updatedTasks = taskWithHeadline[headline].filter((_, index1) => index1 !== taskIndex);
//                 return { [headline]: updatedTasks };
//             } return taskWithHeadline;
//         })
//         )
//     };
//     // const autoResizeTextarea = (element: HTMLTextAreaElement | null) => {
//     //     if (element) {
//     //         element.style.height = "auto";
//     //         element.style.height = `${element.scrollHeight}px`;
//     //     }
//     // };



//     const updateHeadline = (index: number, newHeadline: string) => {
//         setTasksList(prev =>
//             prev.map((item, index1) => {
//                 if (index1 === index) {
//                     const oldHeadline = Object.keys(item)[0];
//                     const tasks = item[oldHeadline];
//                     return { [newHeadline]: tasks };
//                 }
//                 return item;
//             })
//         );
//     };

//     const updateTask = (headline: string, taskIndex: number, newText: string) => {
//         setTasksList(prev =>
//             prev.map(taskWithHeadline => {
//                 if (taskWithHeadline[headline]) {
//                     const updatedTasks = [...taskWithHeadline[headline]];
//                     // updatedTasks[taskIndex] = newText;
//                     updatedTasks[taskIndex] = {
//                         ...updatedTasks[taskIndex],
//                         text: newText,
//                     };

//                     return { [headline]: updatedTasks };
//                 }
//                 return taskWithHeadline;
//             })
//         );
//     };

//     const showCheck = (headline: string, taskIndex: number) => {
//         setTasksList(prev =>
//             prev.map(taskWithHeadline => {

//                 if (taskWithHeadline[headline]) {

//                     const updatedTasks = [...taskWithHeadline[headline]];

//                     updatedTasks[taskIndex] = {
//                         ...updatedTasks[taskIndex],
//                         status: !updatedTasks[taskIndex].status
//                     };
//                     return { [headline]: updatedTasks };
//                 }
//                 return taskWithHeadline;
//             })
//         );
//     };

//     const deleteHeadline = (indexToRenmove: number) => {
//         setTasksList(prev => prev.filter((_, index) => index !== indexToRenmove));
//     };

//     return (
//         <div className="todo-subcontainer">
//             {/*  Headline row */}
//             <div>
//                 {editingHeadline ? (
//                     <>
//                         <Textarea value={headlineInput} setValue={setHeadlineInput} placeholder="add headline..."
//                         />
//                         {/* <textarea
//                             value={headlineInput}
//                             onChange={(e) => {
//                                 setHeadlineInput(e.target.value);
//                                 autoResizeTextarea(e.target);
//                             }}
//                             onKeyDown={(e) => {
//                                 if (e.key === 'Enter') {
//                                     e.preventDefault();
//                                     saveHeadlineEdit();
//                                 }
//                             }}
//                         /> */}
//                         <button onClick={saveHeadlineEdit}>Save</button>
//                         <button onClick={() => {
//                             setEditingHeadline(false);
//                             setHeadlineInput(headline);
//                         }}><CloseIcon /></button>

//                     </>
//                 ) : (
//                     <>
//                         <div>
//                             <p>{headlineIndex + 1}. {headline}

//                                 <button onClick={() => deleteHeadline(headlineIndex)}><DeleteIcon /></button>
//                                 <button onClick={() => setEditingHeadline(true)}><EditIcon /></button>
//                             </p>
//                         </div>
//                     </>
//                 )}
//             </div>
//             {/* Task list */}
//             <ul>
//                 {tasks.sort((a, b) => Number(a.status) - Number(b.status)).map((task, index) => (
//                     <ul key={index}>
//                         {/* added a checkbox  */}
//                         <input
//                             type="checkbox"
//                             checked={task.status}
//                             onChange={() => showCheck(headline, index)}
//                         />&nbsp;
//                         {editingTaskIndex === index ? (
//                             <>
//                                 <Textarea
//                                     value={taskEditInput}
//                                     setValue={setTaskEditInput}
//                                     placeholder="edit task..."
//                                 />
//                                 <button onClick={saveTaskEdit}>Save</button> {/* ← This is what’s missing */}
//                                 <button onClick={() => {
//                                     setEditingTaskIndex(null);
//                                     setTaskEditInput("");
//                                 }}><CloseIcon /></button>
//                             </>
//                         ) : (
//                             <><span
//                                 onClick={() => {
//                                     setEditingTaskIndex(index);
//                                     setTaskEditInput(task.text);
//                                 }}
//                             >
//                                 {task.text}
//                             </span>

//                                 <button onClick={() => deleteTask(headline, index)}><DeleteIcon /></button>
//                             </>
//                         )}
//                     </ul>
//                 ))}


//             </ul>

//             {/*  Add new task input */}
//             {
//                 <div>{showAddTaskInput && (
//                     <div>

//                         <Textarea value={taskInput} setValue={setTaskInput} placeholder={`Add task to "${headline}"`} />
//                         {/* <textarea
//                         className="subtask-inputbox"
//                         value={taskInput}
                        
//                         onChange={(e) => {
//                             setTaskInput(e.target.value);
//                             autoResizeTextarea(e.target);
//                         }}
//                         placeholder={`Add task to "${headline}"`}
//                         style={{
//                             overflow: "hidden",
//                             resize: "none",
//                         }}
//                         rows={1}
//                         onKeyDown={(e) => e.key === "Enter" && addTask()}
//                     /> */}

//                         <button onClick={addTask}>Add</button> {/* ← Add this */}
//                         <button onClick={() => setShowAddTaskInput(false)}><CloseIcon /></button>
//                     </div>
//                 )}

//                 </div>
//             }
//         </div >
//     );
// }




// import { useState } from "react";
// import { AddIcon, DeleteIcon, CloseIcon, EditIcon } from "./icons";
// import { TaskObj } from "@/interfaces/taskObject";

// interface TaskWithHeadlineObj {
//     headline: string;
//     tasks: { text: string; status: boolean }[];
//     headlineIndex: number;
//     setTasksList: React.Dispatch<React.SetStateAction<TaskObj[]>>;
// }

// export default function TaskWithHeadline(props: TaskWithHeadlineObj) {
//     const { headline, tasks, headlineIndex, setTasksList } = props;

//     const [taskInput, setTaskInput] = useState("");
//     const [showAddTaskInput, setShowAddTaskInput] = useState(false);
//     const [editingHeadline, setEditingHeadline] = useState(false);
//     const [headlineInput, setHeadlineInput] = useState(headline);
//     const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
//     const [taskEditInput, setTaskEditInput] = useState("");

//     const updateTasksList = (updatedTasks: { text: string; status: boolean }[]) => {
//         setTasksList(prev =>
//             prev.map((taskWithHeadline, index) => {
//                 if (index === headlineIndex) {
//                     return { [headline]: updatedTasks };
//                 }
//                 return taskWithHeadline;
//             })
//         );
//     };

//     const addTask = () => {
//         if (!taskInput.trim()) return;
//         updateTasksList([...tasks, { text: taskInput.trim(), status: false }]);
//         setTaskInput("");
//         setShowAddTaskInput(false);
//     };

//     const saveHeadlineEdit = () => {
//         setTasksList(prev =>
//             prev.map((taskWithHeadline, index) => {
//                 if (index === headlineIndex) {
//                     const oldHeadline = Object.keys(taskWithHeadline)[0];
//                     const currentTasks = taskWithHeadline[oldHeadline];
//                     return { [headlineInput]: currentTasks };
//                 }
//                 return taskWithHeadline;
//             })
//         );
//         setEditingHeadline(false);
//     };

//     const saveTaskEdit = () => {
//         if (editingTaskIndex !== null && taskEditInput.trim()) {
//             const updatedTasks = [...tasks];
//             updatedTasks[editingTaskIndex] = {
//                 ...updatedTasks[editingTaskIndex],
//                 text: taskEditInput.trim(),
//             };
//             updateTasksList(updatedTasks);
//             setEditingTaskIndex(null);
//             setTaskEditInput("");
//         }
//     };

//     const deleteTask = (taskIndex: number) => {
//         const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
//         updateTasksList(updatedTasks);
//     };

//     const toggleCheck = (taskIndex: number) => {
//         const updatedTasks = [...tasks];
//         updatedTasks[taskIndex].status = !updatedTasks[taskIndex].status;
//         updateTasksList(updatedTasks);
//     };

//     const deleteHeadline = () => {
//         setTasksList(prev => prev.filter((_, index) => index !== headlineIndex));
//     };

//     return (
//         <div className="todo-subcontainer">
//             <div>
//                 {editingHeadline ? (
//                     <>
//                         <textarea
//                             value={headlineInput}
//                             onChange={(e) => setHeadlineInput(e.target.value)}
//                             onKeyDown={(e) => {
//                                 if (e.key === "Enter") {
//                                     e.preventDefault();
//                                     saveHeadlineEdit();
//                                 }
//                             }}
//                         />
//                         <button onClick={saveHeadlineEdit}>Save</button>
//                         <button onClick={() => setEditingHeadline(false)}><CloseIcon /></button>
//                     </>
//                 ) : (
//                     <p>
//                         {headlineIndex + 1}. {headline}
//                         <button onClick={deleteHeadline}><DeleteIcon /></button>
//                         <button onClick={() => setEditingHeadline(true)}><EditIcon /></button>
//                     </p>
//                 )}
//             </div>

//             <ul>
//                 {tasks.map((task, index) => (
//                     <li key={index}>
//                         <input
//                             type="checkbox"
//                             checked={task.status}
//                             onChange={() => toggleCheck(index)}
//                         />
//                         {editingTaskIndex === index ? (
//                             <>
//                                 <textarea
//                                     value={taskEditInput}
//                                     onChange={(e) => setTaskEditInput(e.target.value)}
//                                     placeholder="Edit task..."
//                                     onKeyDown={(e) => {
//                                         if (e.key === "Enter") {
//                                             e.preventDefault();
//                                             saveTaskEdit();
//                                         }
//                                     }}
//                                 />
//                                 <button onClick={() => setEditingTaskIndex(null)}><CloseIcon /></button>
//                             </>
//                         ) : (
//                             <>
//                                 <span onClick={() => {
//                                     setEditingTaskIndex(index);
//                                     setTaskEditInput(task.text);
//                                 }}>
//                                     {task.text}
//                                 </span>
//                                 <button onClick={() => deleteTask(index)}><DeleteIcon /></button>
//                             </>
//                         )}
//                     </li>
//                 ))}
//             </ul>

//             {showAddTaskInput && (
//                 <>
//                     <textarea
//                         value={taskInput}
//                         onChange={(e) => setTaskInput(e.target.value)}
//                         placeholder={`Add task to "${headline}"`}
//                         onKeyDown={(e) => e.key === "Enter" && addTask()}
//                     />
//                     <button onClick={() => setShowAddTaskInput(false)}><CloseIcon /></button>
//                 </>
//             )}

//             <button onClick={() => setShowAddTaskInput(true)}>Add Task</button>
//         </div>
//     );
// }
