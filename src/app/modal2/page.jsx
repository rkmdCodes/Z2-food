"use client";
import React, { useState, useContext } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "../modal2/modal2.css";
import { DataContext } from "../context/page";
import Img from "@/app/output-onlinepngtools.png";

const Modal2 = () => {
  const { address, setAddress } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const { suggestions, setSuggestions } = useContext(DataContext);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

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
              formatted: city.address_line1 + " " + city.county,
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

  function getLocation() {
    console.log("location service called");
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);
      localStorage.setItem("lat", latitude);
      localStorage.setItem("lon", longitude);
      console.log(latitude, longitude);
      const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&type=postcode&format=json&apiKey=2d8ae19550a2402fae6668a2e2311cd1`;
      fetch(url)
        .then((res) => res.json())
        .then(
          (data) => {
            console.log("res", data.results[0].county, data.results[0].state);
            localStorage.setItem(
              "address",
              data.results[0].county + " " + data.results[0].state
            );
            setAddress(data.results[0].county + " " + data.results[0].state);
            //setAddress(data.address)
          },
          (error) => {
            alert(error.message);
          }
        );
    });
    setOpen(false);
  }

  const handleSuggestionsClick = (address, lat, lon) => {
    localStorage.setItem("lat", lat);
    localStorage.setItem("lon", lon);
    localStorage.setItem("address", address);
    setAddress(address);
    setSuggestions([]);
    setOpen(false);
  };

  return (
    <div>
      <button onClick={onOpenModal}>Open modal</button>
      <Modal
        open={open}
        onClose={onCloseModal}
        focusTrapped={false}
        center
        showCloseIcon={false}
        closeOnOverlayClick={false}
        className="background-blur:5px"
        classNames={{ overlay: "customOverlay", modal: "customModel" }}
      >
        <div className="flex flex-col gap-5 ">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between ">
              <div className="flex items-center gap-1.5">
                <svg
                  stroke="#F36C21"
                  fill="#F36C21"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  class="w-5 h-5"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path>
                </svg>
                <h2 className="text-[#F36C21] font-medium">Enable Location</h2>
              </div>
              <button
                onClick={() => getLocation()}
                className="bg-black text-white py-1 px-4 rounded-md"
              >
                Grant
              </button>
            </div>
            <div className="flex text-[#A7A7A7] text-sm">
              Granting location will permit us to store and ensure accurate
              address
            </div>
          </div>
          <div className="h-15">
            <input
              className="w-full py-4 text-base border rounded-md text-gray-700 bg-gray-100 focus:outline-none border-0 h-25px"
              type="text"
              placeholder="Enter Location Manually"
              onChange={(e) => suggestCities(e.target.value)}
            />
            {suggestions.map((city, index) => (
              <div
                key={index}
                onClick={() =>
                  handleSuggestionsClick(city.formatted, city.lat, city.lon)
                }
              >
                {city.formatted}
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Modal2;
