const express = require('express');
const mongoose = require('mongoose');
const app = express();
const details = require('../models/Schema')
const cors = require('cors');
const sgMail = require('@sendgrid/mail')
const bcrypt = require('bcryptjs')


const userName = "AnshSaxena"
const _password = "Smitch%405601";
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

const API = "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";

sgMail.setApiKey(API)

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
// app.get("/read",
//         async(req: { body: { foodName: any; days: any; }; },res: any)=>{
//            Schema.find(
//             {},
//             (err: any,result: any)=>{
//               if(err){
//                 res.send(err)
//               }
//               res.send(result);
//             }
//            )
        
//         }
        

// )


app.listen(3003,()=>{
  console.log("server runningt at port 3003");
  
})