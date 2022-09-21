import { combineReducers } from "redux";
import actionTypes from "../../constants/actionTypes";
import { cartReducer } from "../modules/cart/cartReducer";
import { langReducer } from "../modules/lang/langReducer";
import promiseReducer from "../modules/promiseReducer";

const {
  GET_ORDERS,
  GET_LOANS,
  GET_HISTORY,
  GET_CURRENCY,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_IDS,
  GET_CATEGORIES,
  GET_MESSAGES,
  GET_TG_BOT_USERS,
  GET_SUPPLIERS,
  GET_CERTIFICATES,
  GET_CLIENTS,
  GET_USERS_CLIENTS,
  GET_HISTORY_PERIOD,
  GET_ME,
} = actionTypes;

export const rootReducer = combineReducers({
  lang: langReducer,
  cart: cartReducer,
  orders: (state, action) => promiseReducer(state, action, GET_ORDERS),
  loans: (state, action) => promiseReducer(state, action, GET_LOANS),
  history: (state, action) => promiseReducer(state, action, GET_HISTORY),
  currency: (state, action) => promiseReducer(state, action, GET_CURRENCY),
  products: (state, action) => promiseReducer(state, action, GET_PRODUCTS),
  productsByIds: (state, action) =>
    promiseReducer(state, action, GET_PRODUCTS_BY_IDS),
  categories: (state, action) => promiseReducer(state, action, GET_CATEGORIES),
  messages: (state, action) => promiseReducer(state, action, GET_MESSAGES),
  tgBotUsers: (state, action) =>
    promiseReducer(state, action, GET_TG_BOT_USERS),
  suppliers: (state, action) => promiseReducer(state, action, GET_SUPPLIERS),
  certificates: (state, action) =>
    promiseReducer(state, action, GET_CERTIFICATES),
  clients: (state, action) => promiseReducer(state, action, GET_CLIENTS),
  usersClients: (state, action) =>
    promiseReducer(state, action, GET_USERS_CLIENTS),
  getHistoryWithPeriod: (state, action) =>
    promiseReducer(state, action, GET_HISTORY_PERIOD),
  getMe: (state, action) => promiseReducer(state, action, GET_ME),
});
