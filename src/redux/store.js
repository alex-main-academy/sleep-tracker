import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";

const initialState = {
  isAuth: false,
  user: {},
  isDarkMode: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        isAuth: true,
        user: {
          name: action.payload.name,
          email: action.payload.email,
        },
      };
    case "LOGIN":
      return {
        ...state,
        isAuth: true,
        user: {
          name: action.payload.userName,
          email: action.payload.userEmail,
        },
      };
    case "REFRESH":
      return {
        ...state,
        isAuth: true,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuth: false,
      };
    case "DARK":
      return {
        ...state,
        isDarkMode: true,
      };
    case "LIGHT":
      return {
        ...state,
        isDarkMode: false,
      };
    case "createUser":
      return {
        ...state,
        user: { ...action.payload },
      };
    case "getCurrentUser":
      return {
        ...state,
        user: { ...action.payload },
      };
    default:
      return state;
  }
};

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
