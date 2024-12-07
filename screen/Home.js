import { View, StyleSheet, StatusBar, ScrollView ,Text} from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderTabs from '../components/home/HeaderTabs';
import SearchBar from '../components/home/SearchBar';
import Categories from '../components/home/Categories';
import RestaurantItems from '../components/home/RestaurantItems';
import { Divider } from 'react-native-elements';
import BottomTab from '../components/home/BottomTab';

const API_URL ="http://192.168.1.3:3000/restaurants";

export default function Home({navigation}) {
  const [restaurantData, setRestaurantData] = useState([]);
  const [city ,setCity] =useState("");
  const [activeTab ,setActiveTab] =useState("Delivery")
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
    const getRestaurantData = async (city) => {
      try {
        setLoading(true); 
        const url = city ? `${API_URL}?city=${city}` : API_URL;
        console.log('Fetching restaurant data from:', url);
        //console.log('Fetching restaurant data from:', city);
        const response = await fetch(url);
        console.log("response")
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', JSON.stringify(data));
        setRestaurantData(data);
        setLoading(false);
        setNoData(data.length === 0);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
        setLoading(false);
        setNoData(true);
      }
    };

    const handleCityChange = (selectedCity) => {
      setCity(selectedCity);
    };
    const filterRestaurants =(data,tab)=>{
      return data.filter(restaurant=>restaurant.service.includes(tab.toLowerCase()))
    };
   
    useEffect(() => {
    getRestaurantData();
    }, []);

    useEffect(() => {
     getRestaurantData(city);
    }, [city,activeTab]);
  
    const filteredData = filterRestaurants(restaurantData, activeTab);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#eeee" barStyle="dark-content" />
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
        <SearchBar cityHandler={handleCityChange} setSuggestionsVisible={setSuggestionsVisible}/>
      </View>
      <View style={{flex:1}}>
       {
        !suggestionsVisible?( <ScrollView 
       style={suggestionsVisible ? styles.scrollViewShifted : styles.scrollView}
       showsVerticalScrollIndicator={false}>
        <Categories/>
        <RestaurantItems restaurantData={filteredData} navigation={navigation}/>
       </ScrollView>):(<>
        <View style={{marginTop:200 ,flex:1}}>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        >
        {loading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : noData ? (
            <Text style={styles.noDataText}>No data available for {city}</Text>
          ) : (
            <>
              <Categories/>
              <RestaurantItems restaurantData={filteredData} navigation={navigation}/>
            </>
          )}
        </ScrollView>
        </View>
      </>)
       }
      </View>
      <Divider width={1}/>
      <BottomTab/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeee',
    flex: 1
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20
  },
  noDataText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: 'red'
  }
});
