import { encryptAndSaveData } from "@/utils/crypto";


export async function getLocation(
  address,
  setCity,
  setAddress,
  setOpen,
  setError
) {
  if (!navigator.geolocation) {
    setError("Please Enable Location Permission.");

    setOpen(false);
    return;
  }

  try {
    await navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        encryptAndSaveData("lat", latitude);
        encryptAndSaveData("lon", longitude);

       
        const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&type=city&format=json&apiKey=2d8ae19550a2402fae6668a2e2311cd1`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.results && data.results.length > 0) {
          const city = data.results[0].city;
          const countyState =
            data.results[0].county + " " + data.results[0].state;
         
          encryptAndSaveData("city", city);
          setCity(city);
          encryptAndSaveData("address", countyState);
          setAddress(countyState);

          setError(""); 
          setOpen(true);
        } else {
          setError("Please Enable Location Permission.");
          if (!open) {
            setOpen(true); 
          }
        }
      },
      (error) => {
        
        setError("Please Enable Location Permission.");
        if (!open) {
          setOpen(true); 
        }
      }
    );
  } catch (error) {
    setError("Error occurred while fetching location data.");
    if (!open) {
      setOpen(true); 
    }
  }
}

export const suggestCities = (cityInput,setSuggestions,setError) => {
 
  try {
    fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${cityInput}%20%20Layout&format=json&apiKey=2d8ae19550a2402fae6668a2e2311cd1`
    )
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(
          data.results.map((city) => {
            return {
              formatted: city.address_line1 + " " + city.county,
              lat: city.lat,
              lon: city.lon,
              city: city.city,
            };
          })
        );
      });
  } catch (error) {
    alert("not enabled");

   
  }
};
