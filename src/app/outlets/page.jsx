import React, { useContext } from "react";
import { DataContext } from "../context/page";
import Outlet from "../outlet/page";

const Outlets = () => {
  const { outlets } = useContext(DataContext);
  console.log("outlets is = ", outlets);
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between py-3">
        <div className="w-10">
          <hr />
        </div>
        <div>
          <p className="text-xs tracking-[.3rem] text-[#A7A7A7]">
            9999 RESTAURANTS NEAR YOU
          </p>
        </div>
        <div className="w-10">
          <hr />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Outlet />
        <Outlet />
        <Outlet />
        <Outlet />
        <Outlet />
        <Outlet />
        <Outlet />
        <Outlet />
        <Outlet />
      </div>

      {outlets?.map((outlet) => {
        return (
          <>
            <p>{outlet.name}</p>
            <p>{outlet.cuisine}</p>
          </>
        );
      })}
    </div>
  );
};

export default Outlets;
