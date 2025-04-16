import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export function DeleteIcon(){
    return (
        <FontAwesomeIcon icon={faTrash} className='icon' />
    )
}