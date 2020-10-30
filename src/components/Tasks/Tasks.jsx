import React, {useState} from 'react';
import './index.scss';

import { BsPencil } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";


const Tasks = ({list, onEditListTitle}) => {
    const [check, setCheck] = useState(false)
    
    const onSelect = (task) => {
        //task = {...task, completed: !completed}
        //setCheck(e.target.checked)
    }

    const editListTitle = () => {
        const newTitle = window.prompt('List Title', list.name)
       if (newTitle !== '') {
        onEditListTitle(list.id, newTitle)
       }
    }

    return (
        <div className="tasks">
            <div className="tasksTitle__wrapper">
                <h2 className="tasks__title">{list && list.name}</h2>
                <BsPencil onClick={editListTitle} />
            </div>

            <div className="tasks__items">
            { !list.tasks.length && <h2>Задачи отсутствуют</h2> }
            {list && list.tasks.map(task => (
                <div className="task" key={task.id}>
                    <div className="checkbox">
                        <input onClick={() => onSelect(task)} checked={task.completed} id={`task-${task.id}`} type="checkbox"/>
                        <label htmlFor={`task-${task.id}`}>
                            <FaCheck/>
                        </label>
                    </div>
                    <div className="task__text">
                        {/* <input type="text"/> */}
                        {task.text}
                    </div>
                    <div className="task__meta">
                        <BsPencil />
                        <MdClose />
                    </div>
                </div>
            ))}
            </div>

            <div className="add__task">
                <AiOutlinePlus/> Новая задача
            </div>

        </div>

        
    )
}


export default Tasks;