import {config} from "dotenv";
import { v2 as cloudinary } from 'cloudinary';
import childProcess from "child_process";

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
    io.on('connection', async (socket: SocketRequest) => {
        const router = new SocketRouter(socket, io);

        await router.listen();
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
    try {
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
    } catch (e) {
        console.error('a')
        if (e.name === "EADDRINUSE") {
            // Solo vale en Windows.
            const findPortProcessCmd = `netstat -ano | findstr :${port}`;
            const execSync = childProcess.execSync(findPortProcessCmd);


            console.log(execSync.toString());
        }
    }
};

const handleListening = () => {
    console.log(`API listening on http://localhost:${port} (PID: ${process.pid})`);
};



listenServer();
