"use client";
import React from "react";
import Header from "../header/page";
import axios from "axios";
import { db } from '@/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Carousl from "../carousel/page";
import LocationPrompt from "../modal/page";

const Container = () => {
  const [data, setData] = React.useState({
    name: "",
    cuisine: "",
  });

  const buttonRef = doc(db, 'outlet', 'Delhi');

const fetchData = async () => {
  console.log("fetch data is called")
  try {
    const docSnapshot = await getDoc(buttonRef);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      console.log('Button document data:', data);
    } else {
      console.log('Button document not found!');
    }
  } catch (error) {
    console.error('Error fetching button data:', error);
  }
};

fetchData();

// Call the fetchData function to get the data




  const handleChange = (event) => {
    setData((prev) => {
      return { ...prev, [event.target.id]: event.target.value };
    });
  };

  /*  <input
    onChange={(event) => handleChange(event)}
    type="text"
    placeholder="Enter name"
    id="name"
    value={data.name}
  ></input>
  <input
    onChange={(event) => handleChange(event)}
    type="text"
    placeholder="Enter cuisine"
    id="cuisine"
    value={data.cuisine}
  ></input>
      <button onClick={()=>fetchData()}>Add</button>
    </>*/
  return (
    <div>
       <Header/>
       <Carousl/>
   
    </div>
  );
};

export default Container;
