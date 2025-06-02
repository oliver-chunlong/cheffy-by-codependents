import { createContext, useState } from "react";

export const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const [shoppingList, setShoppingList] = useState([
    "example1",
    "example2",
    "example3",
    "example4",
    "example5",
    "example6",
  ]);

  return (
    <ShoppingListContext.Provider value={{ shoppingList, setShoppingList }}>
      {children}
    </ShoppingListContext.Provider>
  );
};
