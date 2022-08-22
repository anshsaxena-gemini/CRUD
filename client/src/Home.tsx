import { Button, Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Form.module.css";

const { default: Axios } = require("axios");

function Home() {
  
  // useEffect(() => {
  //   Axios.get("http://localhost:3003/get").then((res: any) => {
  //     setData(res.data);
  //   });
  // }, []);
  const [input,setInput] = useState("");
  const [isFilled,setFilled] = useState(true);
  const [trainData,setTrainData] = useState<any>({});

  const handleInput = (e:any)=>{
      setInput(e.target.value)
      if(e.target.value.length !=5){
        setFilled(true)
      }
      else{
        setFilled(false)
      }
  }
   
  const handleSubmit =async ()=>{

  
  
  await axios.request(options).then(function (response) {
    setTrainData(response.data[0])
    console.log(response.data[0]);
    
 
  }).catch(function (error) {
    console.error(error);
  });

}
  return (
    <div>
      <div className={styles.navbar}>
        <h1 className={styles.head}>WELCOME TO INDIAN RAILWAYS</h1>

        <h3>
          <Link to="/Login" className={styles.linkforLogout}>
            Logout
          </Link>
        </h3>
      </div>
      <br></br>
    
      <div className={styles.Card}>
      <div>
      <TextField id="outlined-basic" label="Enter train no or name" variant="outlined" 
      onChange={handleInput}
      
      />

      </div>
      <br></br>
      <div>
      <Button variant="contained" disabled={isFilled}
      onClick={handleSubmit} mt-5
      >
        Search
      </Button>
      </div>
      <br>
      </br>

      </div>
      <div className={styles.details}>
        <p>Train No: {trainData.train_num}</p>
        <p>Train Name: {trainData.name}</p>
        <p>Source: {trainData.train_from}</p>
        <p>Destination: {trainData.train_to}</p>

      </div>
    </div>
  );
}

export default Home;
