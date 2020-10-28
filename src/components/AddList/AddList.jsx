import React, {useState} from 'react';

import List from '../SidebarList/List';
import { MdClose } from "react-icons/md";

import './index.scss';
import Badge from '../Badge/Badge';


const AddList = ({items, colors, onAddList}) => {

  const [showForm, setShowForm] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0].id);
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.currentTarget.value)
  }

  const onShowForm = () => {
    setShowForm(true)
  }
  const onClose = () => {
    setShowForm(false)
    setInput('');
    setSelectedColor(colors[0].id)
  }

 const onSelectedColor = (colorId) => {
  setSelectedColor(colorId);
 }


 const addList = () => {
   if (!input) {
     alert('List name is empty!');
     return;
   }
   onAddList({
    "id": Math.random() * 100,
    "name": input,
    "colorId": selectedColor,
    'color': colors.filter(c => c.id === selectedColor)[0].name,
  })
  
  onClose();
 }

  return (
        <>
          <List 
              items={items} 
              onShowForm={onShowForm}
              
          /> 
          { showForm &&<div className="addListForm">
            <div className="addListForm__close" onClick={onClose}><MdClose /></div>
            <div><input onChange={handleChange} autoFocus placeholder="List name" type="text"/> </div>
            <div className="list__colors">
              { colors
                .map((color) => <Badge 
                  onSelectedColor={onSelectedColor} 
                  key={color.id} color={color.name} 
                  colorItem={color} 
                  activeClass={color.id === selectedColor && 'active'} />)}
            </div>
            <button onClick={addList} className="button">Create List</button>
          </div> }
        </>
  );
}

export default AddList;
