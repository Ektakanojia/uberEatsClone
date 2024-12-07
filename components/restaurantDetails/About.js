import { View, Text, Image } from 'react-native'
import React from 'react'

const About = (props) => {
//const {name,image,price,review,rating,categories}= localRestaurantInfo;
const {name,image,price,review,rating,categories}= props.route.params;
const formattedCategories =categories.map((cat)=>cat.title).join('•');
const description =`${formattedCategories} ${price ? ' • ' + price :" " }• 🎫 • ${rating} ⭐(${review}+)`

  return (
    <View>
     <RestaurantImage image={image}/>
     <RestaurantTitle name={name}/>
     <RestaurantDescription 
     description={description}/>
    </View>
  )
}

const RestaurantImage = (props) => {
    return(<Image 
    source={{uri:props.image}} 
    style={{width:"100%",height:180 }}/>
    )
};

const RestaurantTitle = (props) => {
return(
    <Text 
    style={{fontSize:29,fontWeight:600,marginTop:10,marginHorizontal:15}}
    >
      {props.name}
    </Text>
)
};

const RestaurantDescription = (props) => {
return(
    <Text style={{marginTop:10 ,marginHorizontal:15,fontWeight:400,fontSize:15.5}}>
        {props.description}
    </Text>
)
};
export default About