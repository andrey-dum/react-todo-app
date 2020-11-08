import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import List from './components/SidebarList/List';
import AddList from './components/AddList/AddList';
import Tasks from './components/Tasks/Tasks';

import { BsList } from "react-icons/bs";

import db from './db.json'
import * as axios from 'axios';


function App() {
 
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [aciveList, setActiveList] = useState(null);
  

useEffect(() => {
  axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {
    setLists(data)
    //setActiveList(data[1])
  })
  axios.get('http://localhost:3001/colors').then(({data}) => {
    setColors(data)
  })
}, []);



  const onAddList = (objList) => {
    const newLists = [...lists, objList];
    //objList.color = db.colors.filter(color => color.id === objList.colorId)[0].name
    setLists(newLists);
  }

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };

  const removeList = (listId) => {
    setLists(lists.filter(list => list.id !== listId));
  }

  const onClickItem = (item) => {
    setActiveList(item)
  }
  
  const onEditListTitle = (listId, name) => {
    console.log(listId, name)
    const newLists = lists.map(list => {
      if (list.id === listId) {
        list.name = name 
      } 
      return list;
    });
    setLists(newLists)
 
    
  }


  return (

    <div className="app">
      <h1>TODO APP</h1>
      <div className="todo">
        <div className="todo__sidebar">
          
        { lists 
          ? <List 
              items={[{ active: true, icon: <BsList />, 
              name: 'All tasks'},]} /> 
          : <div className="loading">LOADING...</div> }
          { lists 
            ? 
              <List 
                items={lists} 
                isRemoveble 
                removeList={removeList} 
                onClickItem={onClickItem}
                aciveList={aciveList && aciveList}
                /> 
            : <div className="loading">LOADING...</div> }
          
          <AddList 
            items={[{id: '55', icon: '+', name: 'Add New List', className: 'list__add-button'}]}
            colors={colors}
            onAddList={onAddList} 
            
          />
        </div>

        <div className="todo__tasks">
          <Route exact  path='/'>
            { lists && lists.map(list => (
              <Tasks 
                onAddTask={onAddTask} 
                list={list} 
                onEditListTitle={onEditListTitle} 
                withoutEmpty
              />
            )) }
            
          </Route>
       
          <Route path='/lists/:id'>
       
          { lists && aciveList && 
            <Tasks 
              onAddTask={onAddTask} 
              list={aciveList && aciveList} 
              onEditListTitle={onEditListTitle} 
            /> }

          </Route>
        </div>
       
      </div>
    </div>

  );
}

export default App;
