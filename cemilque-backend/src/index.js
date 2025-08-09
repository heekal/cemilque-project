import express from 'express';
import cors from 'cors';
import orderRoutes from './routes/orderRoute.js';
import menuRoutes from './routes/menuRoute.js';
import berandaRouters from './routes/berandaRoute.js';
import storageRoutes from './routes/storageRoute.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Serve static files - change this line
app.use('/public', express.static('public'));

app.use('/api', orderRoutes);
app.use('/api', menuRoutes);
app.use('/api', berandaRouters);
app.use('/api', storageRoutes);
app.use('/api/upload', uploadRoutes);

app.listen(port, () => {
    console.log("listening on port 3000")
});