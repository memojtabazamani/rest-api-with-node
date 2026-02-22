import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from "./router";

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

const server = http.createServer(app);

// FIXED: Changed from MONG_URL to MONGO_URL
const MONGO_URL = 'mongodb+srv://crazyprogrammer1001_db_user:iuwY46nxRYVpL4dZ@cluster0.m3tl1jq.mongodb.net/?appName=Cluster0';

mongoose.Promise = Promise;

// ADDED: Connection options to handle SSL issues
mongoose.connect(MONGO_URL, {
    serverSelectionTimeoutMS: 30000, // 30 seconds timeout
    socketTimeoutMS: 45000,
    connectTimeoutMS: 30000,
    ssl: true,
    tlsAllowInvalidCertificates: true, // For development - helps with SSL issues
    tlsAllowInvalidHostnames: true, // For development
    retryWrites: true,
    retryReads: true,
})
    .then(() => {
        console.log('✅ Successfully connected to MongoDB');
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
        // Don't exit immediately, but log the error
    });

mongoose.connection.on('error', (err: Error) => {
    console.error('MongoDB connection error:', err);
});

// ADDED: Log when disconnected
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// FIXED: You're using router() which returns a router, so just use it directly
app.use('/', router());

server.listen(8080, () => {
    console.log(`Server listening on http://localhost:8080`);
});