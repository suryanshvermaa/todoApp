import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";


import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BottomModal,
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import moment from "moment";
import axios from "axios";

const index = () => {
  const tags = ["All", "Work", "Personal"];
  const [userId, setUserId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [todo, setTodo] = useState("");
  const [category, setCategory] = useState("all");
  const [PendingTodos, setPendingTodos] = useState([
    {
      _id: "krijfij",
      task: " Drink healthy",
      category: "all",
      userId: "kjdfljg",
      date: "23-3-2024",
      status: "pending",
    },
  ]);
  const [CompletedTodos, setCompletedTodos] = useState([
    {
      _id: "kri87ij",
      task: " Drink r, Keep healthy",
      category: "all",
      userId: "kjdfljg",
      date: "23-3-2024",
      status: "completed",
    },
  ]);
  
   const setUserIdAuth=async(id)=>{
    setUserId(id);
     await AsyncStorage.setItem('userId',id);
   }
   
  const checkAuthorization=async()=>{
    const authToken=await AsyncStorage.getItem('token');
    if(authToken){
       const decoded=jwtDecode(authToken);
       if(decoded.id){
         
        await setUserIdAuth(decoded.id);
         
        
       }else{
        router.push('/(auth)/login');
       }
    }else{
      router.push('/(auth)/login');
    }
  }
  checkAuthorization();




  const todoSend = () => {
    const todoData = {
      task: todo,
      category: category,
      userId,
      date: moment().format("DD-MM-YYYY"),
      status: "pending",
    };

    axios.post("http://localhost:3000/todo", todoData).then((res) => {
      setPendingTodos([...CompletedTodos, todoData]);
      setTodo("");
    });
  };

  useEffect(()=>{
    axios.get('http://localhost:3000/todos/'+userId+"/pending").then((res)=>{
      setPendingTodos(res.data);
    })

    axios.get('http://localhost:3000/todos/'+userId+"/completed").then((res)=>{
      setCompletedTodos(res.data);
    })
  },[]);

  const suggestions = [
    "Go exercising",
    "Go to bed early",
    "take pill reminder",
    "Go shopping",
    "finish assignments",
    "Dring water",
  ];
  return (
    <>
      <View>
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-row">
            {tags.map((tag) => (
              <Pressable
                key={tag}
                className="bg-[#7CB9E8] px-3 py-2 rounded-full m-3"
              >
                <Text className="text-white">{tag}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable className="bg-blue-500 rounded-full p-3 h-10 w-10 mr-3 ">
            <AntDesign
              name="plus"
              onPress={() => setIsModalVisible(!isModalVisible)}
              size={18}
              color="white"
            />
          </Pressable>
        </View>
      </View>

      <ScrollView className="bg-white">
        <View>
          {PendingTodos.length != 0 && CompletedTodos.length != 0 ? (
            <View>
              <Text className="text-[22px] mx-2  font-semibold">
                Task to do {moment().format("DD-MM-YYYY")}
              </Text>
              {PendingTodos.map((todo) => {
                <View key={todo._id} className="flex flex-col w-full ">
                  <View className="w-[96%] my-2  mx-[2%] flex flex-row h-[50px] items-center  rounded-md bg-gray-300 justify-between">
                    <Pressable className=" ml-2 w-[7%]">
                      <AntDesign name="clockcircleo" size={20} color="black" />
                    </Pressable>
                    <Text className="text-[16px] w-[70%] text-left">
                      {todo.task}
                    </Text>
                    <View className="w-[20%] flex items-end mr-8 ">
                      <MaterialCommunityIcons
                        name="flag-variant-outline"
                        size={27}
                        color="black"
                      />
                    </View>
                  </View>
                </View>;
              })}

              <Image
                className="h-[190px] my-10 mx-24 w-[200px]"
                source={require("./b.png")}
              />

              <Text className="text-[22px] mx-3 font-semibold ">
                Completed Tasks
              </Text>

              {CompletedTodos.map((todo) => (
                <View key={todo._id} className="flex flex-col w-full ">
                  <View className="w-[96%] my-2  mx-[2%] flex flex-row h-[50px] items-center  rounded-md bg-gray-300 justify-between">
                    <Pressable className=" ml-2 w-[7%]">
                      <AntDesign name="checkcircle" size={20} color="black" />
                    </Pressable>
                    <Text className="text-[16px] w-[70%] text-left">
                      {todo.task}
                    </Text>
                    <View className="w-[20%] flex items-end mr-8 ">
                      <MaterialCommunityIcons
                        name="flag-variant-outline"
                        size={27}
                        color="black"
                      />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View className=" flex flex-col justify-center items-center mt-[100px]">
              <Image
                className="h-[200px] w-[300px] rounded-[10px]"
                source={require("./bnm.png")}
              />
              <Text className="text-gray-700 text-xl m-6 font-bold">
                You have no task today! add a task
              </Text>
              <Pressable className="bg-blue-500 rounded-full p-3 h-10 w-10 mr-3 ">
                <AntDesign
                  name="plus"
                  onPress={() => setIsModalVisible(!isModalVisible)}
                  size={18}
                  color="white"
                />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
      <BottomModal
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onHardwareBackPress={() => setIsModalVisible(!isModalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Add a todo" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => setIsModalVisible(!isModalVisible)}
      >
        <ModalContent className="w-[100%] h-[330px]">
          <View className="flex flex-row justify-between items-center">
            <TextInput
              value={todo}
              onChangeText={(text) => setTodo(text)}
              className="border-gray-300 border-y-2 border-x-2 rounded-md p-2 p-x-3 w-[90%]"
              placeholder="Input a new task here"
            />
            <Pressable onPress={todoSend}>
              <Ionicons name="send" size={28} color="blue" />
            </Pressable>
          </View>
          <Text className="text-xl  m-1 mr-2">Choose Category</Text>
          <View className="flex flex-row">
            <Pressable
              className={`border-gray-200 mx-2 border-2 py-1 px-2 rounded-full ${
                category == "Work" && "bg-blue-400"
              }`}
              gray-700
              onPress={() => setCategory("Work")}
            >
              <Text className="text-[15px]">Work</Text>
            </Pressable>
            <Pressable
              className={`border-gray-200 mx-2 border-2 py-1 px-2 rounded-full ${
                category == "Personal" && "bg-blue-400"
              }`}
              onPress={() => setCategory("Personal")}
            >
              <Text className="text-[15px]">Personal</Text>
            </Pressable>
            <Pressable
              className={`border-gray-200 mx-2 border-2 py-1 px-2 rounded-full ${
                category == "Wishlist" && "bg-blue-400"
              }`}
              onPress={() => setCategory("Wishlist")}
            >
              <Text className="text-[15px]">Wishlist</Text>
            </Pressable>
          </View>
          <Text className="text-xl  m-1 mr-2">Some suggestions</Text>
          <View className="flex flex-row flex-wrap">
            {suggestions.map((suggestion) => (
              <Pressable
                key={suggestion}
                onPress={() => setTodo(suggestion)}
                className={`border-gray-200 mx-2 border-2 py-1 px-2 rounded-full ${
                  todo == suggestion && "bg-blue-400"
                }`}
              >
                <Text className="text-[15px]">{suggestion}</Text>
              </Pressable>
            ))}
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default index;
