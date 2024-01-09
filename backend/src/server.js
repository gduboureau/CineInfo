import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index.js';
import swaggerDocs from './utils/swaggerOptions.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(express.json({ limit: '20mb' }));

app.use('/', routes);

swaggerDocs(app, PORT);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
