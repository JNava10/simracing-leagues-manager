import {config} from "dotenv";
import { v2 as cloudinary } from 'cloudinary';

config()

// @ts-ignore
import {app} from "./app";
import {SocketRouter} from "./services/socket/socketRouter";
const port = process.env.PORT || 3000;
import {DefaultEventsMap, Server} from "socket.io";
import {SocketRequest} from "./utils/classes/socket";
import {socketAuth} from "./middlewares/socketAuth";

const setupWebSockets = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, handleSocketListening: () => void) => {
    io.httpServer.on("listening", handleSocketListening)
    io.use(socketAuth);
    io.on('connection', (socket: SocketRequest) => {
        const listener = new SocketRouter(socket, io);

        listener.listen();
    });
};

function setupCloudService() {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    });
}

const listenServer = () => {
    const server = app.listen(port, handleListening)

    const io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_ORIGIN,
            methods: '*'
        }
    });

    const handleSocketListening = () => {
        console.log("Socket.io server ready.");
    };

    setupWebSockets(io, handleSocketListening);

    setupCloudService();
};

const handleListening = () => {
    console.log(`API listening on http://localhost:${port} (PID: ${process.pid})`);
};



listenServer();
