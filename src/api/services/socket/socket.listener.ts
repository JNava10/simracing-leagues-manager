import {Socket} from "socket.io";
import {SocketService} from "./socket.service";
import {SocketRequest} from "../../utils/classes/socket";

export const listen = async (socket: SocketRequest<any>) => {
    socket.on("disconnect", () => SocketService.disconnect(socket));
}