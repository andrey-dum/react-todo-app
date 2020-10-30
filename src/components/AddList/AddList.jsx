import React, {useState, useEffect} from 'react';

import List from '../SidebarList/List';
import { MdClose } from "react-icons/md";

import './index.scss';
import Badge from '../Badge/Badge';
import * as axios from 'axios';

const AddList = ({items, colors, onAddList}) => {

  const [showForm, setShowForm] = useState(false);
  const [selectedColor, setSelectedColor] = useState(3);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setSelectedColor(colors ? colors[0].id : 5);
  }, [colors]);

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
   setIsLoading(true)
   axios.post('http://localhost:3001/lists', {name: input, colorId: selectedColor}).then(({data}) => {
    const color = colors.filter(c => c.id === selectedColor)[0].name;
    const listObj = {...data, color: {name: color}}

    onAddList(listObj)
    onClose();
    
  }).finally(() => {
    setIsLoading(false);
  });

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
            <button onClick={addList} className="button">{ isLoading ? 'Loading...' : 'Create List' }</button>
          </div> }
        </>
  );
}

export default AddList;
