import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const foods = [
  {
    title: "Margherita Pizza",
    description:
      "Classic pizza topped with fresh tomatoes, mozzarella cheese, and basil.",
    price: "₹450",
    image:
      "https://media.istockphoto.com/id/180822661/photo/cheese-pizza.webp?b=1&s=170667a&w=0&k=20&c=Wj5ngjmBEDET7TO538GViaRuFXjXkdnef7ISOdVCMt4=",
  },
  {
    title: "Chicken Biryani",
    description:
      "Aromatic basmati rice cooked with tender chicken pieces and flavorful spices.",
    price: "₹300",
    image:
      "https://media.istockphoto.com/id/1333127665/photo/chicken-biryani-spicy-indian-malabar-biryani-hyderabadi-biryani-dum-biriyani-pulao-golden.jpg?s=2048x2048&w=is&k=20&c=AtAY-5PW4eW6di6XadrfCKvyjgbPHg1SOLNBQXxRucA=",
  },
  {
    title: "Caesar Salad",
    description:
      "Crisp romaine lettuce tossed with Caesar dressing, croutons, and Parmesan cheese.",
    price: "₹200",
    image:
      "https://media.istockphoto.com/id/1434024382/photo/green-plate-and-caesar-salad-with-caesar-salad-on-a-dark-backgro-fresh-chicken-salad.jpg?s=2048x2048&w=is&k=20&c=DIJgIs0QgBKgYl4pWx6UEFmcp1hgjODhGTsmNKGfpzE=",
  },
  {
    title: "Pasta Alfredo",
    description:
      "Creamy Alfredo sauce served over fettuccine pasta with a sprinkle of parsley.",
    price: "₹350",
    image:
      "https://media.istockphoto.com/id/1398788293/photo/white-sauce-penne-pasta-directly-above-photo.jpg?s=612x612&w=0&k=20&c=azZJNRLTIPhniO6Rhk0MJVzAHlXOy5KMyr7JZNQCDxQ=",
  },
  {
    title: "Butter Chicken",
    description:
      "Tender chicken cooked in a rich, creamy tomato sauce with Indian spices.",
    price: "₹400",
    image:
      "https://media.istockphoto.com/id/1461543694/photo/close-up-view-of-a-bowl-of-chicken-butter-masala-an-indian-food-served-on-red-table.jpg?s=612x612&w=0&k=20&c=Bahs-07olVnO-5K-R0hMMkoD24kbVKbzrfE9tvAD-Ao=",
  },
  {
    title: "Tacos",
    description:
      "Soft corn tortillas filled with seasoned beef, lettuce, cheese, and salsa.",
    price: "₹250",
    image:
      "https://media.istockphoto.com/id/1313361282/photo/mexican-rice-and-chorizo-sausage-wrap.jpg?s=612x612&w=0&k=20&c=7BgOT-kuluQIlZ50l-p-DNvajA66EeB_HIUvW6O_GPM=",
  },
  {
    title: "Sushi Platter",
    description:
      "Assorted sushi rolls with fresh fish, rice, and seaweed, served with soy sauce and wasabi.",
    price: "₹650",
    image:
      "https://media.istockphoto.com/id/1053855452/photo/sushi-set-on-bamboo-plate.jpg?s=612x612&w=0&k=20&c=oOPJ7oR1weGlwvhA7_hL6BLf1wnWox5_e4rzLdRmLdY=",
  },
  {
    title: "Veggie Burger",
    description:
      "A hearty vegetable patty served in a bun with lettuce, tomato, and avocado.",
    price: "₹220",
    image:
      "https://media.istockphoto.com/id/1351847788/photo/tilt-up-shot-of-a-grilled-beef-cheeseburger-with-french-fries.jpg?s=612x612&w=0&k=20&c=1qJwObkEcDa8Ir2PIVbYu1RIEr1969Lc5av95jOMzHw=",
  },
  {
    title: "Tom Yum Soup",
    description:
      "A spicy and sour Thai soup with shrimp, mushrooms, and lemongrass.",
    price: "₹180",
    image:
      "https://media.istockphoto.com/id/2152221510/photo/prawn-noodles-where-succulent-seafood-and-flavorful-broth-come-together-in-a-satisfying.jpg?s=612x612&w=0&k=20&c=tHrVOZQKrEuKrRO5sjnzyH1ecJAfObRjn0Ps4VVf2Jw=",
  },
  {
    title: "Chocolate Cake",
    description:
      "Rich and moist chocolate cake topped with creamy chocolate ganache.",
    price: "₹150",
    image:
      "https://media.istockphoto.com/id/1191458812/photo/chocolate-layer-cake.jpg?s=612x612&w=0&k=20&c=2plIArpL-W7A26kOafqp5cVY7VznJwbO4YpqNfah8yY=",
  },
];

const MenuItem = ({ restaurantName, menu ,hideCheckbox}) => {
  const dispatch = useDispatch();
  const selectItem = (item, checkboxValue) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...item,
        restaurantName: restaurantName,
        checkboxValue: checkboxValue,
      },
    });

  const cartItems = useSelector(
    (state) => state.cartReducer.selectedItems.items
  );
  const isFoodInCart = (food, cartItems) =>
    Boolean(cartItems.find((item) => item.title === food.title));

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {menu.map((food, index) => (
          <View key={index}>
            <View style={styles.menuItemStyle}>
              { hideCheckbox ? (<></>):(
                <BouncyCheckbox
                iconStyle={{ borderColor: "green", borderRadius: 0 }}
                onPress={(checkboxValue) => selectItem(food, checkboxValue)}
                isChecked={isFoodInCart(food, cartItems)}
              />)
              }
              <FoodInfo food={food} />
              <FoodImage food={food} />
            </View>
            <Divider
              width={0.5}
              orientation="vertical"
              style={{ marginHorizontal: 20 }}
            />
          </View>
        ))}
      </ScrollView>
    </>
  );
};

const FoodInfo = (props) => {
  return (
    <View style={{ width: 240, justifyContent: "space-evenly" }}>
      <Text style={styles.titleStyle}>{props.food.title}</Text>
      <Text>{props.food.description}</Text>
      <Text>{props.food.price}</Text>
    </View>
  );
};

const FoodImage = ({...props}) => {
  return (
    <View>
      <Image
        source={{ uri: props.food.image }}
        style={{ width: 100, height: 100, borderRadius: 8 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  titleStyle: {
    fontSize: 19,
    fontWeight: "600",
  },
});

export default MenuItem;
