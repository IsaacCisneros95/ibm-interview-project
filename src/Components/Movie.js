import React, { useEffect, useState } from "react";
import { Row, Button, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Movie = ({ movie, imageBaseUrl, favoriteMovies }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const isMovieFavorite = favoriteMovies.find(
      (favMovie) => favMovie.id === movie.id
    )
      ? true
      : false;

    setIsFavorite(isMovieFavorite);
  }, [favoriteMovies, movie.id]);

  const onClickFavoriteHandler = () => {
    fetch(
      `https://api.themoviedb.org/3/account/${process.env.REACT_APP_TMDB_ACCOUNT}/favorite`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`,
        },
        body: JSON.stringify({
          media_type: "movie",
          media_id: movie.id,
          favorite: !isFavorite,
        }),
      }
    );

    setIsFavorite(!isFavorite);
  };

  const onClickDetailsHandler = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Col xs={12} sm={6} md={4} className="my-2">
      <Card bg="light">
        <Card.Img variant="top" src={imageBaseUrl + movie.backdrop_path} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Subtitle>{movie.release_date}</Card.Subtitle>
          <Row className="my-3">
            <Col>
              <Button
                onClick={onClickFavoriteHandler}
                variant={isFavorite ? "outline-warning" : "warning"}
              >
                {isFavorite ? "Remove favorites" : "Add favorites"}
              </Button>
            </Col>
            <Col className="text-center my-auto">
              Rating: {movie.vote_average}
            </Col>
          </Row>
          <Row width="100">
            <Col xs={12} className="">
              <Button
                onClick={onClickDetailsHandler}
                className="w-100"
                variant="info"
              >
                Details
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};
