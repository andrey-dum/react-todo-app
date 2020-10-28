import React from 'react';

import { BsList } from "react-icons/bs";

import List from './components/SidebarList/List';
import AddList from './components/AddList/AddList';

import db from './db.json'

function App() {

  const items = [
    //#FA709A
    {id: 2, color: 'apple', name: 'School', isRemoveble: true},
    {id: 3, color: 'peach', name: 'Sport'},
    {id: 4, color: 'sky', name: 'Courses'},
    {id: 5, color: 'pink', name: 'House'},
  ];

  return (
    <div className="app">
      <h1>TODO APP</h1>
      <div className="todo">
        <div className="todo__sidebar">
          <List items={[{id: 1, icon: <BsList />, name: 'All tasks', active: true},]} />
          <List items={items} isRemoveble />

          <AddList 
            items={[{id: '55', icon: '+', name: 'Add new list', className: 'list__add-button'}]}
            colors={db.colors}
          />
        </div>
        {/* <Sidebar items={items}/> */}
      </div>
    </div>
  );
}

export default App;
