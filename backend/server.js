import express from 'express';
import fetch from 'node-fetch';
import { connectToRedis, getFromCache, saveToCache, removeFromCache, closeConnection } from './redis/redis.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', async (req, res) => {
  // Exemple connection postgres

  /*try {
    const result = await db.query('SELECT * FROM public."Users"');
    res.send(result.rows); 
  } catch (error) {
    console.error('Erreur lors de la requête:', error);
    res.status(500).send('Erreur lors de la requête'); 
  }*/


  // Exemple connection redis 

  
  /*try {
    await connectToRedis();

    const apiKey = '7f0799a761376830477332b8577e17fe';
    const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
    const tmdbData = await tmdbResponse.json();

    const movies = tmdbData.results;

    // Stocker les données dans Redis
    for (const movie of movies) {
      const key = `movie:${movie.id}`;
      await saveToCache(key, movie);
      console.log(`Movie with ID ${movie.id} stored in Redis`);
    }

    // Exemple de récupération d'un film spécifique
    const movieId = 940721; // Remplacez par l'ID d'un film réel
    const storedMovie = await getFromCache(`movie:${movieId}`);
    console.log(`Retrieved movie from Redis: ${JSON.stringify(storedMovie)}`);

  } catch (error) {
    console.error('Erreur lors de la connexion à Redis ou de la récupération des données TMDB:', error);
  } finally {
    closeConnection();
  }*/
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});