import React, { useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios'

function App() {

  const [foodName ,setFoodName] = useState("");
  const [days,setDays] = useState(0);
  const [foodList,setFoodList] = useState<any[]>([])
  const [isListOpen,setListOpen] = useState(false);

  if(isListOpen===true){
 
    Axios.get("http://localhost:3003/read").then((response)=>{
         setFoodList(response.data);

    })
}
  const addToList = () =>{
    Axios.post('http://localhost:3003/insert',{
      foodName: foodName,
      days : days
    })
  }
  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>
      <label>Food Name:</label>
      <input type="text"
      value={foodName}
      onChange={(e)=>{
         setFoodName(e.target.value)
      }}
      />
      <label>Days Since You Ate It:</label>
      <input type="number"
      value={days}
      onChange={(e)=>{
        setDays(e.target.valueAsNumber)
      }}
      />
      <button onClick={addToList}>Add to List</button>
      <br>
      </br>
      <br></br>
      <div className="data">
        <button onClick={()=>setListOpen(!isListOpen)}>View Food List</button><br>
        </br>
        {foodList.map((val,key)=>{
          return isListOpen?(<div><h3>{val.foodName}</h3><h3>{val.daysSinceIAte}</h3></div>):null
        })}
      </div>
    </div>
  );
}

export default App;
