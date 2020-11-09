import React, {useState} from 'react';
import * as axios from 'axios';

import './index.scss';

import { BsPencil } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import AddTaskForm from './AddTaskForm';


const Tasks = ({list, onEditListTitle, onAddTask, withoutEmpty}) => {
    const [check, setCheck] = useState(false)
    
    const onSelect = (task) => {
        //task
    }

    const editListTitle = () => {
        const newTitle = window.prompt('List Title', list.name)

        if (newTitle && newTitle !== '') {
            onEditListTitle(list.id, newTitle)

            axios
                .patch('http://localhost:3001/lists/' + list.id, {
                    name: newTitle
                })
                .catch((e) => {
                    alert('Не удалось обновить имя списка')
                });
       }
    }

    return (
        <div className="tasks">
            <div className="tasksTitle__wrapper">
                <h2 style={{color: list.color.hex}} className="tasks__title">{list && list.name}</h2>
                <BsPencil onClick={editListTitle} />
            </div>

            <div className="tasks__items">
            { !withoutEmpty && !list.tasks.length && <h2>Задачи отсутствуют</h2> }
            {list && list.tasks.map(task => (
                <div className="task" key={task.id}>
                    <div className="checkbox">
                        <input onClick={() => onSelect(task)} id={`task-${task.id}`} type="checkbox"/>
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

            <AddTaskForm list={list} onAddTask={onAddTask} />

        </div>

        
    )
}


export default Tasks;