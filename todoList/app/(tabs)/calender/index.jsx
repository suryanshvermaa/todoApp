import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const index = () => {
  const today = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today);
  return (
    <View className="flex-1 bg-white">
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: "#7CB9EB" },
        }}
      />
      <View className=" h-[60%] bg-white rounded-t-3xl">
        <Text className="text-[16px] mx-2 mt-3">Task to do -- </Text>
        <View className="flex flex-col w-full ">
          <View className="w-[96%] my-2  mx-[2%] flex flex-row h-[50px] items-center  rounded-md bg-gray-300 justify-between">
            <Pressable className=" ml-2 w-[7%]">
              <AntDesign name="clockcircleo" size={20} color="black" />
            </Pressable>
            <Text className="text-[16px] w-[70%] text-left">
              Drink Water, Keep healthy
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
      </View>

      <Text className="text-[22px] mx-3 font-semibold ">Completed Tasks</Text>
      <View className="flex flex-col ">
        <View className="w-[96%] my-2  mx-[2%] flex flex-row h-[50px] items-center  rounded-md bg-gray-300 justify-between">
          <Pressable className=" ml-2 w-[7%]">
            <AntDesign name="checkcircle" size={20} color="black" />
          </Pressable>
          <Text className="text-[16px] w-[70%] text-left">
            Drink Water, Keep healthy
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

    </View>
  );
};

export default index;
