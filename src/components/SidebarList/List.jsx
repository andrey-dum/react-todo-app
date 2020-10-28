import React from 'react'
import classNames from 'class-names';
import { MdClose } from "react-icons/md";
import './index.scss';
import Badge from '../Badge/Badge';

const List = ({items, isRemoveble, onShowForm}) => {
    
    return (
        <ul className="category__list">
            {items.map(item => <li onClick={onShowForm} key={item.id} className={classNames(item.className, {'active': item.active})}>
                <div className="todo__icon">
                    {/* { item.icon || <span className="colorIcon" style={{background: item.color}}></span> } */}
                    {item.icon || <Badge key={`${item.id} ${item.color}`} color={item.color}/> }
                </div>
                <span className="list__name">{item.name} {isRemoveble && <span className="remove__btn"><MdClose /></span>}</span>
            </li>)}
        </ul>
    );
}

export default List;