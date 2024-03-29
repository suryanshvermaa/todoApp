const express=require('express');
const jwt=require('jsonwebtoken');
const User=require('./userModel/index.js');
const mongoose=require('mongoose');
const cors = require('cors');
const Todo=require('./todosModel/index.js')

const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


const connection=()=>{
    
  try {
     
        mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log('db connected');
    

  } catch (error) {
    console.log('db not connected');
  }
   
    
}
connection();


app.post('/signup',async(req,res)=>{
    const {name,email,password}=req.body;
    console.log(name,email,password)
    try {
       // if user exists
        const userExist= await User.findOne({email});
        if(userExist){
            return res.json('user already exists');
        }

        const user= new User();
        user.name=name;
        user.email=email;
        user.password=password;
        const savedUser=await user.save();
        console.log('success');
       

         jwt.sign({id:savedUser._id},'surya','',(err,token)=>{
            res.json({token}); 
         })
         
       
    } catch (error) {
        console.log('err');
      res.json('err')

    }
})

 app.post('/login',async(req,res)=>{
  const {email,password}=req.body;
  try {
    const user=await User.find({email});
    if(user.password==password){
      jwt.sign({id:user._id},'surya','',(err,token)=>{
        res.token({token});
      })
    }
  } catch (error) {
    console.log('err in login');
  }
 })


 app.post('/todo',async(req,res)=>{
  const {task,category,userId,date,status}=req.body;
  try {
    const todo=new Todo({
      task,
      category,
      userId,
      date,
      status
    })
    const user=await User.find({userId});
    user.push=todo._id;
   await user.save();
    await todo.save();
    res.json('success');
    
  } catch (error) {
    console.log("err in todo creating");
  }
 })

// getting todos

app.get('/todos/:userId/completed',async(req,res)=>{
  const id=req.params.userId;
  try {
    const todos=await Todo.find({id,status:'completed'});
     res.json(todos);
  } catch (error) {
    res.json('failed to fetch todos');
  }
})



app.get('/todos/:userId/pending',async(req,res)=>{
  const id=req.params.userId;
  try {
    const todos=await Todo.find({id,status:'pending'});
     res.json(todos);
  } catch (error) {
    res.json('failed to fetch todos');
  }
})


app.listen(3000,()=>{
    console.log("server is running on port 8080");
})