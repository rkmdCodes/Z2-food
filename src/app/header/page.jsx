import React, {useContext} from "react";
import { DataContext } from "../context/page";


const Header = () => {
  const {address} = useContext(DataContext);  
  const {suggestions, setSuggestions} = useContext(DataContext);
 

  let local_lat = localStorage.getItem("lat"),
    local_long = localStorage.getItem("lon");

  // function getLocation() {
  //   console.log("location service called");
  //   navigator.geolocation.getCurrentPosition((pos) => {
  //     const { latitude, longitude } = pos.coords;
  //     localStorage.setItem("lat", latitude);
  //     localStorage.setItem("lon", longitude);
  //     console.log(latitude, longitude);
  //     const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&type=postcode&format=json&apiKey=2d8ae19550a2402fae6668a2e2311cd1`;
  //     fetch(url)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log("res",data.results[0].county,data.results[0].state)
  //         localStorage.setItem('address',data.results[0].county+' '+data.results[0].state)
  //         setAddress(data.results[0].county+' '+data.results[0].state)
  //         //setAddress(data.address)
  //       });
  //   });
  // }

  // useEffect(() => {
  //   // if (!local_lat && !local_long) getLocation();
  //   setAddress(localStorage.getItem("address"));
  // }, [address]);



 

  // Function to handle city auto-suggestion
  // const suggestCities = (cityInput) => {
  //   fetch(
  //     `https://api.geoapify.com/v1/geocode/search?text=${cityInput}%20%20Layout&format=json&apiKey=2d8ae19550a2402fae6668a2e2311cd1`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("data", data.results[0]);
        
  //       // Extract latitude, longitude, and city names and store them in the state
  //       setSuggestions(
  //         data.results.map((city) => {
  //           return {
  //             formatted: city.address_line1+' '+city.county,
  //             lat: city.lat,
  //             lon: city.lon,
  //             city: city.city ? city.city : city.formatted, // Use city field if available, otherwise use formatted field
  //           };
  //         })
  //       );
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching city suggestions:", error);
  //     });
  // };

  const handleInputLocation = () => {
    localStorage.removeItem("latitude");
    localStorage.removeItem("longitude");
    getLocation();
  };

  
  return (
    <>
      <div>{address}</div>
      {(false) && (
       
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
    </>
  );
};

export default Header;
