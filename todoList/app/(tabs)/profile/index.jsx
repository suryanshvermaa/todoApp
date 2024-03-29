import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import {LineChart} from 'react-native-chart-kit';

const index = () => {
  return (
    <View className="flex flex-col h-[100%] bg-white">
      <View className="flex flex-row">
        <View className="h-20 ml-4 my-6 w-20  rounded-full bg-black">
          <Image className="h-20  w-20" source={require("./user1.png")} />
        </View>
        <View>
          <Text className="text-xl mt-10 ml-4 mb-1 font-bold">
            Suryansh Verma
          </Text>
          <Text className="text-[15px]  ml-4  font-light">
            Select Categories
          </Text>
        </View>
      </View>
      <View className="ml-3">
        <Text className="text-[18px]">Task Overview</Text>
        <View className="flex flex-row">
          <View className="bg-[#89CFF8] w-[48%] h-[60px] mx-1 rounded-md flex flex-col items-center justify-center"><Text className="text-[17px]">1</Text>
             <Text className="text-[17px]">completed tasks</Text>
          </View>
          <View className="bg-[#89CFF8] w-[48%] h-[60px] mx-1 rounded-md flex flex-col items-center justify-center"><Text className="text-[17px]">2</Text>
             <Text className="text-[17px]">pending tasks</Text>
          </View>
        </View>
      </View>
      {/* <LineChart 
      data={{
        labels:['Pending Tasks', "Completed Tasks"],
        datasets:[
          {data: [2, 1]}
        ]
      }}
      width={Dimensions.get('window').width-20}
      height={220}
      yAxisInterval={2}
      chartConfig={
        {
          backgroundColor:"#e26a00",
          backgroundGradientFrom:"#fb8c00",
          backgroundGradientTo:"#ffa726",
          decimalPlaces:2,
          color:(opacity=1)=>`rgba(255,255,255),${opacity}`,
          labelColor:(opacity=1)=>`rgba(255,255,255),${opacity}`,
          style:{borderRadius:16},
          propsForDots:{
            r:'6',
            strokeWidth:'2',
            stroke:'#ffa726'
          },

        }
      }
      bezier
      style={{borderRadius:16}}
      /> */}
    </View>
  );
};

export default index;
