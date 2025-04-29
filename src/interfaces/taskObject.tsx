export interface TaskItem {
    text: string;
    status: boolean; // or call it 'checked' if you prefer
  }
  
  export interface TaskObj {
    [key: string]: TaskItem[];
  }
  

