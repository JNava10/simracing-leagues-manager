import {Injectable, OnInit} from '@angular/core';
import {GlobalHelper} from "../../helpers/global.helper";
import {devEnv} from "../../../environments/environment.development";
import {io, Socket} from "socket.io-client";
import {User} from "../../utils/interfaces/user.interface";
import {SocketService} from "./socket.service";

@Injectable({
  providedIn: 'root'
})
export class ListenerSocketService {

  constructor(private service: SocketService) {}

  leagueEdit = (callback: Function) => {
    SocketService.socket = this.service.connect();

    if (!SocketService.socket) throw new Error("No se ha encontrado ninguna instancia del cliente de socket.io!");

    SocketService.socket?.on(this.listenKeys.leagueNewMember, (params) => callback(params));
  }

  leagueMemberAdded = (callback: Function) => {
    SocketService.socket = this.service.connect();

    if (!SocketService.socket) throw new Error("No se ha encontrado ninguna instancia del cliente de socket.io!");

    SocketService.socket?.on(this.listenKeys.leagueNewMember, (params) => callback(params));
  }

  removeAllListeners = () => {
    SocketService.socket?.removeAllListeners();
  }

  listenKeys = {
    leagueNewMember: 'l-new-member'
  }
}

