import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import devToolsEnhancer from "remote-redux-devtools";
import thunk from "redux-thunk";
import rootReducer from "../_reducers";

const loggerMiddleWare = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, loggerMiddleWare)(
  createStore
);

const configureStore = () => {
    return createStoreWithMiddleware(rootReducer, devToolsEnhancer());
};

export default configureStore;
