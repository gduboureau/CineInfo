import React from "react";
import { useState, useEffect } from 'react';
import MainCarousel from './MainCarousel';
import CarouselByCategory from './CarouselByCategory';
import './assets/Homepage.css';

const Homepage = () => {

  const [mainMovies, setMainMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
      fetch("http://localhost:8080/backend/movies/popular", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      })
          .then((response) => response.json())
          .then((data) => setMainMovies(data))
          .catch((error) => console.error("Erreur de recherche :", error));

        fetch("http://localhost:8080/movies/now-playing", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setNowPlayingMovies(data))
            .catch((error) => console.error("Erreur de recherche :", error));

            fetch("http://localhost:8080/movies/top-rated", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => setTopRatedMovies(data))
                .catch((error) => console.error("Erreur de recherche :", error));
  }, []);

    return (
        <div style={{backgroundColor: '#0c0c0c'}} className="home">
            <div className="home-carroussel">
                <MainCarousel movies={mainMovies}/>
            </div>
            <div className="home-nowplayingmovies">
                <h3>Actuellement au cinéma</h3>
                <CarouselByCategory movies={nowPlayingMovies}/>
            </div>
            <div className="home-toprated">
                <h3>Les mieux notés</h3>
                <CarouselByCategory movies={topRatedMovies}/>
            </div>
        </div>
    )
}

export default Homepage