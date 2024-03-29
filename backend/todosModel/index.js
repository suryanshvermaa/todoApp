const mongoose=require('mongoose');

const todosSchema=new mongoose.Schema({
   task:{
      Type:String,
      required:true
   },
   category:{
      Type:String,
      required:true
   },
   userId:{
      Type:mongoose.Schema.Types.ObjectId,
      required:true,
   },
   date:{
      Type:String,
      required:true
   },
   status:{
      Type:String,
      required:true,
   }
      
   
})

const Todo=mongoose.model('Todo',todosSchema)

module.exports=Todo;