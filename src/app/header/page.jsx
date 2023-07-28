import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../context/page";
import { decryptData } from "@/utils/crypto";
import { formatString } from "@/utils/formatString";
const Header = () => {
  const {
    address,
    outlets,
    setOutlets,
    setCity,
    suggestions,
    setSearchResult,
    searchResult,
    setOpen,
    error
  } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchResult([...outlets]);
  }, [outlets]);

  useEffect(() => {
    if (decryptData("city")) setCity(decryptData("city"));
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter outlets based on the search query for 'name' and 'cuisine' fields
    const filteredOutlets = query
      ? outlets.filter(
          (outlet) =>
            outlet.name.toLowerCase().includes(query.toLowerCase()) ||
            outlet.cuisine.toLowerCase().includes(query.toLowerCase())
        )
      : outlets;

    setSearchResult(filteredOutlets);
  };

  let local_lat = decryptData("lat"),
    local_long = decryptData("lon");

  const handleInputLocation = () => {
    localStorage.removeItem("latitude");
    localStorage.removeItem("longitude");
    getLocation();
  };

  return (
    <> 
      <div className="sticky top-0 z-10 flex flex-col bg-white mt-0 pt-4 mb-3.5 pb-1 gap-4">
        <div className="flex justify-between">
          <div>
            <div className="flex text-[#A7A7A7] font-Jost">Pickup Now</div>
            <div className="flex gap-2">
              <div className="text-base font-semibold">
                {formatString(address, 16)}
              </div>
              <div
                onClick={() => {
                  setOpen(true);
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g mask="url(#mask0_2_211)">
                    <path
                      d="M12 14.95C11.8667 14.95 11.7417 14.9292 11.625 14.8875C11.5084 14.8458 11.4 14.775 11.3 14.675L6.67503 10.05C6.4917 9.86667 6.4042 9.63751 6.41253 9.36251C6.42086 9.08751 6.5167 8.85834 6.70003 8.67501C6.88336 8.49167 7.1167 8.40001 7.40003 8.40001C7.68336 8.40001 7.9167 8.49167 8.10003 8.67501L12 12.575L15.925 8.65001C16.1084 8.46667 16.3375 8.37917 16.6125 8.38751C16.8875 8.39584 17.1167 8.49167 17.3 8.67501C17.4834 8.85834 17.575 9.09167 17.575 9.37501C17.575 9.65834 17.4834 9.89167 17.3 10.075L12.7 14.675C12.6 14.775 12.4917 14.8458 12.375 14.8875C12.2584 14.9292 12.1334 14.95 12 14.95Z"
                      fill="#10100E"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div>
            <img
              src={
                "https://order.zingnow.in/assets/webapp/logos/orangeShort.svg"
              }
            />
          </div>
        </div>

        <div className="flex bg-[#F2F2F2] pl-4 rounded-lg items-center gap-2 ">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Vector"
              d="M13.7048 12.8475L17.274 16.4158L16.0948 17.595L12.5265 14.0258C11.1988 15.0902 9.54731 15.6691 7.84564 15.6667C3.70564 15.6667 0.345642 12.3067 0.345642 8.16666C0.345642 4.02666 3.70564 0.666656 7.84564 0.666656C11.9856 0.666656 15.3456 4.02666 15.3456 8.16666C15.3481 9.86832 14.7692 11.5198 13.7048 12.8475ZM12.0331 12.2292C13.0907 11.1416 13.6814 9.68368 13.679 8.16666C13.679 4.94332 11.0681 2.33332 7.84564 2.33332C4.62231 2.33332 2.01231 4.94332 2.01231 8.16666C2.01231 11.3892 4.62231 14 7.84564 14C9.36267 14.0024 10.8205 13.4118 11.9081 12.3542L12.0331 12.2292Z"
              fill="#A7A7A7"
            />
          </svg>
          <input
            className="w-full focus:outline-none h-14 bg-[#F2F2F2] rounded-lg px-4 text-base placeholder:italic"
            type="text"
            placeholder="Find your perfect food match"
            onChange={(event) => handleSearch(event)}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
