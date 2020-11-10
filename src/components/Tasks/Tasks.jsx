import React from 'react';
import * as axios from 'axios';

import './index.scss';

import { BsPencil } from "react-icons/bs";
import AddTaskForm from './AddTaskForm';
import Task from './Task';
import {
    Link,
  } from "react-router-dom";

const Tasks = ({list, onEditListTitle, onAddTask, withoutEmpty, onRemoveTask, onEditTask, onCompleteTask}) => {

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
                <h2 style={{color: list.color.hex}} className="tasks__title">
                    <Link to={`/lists/${list.id}`}> {list && list.name}</Link>
                </h2>
                <BsPencil onClick={editListTitle} />
            </div>

            <div className="tasks__items">
            { !withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2> }
            {list && list.tasks && list.tasks.map(task => (
                <Task 
                    key={task.id} 
                    list={list} 
                    onEdit={onEditTask} 
                    task={task} 
                    onRemove={onRemoveTask} 
                    onComplete={onCompleteTask}
                />
            ))}
            </div>

            <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />

        </div>

        
    )
}


export default Tasks;