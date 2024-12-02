import { Injectable } from '@angular/core';
import {GlobalHelper} from "../../helpers/global.helper";
import {devEnv} from "../../../environments/environment.development";
import {io, Socket} from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  static socket?: Socket;

  constructor(private globalHelper: GlobalHelper) {}

  connect = () => {
    const token = this.globalHelper.getSocketToken();

    if (token && !SocketService.socket) {
      SocketService.socket = io(devEnv.socketEndpoint, {extraHeaders: {token: token}});

      SocketService.socket.on('connect', this.handleConnecting);
    }

    return SocketService.socket;
  }

  private handleConnecting = () => {
    console.log('Conectado al Websocket de la API');
  }
}

