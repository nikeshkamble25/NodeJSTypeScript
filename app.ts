import express from 'express';
import { AuthRoutes } from './routes/authroutes';
const app = express();
const authRoutes = new AuthRoutes(app);
authRoutes.RegisterRoutes();
app.listen(5002, (err) => {
	console.log('Server is listening 5002');
});
