import express, { Router } from 'express';
import { connectDB } from './src/config/db.js';
import routes from './src/routes/index.js';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000


app.use(express.json());
app.use('/api', routes);


app.listen(PORT, () => {
  connectDB();
  console.log(`Example server in http://localhost:${PORT}`);
});

