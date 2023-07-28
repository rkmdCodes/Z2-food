"use client";
import React, { useState, useContext, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { getLocation, suggestCities } from "@/mapApi/api";
import "./modal2.css";
import { DataContext } from "../context/page";
import { encryptAndSaveData, decryptData } from "@/utils/crypto";

const Modal2 = () => {
  const { address, setAddress, setCity } = useContext(DataContext);
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

  const handleSuggestionsClick = (address, lat, lon, city) => {
    setCity(city);
    encryptAndSaveData("city", city);
    encryptAndSaveData("lat", lat);
    encryptAndSaveData("lon", lon);
    encryptAndSaveData("address", address);
    setAddress(address);
    setSuggestions([]);
    setOpen(false);
  };

  return (
    <div>
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
                onClick={() =>
                  getLocation(address, setCity, setAddress, setOpen, setError)
                }
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
                onChange={(event) =>
                  suggestCities(event.target.value, setSuggestions)
                }
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