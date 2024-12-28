import express from 'express';
import cors from 'cors';
import { connectDB } from './db';
import verificationRoutes from '../routes/verification';

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', verificationRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});