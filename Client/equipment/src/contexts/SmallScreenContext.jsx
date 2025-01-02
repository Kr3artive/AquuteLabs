import React, { createContext, useState } from "react";

export const SmallScreenContext = createContext();

const SmallScreenProvider = ({children}) => {
  const [nav, setNav] = useState(false);
  const handleSmall = () => {
    setNav((prev)=> !prev);
  };
  return (
    <SmallScreenContext.Provider
      value={{ nav, setNav, handleSmall }}
    >
      {children}
    </SmallScreenContext.Provider>
  );
};

export default SmallScreenProvider;