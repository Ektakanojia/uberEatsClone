import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import OrderDetails from "./OrderDetails";
//import firebase from "../../firebase";
import { db, serverTimestamp } from "..//..//firebase";
import { collection, addDoc } from "firebase/firestore";
import LottieView from "lottie-react-native";

const ViewCart = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
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

  console.log(totalINR);

  const addOrderToFirebase = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "orders"), {
        items: items,
        restaurantName: restaurantName,
        createdAt: serverTimestamp(),
      }).then(() =>
        setTimeout(() => {
          setLoading(false);
          setModalVisible(false);
          navigation.navigate("OrderCompleted");
        }, 2500)
      );
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.7)",
    },

    modalCheckoutContainer: {
      backgroundColor: "white",
      padding: 16,
      height: 500,
      borderWidth: 1,
    },
    restaurantHeading: {
      textAlign: "center",
      fontWeight: "600",
      fontSize: 18,
      marginBottom: 10,
    },
    subtotalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
    },
    subtotalText: {
      textAlign: "left",
      fontWeight: "600",
      fontSize: 15,
      marginBottom: 10,
    },
  });
  const checkoutModalContent = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            {restaurantName ? (
              <Text style={styles.restaurantHeading}>{restaurantName}</Text>
            ) : (
              <Text>No Restaurant</Text>
            )}
            {items.map((item, index) => (
              <OrderDetails key={index} item={item} />
            ))}
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text>{totalINR}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: "black",
                  alignItems: "center",
                  padding: 13,
                  borderRadius: 30,
                  width: 300,
                  position: "relative",
                }}
                onPress={() => {
                  addOrderToFirebase();
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Checkout</Text>
                <Text
                  style={{
                    position: "absolute",
                    right: 20,
                    color: "white",
                    fontSize: 15,
                    top: 17,
                  }}
                >
                  {total ? totalINR : ""}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };
  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {checkoutModalContent()}
      </Modal>
      {total ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
            position: "absolute",
            bottom: 25,
            zIndex: 999,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
              alignContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "black",
                flexDirection: "row",
                justifyContent: "flex-end",
                padding: 15,
                alignItems: "center", // Corrected the typo here from "centre" to "center"
                padding: 13,
                borderRadius: 30,
                width: 300,
                position: "relative",
              }}
              onPress={() => setModalVisible(true)}
            >
              <Text style={{ color: "white", fontSize: 20, marginRight: 30 }}>
                View Cart
              </Text>
              <Text style={{ color: "white", fontSize: 20 }}>{totalINR}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
      {loading ? (
        <View
          style={{
            backgroundColor: "black",
            position: "absolute",
            opacity: 0.6,
            justifyContent: "center",
            alignItem: "center",
            flex: 1,
            height: "100%",
            width: "100%",
          }}
        >
          <LottieView
            style={{
              height: 200,
              width:200,
            }}
            source={require("..//..//assets//animations//scanner.json")}
            autoPlay
            speed={3}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default ViewCart;
