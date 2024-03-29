const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
     name:{ 
        Type: String,
        required:true
     },
     email:{
        Type:String,
        required:true,
        unique:true
     },
     password:{
        Type:String,
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