import * as jwt from "jsonwebtoken";
import {SocketService} from "../services/socket/socket.service";
import {Socket} from "socket.io";
import {RoomType} from "../utils/enum/global.enum";

export const broadcast = (key: string, params: any) => {
    return SocketService.io.emit(key, params);
}

export const toClient = (socket: Socket, key: string, params: any) => {
    return socket.emit(key, params);
}

export const toRoom = (roomName: string, key: string, params: any) => {
    return SocketService.io.in(roomName).emit(key, params);
}

export const getLeagueRoomName = (leagueId: number) => {
    return `${RoomType.League}${leagueId}`
}

export const getChampRoomName = (champId: number) => {
    return `${RoomType.Championship}${champId}`
}