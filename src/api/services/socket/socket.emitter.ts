import {Server} from "socket.io";
import {SocketService} from "./socket.service";
import {SocketRequest} from "../../utils/classes/socket";

export class SocketEmitter {
    constructor(socket: SocketRequest, io: Server) {
        this.socket = socket;
        this.io = io;
    }

    io: Server;
    socket: SocketRequest


    disconnected(count: number) {
        this.io.emit("disconnect", {count});
    }

    connected(count: number) {
        this.io.emit("user-connected", {count});
    }
}