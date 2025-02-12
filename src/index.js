import express, { Router } from 'express';
import { connectDB } from './config/db.js';
import routes from './routes/index.js';
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api', routes);


// app.listen(PORT, () => {
//   connectDB();
//   console.log(`Example server in http://localhost:${PORT}`);
// });

connectDB();
export default app;
