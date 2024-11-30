import {Server, Socket} from "socket.io";
import {SocketService} from "./socket.service";
import {SocketRequest} from "../../utils/classes/socket";

export class SocketRouter {
    constructor(socket: SocketRequest, io: Server) {
        this.socket = socket
        this.service = new SocketService(socket, io)
    }

    private socket: SocketRequest;

    service: SocketService

    listen = () => {
        this.service.connectUser()

        this.socket.on("disconnect", () => this.service.disconnect);
    }
}