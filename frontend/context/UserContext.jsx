import { createContext, useState } from "react";

export const UserContext = createContext({
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const login = (username, password) => {
    fetchUser(username)
      .then((user) => {
        if (password === "123") {
          setUser(user);
          setError("");
        } else {
          setError("Wrong Password");
        }
      })
      .catch(() => setError("Username not recognised"));

  };

  return (
    <UserContext.Provider value={{ user, login, error }}>
      {children}
    </UserContext.Provider>
  );
};
