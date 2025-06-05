import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ShoppingListContext = createContext();

const storageKey = "shopping-list";

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKey, jsonValue);
    console.log("Works");
  } catch (e) {
    console.log("Not Works", e);
    // saving error
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("Not Works", e);
    // error reading value
  }
};

export const ShoppingListProvider = ({ children }) => {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    getData().then((list) => setShoppingList(list));
  }, []);

  const setAndSaveShoppingList = (getNewValue) => {
    setShoppingList((prev) => {
      const newValue = getNewValue(prev);
      storeData(newValue);
      return newValue;
    });
  };

  return (
    <ShoppingListContext.Provider
      value={{ shoppingList, setShoppingList: setAndSaveShoppingList }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};
