const defaultState = {
  selectedItems: { items: [], restaurantName: "" },
};

const cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let newState = { ...state };
       if (action.payload.checkboxValue) {
        console.log("ADD_TO_CART"); 
        console.log("Action payload:", action.payload);
        newState.selectedItems = {
          items: [...newState.selectedItems.items, action.payload],
          restaurantName: action.payload.restaurantName,
        };
      } else {
        console.log("REMOVE_FROM_CART");
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter(
              (item) => item.title != action.payload.title
            ),
          ],
          restaurantName:action.payload.restaurantName,
        };
      }
      console.log(JSON.stringify(newState, null, 2), ":👉");
      return newState;
    }

    default:
      return state;
  }
};

export default cartReducer;
