"use client";

import React from "react";
import { createContext, useState, useEffect } from "react";
import { decryptData } from "@/utils/crypto";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState("");
  const [city, setCity] = useState("Ua2yAysHWwSA20ysf5ye");

  useEffect(() => {
  
   setAddress(decryptData("address"))    
    if (!decryptData("lat") || !decryptData("lon") || !decryptData("address")) {
      setOpen(true);
     
    }
  }, [address]);



  return (
    <DataContext.Provider
      value={{
        address,
        setAddress,
        suggestions,
        setSuggestions,
        outlets,
        setOutlets,
        open,
        setOpen,
        searchResult,
        setSearchResult,
        error,
        setError,
        city,
        setCity,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
