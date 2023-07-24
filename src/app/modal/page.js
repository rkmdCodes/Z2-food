import React from "react";
import Modal from "react-modal";

const LocationPrompt = () => {
  const [open , setIsOpen] = React.useState(false);

  React.useEffect(()=>{
    setIsOpen(!open)

  }
  ,[localStorage.getItem("latitude")]
  )


   
  return <Modal isOpen={open}>
       <h3>Enable Location</h3>
       <input placeholder="Enter City"/>
  </Modal>;
};

export default LocationPrompt;
