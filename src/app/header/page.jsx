import React, { useState, useEffect } from "react";




async function getDistance(lat1, lon1, lat2, lon2, api_key) {
  const base_url = `https://graphhopper.com/api/1/route?point=${lat1},${lon1}&point=${lat2},${lon2}&vehicle=car&locale=en&key=${api_key}`;
  const response = await fetch(base_url);
  const data = await response.json();
  const distance = data.paths[0].distance;
  return distance;
}




const Header = () => {
  const [address, setAddress] = useState();
  const [suggestions, setSuggestions] = useState([]);
 

  let local_lat = localStorage.getItem("lat"),
    local_long = localStorage.getItem("lon");

  function getLocation() {
    console.log("location service called");
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      localStorage.setItem("lat", latitude);
      localStorage.setItem("lon", longitude);
      console.log(latitude, longitude);
      const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&type=postcode&format=json&apiKey=2d8ae19550a2402fae6668a2e2311cd1`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log("res",data.results[0].county,data.results[0].state)
          localStorage.setItem('address',data.results[0].county+' '+data.results[0].state)
          setAddress(data.results[0].county+' '+data.results[0].state)
          //setAddress(data.address)
        });
    });
  }

  // useEffect(() => {
  //   if (!local_lat && !local_long) getLocation();
  // }, []);

  const api_key = "181256ee-689d-41bb-960c-75cad0c4644f";
  const lat1 = 52.5200; // Berlin, Germany
  const lon1 = 13.4050;
  const lat2 = 48.8566; // Paris, France
  const lon2 = 2.3522;

  useEffect(() => {
    // Use the getDistance function inside the component
    getDistance(lat1, lon1, lat2, lon2, api_key)
      .then((distance) => {
        console.log(`The distance between the two points is ${distance.toFixed(2)} meters.`);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [api_key, lat1, lon1, lat2, lon2]);


  // Function to handle city auto-suggestion
  const suggestCities = (cityInput) => {
    fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${cityInput}%20%20Layout&format=json&apiKey=2d8ae19550a2402fae6668a2e2311cd1`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data.results[0]);
        
        // Extract latitude, longitude, and city names and store them in the state
        setSuggestions(
          data.results.map((city) => {
            return {
              formatted: city.address_line1+' '+city.county,
              lat: city.lat,
              lon: city.lon,
              city: city.city ? city.city : city.formatted, // Use city field if available, otherwise use formatted field
            };
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching city suggestions:", error);
      });
  };

  const handleInputLocation = () => {
    localStorage.removeItem("latitude");
    localStorage.removeItem("longitude");
    getLocation();
  };

  const handleSuggestionsClick = (address,lat, lon) => {
    localStorage.setItem("lat", lat);
    localStorage.setItem("lon", lon);
    localStorage.setItem("address",address)
    
    setAddress(address);
    setSuggestions([]);
  };
  
  return (
    <>
      <div>{address}</div>
      {(!local_lat && !local_long) && (
       
        <>
          {console.log(local_lat,local_long)}
          <input
            type="text"
            placeholder="Enter Location.."
            onChange={(e) => suggestCities(e.target.value)}
          />
          <div>
         
            {suggestions.map((city, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionsClick(city.formatted,city.lat, city.lon)}
              >
                {city.formatted}
              </div>
            ))}
          </div>
        </>
      )}
      <button onClick={() => handleInputLocation()}>Input Location</button>
    </>
  );
};

export default Header;
