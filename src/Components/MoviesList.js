import React, { useEffect, useState, useContext } from "react";
import { Movie } from "./Movie";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { AppContext } from "../store/AppContext";

export const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const { imageBaseUrl } = useContext(AppContext);

  const getFavoriteMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/account/${process.env.REACT_APP_TMDB_ACCOUNT}/favorite/movies`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setFavoriteMovies(data.results));
  };

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/discover/movie", {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMovies(data.results));

    getFavoriteMovies();
  }, []);

  return (
    <>
      {movies.length > 0 && (
        <Container>
          <Row>
            <h1>TMDB Movie List</h1>
          </Row>
          <Row>
            {movies.map((movie) => {
              return (
                <Movie
                  movie={movie}
                  imageBaseUrl={imageBaseUrl}
                  favoriteMovies={favoriteMovies}
                  key={movie.id}
                />
              );
            })}
          </Row>
        </Container>
      )}
    </>
  );
};
