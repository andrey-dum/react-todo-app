import React, {useState} from 'react';
import './index.scss';

import { BsPencil } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";


const Tasks = () => {
    const [check, setCheck] = useState(false)

    const onSelect = (e) => {
        setCheck(e.target.checked)
        console.log(check)
    }

    return (
        <div className="tasks">
            <div className="tasksTitle__wrapper">
                <h2 className="tasks__title">Фронтенд</h2>
                <BsPencil />
            </div>

            <div className="tasks__items">
            {[
                {'text': 'Lorem, ipsum dolor.'},
                {'text': 'Lorem ipsum dolor sit amet.'},
                {'text': 'Lorem ipsum dolor sit amet consectetur.'},
        ].map(item => (
                <div className="task">
                    <div className="checkbox">
                        <input onClick={onSelect} id="check" type="checkbox"/>
                        <label htmlFor="check">
                            <FaCheck/>
                        </label>
                    </div>
                    <div className="task__text">
                        <input type="text"/>   {item.text}
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