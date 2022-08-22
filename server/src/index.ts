const express = require('express');
const mongoose = require('mongoose');
const app = express();
const details = require('../models/Schema')
const cors = require('cors');
const sgMail = require('@sendgrid/mail')

// const bcrypt = require('bcryptjs')


const userName = "AnshSaxena"
const _password = "S05601";
const cluster = "cluster0";
const dbName = "userDetails";

app.use(express.json());
app.use(express());
app.use(cors());


//db connection
mongoose.connect(
 
  `mongodb+srv://${userName}:${_password}@${cluster}.bbhtv.mongodb.net/${dbName}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology : true,

  }
)

const db = mongoose.connection;
db.on("error",()=>{
  console.log("error connecting to db");
  
})
db.once("open",function(){
  console.log("success");
  
});



// sgMail.setApiKey(API)

const message ={
  to: "ansh.saxena_cs19@gla.ac.in",
  from : "ansh562000@gmail.com",
  subject:"Welcome to CRUD!",
  text:"Hello form Ansh Saxena",
  html:"<h1>Hello form Ansh Saxena</h1>"
}


app.post("/insert",
        async(req: { body: { name: any; email: any; password:any } },res: any)=>{

          const name = req.body.name
          const email = req.body.email
          const password = req.body.password
          // const encryptedPssword = bcrypt.hash(password,10);
           const userDetails = new details(
            {
              name:name,
              email:email,
              password

            }
           );
           try{
            const oldUser = await details.findOne({email});
            if(oldUser){
              return res.json({error:"User exists"});
            }
            await userDetails.save();
            res.send({status:"OK"})
           }catch(err){
            // res.send({status:"error"})
           }
        //    sgMail.send(message)
        //    .then((response: any) => console.log("Email Sent"))
        //    .catch((console.error()));
        //  alert("success")
        }
        

)

app.post("/login",
  async (req: any,res: any) =>{
       const {email,password} = req.body;

       const user = await details.findOne({email});
       if(user){
        if(await user.password === password){
          return res.json({status:"ok"})
        }
        else{
          return res.json({status:"error",error:"Invalid Password"})
        }
      }
      else{
        return res.json({status:"error",error:"User Not found"})
      }
  } 

)

// get api

app.get("/get",
  async(req: any,res: any)=>{
    details.find({},(err: any,result: any)=>{
      if(err){
        res.send(err);
      }
      res.send(result);
    })
} )


app.listen(3003,()=>{
  console.log("server runningt at port 3003");
  
})