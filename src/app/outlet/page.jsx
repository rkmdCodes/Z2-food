import React from "react";

function formatString(str, len) {
  if (str && str.length >= len) {
    return str.substr(0, 17) + "...";
  } else {
    return str;
  }
}


const Outlet = ({ imgUrl, name, distance, cuisine }) => {
  distance = distance?.toFixed(1) + " km";
  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex max-h-40 min-h-40 w-full ">
        <img  className="rounded-lg object-cover h-full w-full" src={imgUrl} />
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
