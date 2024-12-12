import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { sequelize } from '@db/connect';
import { gatewayRouter } from './routes/gateway';

const app = express();
const PORT = 3000;

// Configure CORS
app.use(
  cors({
    origin: 'http://localhost:4200',
  })
);

// Middleware
app.use(bodyParser.json());

// Authenticate the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to Database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Sync the models with the database
sequelize.sync().then(() => console.log('Database synchronized'));

app.use('/api', gatewayRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
