"use client";

import React from "react";
import { createContext, useState , useEffect } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [address, setAddress] = useState(localStorage.getItem("address"));
  const [suggestions, setSuggestions] = useState([]);
  const [outlets , setOutlets] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  
  useEffect(()=>{
    // console.log("i am running sir")
   if(!localStorage.getItem("lat") || !localStorage.getItem("lon") || !localStorage.getItem("address") ) 
    {
     setOpen(true);
    }
    
  },[address])



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
        setSearchResult
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
