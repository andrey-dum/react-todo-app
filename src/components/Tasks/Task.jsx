import React from 'react';


import { BsPencil } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const Task = ({list, task, onRemove, onEdit, onComplete}) => {

    const onChangeCheckbox = e => {
        onComplete(list.id, task.id, e.target.checked)
    }

    return (
        <div className="task" key={task.id}>
            <div className="checkbox">
                <input 
                    onChange={onChangeCheckbox} 
                    id={`task-${task.id}`} 
                    type="checkbox" 
                    checked={task.completed} 
                />
                <label htmlFor={`task-${task.id}`}>
                    <FaCheck/>
                </label>
            </div>
            <div className="task__text">
                {/* <input type="text"/> */}
                {task.text}
            </div>
            <div className="task__meta">
                <BsPencil onClick={()=>onEdit(list.id, task)} />
                <MdClose onClick={()=>onRemove(list.id, task.id)} />
            </div>
        </div>
    );
}

export default Task;
