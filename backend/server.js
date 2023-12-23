import express from 'express';
//import pkg from 'pg';
//const { Pool } = pkg;x
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  /*const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DATABASE_PORT,
  });

  pool.query('SELECT * FROM public."Users"', (error, result) => {
    if (error) {
      console.error('Erreur lors de l\'exécution de la requête :', error);
    } else {
      console.log('Résultat de la requête :', result.rows);
      res.send(result.rows);
    }

    // Ne pas oublier de libérer la connexion après l'utilisation
    pool.end();
  });*/
  res.send('Hello from Express!');


});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


