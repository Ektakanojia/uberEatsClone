import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import { db } from "../firebase"; // Ensure the correct path is used
//import checkedAnimation from "..//assets//animations//checked.json"
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import MenuItem from "../components/restaurantDetails/MenuItem";

const OrderCompleted = () => {
  const [lastOrder, setLastOrder] = useState({
    items: [],
  });

  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );
  console.log(restaurantName);

  const total = items
    .map((item) => Number(item.price.replace("₹", "")))
    .reduce((prev, curr) => prev + curr, 0);

  const totalINR = total.toLocaleString("en", {
    style: "currency",
    currency: "INR",
  });

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc"),
      limit(1)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setLastOrder(doc.data());
      });
    });

    return () => unsubscribe();
  }, []);

  console.log(totalINR);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          margin: 15,
          alignItems: "center",
          height: "100",
        }}
      >
        <LottieView
          style={{
            height: 100,
            width: 200,
            alignSelf: "center",
            marginBottom: 30,
          }}
          source={require("../assets/animations/check-mark.json")}
          autoPlay
          speed={0.5}
          loop={false}
          onAnimationStart={() => console.log("Animation started")}
          onAnimationFinish={() => console.log("Animation finished")}
        />

        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Your order at {restaurantName} has been placed for {totalINR}
        </Text>
        <ScrollView>
          <MenuItem menu={lastOrder.items} hideCheckbox={true} />
          <LottieView
            style={{ height: 100, width: 300, alignSelf: "center" }}
            source={require("../assets/animations/cooking.json")}
            autoPlay
            speed={0.5}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default OrderCompleted;
