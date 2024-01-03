CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- For UUID generation

DROP TABLE IF EXISTS users;
CREATE TABLE public.users (
    user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    mail character varying(230) NOT NULL,
    password character varying(100) NOT NULL,
    username character varying(100) NOT NULL,
    firstname character varying(100) NOT NULL,
    lastname character varying(100) NOT NULL
);

DROP TABLE IF EXISTS FavoriteMovies;
CREATE TABLE public.FavoriteMovies (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES users(user_id),
    movie_id INT NOT NULL,
    CONSTRAINT unique_favorite_movie UNIQUE (user_id, movie_id)
);

DROP TABLE IF EXISTS MovieRatings;
CREATE TABLE public.MovieRatings (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES users(user_id),
    movie_id INT NOT NULL,
    rating DECIMAL(2, 1) NOT NULL,
    CONSTRAINT unique_movie_rating UNIQUE (user_id, movie_id)
);

DROP TABLE IF EXISTS FavoriteSeries;
CREATE TABLE public.FavoriteSeries (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES users(user_id),
    serie_id INT NOT NULL,
    CONSTRAINT unique_favorite_serie UNIQUE (user_id, serie_id)
);

DROP TABLE IF EXISTS SerieRatings;
CREATE TABLE public.SerieRatings (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES users(user_id),
    serie_id INT NOT NULL,
    rating DECIMAL(2, 1) NOT NULL,
    CONSTRAINT unique_serie_rating UNIQUE (user_id, serie_id)
);