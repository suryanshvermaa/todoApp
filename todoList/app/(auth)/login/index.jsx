import { View, Text, SafeAreaView, TextInput, Pressable, Button, Linking } from 'react-native'
import React ,{useState} from 'react'
import {useRouter} from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode'; 

const index = () => {

  const router=useRouter();

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

  const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
   const login=()=>{
    axios.post('http://localhost:3000/login',{email,password}).then(async(res)=>{
        const token=res.data.token;
        await AsyncStorage.setItem('token',token);
        setEmail('');
        setPassword('');
    })
   }
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
  <MaterialIcons name="email"  size={32} color="gray" />
  <TextInput  placeholder='enter your email' value={email} onChangeText={(Text)=>setEmail(Text)} className="text-xl pl-3 w-[88%] text-gray-700"></TextInput>
  </View>
  <View className="w-[90%] bg-[#E0E0E0] h-14  rounded-[5px] m-6 flex flex-row items-center justify-center"> 
  <AntDesign name="lock" size={32} color="gray" />
  <TextInput  placeholder='enter your password' onChangeText={(Text)=>setPassword(Text)} value={password} className="text-xl pl-3 w-[88%] text-gray-700"></TextInput>
  </View>
  <View className="flex-1 w-[90%] flex flex-row justify-between">
    <Text>Keep me logged in</Text>
    <Pressable><Text  className="text-[#6699CC]">Forgot password</Text></Pressable>
  </View>
   <View className="w-[90%] flex flex-col justify-center items-center mb-[250px]" >
   <Pressable className="w-[58%] bg-[#0066b2] rounded-xl"onPress={()=>login()} >
      <Text className="text-white text-xl text-center p-3 "> Login</Text>
    </Pressable>
  <View className="flex flex-row justify-between m-4">
    <Text>Don't have an account? </Text>
    <Pressable onPress={()=>router.push('/(auth)/signup')}><Text className="text-[#0066b2]">Sign up</Text></Pressable>
  </View>
   </View>
     </View>
   
  </>
  )
}

export default index;