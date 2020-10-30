import React from 'react'
import classNames from 'class-names';
import * as axios from 'axios';

import { MdClose } from "react-icons/md";
import './index.scss';
import Badge from '../Badge/Badge';


const List = ({items, isRemoveble, onShowForm,  removeList, onClickItem, aciveList}) => {
    
    const onRemoveList = (listId) => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            axios.delete('http://localhost:3001/lists/' + listId).then(() => {
                removeList(listId)
            })
           
        }
        
    }

    return (
        <ul className="category__list" onClick={onShowForm}>
            {items.map(item => (
            <li 
                onClick={onClickItem ? () => onClickItem(item) : null} 
                key={item.id} 
                className={classNames(item.className, {'active': aciveList && aciveList.id === item.id})}>
                <div className="todo__icon">
                    {/* { item.icon || <span className="colorIcon" style={{background: item.color}}></span> } */}
                    {item.icon || <Badge key={`${item.id} ${item.color}`} color={item.color.name}/> }
                </div>
                <span className="list__name">{item.name} 
                {item.tasks && item.tasks.length > 0 && ` (${item.tasks.length})`} {isRemoveble && <span className="remove__btn" onClick={() => onRemoveList(item.id)}><MdClose /></span>}</span>
            </li>))}
        </ul>
    );
}

export default List;