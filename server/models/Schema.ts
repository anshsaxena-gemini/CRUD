const mongooose = require('mongoose');


const userSchema = new mongooose.Schema({
    name :{
        type : String,
        required : true,
    },
   email:{
        type :String,
        required :true,
        unique:true
        
    },
    password:{
        type :String,
        required :true,
    }
});

const userDetails = mongooose.model("User",userSchema);
module.exports = userDetails;