import express, { Router } from 'express';
import { connectDB } from './config/db.js';
import router from './routes/index.js';

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  connectDB();
  console.log(`Example server in http://localhost:${PORT}`);
});

// mongodb+srv://dedeemir07:<db_password>@cluster0.2kdn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// Pass: SFdnQzqfiWTPgQXe
