// src/data/movies.ts
import { MovieCarousel } from "../models/MovieCarousel";
import mysery from "../assets/mysery.jpeg";
import american from "../assets/american.jpg";
import animales from "../assets/animales.jpeg";
import blair from "../assets/blair.jpeg";
import hereditary from "../assets/hereditary.jpg";
import psycho from "../assets/psycho.jpeg";
import cuarto from "../assets/cuarto.webp";

import pulp from "../assets/pulp.jpeg";
import midsomar from "../assets/midsomar.jpeg";

export const moviesData: MovieCarousel[] = [
  {
    id: 5,
    posterUrl: mysery,
  },
  {
    id: 5,
    posterUrl: hereditary,
  },
  {
    id: 3,
    posterUrl: american,
  },
  {
    id: 4,
    posterUrl: animales,
  },
  {
    id: 5,
    posterUrl: blair,
  },

  {
    id: 5,
    posterUrl: psycho,
  },
  {
    id: 5,
    posterUrl: cuarto,
  },

  {
    id: 5,
    posterUrl: pulp,
  },

  {
    id: 5,
    posterUrl: midsomar,
  },
];
