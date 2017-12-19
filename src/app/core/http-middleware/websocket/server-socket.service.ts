import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { Configuration, LogLevel } from '@core/configuration';
import { Event } from '@core/models';
import { ReactiveWebsocket } from './reactive-websocket';
import { QueueingSubject } from './queueing-subject';
import { MessengerService } from '@core/messenger.service';
import { NotificationStyleType } from '@swimlane/ngx-ui';

@Injectable()
export class ServerSocket {

  public messages: Observable<Event>;
  private inputStream: QueueingSubject<string>;
  private reactiveWS: ReactiveWebsocket = new ReactiveWebsocket();

  constructor(private config: Configuration, private messengerService: MessengerService) {

  }

  public connect(): void {
    if (this.messages) {
      return;
    }

    // Using share() causes a single websocket to be created when the first
    // observer subscribes. This socket is shared with subsequent observers
    // and closed when the observer count falls to zero.
    console.log(`Connecting to ${this.config.SOCKET_SERVER}`);
    if (!Configuration.DISABLE_SOCKET) {
      this.messages = this.reactiveWS
        .connect(
          this.config.SOCKET_SERVER,
          this.inputStream = new QueueingSubject<string>()
        )
        .messages
        .map((message: string) => {
          return JSON.parse(message);
        })
        .share();
    } else {
      console.log('Socket Server Disabled');
      this.messengerService.send({
        body: `Refused to establish connection to socket endpoint: "${this.config.SOCKET_SERVER}"`,
        styleType: NotificationStyleType.warning,
        title: 'Socket Server Disabled'
      });

    }
  }

  public send(message: string): void {
    // If the websocket is not connected then the QueueingSubject will ensure
    // that messages are queued and delivered when the websocket reconnects.
    // A regular Subject can be used to discard messages sent when the websocket
    // is disconnected.
    this.inputStream.next(message);
  }
}
