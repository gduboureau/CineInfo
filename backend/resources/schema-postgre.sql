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