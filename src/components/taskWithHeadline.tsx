import { useState } from "react";
import { AddIcon, DeleteIcon,CloseIcon,EditIcon } from "./icons"; 


interface TaskWithHeadlineObj {
    headline: string;
    tasks: string[];
    headlineIndex: number;
    addTaskToHeadline: (headline: string, task: string) => void;
    deleteHeadline: (index: number) => void;
    deleteTask: (headline: string, taskIndex: number) => void;
    updateHeadline: (index: number, newHeadline: string) => void;
    updateTask: (headline: string, taskIndex: number, updatedText: string) => void;
}  // props interface 

export default function TaskWithHeadline(props: TaskWithHeadlineObj) {   // component definition 
    const {headline,tasks,headlineIndex,addTaskToHeadline,deleteHeadline,deleteTask,updateHeadline,updateTask,} = props; // destructuring props


    const [taskInput, setTaskInput] = useState<string>("");
    const [showAddTaskInput, setShowAddTaskInput] = useState<boolean>(false);
    const [editingHeadline, setEditingHeadline] = useState(false);
    const [headlineInput, setHeadlineInput] = useState(headline);
    const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
    const [taskEditInput, setTaskEditInput] = useState(""); // local state variables


    const addTask = () => {
            addTaskToHeadline(headline, taskInput);
            setTaskInput("");
            setShowAddTaskInput(false);
            }; // addtask function =>Calls the addTaskToHeadline prop function.Clears the input.Hides the input field.

    const saveHeadlineEdit = () => {
            updateHeadline(headlineIndex, headlineInput);
            setEditingHeadline(false); 
    }; // Function: Save Edited Headline =>Calls updateHeadline to save it.Exits edit mode.

    const saveTaskEdit = () => {
        if (editingTaskIndex !== null && taskEditInput) {
            updateTask(headline, editingTaskIndex, taskEditInput);
            setEditingTaskIndex(0);
            setTaskEditInput("");
        }
    }; //Function: Save Edited Task =>Calls updateTask to update task text.Resets input and closes edit mode.

    return (
        <div style={{ marginBottom: "20px" }}>
            {/* 🟦 Headline row */}
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                {editingHeadline ? (
                    <>
                        <input
                            type="text"
                            value={headlineInput}
                            onChange={(e) => setHeadlineInput(e.target.value)}
                            style={{ flexGrow: 1, marginRight: "10px" }}
                        />
                        <button onClick={saveHeadlineEdit} >Save</button>
                        <button onClick={() => {
                            setEditingHeadline(false);
                            setHeadlineInput(headline);
                        }}><CloseIcon /></button>
                    </>
                ) : (
                    <>
                        {/* 🔢 Show headline with number */}
                        <h3 style={{ margin: 0, flexGrow: 1 }}>
                            {headlineIndex + 1}. {headline}
                        </h3>
                        <div style={{ display: "flex", gap: "8px" }}>
                            <button onClick={() => setShowAddTaskInput(true)}><AddIcon /></button>
                            <button onClick={() => deleteHeadline(headlineIndex)}><DeleteIcon /></button>
                            <button onClick={() => setEditingHeadline(true)}><EditIcon /></button>
                        </div>
                    </>
                )}
            </div>

            {/*  Task list */}
            <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {editingTaskIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={taskEditInput}
                                    onChange={(e) => setTaskEditInput(e.target.value)}
                                    style={{ marginRight: "10px" }}
                                    
                                />
                                <button onClick={saveTaskEdit}>Save</button>
                                <button onClick={() => setEditingTaskIndex(null)}><CloseIcon /></button>
                            </>
                        ) : (
                            <>
                                {task}
                                &nbsp;
                                <button onClick={() => {
                                    setEditingTaskIndex(index);
                                    setTaskEditInput(task);
                                }}><EditIcon /></button>
                                <button onClick={() => deleteTask(headline, index)}><DeleteIcon /></button>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            {/* ➕ Add new task input */}
            {showAddTaskInput && (
                <div style={{ marginTop: "10px" }}>
                    <input
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        placeholder={`Add task to "${headline}"`}
                        onKeyDown={(e) => e.key === "Enter" && addTask()}
                        style={{ marginRight: "10px" }}
                    />
                    <button onClick={addTask}><AddIcon /></button>
                    <button onClick={() => setShowAddTaskInput(false)}><CloseIcon /></button>
                </div>
            )}
        </div>
    );
}



//     return (
//         <> 
//             <li>
//                 {editingHeadline ? (
//                     <>
//                         <input
//                             type="text"
//                             value={headlineInput}
//                             onChange={(e) => setHeadlineInput(e.target.value)}
//                         />
//                         <button onClick={saveHeadlineEdit}>Save</button>
//                         <button onClick={() => {
//                             setEditingHeadline(false);
//                             setHeadlineInput(headline);}}><CloseIcon /></button>
//                     </>
//                 ) : (
//                     <>
//                         {headline}
//                         &nbsp;
//                         <span onClick={() => setShowAddTaskInput(true)}><AddIcon /></span>
//                         &nbsp;
//                         <button onClick={() => deleteHeadline(headlineIndex)}><DeleteIcon /></button>
//                         &nbsp;
//                         <button onClick={() => setEditingHeadline(true)}><EditIcon /></button>
//                     </>
//                 )} 

                
//             </li> 
//             {/* If editing, it shows an input to change the headline and Save/Cancel buttons.
//             If not editing, it shows the headline and buttons to add task, delete headline, or edit headline. */}

//             <ul>
//                 {tasks.map((task, index) => (
//                     <li key={index}>
//                         {editingTaskIndex === index ? (
//                             <>
//                                 <input
//                                     type="text"
//                                     value={taskEditInput}
//                                     onChange={(e) => setTaskEditInput(e.target.value)}
//                                 />
//                                 <button onClick={saveTaskEdit}>Save</button>
//                                 <button onClick={() => setEditingTaskIndex(null)}><CloseIcon /></button>
//                             </>
//                         ) : 
//                         (
//                             <>
//                                 {task}
//                                 &nbsp;
//                                 <button onClick={() => {
//                                     setEditingTaskIndex(index);
//                                     setTaskEditInput(task);
//                                 }}><EditIcon /></button>
//                                 <button onClick={() => deleteTask(headline, index)}><DeleteIcon /></button>
//                             </>
//                         )
//                         }
//                     </li>
//                 ))}
//                 {/* Loops through all tasks.
//                 If a task is being edited, shows input + save/cancel buttons.
//                 If not, shows task text + edit/delete buttons. */}
                
//                 {/* ➕ Add new task input */}
//                 {showAddTaskInput && (
//                    <div style={{ marginTop: "10px" }}>
//                         <input
//                             type="text"
//                             value={taskInput}
//                             onChange={(e) => setTaskInput(e.target.value)}
//                             placeholder={`Add task to "${headline}"`}
//                             onKeyDown={(e) => e.key === "Enter" && addTask()}
//                         />
//                         <button onClick={addTask}><AddIcon /></button>
//                         <button onClick={() => setShowAddTaskInput(false)}><CloseIcon /></button>
//                         </div>
//                 )} 
//                 {/* Only shows if showAddTaskInput is true.
//                 Allows the user to add a new task and hide the input if canceled.
//                 Handles Enter key for quick submission. */}


//             </ul>
//         </>
//     );
// }































// // TaskWithHeadline.tsx

// import { useState } from "react";
// import { AddIcon, DeleteIcon } from "./icons";

// interface TaskWithHeadlineObj {
//     headline: string;
//     tasks: string[];
//     headlineIndex: number;
//     addTaskToHeadline: (headline: string, task: string) => void;
//     deleteHeadline: (index: number) => void;
//     deleteTask: (headline: string, taskIndex: number) => void;
// }

// export default function TaskWithHeadline(props: TaskWithHeadlineObj) {
//     const {
//         headline,
//         tasks,
//         headlineIndex,
//         addTaskToHeadline,
//         deleteHeadline,
//         deleteTask,
//     } = props;

//     const [taskInput, setTaskInput] = useState<string>("");
//     const [showAddTaskInput, setShowAddTaskInput] = useState<boolean>(false);

//     const addTask = () => {
//         if (taskInput.trim()) {
//             addTaskToHeadline(headline, taskInput.trim());
//             setTaskInput("");
//             setShowAddTaskInput(false);
//         }
//     };

//     return (
//         <>
//             <li>
//                 <strong>{headline}</strong>
//                 &nbsp;
//                 <span onClick={() => setShowAddTaskInput(true)}><AddIcon /></span>
//                 &nbsp;
//                 <span onClick={() => deleteHeadline(headlineIndex)}><DeleteIcon /></span>
//             </li>
//             <ul>
//                 {tasks.map((task, index) => (
//                     <li key={index}>
//                         {task}
//                         &nbsp;
//                         <button onClick={() => deleteTask(headline, index)}>Delete</button>
//                     </li>
//                 ))}
//                 {showAddTaskInput && (
//                     <>
//                         <input
//                             type="text"
//                             value={taskInput}
//                             onChange={(e) => setTaskInput(e.target.value)}
//                             placeholder={`Add task to "${headline}"`}
//                             onKeyDown={(e) => e.key === "Enter" && addTask()}
//                         />
//                         <button onClick={addTask}>Add Task</button>
//                         <button onClick={() => setShowAddTaskInput(false)}>Cancel</button>
//                     </>
//                 )}
//             </ul>
//         </>
//     );
// }





















// import { useState } from "react";
// import { AddIcon } from "./icons";

// interface TaskWithHeadlineObj {
//     headline: string,
//     tasks: string[],
//     addTaskToHeadline: (headline: string, task: string) => void
// }

// export default function TaskWithHeadline(props: TaskWithHeadlineObj) {

//     const { headline, tasks, addTaskToHeadline } = props;
//     const [taskInput, setTaskInput] = useState<string>("");
//     const [showAddTaskInput, setShowAddTaskInput] = useState<boolean>(false);

//     const addTask = () => {
//         addTaskToHeadline(headline, taskInput);
//         setTaskInput("");
//         setShowAddTaskInput(false);
//     }

//     return (
//         <>
//             <li>{headline} &nbsp; <span onClick={() => setShowAddTaskInput(true)}> <AddIcon /></span> </li>
//             <ul>
//                 {
//                     tasks.length > 0 ? tasks.map((task, index) => (
//                         <li key={index}>{task}</li>
//                     )) : ""
//                 }
//                 {
//                     showAddTaskInput ? (
//                         <>
//                             <input
//                                 type="text"
//                                 value={taskInput}
//                                 onChange={(e) => setTaskInput(e.target.value)}
//                                 placeholder={`Add task to ${headline}`}
//                             />
//                             <button type="submit" onClick={addTask}>Add task</button> <br /><br /><br />
//                         </>
//                     ) : ""
//                 }
//             </ul>
//         </>
//     )
// }


