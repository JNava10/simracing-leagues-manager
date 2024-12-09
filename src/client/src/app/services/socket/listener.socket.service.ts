import {Injectable, OnInit} from '@angular/core';
import {GlobalHelper} from "../../helpers/global.helper";
import {devEnv} from "../../../environments/environment.development";
import {io, Socket} from "socket.io-client";
import {User} from "../../utils/interfaces/user.interface";
import {SocketService} from "./socket.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ListenerSocketService {

  constructor(private service: SocketService, private globalHelper: GlobalHelper) {}

  leagueEdit = (callback: Function) => {
    SocketService.socket = this.service.connect();

    if (!SocketService.socket) this.rejectUser()

    SocketService.socket?.on(this.listenKeys.leagueNewMember, (params) => callback(params));
  }

  leagueMemberAdded = (callback: Function) => {
    SocketService.socket = this.service.connect();

    if (!SocketService.socket) throw new Error("No se ha encontrado ninguna instancia del cliente de socket.io!");

    SocketService.socket?.on(this.listenKeys.leagueNewMember, (params) => callback(params));
  }

  rejectUser = () => {
    this.globalHelper.navigateFromRoot("login")
  }

  static removeAllListeners = () => {
    SocketService.socket?.removeAllListeners();
  }

  listenKeys = {
    leagueNewMember: 'l-new-member'
  }
}

