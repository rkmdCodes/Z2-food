import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Carousl = () => {
  return (
    <div className="relative ">
      <Carousel
        className="h-207px"
        autoPlay={true}
        transitionTime={500}
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
      >
        <div className="">
          <img src="/assets/banner1.png" alt="Slide 1" />
        </div>
        <div>
          <img src="/assets/banner2.png" alt="Slide 2" />
        </div>
        <div>
          <img src="/assets/banner3.png" alt="Slide 3" />
        </div>
      </Carousel>

      {/* Element with backdrop blur */}
      <div className=""></div>
    </div>
  );
};

export default Carousl;
