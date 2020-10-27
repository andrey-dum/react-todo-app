import React from 'react'
import { BsList } from "react-icons/bs";

import Sidebar from './Components/Sidebar';

function App() {

  const items = [
    //#FA709A
    {id: 1, icon: <BsList />, name: 'All tasks', active: true},
    {id: 2, color: '#FBAB7E', name: 'School'},
    {id: 3, color: '#85FFBD', name: 'Sport'},
    {id: 4, color: '#D9AFD9', name: 'Courses'},
    {id: 5, color: '#B5FFFC', name: 'House'},
  ];

  return (
    <div className="app">
      <div className="todo">
        {/* <div className="todo__sidebar">
          <Sidebar />
        </div> */}
        <Sidebar items={items}/>
      </div>
    </div>
  );
}

export default App;
