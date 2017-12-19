import { Observable } from 'rxjs/Observable';

export interface Connection {
  connectionStatus: Observable<number>;
  messages: Observable<string>;
}
