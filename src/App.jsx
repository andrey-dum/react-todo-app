import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import List from "./components/SidebarList/List";
import AddList from "./components/AddList/AddList";
import Tasks from "./components/Tasks/Tasks";

import { BsList } from "react-icons/bs";

import db from "./db.json";
import * as axios from "axios";

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeList, setActiveList] = useState(null);

  let history = useHistory();
  

  useEffect(() => {
    axios
      .get("http://localhost:3001/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
        setLists(data);
        //setActiveList(data[1])
      });
    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddList = objList => {
    const newLists = [...lists, objList];
    //objList.color = db.colors.filter(color => color.id === objList.colorId)[0].name
    setLists(newLists);
  };

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };

  const removeList = listId => {
    setLists(lists.filter(list => list.id !== listId));
  };

  const onClickItem = list => {
    
    history.push(`/lists/${list.id}`);
    setActiveList(list);
  };

  const onEditListTitle = (listId, name) => {
    console.log(listId, name);
    const newLists = lists.map(list => {
      if (list.id === listId) {
        list.name = name;
      }
      return list;
    });
    setLists(newLists);
  };


  const onRemoveTask = (listId, taskId) => {
    if (window.confirm('Удалить?')) {
        axios
            .delete('http://localhost:3001/tasks/' + taskId)
            .then(() => {
              const newList = lists.map(list => {
                if(list.id === listId) {
                  list.tasks = list.tasks.filter(task => task.id !== taskId)
                }
                return list;
              });
              setLists(newList);
            })
            .catch((e) => {
                alert('Не удалось удалить!')
            });
    }
}


const onEditTask = (listId, taskObj) => {
  const newTaskText = window.prompt('Текст задачи', taskObj.text)

  if (!newTaskText) {
    return
  }

  const newList = lists.map(list => {
    if(list.id === listId) {
      list.tasks = list.tasks.map(task => {
        if (task.id === taskObj.id) {
          task.text = newTaskText
        }
        return task
      })
    }
    return list;
  });
  setLists(newList);

  axios
    .patch('http://localhost:3001/tasks/' + taskObj.id, { text: newTaskText })
    .catch((e) => {
        alert('Не удалось изменить!')
    });
  
}

const onCompleteTask = (listId, taskId, completed) => {
  const newList = lists.map(list => {
    if(list.id === listId) {
      list.tasks = list.tasks.map(task => {
        if (task.id === taskId) {
          task.completed = completed
        }
        return task
      })
    }
    return list;
  });
  setLists(newList);

  axios
    .patch('http://localhost:3001/tasks/' + taskId, { completed })
    .catch((e) => {
        alert('Не удалось изменить!')
    });
  
}

  

  useEffect(() => {
     const listId = history.location.pathname.split('lists/')[1];
     
     if (lists) {
      const list = lists.find(item => item.id === Number(listId));
      setActiveList(list);
     }
  }, [lists, history.location.pathname]);

  return (
    <div className="app">
      <h1>TODO APP</h1>
      <div className="todo">
        <div className="todo__sidebar">
          {lists ? (
            <List
              onClickItem={list => {history.push('/')}}
              items={[{ active: history.location.pathname === '/', icon: <BsList />, name: "All tasks" }]}
            />
          ) : (
            <div className="loading">LOADING...</div>
          )}
          {lists ? (
            <List
              items={lists}
              isRemoveble
              removeList={removeList}
              onClickItem={onClickItem}
              activeList={activeList && activeList}
            />
          ) : (
            <div className="loading">LOADING...</div>
          )}

          <AddList
            items={[
              {
                id: "55",
                icon: "+",
                name: "Add New List",
                className: "list__add-button"
              }
            ]}
            colors={colors}
            onAddList={onAddList}
          />
        </div>

        <div className="todo__tasks">
          <Route exact path="/">
            {lists &&
              lists.map(list => (
                <Tasks
                  onRemoveTask={onRemoveTask}
                  key={list.id}
                  onAddTask={onAddTask}
                  list={list}
                  onEditListTitle={onEditListTitle}
                  withoutEmpty
                />
              ))}
          </Route>

          <Route path="/lists/:id">
            {lists && activeList && (
              <Tasks
                onEditTask={onEditTask}
                onRemoveTask={onRemoveTask}
                onAddTask={onAddTask}
                list={activeList && activeList}
                onEditListTitle={onEditListTitle}
                onCompleteTask={onCompleteTask}
              />
            )}
          </Route>
        </div>
      </div>
    </div>
  );
}

export default App;
