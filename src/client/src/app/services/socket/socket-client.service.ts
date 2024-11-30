import { Injectable } from '@angular/core';
import {GlobalHelper} from "../../helpers/global.helper";
import {devEnv} from "../../../environments/environment.development";
import {io, Socket} from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class SocketClientService {

  private socket?: Socket;

  constructor(private globalHelper: GlobalHelper) {
    const token = this.globalHelper.getSocketToken();

    if (token) {
      this.socket = io(devEnv.socketEndpoint, {extraHeaders: {token: token}});

      console.log(this.socket, 'a')

      this.connect()
    }
  }

  connect = () => {
    if (!this.socket) throw new Error("Socket client is not set.");

    this.socket.on('connect', this.handleConnecting);
  }

  private handleConnecting = () => {
    console.log('Conectado al Websocket de la API');
  }
}

