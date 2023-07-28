"use client";
import React, { useContext, useEffect } from "react";
import Header from "../header/page";
import { db } from '@/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Carousl from "../carousel/page";
import { DataContext } from "../context/page";
import Outlets from "../outlets/page";
import { encryptAndSaveData ,decryptData } from "@/utils/crypto";

const api_key = "181256ee-689d-41bb-960c-75cad0c4644f";
async function getDistance(lat1, lon1, lat2, lon2) {
  
  const base_url = `https://graphhopper.com/api/1/route?point=${lat1},${lon1}&point=${lat2},${lon2}&vehicle=car&locale=en&key=${api_key}`;
  const response = await fetch(base_url);
  const data = await response.json();
  // console.log(data);
  const distance = data.paths[0].distance;
  return distance/1000;
}



const Container = () => {
  const {outlets , setOutlets,setSearchResult,city} = useContext(DataContext);
  const {address}  = useContext(DataContext);
  


  let lat = decryptData("lat");
  let lon = decryptData("lon");
  
  let buttonRef = doc(db, 'outlet', city);
  console.log(" city in container is  ", city);
 

  const fetchData = async () => {
    // console.log("fetch data is called");
    try {
      const docSnapshot = await getDoc(buttonRef);
      if (docSnapshot.exists()) {
        console.log("firebase result = ",docSnapshot.data())
        const da = docSnapshot.data().Res1;
         console.log("da for ",city ," is ", da);
        let filteredData = [];
        for (var i = 0; i < da?.length; i++) {
          
          let distanceBet = await getDistance(lat, lon, da[i].lat, da[i].long);
         
          if (distanceBet <= 30) {
            
            const newDataWithDistance = { ...da[i], distance: distanceBet };
            filteredData.push(newDataWithDistance);
          }
        }
        setOutlets(()=>[...filteredData]); // Update the state with the filtered data here

      } else {
         console.log("not exixts");
      }
    } catch (error) {
      console.error('Error fetching button data:', error);
    }
  };

  useEffect(()=>{
    fetchData();
    setSearchResult([]);
  },[city])

  useEffect(()=>{
    fetchData();
  },[address]);

// fetchData();

// Call the fetchData function to get the data




  // const handleChange = (event) => {
  //   setData((prev) => {
  //     return { ...prev, [event.target.id]: event.target.value };
  //   });
  // };

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
    <div className="m-2 font-Jost tracking-widest">
       <Header/>
       <Carousl/>
       <Outlets/>
       
    </div>
  );
};

export default Container;
