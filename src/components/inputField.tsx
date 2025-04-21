"use client";

import { useState } from "react";
import TaskWithHeadline from "./taskWithHeadline";


interface TaskObj {
    [key: string]: string[];
}

 export default function InputField() {
    
    const [tasksList, setTasksList] = useState<TaskObj[]>([]);
    const [inputHeadline, setInputHeadline] = useState<string>("");
    
    const addHeadline = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault(); //if (!inputHeadline.trim()) return;
        setTasksList(prev => [...prev,{[inputHeadline]:[]}]);
        setInputHeadline(""); 
    }
    
    const deleteHeadline=(indexToRenmove:number)=>{
        setTasksList(prev => prev.filter((_,index) =>index!==indexToRenmove));
    };
    // const deleteHeadline = (indexToRemove: number) => {
    //     setTasksList(prev => prev.filter((_, index) => index !== indexToRemove));
    // }; 
   
    const addTaskToHeadline = ( headline: string, task: string ) => {
        setTasksList( prev => (
                prev.map( taskWithHeadline => taskWithHeadline[headline] 
                    ? { [headline]: [...taskWithHeadline[headline], task] } 
                    : taskWithHeadline 
                    
                )
            )
        )
    };

    const deleteTask = (headline: string, taskIndex: number) => {
        setTasksList(prev => prev.map(taskWithHeadline => {
                if (taskWithHeadline[headline]) {
                    const updatedTasks = taskWithHeadline[headline].filter((_, index1) => index1 !== taskIndex);
                    return { [headline]: updatedTasks };
                } return taskWithHeadline;
            })
        )
    };

    const updateHeadline = (index: number, newHeadline: string) => {
        setTasksList(prev =>
            prev.map((item, index1) => {
                if (index1 === index) {
                    const oldHeadline = Object.keys(item)[0];
                    const tasks = item[oldHeadline];
                    return { [newHeadline]: tasks };
                }
                return item;
            })
        );
    };

    const updateTask = (headline: string, taskIndex: number, newText: string) => {
        setTasksList(prev =>
            prev.map(taskWithHeadline => {
                if (taskWithHeadline[headline]) {
                    const updatedTasks = [...taskWithHeadline[headline]];
                    updatedTasks[taskIndex] = newText;
                    return { [headline]: updatedTasks };
                }
                return taskWithHeadline;
            })
        );
    };

    return (
        <div>
            {tasksList.map((taskWithHeadline, index) => (
                <ul key={index}>
                    {Object.entries(taskWithHeadline).map(([key, tasks]) => (
                        <TaskWithHeadline
                            key={key}
                            headline={key}
                            tasks={tasks}
                            headlineIndex={index}
                            addTaskToHeadline={addTaskToHeadline}
                            deleteHeadline={deleteHeadline}
                            deleteTask={deleteTask}
                            updateHeadline={updateHeadline}
                            updateTask={updateTask}
                        />
                    ))}
                </ul>
            ))}

            <form onSubmit={addHeadline}>
                <input
                    type="text"
                    value={inputHeadline}
                    placeholder="Enter headline here"
                    onChange={(e) => setInputHeadline(e.target.value)}
                />
                <button type="submit">Add Headline</button>
            </form>
        </div>
    );
}

































// "use client";

// import { useState } from "react";
// import TaskWithHeadline from "./taskWithHeadline";

// interface TaskObj {
//     [key: string]: string[];
// }

// export default function InputField() {
//     const [tasksList, setTasksList] = useState<TaskObj[]>([]);
//     const [inputHeadline, setInputHeadline] = useState<string>("");

//     const addHeadline = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (!inputHeadline.trim()) return;
//         setTasksList(prev => [...prev, { [inputHeadline.trim()]: [] }]);
//         setInputHeadline("");
//     };

//     const addTaskToHeadline = (headline: string, task: string) => {
//         setTasksList(prev =>
//             prev.map(taskWithHeadline =>
//                 taskWithHeadline[headline]
//                     ? { [headline]: [...taskWithHeadline[headline], task] }
//                     : taskWithHeadline
//             )
//         );
//     };

//     const deleteHeadline = (indexToRemove: number) => {
//         setTasksList(prev => prev.filter((_, index) => index !== indexToRemove));
//     };

//     const deleteTask = (headline: string, taskIndex: number) => {
//         setTasksList(prev =>
//             prev.map(taskWithHeadline => {
//                 if (taskWithHeadline[headline]) {
//                     const updatedTasks = taskWithHeadline[headline].filter((_, i) => i !== taskIndex);
//                     return { [headline]: updatedTasks };
//                 }
//                 return taskWithHeadline;
//             })
//         );
//     };

//     return (
//         <div>
//             {tasksList.map((taskWithHeadline, index) => (
//                 <ul key={index}>
//                     {Object.entries(taskWithHeadline).map(([key, tasks]) => (
//                         <TaskWithHeadline
//                             key={key}
//                             headline={key}
//                             tasks={tasks}
//                             headlineIndex={index}
//                             addTaskToHeadline={addTaskToHeadline}
//                             deleteHeadline={deleteHeadline}
//                             deleteTask={deleteTask}
//                         />
//                     ))}
//                 </ul>
//             ))}

//             <form onSubmit={addHeadline}>
//                 <input
//                     type="text"
//                     value={inputHeadline}
//                     placeholder="Enter headline here"
//                     onChange={(e) => setInputHeadline(e.target.value)}
//                 />
//                 <button type="submit">Add Headline</button>
//             </form>
//         </div>
//     );
// }







// "use client"

// import { useState } from "react";
// import TaskWithHeadline from "./taskWithHeadline";

// interface TaskObj {
//     [key: string]: string[],
// }

// export default function InputField() {

//     const [tasksList, setTasksList] = useState<TaskObj[]>([]);
//     const [inputHeadline, setInputHeadline] = useState<string>("");

//     const addHeadline = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setTasksList(prev => [...prev, { [inputHeadline]: [] }])
//         setInputHeadline("");
//     }

//     const addTaskToHeadline = (headline : string, task : string) => {

//         setTasksList(
//             prev => prev.map((taskWithHeadline : TaskObj) => {
//                 if (taskWithHeadline[headline]){
//                     return {
//                         [headline] : [...taskWithHeadline[headline], task]
//                     }
//                 }
//                 return taskWithHeadline;
//             })
//         );

//     }

//     return (
//         <div>
//             {
//                 tasksList.map((taskWithHeadline: TaskObj, index: number) => (
//                     <ul key={index}>
//                         {
//                             Object.entries(taskWithHeadline).map(([key, tasks], index: number) => (

//                                 <TaskWithHeadline 
//                                     headline={key} 
//                                     tasks={tasks} 
//                                     key={index} 
//                                     addTaskToHeadline={addTaskToHeadline} 
//                                 />

//                             ))
//                         }
//                     </ul>
//                 ))
//             }

//             <form onSubmit={addHeadline}>
//                 <input
//                     type="text"
//                     value={inputHeadline}
//                     placeholder="Enter healine here"
//                     onChange={(e) => setInputHeadline(e.target.value)}
//                 />
//                 <button type="submit">Add Headline</button>&nbsp;&nbsp;&nbsp;
//             </form>
//         </div>
//     );
// }






