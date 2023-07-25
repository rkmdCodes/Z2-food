"use client";

import React from "react";
import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [address, setAddress] = useState(localStorage.getItem("address"));
  const [suggestions, setSuggestions] = useState([]);
  const [outlets , setOutlets] = useState([]);
   
  return (
    <DataContext.Provider
      value={{
        address,
        setAddress,
        suggestions,
        setSuggestions,
        outlets,
        setOutlets
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
