import {Server, Socket} from "socket.io";
import {SocketRequest} from "../../utils/classes/socket";
import {SocketEmitter} from "./socket.emitter";


export class SocketService<T> {
    constructor(socket: SocketRequest<T>, io: Server) {
        this.socket = socket;
        this.emitter = new SocketEmitter<T>(socket, io);
        this.io = io;
    }

    io: Server;
    emitter: SocketEmitter<T>;
    socket: SocketRequest<T>

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

    /**
     * Evento que se ejecuta al conectar un socket.
     *
     * @param socket Socket conectado.
     * @param io Instancia del servidor de Socket.IO.
     */
    connect = async (socket: Socket & { user: { userId: number } }, io: Server): Promise<void> => {
        try {
            this.addUser();

            this.emitter.connected(SocketService.usersConnected.size);
        } catch (e) {
            console.error(e);
        }
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
