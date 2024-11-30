import {Socket} from "socket.io";

export class SocketRequest<T> extends Socket {
    data: T
    user: SocketUser
}