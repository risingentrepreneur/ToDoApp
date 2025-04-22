import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faPen, faTimes, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

export function DeleteIcon(){
    return (
        <FontAwesomeIcon icon={faTrash} className='icon' />
    )
}

export function EditIcon(){
    return (
        <FontAwesomeIcon icon={faPen} className='icon' />
    )
}

export function CloseIcon(){
    return (
        <FontAwesomeIcon icon={faTimes} className='icon' />
    )
}

export function AddIcon(){
    return (
        <FontAwesomeIcon icon={faPlus} className='icon' />
    )
}