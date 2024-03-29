const mongoose=require('mongoose');

const todosSchema=new mongoose.Schema({
   task:{
      type:String,
      required:true
   },
   category:{
      type:String,
      required:true
   },
   userId:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
   },
   date:{
      type:String,
      required:true
   },
   status:{
      type:String,
      required:true,
   }
      
   
})

const Todo=mongoose.model('Todo',todosSchema)

module.exports=Todo;