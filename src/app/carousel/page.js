import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Carousl = () => {
  return (
    <Carousel
      className="h-207px"
      autoPlay={true}
      transitionTime={500}
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      infiniteLoop={true}
    >
      <div>
        <img src="https://order.zingnow.in/assets/slideImages/banner1.png" />
      </div>
      <div>
        <img src="https://order.zingnow.in/assets/slideImages/banner2.png" />
      </div>
      <div>
        <img src="https://order.zingnow.in/assets/slideImages/banner3.png" />
      </div>
    </Carousel>
  );
};

export default Carousl;
