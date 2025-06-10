import { createContext, useState } from "react";

export const UserContext = createContext({
  user: null,
  login:() => {},
  error: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const fetchUser = async (username) => {
    return Promise.resolve({ id: 1, username, name: "test user" });
  };

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

  const logout = () => {
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, login, error, logout }}>
      {children}
    </UserContext.Provider>
  );
};
