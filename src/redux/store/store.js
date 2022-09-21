import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import promise from "redux-promise-middleware";
import { rootReducer } from "./rootReducer";

export const store = createStore(rootReducer,applyMiddleware(promise,logger));