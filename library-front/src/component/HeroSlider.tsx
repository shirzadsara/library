import React from "react";
import Slider from "react-slick";

export const HeroSlider: React.FC = () => {

  const images = [
  "/images/book1.jpg",
  "/images/book2.jpg",
  "/images/book3.jpg",
  "/images/book4.jpg",
];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full p-2 min-w-full overflow-hidden my-6">
      <Slider {...settings}>
        {images.map((img, i) => (
          <div key={i} className="p-2">
            <img
              src={img}
              className="w-full h-48 object-cover rounded-md"
              alt={`slide-${i}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

