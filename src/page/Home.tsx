import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";
import "../styles/MovieList.css";
import "../styles/NavBar.css";
import { getMovieGenres, getMovies } from "../services/APIService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MovieList from "../components/movielist";
import ListPaginationList from "../models/ListPaginationMovie";
import Pagination from "../components/Pagination";
import NavBar from "../components/Navbar";
import { useSearchParams } from "react-router-dom";
import GenreList from "../models/GenreList";
import GenresOptions from "../models/GenresOptions";
import Movie from "../models/Movie";
import CarouselMovie from "../components/CarouselMovie";
import { moviesData } from "../data/moviesData";
import logo3 from "../assets/logo3.png";
import NavBarLogo from "../components/NavLogo";

const Home: React.FC = () => {
  const selectOptionSort: GenresOptions[] = [
    {
      label: "Asc",
      value: "title.asc",
    },
    {
      label: "Desc",
      value: "title.desc",
    },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPageMovie, setTotalPageMovie] = useState<number>(0);
  const [currentPageMovie, setCurrentPageMovie] = useState<number>(
    page ? Number(page) : 1
  );
  const [firstLoad, setFirstLoad] = useState<boolean>(false);
  const [genres, setGenres] = useState<Map<number, string>>(new Map());
  const [genreOption, setGenreOption] = useState<GenresOptions[]>([]);
  const [option, setOption] = useState<GenresOptions | null>(null);
  const [sortBy, setSortBy] = useState<GenresOptions | null>(null);

  const SelectPageNumber = (numberPage: number) => {
    setCurrentPageMovie(numberPage);
    setSearchParams((queryParams) => {
      const newParams = new URLSearchParams(queryParams);
      newParams.set("page", numberPage.toString());
      return newParams;
    });
    console.log(`Prueba: Página seleccionada: ${numberPage}`);
  };

  useEffect(() => {
    getMovieGenres()
      .then((data: GenreList) => {
        setGenres(data.genreMap);
        setGenreOption(data.genreOption);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  useEffect(() => {
    if (genres.size > 0) {
      setIsLoading(true);

      const id = toast.loading("Por favor espere...");

      getMovies(
        {
          page: currentPageMovie,
          genreId: Number(option?.value || -1),
          sortBy: sortBy ? sortBy.value : null,
        },
        genres
      )
        .then((data: ListPaginationList) => {
          const movies = data.movies;
          setMovies(movies);

          setMovies(movies);
          setTotalPageMovie(data.metaData.pagination.totalPages);

          if (firstLoad === false) {
            toast.update(id, {
              render: "¡Bienvenido! La página se ha cargado con éxito.",
              type: "success",
              isLoading: false,
              autoClose: 1000,
            });
          } else {
            setTimeout(() => {
              toast.dismiss(id);
            }, 800);
          }

          setFirstLoad(true);
        })

        .catch((error) => {
          toast.update(id, {
            render: error.message,
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    // eslint-disable-next-line
  }, [currentPageMovie, genres, option, sortBy]);

  const OnChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const selectOption = genreOption.find((opt) => opt.value === value) || null;
    setOption(selectOption);
    setSearchParams((queryParams) => {
      const newParams = new URLSearchParams(queryParams);
      if (selectOption) {
        newParams.set("genreId", selectOption.value);
      } else {
        newParams.delete("genreId");
      }
      return newParams;
    });
  };

  const onClickButton = () => {
    setOption(null);
    setCurrentPageMovie(1);
    setSortBy(null);
    setSearchParams((queryParams) => {
      const newParams = new URLSearchParams(queryParams);
      newParams.delete("genreId");
      newParams.delete("sortBy");
      newParams.set("page", "1");
      return newParams;
    });
  };

  const OnChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valueSort = e.target.value;
    const selectionSort =
      selectOptionSort.find((sor) => sor.value === valueSort) || null;
    setSortBy(selectionSort);
    setSearchParams((queryParams) => {
      const newParams = new URLSearchParams(queryParams);
      if (selectionSort) {
        newParams.set("sortBy", selectionSort.value);
      } else {
        newParams.delete("sortBy");
      }
      return newParams;
    });
  };

  const items = ["Inicio", "Filtros", "Contacto"];

  return (
    <div className="container-home">
      <div className="nav-logo">
        <NavBarLogo imageSrcPath={logo3} navItems={items} />
      </div>

      <div className="title-home">descubre los clásicos de culto en</div>
      <div className="title-home-name">cinema paraiso</div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 20 }}>
        <CarouselMovie movies={moviesData} />
      </div>

      <NavBar
        genreOptionProps={genreOption}
        onChangeProps={OnChangeOption}
        selectOption={option}
        onClick={onClickButton}
        selectorSort={selectOptionSort}
        sortBy={sortBy}
        OnChangeSortBy={OnChangeSort}
      />
      {isLoading}

      <MovieList movies={movies} />

      <Pagination
        currentPage={currentPageMovie}
        totalPage={totalPageMovie}
        onSelectPage={SelectPageNumber}
      />

      <div className="footer">Niconsuelo © 2025 All Rights Reserved</div>
    </div>
  );
};

export default Home;
