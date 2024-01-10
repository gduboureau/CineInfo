import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CineInfo API',
      description: "API endpoints for CineInfo - your go-to source for information on movies and TV series, documented on Swagger.",
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:8080/",
        description: "Local server"
      },
    ],
  },
  apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export default swaggerDocs;
