import React, {useState} from 'react';

import { BsList } from "react-icons/bs";

import List from './components/SidebarList/List';
import AddList from './components/AddList/AddList';

import db from './db.json'

function App() {
  const ListsColors = db.lists.map(item => {
    item.color = db.colors.filter(color => color.id === item.colorId)[0].name;
    return item;
  });

  const [lists, setLists] = useState(ListsColors);
  

  const onAddList = (objList) => {
    const newLists = [...lists, objList];
    //objList.color = db.colors.filter(color => color.id === objList.colorId)[0].name
    setLists(newLists);
  }
  const removeList = (listId) => {
    setLists(lists.filter(list => list.id !== listId));
  }

  return (
    <div className="app">
      <h1>TODO APP</h1>
      <div className="todo">
        <div className="todo__sidebar">
          <List items={[{id: 1, icon: <BsList />, name: 'All tasks', active: true},]} />
          {/* <List items={db.lists.map(item => {
            item.color = db.colors.filter(color => color.id === item.colorId)[0].name;
            return item;
          })} isRemoveble /> */}
          <List items={lists} isRemoveble removeList={removeList} />

          <AddList 
            items={[{id: '55', icon: '+', name: 'Add New List', className: 'list__add-button'}]}
            colors={db.colors}
            onAddList={onAddList} 
            
          />
        </div>

        <div className="todo__tasks">
          <div className="tasks">
            <h2 className="tasks__title">Фронтенд</h2>

          </div>

        </div>
       
      </div>
    </div>
  );
}

export default App;
