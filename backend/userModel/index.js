const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
     name:{ 
        type: String,
        required:true
     },
     email:{
        type:String,
        required:true,
        unique:true
     },
     password:{
        type:String,
        required:true
        
     },
     todos:[
        {
            todo:mongoose.Schema.Types.ObjectId
        }
     ]
            
    
})
const User=mongoose.model('User',userSchema);
module.exports=User;