import { View, Text } from 'react-native'
import React from 'react'
import About from '../components/restaurantDetails/About'
import { Divider } from 'react-native-elements'
import MenuItem from '../components/restaurantDetails/MenuItem'
import ViewCart from '../components/restaurantDetails/ViewCart'

const RestaurantsDetails = ({route ,navigation}) => {
  const { name, image, price, review, rating, categories, menu } = route.params;
  return (
    <>
    <About route={route}/>
    <Divider width={1}/>
    <MenuItem restaurantName={route.params.name} menu={menu}/>
    <ViewCart navigation={navigation} />
    </>
  )
}

export default RestaurantsDetails