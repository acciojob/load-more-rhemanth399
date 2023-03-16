import {useState} from 'react'
import React from "react";
//import './../styles/App.css';
//import LoadMoreList from "./LoadMoreList";


const App = () => {
  const [data,setData]=useState([]);
async function getItems(){
  let newData=[];
  for(let i=0;i<10;i++)
  {
    newData.push(`Items ${data.length+i+1}`)
    await setData([...data,...newData])
  }
}
  return (
    <div>
      {data.length>0?(
        <ul>
          {data.map((item,index)=>(<li key={index}>{item}</li>))}
        </ul>
      ):(<p>{null}</p>
      )}
        <button onClick={()=>getItems()} >Load more</button>
    </div>
  )
}

export default App
