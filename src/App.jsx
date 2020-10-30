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
  // const ListsColors = db.lists.map(item => {
  //   item.color = db.colors.filter(color => color.id === item.colorId)[0].name;
  //   return item;
  // });

  //const [lists, setLists] = useState(ListsColors);
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [aciveList, setActiveList] = useState(null);
  

useEffect(() => {
  axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data}) => {
    setLists(data)
    setActiveList(data[1])
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
        { lists ? <List items={[{id: 1, icon: <BsList />, name: 'All tasks'},]} /> : <div className="loading">LOADING...</div> }
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
        {/* <Switch>
           
          <Route exact  path='/'>
            <Tasks tasks={db.tasks}/> 
         </Route>
          <Route path='/list/:id'>
            <Tasks tasks={db.tasks}/> 
         </Route>
       
        </Switch> */}
     
          { lists && aciveList && <Tasks list={aciveList && aciveList} onEditListTitle={onEditListTitle} /> }

        </div>
       
      </div>
    </div>

  );
}

export default App;
