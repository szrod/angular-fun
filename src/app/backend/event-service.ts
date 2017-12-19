import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import { Event } from '@core/models';
import { Configuration } from '@core/configuration';
import { CoreUtils } from '@core/utils';
import { ServerSocket } from '@core/http-middleware';
import { MockEventDispatcher } from './mock-event-dispatcher';

/**
 * Event service to stream all various socket events
 */
export abstract class EventService<Type, EventType extends Event> {

  protected emitter: Subject<string> = new Subject();
  protected messages: Subject<Event> = new Subject();
  public mockEventDispatcher: MockEventDispatcher<Type, EventType>;
  private maxLoop: number = 10000; // 10 seconds
  private minLoop: number = 5000; // 5 seconds

  constructor(private eventClass: string, private socket: ServerSocket) {
    if (!Configuration.MOCK) {
      this.socket.connect();
    }
  }

  public loadMockDispatcher(dispatcher: MockEventDispatcher<Type, EventType>): void {
    this.mockEventDispatcher = dispatcher;
    this.loop();
  }

  /**
   * Listen to events
   * @return {Observable<EventType extends Event>}
   */
  public message(): Observable<EventType> {
    if (Configuration.MOCK || Configuration.DISABLE_SOCKET) {
      return <Observable<EventType>>this.messages
        .filter((message: Event) => {
          return message.$class === `${Configuration.NETWORK_NAMESPACE}.${this.eventClass}`;
        });
    } else {
      return <Observable<EventType>>this.socket.messages
        .filter((message: Event) => {
          return message.$class === `${Configuration.NETWORK_NAMESPACE}.${this.eventClass}`;
        });
    }
  }

  /**
   * Send out data to server
   * @TODO needs more design work
   * @param {Object} message
   */
  public send(message: Event): void {
    if (Configuration.MOCK) {
      return this.messages.next(message);
    } else {
      return this.socket.send(JSON.stringify(message));
    }
  }

  /**
   * Notify local client with update
   * @param {string} message
   */
  public notifyLocalUpdate(message: string = null): void {
    return this.emitter.next(message);
  }

  /**
   * Event for listening to local updates
   * @returns {Observable<string>}
   */
  public onLocalUpdated(): Observable<string> {
    return this.emitter.asObservable();
  }

  private loop(): void {
    const rand: number = CoreUtils.RANDOM(this.minLoop, this.maxLoop);
    setTimeout(() => {
      this.mockEventDispatcher.emitUpdate();
      this.loop();
    }, rand);
  }

}
