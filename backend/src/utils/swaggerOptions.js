import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Voyage',
      description: "API endpoints for a mini blog services documented on swagger",
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:8080/",
        description: "Local server"
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Spécifiez le chemin de vos fichiers de route
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  // Swagger Page
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Documentation en format JSON
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
