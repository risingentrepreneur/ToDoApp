import { HtmlContext } from "next/dist/server/route-modules/pages/vendored/contexts/entrypoints";
import { useEffect, useRef } from "react";

interface TextareaProps{
    value:string;
    setValue:(value:string)=>void;
    placeholder:string;
}

export function Textarea(props :TextareaProps){

    const {value, setValue, placeholder }=props;
    const textareaRef=useRef<HTMLTextAreaElement>(null);
    
    useEffect(()=>{
        if(textareaRef.current){
            textareaRef.current.style.height="auto"
            textareaRef.current.style.height=`${textareaRef.current.scrollHeight}px`
        }
    },[value]);

    return <textarea
    ref={textareaRef}
        value={value}
        rows={1}
        onChange={(e)=>setValue(e.target.value)}
        placeholder={placeholder}
        style={{
            overflow:"hidden",
            resize:"none",
           
        }}
        onInput={(e)=>{
            e.currentTarget.style.height="auto"
            e.currentTarget.style.height=`${e.currentTarget.scrollHeight}px`;
        }}
    >
    </textarea>
}

