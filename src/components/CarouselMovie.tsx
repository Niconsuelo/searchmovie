import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { MovieCarousel } from "../models/MovieCarousel";
import "../styles/CarouselMovie.css";

type Props = {
  movies: MovieCarousel[];
};

const CarouselMovie: React.FC<Props> = ({ movies }) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,         // <-- activa el autoplay
  autoplaySpeed: 2000, 
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Slider {...settings}>
      {movies.map((movie) => (
        <div key={movie.id}>
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="img-carousel"
          />
        </div>
      ))}
    </Slider>
  );
};

export default CarouselMovie;
