
"use client";

import { useState } from "react";
import TaskWithHeadline from "./taskWithHeadline";
import { TaskObj } from "@/interfaces/taskObject";


export default function InputField() {

    const [tasksList, setTasksList] = useState<TaskObj[]>([]);
    const [inputHeadline, setInputHeadline] = useState<string>("");

    const addHeadline = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //if (!inputHeadline.trim()) return;
        setTasksList(prev => [...prev, { [inputHeadline]: [] }]);
        setInputHeadline("");
    }

    return (
        <div className="todo-box">
            {tasksList.map((taskWithHeadline, index) => (
                <ul key={index}>
                    {Object.entries(taskWithHeadline).map(([key, tasks]) => (
                        <TaskWithHeadline
                            key={key}
                            headline={key}
                            tasks={tasks}
                            headlineIndex={index}

                            setTasksList={setTasksList}
                        />
                    ))}
                </ul>
            ))}

            <form onSubmit={addHeadline}>
                <input
                    className="headline-inputbox"
                    type="text"
                    value={inputHeadline}
                    placeholder="Enter headline here"
                    onChange={(e) => setInputHeadline(e.target.value)}
                />
                <button type="submit">Add Headline</button>
            </form>
            {JSON.stringify(tasksList)}
        </div>
    );
}









// "use client";

// import { useState } from "react";
// import TaskWithHeadline from "./taskWithHeadline";
// import { TaskObj } from "@/interfaces/taskObject";

// export default function InputField() {
//     const [tasksList, setTasksList] = useState<TaskObj[]>([]);
//     const [inputHeadline, setInputHeadline] = useState<string>("");

//     const addHeadline = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (!inputHeadline.trim()) return;
//         setTasksList(prev => [...prev, { [inputHeadline]: [] }]);
//         setInputHeadline("");
//     };

//     return (
//         <div
//             style={{
//                 border: "2px solid #ccc",
//                 borderRadius: "8px",
//                 padding: "20px",
//                 maxWidth: "600px",
//                 margin: "40px auto",
//                 boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
//             }}
//         >
//             {tasksList.map((taskWithHeadline, index) => (
//                 <ul key={index}>
//                     {Object.entries(taskWithHeadline).map(([key, tasks]) => (
//                         <TaskWithHeadline
//                             key={key}
//                             headline={key}
//                             tasks={tasks}
//                             headlineIndex={index}
//                             setTasksList={setTasksList}
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

// "use client";

// import { useState, useRef, useCallback, useEffect } from "react";
// import TaskWithHeadline from "./taskWithHeadline";
// import { TaskObj } from "@/interfaces/taskObject";

// export default function InputField() {
//     const [tasksList, setTasksList] = useState<TaskObj[]>([]);
//     const [inputHeadline, setInputHeadline] = useState<string>("");
//     const inputHeadlineRef = useRef<HTMLInputElement | null>(null);

//     const addHeadline = useCallback((e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (!inputHeadline.trim()) return;
//         setTasksList(prev => [...prev, { [inputHeadline]: [] }]);
//         setInputHeadline("");
//         inputHeadlineRef.current?.focus();
//     }, [inputHeadline]);

//     useEffect(() => {
//         inputHeadlineRef.current?.focus();
//     }, []);

//     return (
//         <div className="todo-box">
//             {tasksList.map((taskWithHeadline, index) => (
//                 <TaskWithHeadline
//                     key={index}
//                     headline={Object.keys(taskWithHeadline)[0]}
//                     tasks={taskWithHeadline[Object.keys(taskWithHeadline)[0]]}
//                     headlineIndex={index}
//                     setTasksList={setTasksList}
//                 />
//             ))}

//             <form onSubmit={addHeadline}>
//                 <input
//                     ref={inputHeadlineRef}
//                     className="headline-inputbox"
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



