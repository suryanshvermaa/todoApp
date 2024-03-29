import { View, Text, SafeAreaView, TextInput, Pressable, Button } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode'; 

const index = () => {
   const router=useRouter();
   const [name,setName]=useState('');
   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
  
   
  

   const signUp=async()=>{
    
    
   
    try {
      axios.post('http://localhost:8080/signup',{name,email,password}).then(async(res)=>{
        const token=res.data.token;
        await AsyncStorage.setItem('token',token)
        setEmail('');
        setPassword('');
    })
    } catch (error) {
      console.log('err')
    }
   

   
   }



   const checkAuthorization=async()=>{
     const authToken=await AsyncStorage.getItem('token');
     if(authToken){
        const decoded=jwtDecode(authToken);
        if(decoded.id){
         router.push('/(tabs)/home');
        }
     }
   }
   checkAuthorization();

  return (
    
  
    <>
     <View className="flex-1 flex-col items-center  ">
     <View className="bg-white  ">
      <Text className="text-center text-black text-2xl mt-20 text-[#0066b2]">Todo-List Tracker</Text>
    </View>
    <View className="bg-white  ">
    <Text className="text-center text-black text-[17px] mt-2">Login to your account</Text>
  </View>
  <View className="w-[90%] bg-[#E0E0E0] h-14  rounded-[5px] mt-20 flex flex-row items-center justify-center"> 
  <AntDesign name="user" size={32} color="gray" />
  <TextInput  placeholder='enter your name' onChangeText={(Text)=>setName(Text)} value={name} className="text-xl pl-3 w-[88%] text-gray-700"></TextInput>
  </View>
  <View className="w-[90%] bg-[#E0E0E0] h-14  rounded-[5px]  flex flex-row mt-6 items-center justify-center"> 
  <MaterialIcons name="email"  size={32} color="gray" />
  <TextInput  placeholder='enter your email' onChangeText={(Text)=>setEmail(Text)} value={email} className="text-xl pl-3 w-[88%]  text-gray-700"></TextInput>
  </View>
  <View className="w-[90%] bg-[#E0E0E0] h-14  rounded-[5px] m-6 flex flex-row items-center justify-center"> 
  <AntDesign name="lock" size={32} color="gray" />
  <TextInput  placeholder='enter your password' onChangeText={(Text)=>setPassword(Text)}  value={password} className="text-xl pl-3 w-[88%] text-gray-700"></TextInput>
  </View>
  
  
   <View className="w-[90%] flex flex-col justify-center items-center mt-[60px]" >
   <Pressable className="w-[58%] bg-[#0066b2] rounded-xl"onPress={()=>signUp()} >
      <Text className="text-white text-xl text-center p-3 "> Signup</Text>
    </Pressable>
  <View className="flex flex-row justify-between m-4">
    <Text>You have an account? </Text>
    <Pressable onPress={()=>router.back()}><Text className="text-[#0066b2]" >Sign in</Text></Pressable>
  </View>
   </View>
     </View>
   
  </>
  )
}

export default index;