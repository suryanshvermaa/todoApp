import { View, Text } from 'react-native'
import {Redirect} from 'expo-router';
import React from 'react'

const index = () => {
  return (
    // <Redirect href={'/(auth)/login'}/>
    <Redirect href={'/(auth)/signup'}/>

  )
}

export default index