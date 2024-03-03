import React, { useState } from 'react'
import { BsFillTrashFill } from 'react-icons/bs';

import './TodoCard.css';
import axios from 'axios';

interface todoType {
    _id: String;
    task: String;
    done: boolean;
}

type CreateProps = {
    todo: todoType;
}

const TodoCard: React.FunctionComponent<CreateProps> = ({ todo }) => {
    const [done, setDone] = useState(todo.done);
    const handleChange = (isChecked: boolean) => {
        axios.put(`http://localhost:3001/update/${todo._id}/${isChecked}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))

        setDone(isChecked);
    }
    const handleDelete = () => {
        axios.delete(`http://localhost:3001/delete/${todo._id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  return (
    <div className='todoContainer'>
        <input type="checkbox" checked={done?true:false} name="taskComplete" id="taskCheckbox" onChange={(e) => handleChange(e.target.checked)}/>
        <p className={done?'line-through':''}>{todo.task}</p>
        <span className='iconContainer' onClick={handleDelete}><BsFillTrashFill className='icon' /></span>
    </div>
  )
}

export default TodoCard