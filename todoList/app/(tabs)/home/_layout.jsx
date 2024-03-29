import React from 'react'
import { Stack } from 'expo-router'
import {ModalPortal} from 'react-native-modals';

const _layout = () => {
  return (
    <>
   <Stack screenOptions={{headerShown:false}}>
    <Stack.Screen name='index' />
   </Stack>
   <ModalPortal/>
   </>
  )
}

export default _layout