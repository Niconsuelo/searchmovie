import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetail from '../components/MovieDetail';
import Movie from '../models/Movie';
import { getMovieDetail, getMovieGenres } from '../services/APIService';
import { toast } from 'react-toastify';
import GenreList from '../models/GenreList';

const PageMovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [genres, setGenres] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    getMovieGenres()
      .then((data: GenreList) => {
        setGenres(data.genreMap);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  // carga detalle de peliculas, cuando hay un cambio de id o generos
  useEffect(() => {
    //verifiqué si hay Id valido 
    //verifiqué que se carguen géneros
    // genres.size representa el número de elementos ue hay dentro del mapa genres.
    // Si genres.size es mayor que cero, significa que el mapa genres no está vacío y contiene al menos un género.
    if (id && genres.size > 0) {
      const loadingToastId = toast.loading("Loading movie details...");
      //obtiene detalles de peliculas
      //parseInt(id) en este contexto se usa para convertir la cadena id (que representa el ID de la película como texto) en un número entero para ser usado como parámetro en la función getMovieDetail
      getMovieDetail(parseInt(id), genres)
        .then((data) => {
          setMovie(data);
          //cierra el toast de carga
          toast.dismiss(loadingToastId);
        })
        .catch((error) => {
          toast.update(loadingToastId, {
            render: error.message,
            type: 'error',
            isLoading: false,
            autoClose: 3000,
          });
        });
    }
  }, [id, genres]);

  if (!movie) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <MovieDetail movie={movie} />
      <div className="footer">© 2024 All Rights Reserved</div>
    </div>
  );
};

export default PageMovieDetails;
