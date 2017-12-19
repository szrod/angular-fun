import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { defaultWebsocketFactory, WebSocketFactory } from './websocket-factory';
import { Connection } from './connection';
import { Observer } from 'rxjs/Observer';

export class ReactiveWebsocket {

  constructor() {

  }

  public connect(url: string,
                 input: Observable<string>,
                 protocols?: string | string[],
                 websocketFactory: WebSocketFactory = defaultWebsocketFactory): Connection {
    const connectionStatus: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    const messages: Observable<string> = new Observable<string>((observer: Observer<string>): () => void => {
      const socket: WebSocket = websocketFactory(url, protocols);
      let inputSubscription: Subscription;

      let open: boolean = false;
      const closed: Function = (): void => {
        if (!open) {
          return;
        }

        connectionStatus.next(connectionStatus.getValue() - 1);
        open = false;
      };

      socket.onopen = (): void => {
        open = true;
        connectionStatus.next(connectionStatus.getValue() + 1);
        inputSubscription = input.subscribe((data: string) => {
          socket.send(data);
        });
      };

      socket.onmessage = (message: MessageEvent): void => {
        observer.next(message.data);
      };

      socket.onerror = (error: ErrorEvent): void => {
        closed();
        observer.error(error);
      };

      socket.onclose = (event: CloseEvent): void => {
        closed();
        if (event.wasClean) {
          observer.complete();
        } else {
          observer.error(new Error(event.reason));
        }
      };

      return (): void => {
        if (inputSubscription) {
          inputSubscription.unsubscribe();
        }
        if (socket) {
          closed();
          socket.close();
        }
      };
    });

    return {messages, connectionStatus};
  }
}
