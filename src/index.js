import express, { Router } from 'express';
import { connectDB } from './config/db.js';
import routes from './routes/index.js';

const app = express();
const PORT = 4000;

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Example server in http://localhost:${PORT}`);
});
