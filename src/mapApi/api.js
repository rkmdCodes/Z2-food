import { encryptAndSaveData } from "@/utils/crypto";

export async function getLocation(
  address,
  setCity,
  setAddress,
  setOpen,
  setError
) {
  await navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;

    encryptAndSaveData("lat", latitude);
    encryptAndSaveData("lon", longitude);

    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&type=city&format=json&apiKey=2d8ae19550a2402fae6668a2e2311cd1`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        encryptAndSaveData("city", data?.results[0].city);
        setCity(data?.results[0].city);
        encryptAndSaveData(
          "address",
          data.results[0].county + " " + data.results[0].state
        );
        setAddress(data.results[0].county + " " + data.results[0].state);

        if (address) {
          setError("Please Enable location Permission");

          setOpen(false);
        } else {
          setError("");
          setOpen(true);
        }
      });
  });
  setOpen(false);
}

export const suggestCities = (cityInput,setSuggestions) => {
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
