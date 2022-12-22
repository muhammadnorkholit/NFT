import React, { createContext, useContext, useState } from "react";
const Context = createContext({ user: null });

const ContextComponent = ({ children }) => {
  const date = new Date();
  const [user, _setUser] = useState(
    JSON.parse(localStorage.getItem("USER_DATA"))
  );
  let isLogin = false;

  if (user) {
    if (user.exp < date) {
      localStorage.removeItem("USER_DATA");
      isLogin = false;
    } else {
      isLogin = true;
    }
  }
  function setUser(user) {
    _setUser(user)
    localStorage.setItem(
      "USER_DATA",
      JSON.stringify({ ...user, exp: date.getTime() + 24 * 60 * 60 * 1000 })
    );
    isLogin = true   
    
  }
  // function setLogout() {
  //   localStorage.removeItem("USER_DATA");
  //   logout = true
  // }
  return (
    <Context.Provider value={{ user, setUser, isLogin }}>
      {children}
    </Context.Provider>
  );
};

export const ContextUse = () => useContext(Context);
export default ContextComponent;
