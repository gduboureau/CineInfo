import express from 'express';
import db from './utils/pg.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM public."Users"');
    res.send(result.rows[0]); 
  } catch (error) {
    console.error('Erreur lors de la requête:', error);
    res.status(500).send('Erreur lors de la requête'); 
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


