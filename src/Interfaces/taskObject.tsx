export interface TaskCompnentType {
    task: TaskItem,
    arrayIndex: number,
    deleteTask: (arrayIndex: number) => void;
    editTask: (index: number, newTask: string) => void;
    statusComplete: (index: number) => void;
    focus: boolean;
}

export interface TaskObj {
    [key: string]: TaskItem[],
}

export interface TaskTitleObj {
    title: string;
    tasks: TaskItem[];
    setTasksList: React.Dispatch<React.SetStateAction<TaskObj[]>>
}

export interface TaskItem {
    name: string;
    status: boolean;
}