import { createStore } from "redux";
///import thunk from "redux-thunk"; // Assuming you're using redux-thunk
import rootReducer from "./reducers/index"; // Adjust the path if necessary

const configureStore = (initialState) => {
  const store = createStore(rootReducer, initialState);
  return store;
};

export default configureStore;
