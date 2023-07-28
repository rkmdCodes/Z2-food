import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { decryptData } from "@/utils/crypto";

async function getDistance(lat1, lon1, lat2, lon2) {
    const api_key = "181256ee-689d-41bb-960c-75cad0c4644f";
    const base_url = `https://graphhopper.com/api/1/route?point=${lat1},${lon1}&point=${lat2},${lon2}&vehicle=car&locale=en&key=${api_key}`;
    const response = await fetch(base_url);
    const data = await response.json();
  
    const distance = data.paths[0].distance;
    return distance / 1000;
  }


export const fetchData = async (buttonRef,setOutlets) => {
    let lat = decryptData("lat");
    let lon = decryptData("lon");

    try {
      const docSnapshot = await getDoc(buttonRef);
      if (docSnapshot.exists()) {
        const da = docSnapshot.data().Res1;

        let filteredData = [];
        for (var i = 0; i < da?.length; i++) {
          let distanceBet = await getDistance(lat, lon, da[i].lat, da[i].long);

          if (distanceBet <= 30) {
            const newDataWithDistance = { ...da[i], distance: distanceBet };
            filteredData.push(newDataWithDistance);
          }
        }
        setOutlets(() => [...filteredData]);
      }
    } catch (error) {
      console.error("Error fetching button data:", error);
    }
  };