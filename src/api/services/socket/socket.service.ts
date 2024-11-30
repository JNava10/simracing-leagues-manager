import {Server, Socket} from "socket.io";
import {SocketRequest} from "../../utils/classes/socket";
import {SocketEmitter} from "./socket.emitter";


export class SocketService {
    constructor(socket: SocketRequest, io: Server) {
        this.socket = socket;
        this.emitter = new SocketEmitter(socket, io);
        this.io = io;
    }

    io: Server;
    emitter: SocketEmitter;
    socket: SocketRequest;

    static usersConnected: Map<number, Socket> = new Map();

    /**
     * Encuentra usuarios conectados por sus IDs.
     *
     * @param ids Lista de IDs de usuarios.
     * @returns Lista de usuarios conectados.
     */
    findUsersById = (ids: number[]) => {
        // const userList = [...SocketController.usersConnected.values()];
        // return userList.filter(([id]) => ids.includes(id));
    };

    connectUser = () => {
        this.addUser();

        console.log(this.socket.id)

        this.emitter.connected(SocketService.usersConnected.size);
    };

    disconnect = (): void => {
        this.deleteUser();
        this.emitter.disconnected(SocketService.usersConnected.size);

        console.log(`Se ha cerrado la conexión ${this.socket.id} (Usuario con ID ${this.socket.user.id})`);
    };

    private addUser() {
        SocketService.usersConnected.set(this.socket.user.id, this.socket);
    }

    private deleteUser() {
        SocketService.usersConnected.delete(this.socket.user.id);
    }
}
