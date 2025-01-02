import {useState, useEffect, createContext } from "react";

export const EquipmentContext = createContext();

const EquipmentProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Example API call, replace with actual API logic
    fetch('/api/equipment')
      .then((response) => response.json())
      .then((data) => setItems(data)) // Ensure that `data` is an array
      .catch((error) => console.error(error));
  }, []);
  return (
    <EquipmentContext.Provider value={{ items }}>
      {children}
    </EquipmentContext.Provider>
  );
};

export default EquipmentProvider;
