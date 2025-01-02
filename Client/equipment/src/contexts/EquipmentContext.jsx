import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const EquipmentContext = createContext();

const EquipmentProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get("/api/equipment");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching equipment:", error);
      }
    };

    fetchEquipment();
  }, []);

  return (
    <EquipmentContext.Provider value={{ items }}>
      {children}
    </EquipmentContext.Provider>
  );
};

export default EquipmentProvider;
