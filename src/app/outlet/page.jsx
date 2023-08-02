
import React from "react";
import { formatString } from "@/utils/formatString";

const Outlet = ({ imgUrl, name, distance, cuisine }) => {

  distance = distance?.toFixed(1) + " km";
  
  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex min-h-40 max-h-40 w-full ">
        <img  className="block object-cover rounded-lg object-cover h-full w-full" src={imgUrl} />
      </div>
      <div>
        <div className="font-semibold text-base">{formatString(name, 20)}</div>
        <div>
          <div className="flex gap-1 text-[#A7A7A7]">
            <div>{distance}</div>
            <div>·</div>
            <div>{cuisine}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Outlet;
