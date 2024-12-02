import {Server} from "socket.io";
import {SocketService} from "./socket.service";
import {SocketRequest} from "../../utils/classes/socket";
import {broadcast, getLeagueRoomName, toRoom} from "../../helpers/socket.helper";

export class SocketEmitter {
    constructor(socket?: SocketRequest) {
        this.socket = socket;
    }

    socket?: SocketRequest

    disconnected(count: number) {
        broadcast("disconnect", {count});
    }

    connected(count: number) {
        broadcast("user-connected", {count});
    }

    static leagueEdited = (id: number) => {
        toRoom(getLeagueRoomName(id), "l-edited", {id});
    };

    static leagueMemberAdded = (leagueId: number, userId: number) => {
        toRoom(getLeagueRoomName(leagueId), "l-new-member", userId);
    };
}