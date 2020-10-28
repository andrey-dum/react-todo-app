import React, {useState} from 'react';

import List from '../SidebarList/List';
import { MdClose } from "react-icons/md";

import './index.scss';
import Badge from '../Badge/Badge';


const AddList = ({items, colors}) => {

  const [showForm, setShowForm] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0].id);

  const onShowForm = () => {
    setShowForm(!showForm)
  }

 const onSelectedColor = (colorId) => {
  setSelectedColor(colorId);
  console.log(selectedColor)
 }
    

  return (
        <>
          <List 
              items={items} 
              onShowForm={onShowForm}
          />
          { showForm &&<div className="addListForm">
            <div className="addListForm__close" onClick={onShowForm}><MdClose /></div>
            <div><input autoFocus placeholder="List name" type="text"/> </div>
            <div className="list__colors">
              { colors
                .map((color) => <Badge 
                  onSelectedColor={onSelectedColor} 
                  key={color.id} color={color.name} 
                  colorItem={color} 
                  activeClass={color.id === selectedColor && 'active'} />)}
            </div>
            <button className="button">Create List</button>
          </div> }
        </>
  );
}

export default AddList;
