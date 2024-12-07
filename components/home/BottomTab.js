import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const BottomTab = () => {
  return (
    <View style={{
        flexDirection:"row",
        margin:10,
        marginHorizontal:40,
        justifyContent:"space-between"
    }}>
      <Icon icon="home" text="Home"/>
      <Icon icon="search" text="Browser"/>
      <Icon icon="shopping-bag" text="Grocery"/>
      <Icon icon="receipt" text="Orders"/>
      <Icon icon="user" text="Account"/>
    </View>
  )
}

const Icon =(props)=>{
    return (
    <TouchableOpacity activeOpacity={1}>
    <View>
    <FontAwesome5 
    name={props.icon} 
    size={25} 
    style={{
        marginBottom:3 ,alignSelf:'centre',
    }}/>  
    <Text>{props.text}</Text>
    </View>
    </TouchableOpacity>
   
   )
}
export default BottomTab