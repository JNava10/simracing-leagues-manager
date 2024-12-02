import {Server, Socket} from "socket.io";
import {SocketRequest} from "../../utils/classes/socket";
import {SocketEmitter} from "./socket.emitter";
import {LeagueQuery} from "../queries/league.query";
import {RoomType} from "../../utils/enum/global.enum";
import {getChampRoomName, getLeagueRoomName} from "../../helpers/socket.helper";


export class SocketService {
    constructor(socket: SocketRequest, io: Server) {
        this.socket = socket;
        this.requestEmitter = new SocketEmitter(socket);

        SocketService.io = io;
    }

    static usersConnected: Map<number, Socket> = new Map();
    static io: Server;

    requestEmitter: SocketEmitter;
    socket: SocketRequest;


    static getSocketByUserId = (id: number) => {
        return SocketService.usersConnected.get(id);
    };

    connectUser = async () => {
        await this.addUser();

        console.log(this.socket.id)

        this.requestEmitter.connected(SocketService.usersConnected.size);
    };

    disconnect = (): void => {
        this.deleteUser();
        this.requestEmitter.disconnected(SocketService.usersConnected.size);

        console.log(`Se ha cerrado la conexión ${this.socket.id} (Usuario con ID ${this.socket.user.id})`);
    };

    private addUser = async () => {
        SocketService.usersConnected.set(this.socket.user.id, this.socket);

        const leagueIds = await LeagueQuery.getUserLeagueIds(this.socket.user.id);

        leagueIds.forEach((leagueId) => {
            this.joinLeagueRoom(leagueId);
        })

        console.log(this.socket.rooms)
    };

    private deleteUser() {
        SocketService.usersConnected.delete(this.socket.user.id);
    }

    joinLeagueRoom = (leagueId: number) => {
        this.socket.join(getLeagueRoomName(leagueId));
    }

    joinChampRoom = (champId: number) => {
        this.socket.join(getChampRoomName(champId));
    }

    static sendLeagueEdited = (leagueId: number) => {
        SocketEmitter.leagueEdited(leagueId);
    }

    static leagueMemberAdded = (leagueId: number, userId: number) => {
        const userSocket = SocketService.getSocketByUserId(userId)

        userSocket.join(getLeagueRoomName(leagueId));

        console.log(userSocket);

        SocketEmitter.leagueMemberAdded(leagueId, userId);
    }
}
