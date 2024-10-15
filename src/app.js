import express from 'express';
import bodyParser from 'body-parser';
import { errorHalden } from './middlewares/errorrhalden.middleware.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Red social de cocina API',
        description: "Red social de cocina API Documentation",
        contact: {
          name: "Red social de cocina",
        },
      },
      servers: [
        {
          url: `${process.env.API_URL}:${process.env.PORT || ''}/`,
          /* url: "https://yumai-services-22b41788c769.herokuapp.com/", */
          description: "test server"
        }
      ]
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        scheme: 'Bearer',
        description:
          'For accessing the API a valid JWT token must be passed in all the queries in the Authorization header.' +
          'The following syntax must be used in the Authorization header :' +
          'Bearer xxxxxx.yyyyyyy.zzzzzz'
      }
    },
    // looks for configuration in specified directories
    apis: ['./src/routers/*.js'],
};
const specs = swaggerJsdoc(options);

const app = express();

//cargar rutas
import gemineRouter from './routers/gemine.route.js';
import usuariosRouter from './routers/usuarios.route.js';

//middlewares
app.use(bodyParser.urlencoded({ extended:false, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));

//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'x-ummbra-security-token, Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();
});

//rutas
app.use('/api/gemine', gemineRouter);
app.use('/api/usuarios', usuariosRouter);

// swagger
app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
});

app.use(
    '/swagger',
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

//error
app.use(errorHalden);

//export
export default app;