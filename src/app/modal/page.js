import React from "react";

export const Modal = () => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-25">
      <div className="flex justify-center absolute bottom-0 w-full h-fit">
        <h1>Modal</h1>
      </div>
    </div>
  );
};
