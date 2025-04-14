export default function TaskComponent(props : {task : string}){

    const { task } = props;

    return (
        <li>{task}</li>
    )
}