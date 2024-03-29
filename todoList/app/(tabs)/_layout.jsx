import { View, Text } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const _layout = () => {
  return (
   <Tabs>
    <Tabs.Screen name='home' options={{
      tabBarLabel:"Home",
      tabBarLabelStyle:{color:'#7CB9E8'},
      headerShown:false,
      tabBarIcon:({focused})=>
      focused?<Entypo name="home" size={24} color="#7CB9EB" />
      :
      <Entypo name="home" size={24} color="black" />
    }}
    />

<Tabs.Screen name='calender' options={{
      tabBarLabel:"Calender",
      tabBarLabelStyle:{color:'#7CB9E8'},
      headerShown:false,
      tabBarIcon:({focused})=>
      focused?<Entypo name="calendar" size={24} color="#7CB9EB" />
      :
      <Entypo name="calendar" size={24} color="black" />
    }}
    />

<Tabs.Screen name='profile' options={{
      tabBarLabel:"Profile",
      tabBarLabelStyle:{color:'#7CB9E8'},
      headerShown:false,
      tabBarIcon:({focused})=>
      focused?
      <AntDesign name="user" size={24} color="#7CB9EB" />
      :
      <AntDesign name="user" size={24} color="black" />
    }}
    />
   </Tabs>
  )
}

export default _layout;