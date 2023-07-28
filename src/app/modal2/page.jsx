"use client";
import React, { useState, useContext, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "../modal2/modal2.css";
import { DataContext } from "../context/page";
import { encryptAndSaveData, decryptData } from "@/utils/crypto";
import Img from "@/app/output-onlinepngtools.png";

const Modal2 = () => {
  const { address, setAddress ,setCity } = useContext(DataContext);
  const { open, setOpen, error, setError } = useContext(DataContext);

  const { suggestions, setSuggestions } = useContext(DataContext);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    if (decryptData("lat")) {
      setOpen(false);
    }
  }, [address]);

  useEffect(() => {
    setError("");
  }, []);
  const suggestCities = (cityInput) => {
    console.log("cityinput inside suggestcities", cityInput);

    try {
      fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${cityInput}%20%20Layout&format=json&apiKey=2d8ae19550a2402fae6668a2e2311cd1`
      )
        .then((response) => response.json())
        .then((data) => {
          // Extract latitude, longitude, and city names and store them in the state
          setSuggestions(
            data.results.map((city) => {
              console.log("inside results map -> city.city", city.city);

              return {
                formatted: city.address_line1 + " " + city.county,
                lat: city.lat,
                lon: city.lon,
                city: city.city, // Use city field if available, otherwise use formatted field
              };
            })
          );
        });
    } catch (error) {
      alert("not enabled");
    }
  };

  async function getLocation() {
    console.log("getlocation called");
    await navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;

      console.log(latitude, longitude);
      encryptAndSaveData("lat", latitude);
      encryptAndSaveData("lon", longitude);

      const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&type=city&format=json&apiKey=2d8ae19550a2402fae6668a2e2311cd1`;
       fetch(url)
        .then((res) => res.json())
        .then((data) => {
          encryptAndSaveData("city",data?.results[0].city)
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

  const handleSuggestionsClick = (address, lat, lon, city) => {
    console.log("lat and lon = ", lat, lon);
    console.log("city from click is = ", city);
    setCity(city);
    encryptAndSaveData("city",city)
    encryptAndSaveData("lat", lat);
    encryptAndSaveData("lon", lon);
    encryptAndSaveData("address", address);
    setAddress(address);
    setSuggestions([]);
    setOpen(false);
  };

  return (
    <div>
      {/* <button onClick={onOpenModal}>Open modal</button> */}
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
                  className="w-5 h-5"
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
              <p>{}</p>
              Granting location will permit us to store and ensure accurate
              address
            </div>
          </div>
          <div className="w-full bg-white">
            <div className="flex  w-full items-center bg-white  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="w-5 h-5 text-zing-dgrey"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                ></path>
              </svg>
              <input
                className="w-full focus:outline-none h-14  px-4 text-base "
                type="text"
                placeholder="Enter Location Manually"
                onChange={(event) => suggestCities(event.target.value)}
              />
            </div>
            {suggestions.map((city, index) => (
              <div
                key={index}
                onClick={() =>
                  handleSuggestionsClick(
                    city.formatted,
                    city.lat,
                    city.lon,
                    city.city
                  )
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
