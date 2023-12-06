import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { AppContext } from "../store/AppContext";

export const MovieDetails = () => {
  const { movieId } = useParams();
  const { imageBaseUrl } = useContext(AppContext);

  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER_TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [movieId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    movie && (
      <Container>
        <Row>
          <h1>Movie details</h1>
        </Row>
        <Row>
          <Col xs={12}>
            <Card bg="light">
              <Card.Img
                variant="top"
                src={imageBaseUrl + movie.backdrop_path}
                style={{ height: "400px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Subtitle>{movie.release_date}</Card.Subtitle>
                <Card.Text className="my-3">{movie.overview}</Card.Text>
                <Row>
                  <Col>Budget: {movie.budget}$</Col>
                  <Col className="text-center my-auto">
                    Rating: {movie.vote_average.toFixed(1)}
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col>Revenue: {movie.revenue}$</Col>
                  <Col className="text-center my-auto">
                    Language: {movie.original_language.toUpperCase()}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} className="mt-3">
            <Button variant="secondary" onClick={handleBackClick}>
              Back
            </Button>
          </Col>
        </Row>
      </Container>
    )
  );
};
