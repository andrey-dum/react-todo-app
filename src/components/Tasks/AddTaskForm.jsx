import React, {useState} from 'react';
import * as axios from 'axios';

//import './index.scss';

import { AiOutlinePlus } from "react-icons/ai";


const AddTaskForm = ({list, onAddTask}) => {
    const [visibleForm, setVisibleForm] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [loading, setLoading] = useState(false)

    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm)
        setInputValue('')
    }

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false
        };
        setLoading(true)
        axios.post('http://localhost:3001/tasks', obj).then(({data}) => {

            onAddTask(list.id, data)

            toggleFormVisible();
            setInputValue('')
          })
          .catch((e) => {
              alert('Ошибка при добавлении задачи')
          })
          .finally(()=>{
            setLoading(false)
          });
       
    }

    return (
            <div className="task__form">
                {!visibleForm && 
                    <div onClick={toggleFormVisible} className="add__task">
                        <AiOutlinePlus/> Новая задача
                    </div>
                }
                {visibleForm && 
                    <div className="add__taskForm">
                        <input onChange={handleChange} placeholder="текст задания" type="text"/>
                        <button disabled={loading} onClick={addTask} className="button button--green">
                            { loading ? 'Добавление' : 'Добавить задачу' }
                        </button>
                        <button onClick={toggleFormVisible} className="button button--gray">Отмена</button>
                    </div>
                }
            </div>
    )
}


export default AddTaskForm;