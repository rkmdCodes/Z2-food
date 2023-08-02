"use client"
import React, { useContext } from "react";
import { DataContext } from "../context/page";
import Outlet from "../outlet/page";

const Outlets = () => {
  const { outlets , searchResult} = useContext(DataContext) ?? {};
 
  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center justify-center text-base py-3 gap-0">
          
          <div>
            <p className="text-xs py-2 tracking-[.3rem] text-[#A7A7A7]">
              {searchResult?.length} RESTAURANTS NEAR YOU
            </p>
          </div>
          
        </div>
        
        <div className="grid grid-cols-2 auto-rows-max gap-4">
          {searchResult?.map((outlet) => (
            <Outlet
              key={outlet?.id}
              imgUrl={outlet?.imageUrl}
              name={outlet?.name}
              distance={outlet?.distance}
              cuisine={outlet?.cuisine}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Outlets;
