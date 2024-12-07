import { View, Text } from 'react-native'
import React from 'react'

const OrderDetails = ({item}) => {
    if (!item || !item.title || !item.price) {
        return null; // Ensure that item, title, and price are defined
      }
    const {title,price} = item;
  return (
    <View style={{
        flexDirection:"row",
        justifyContent:"space-between",
        padding:20,
        borderBottomWidth:1,
        borderBottomColor:"#999"
    }}>
      <Text style={{fontWeight:16,fontSize:16}}>{title}</Text>
      <Text style ={{opacity:0.7, fontSize:16}}>{price}</Text>
    </View>
  )
}

export default OrderDetails