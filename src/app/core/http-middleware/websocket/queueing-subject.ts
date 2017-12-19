import { Subject } from 'rxjs/Subject';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';

export class QueueingSubject<T> extends Subject<T> {

  private queuedValues: T[] = [];

  constructor() {
    super();
  }

  public next(value: T): void {
    if (this.closed || this.observers.length) {
      super.next(value);
    } else {
      this.queuedValues.push(value);
    }
  }

  protected _subscribe(subscriber: Subscriber<T>): Subscription {
    const ret: Subscription = super._subscribe(subscriber);
    if (this.queuedValues.length) {
      this.queuedValues.forEach((value: T) => super.next(value));
      this.queuedValues.splice(0);
    }
    return ret;
  }
}
