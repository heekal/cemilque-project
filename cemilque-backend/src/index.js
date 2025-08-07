import express from 'express';
import cors from 'cors';
import orderRoutes from './routes/orderRoute.js';
import menuRoutes from './routes/menuRoute.js';
import berandaRouters from './routes/berandaRoute.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', orderRoutes);
app.use('/api', menuRoutes);
app.use('/api', berandaRouters);

app.listen(port, () => {
    console.log("listening on port 3000")
});

