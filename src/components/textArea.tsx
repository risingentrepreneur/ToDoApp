import { useEffect, useRef } from "react";

interface TextAreaProps {
    value: string;
    setValue: (value: string) => void;
    focus?: boolean;
    placeholder: string;
}

export function TextArea(props: TextAreaProps) {
    const { value, setValue, placeholder, focus } = props;
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (focus && textareaRef.current) {
            const element = textareaRef.current;
            element.focus();
            element.selectionStart = element.selectionEnd = element.value.length;
        }
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [focus, value]);

    return (
        <>
            <textarea
                ref={textareaRef}
                value={value}
                rows={1}
                onChange={(e) => setValue(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onInput={(e) => {
                    e.currentTarget.style.height = "auto"
                    e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
                }}
                placeholder={placeholder}
                style={{
                    overflow: "hidden",
                    resize: "none",
                }}
            >
            </textarea >
        </>
    )
}