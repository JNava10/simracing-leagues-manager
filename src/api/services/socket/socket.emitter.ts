import {Server} from "socket.io";
import {SocketService} from "./socket.service";
import {SocketRequest} from "../../utils/classes/socket";

export class SocketEmitter<T> {
    constructor(socket: SocketRequest<T>, io: Server) {
        this.socket = socket;
        this.io = io;
    }

    io: Server;
    socket: SocketRequest<T>


    disconnected(count: number) {
        this.io.emit("disconnect", {count});
    }

    connected(count: number) {
        this.io.emit("connect", {count});
    }
}