import { combineReducers, createStore } from "redux";
import { AsyncStorage } from "react-native";
import { persistStore, persistReducer } from "redux-persist";
import user from "./ducks/user";
import stockExchange from "./ducks/stockExchange";

const reducers = combineReducers({
  user,
  stockExchange
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  timeout: null
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer);

const persistor = persistStore(store, null);
// persistor.purge();

export { store, persistor };
