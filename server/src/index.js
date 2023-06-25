import express from 'express';
import 'dotenv/config';
import cors from 'cors'
import bodyParser from 'body-parser';
import {todoRoutes} from './routes/todoRoutes.js'

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/todos', todoRoutes);

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });
