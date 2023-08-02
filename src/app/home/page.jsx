"use client"
import React, { useContext, useEffect } from "react";
import Header from "../header/page";
import { db } from "@/firebase/firebase";
import { doc } from "firebase/firestore";
import Carousl from "../carousel/page";
import { DataContext } from "../context/page";
import Outlets from "../outlets/page";
import { fetchData } from "@/firebase/queries";

const Container = () => {
  const {address,setOutlets, setSearchResult, city } = useContext(DataContext) ?? {};

  let buttonRef = doc(db, "outlet", city?city:"Ua2yAysHWwSA20ysf5ye");

  useEffect(() => {
    fetchData(buttonRef, setOutlets);
    setSearchResult([]);
  }, [city]);

  useEffect(() => {
    fetchData(buttonRef, setOutlets);
  }, [address]);
  
  

  return (
    <div className="m-2 font-Jost tracking-widest">
      <Header />
      <Carousl />
      <Outlets />
    </div>
  );
};

export default Container;
