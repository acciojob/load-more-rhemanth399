import {useState} from 'react'
import React from "react";
//import './../styles/App.css';
//import LoadMoreList from "./LoadMoreList";
const items = [
  "Item 1", "Item 2", "Item 3","Item 4", "Item 5", "Item 6", "Item 7", "Item 8","Item 9","Item 10","Item 11","Item 12","Item 13","Item 14","Item 15","Item 16","Item 17","Item 18", "Item 19","Item 20",
  "Item 21","Item 22","Item 23","Item 24","Item 25","Item 26","Item 27","Item 28","Item 29","Item 30"];


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
