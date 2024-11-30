import {Socket} from "socket.io";

export class SocketRequest extends Socket {
    data: any
    user: SocketUser
}