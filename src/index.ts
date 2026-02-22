import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

const server = http.createServer(app)

server.listen(8080, () => {
    console.log(`Server listening on http://localhost:8080`);
});

const MONG_URL = 'mongodb+srv://crazyprogrammer1001_db_user:iuwY46nxRYVpL4dZ@cluster0.m3tl1jq.mongodb.net/?appName=Cluster0';

mongoose.Promise = Promise;
mongoose.connect(MONG_URL);
mongoose.connection.on('error', (err: Error) => {
    console.error(err);
})