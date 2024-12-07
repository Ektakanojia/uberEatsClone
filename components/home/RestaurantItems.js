import React from 'react';
import { View, Image,Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

export const localRestaurant = [
  {
    "name": "The French Laundry",
    "image": "https://media.istockphoto.com/id/2152444343/photo/poke-bowl-for-balanced-diet-with-salmon-avocado-radish-cabbage-beans-sesame-and-rice-wooden.webp?b=1&s=170667a&w=0&k=20&c=6TsO2TrWr7Usly7N6VEsfCdcJaEk6_jmhVdsZv71bso=",
    "rating": 4.8,
    "categories": ["French", "Fine Dining"],
    "price": "₹200",
    "review": 10
  },
  {
    "name": "Noma",
    "image": "https://media.istockphoto.com/id/1152493500/photo/authentic-indian-dishes-and-snacks.webp?b=1&s=170667a&w=0&k=20&c=1GDy3FGKx-jaX4LoezPCVrTO-2cgDflAhp1y_T1AZp0=",
    "rating": 4.9,
    "categories": ["Nordic", "Modern"],
    "price": "₹540",
    "review": 66
  },
  {
    "name": "El Celler de Can Roca",
    "image": "https://media.istockphoto.com/id/1295387240/photo/delicious-meal.jpg?s=612x612&w=0&k=20&c=isW6dsxtdADt3pOlxGjmKjFyEY-E76Q3TXMmzN9-wuM=",
    "rating": 4.7,
    "categories": ["Spanish", "Contemporary"],
    "price": "₹28,000",
    "review": 1785
  },
  {
    "name": "Osteria Francescana",
    "image": "https://media.istockphoto.com/id/1169694902/photo/assorted-indian-non-vegetarian-food-recipe-served-in-a-group-includes-chicken-curry-mutton.jpg?s=612x612&w=0&k=20&c=J4jX3IYGdS3ODgHF0LHCySDo6bFObh0_GZzAqHgXZgU=",
    "rating": 4.8,
    "categories": ["Italian", "Contemporary"],
    "price": "₹26,000",
    "review": 1620
  },
  {
    "name": "Eleven Madison Park",
    "image": "https://media.istockphoto.com/id/887216480/photo/friends-having-coffee-together.jpg?s=612x612&w=0&k=20&c=6gh-ki55MbuG6z0mGkRm--_SGrHv4juF2x0Y1HNfoeI=",
    "rating": 4.9,
    "categories": ["American", "Fine Dining"],
    "price": "₹35,000",
    "review": 2110
  }
]

const RestaurantItems = ({navigation ,...props}) => {
  console.log('Navigation prop:', navigation);
  return (
    <>
    {
      props.restaurantData.map((restaurant,index)=>(
        <TouchableOpacity 
        key={index}
        activeOpacity={1}
        style={{marginBottom:30}}
        onPress={()=>navigation.navigate("RestaurantsDetails",{
          name:restaurant.name,
          image:restaurant.image,
          price:restaurant.price,
          review:restaurant.review,
          rating:restaurant.rating,
          categories:restaurant.categories,
          menu:restaurant.menu,

          })}
        >
      <View  style={{marginTop:10 ,padding:15,backgroundColor:"white",borderRadius:20}} >
      <RestaurantImage image={restaurant.image}/>
      <RestaurantInfo  name={restaurant.name} rating={restaurant.rating}/>
    </View>
    </TouchableOpacity>
    ))}
    </>
    
  );
};

const RestaurantImage = (props) => {
   return (
  <>
  
  <Image 
    source={{ uri:props.image }}
    style={{ width: "100%", height: 180 }}
  />
  <TouchableOpacity style={{position:'absolute' ,right:20,top:20}}>
   <MaterialCommunityIcons 
   name='heart-outline' size={25} color='white'
   />
  </TouchableOpacity>
  </>
   )
 
};

const RestaurantInfo = (props)=> {
return (
  <View style={{
    flexDirection:'row' ,
    justifyContent:"space-between",
    alignItems:'center',
    marginTop:10,
    
    }}>
    <View>
    <Text style={{fontsize:'15',fontWeight:'bold'}}>{props.name}</Text>
    <Text style={{fontsize:'13',color:'gray'}}>30-45 * min</Text>
    </View>
    <View 
    style={{backgroundColor:"#eee" ,height: 30 ,width:30,alignItems:'center',justifyContent:'center',borderRadius:15}}
    >
    <Text>{props.rating}</Text> 
    </View>
   
  </View>
)
}
export default RestaurantItems;
