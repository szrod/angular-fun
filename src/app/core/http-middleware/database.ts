/**
 * @copyright 2001-2017 Accenture LLC. All Rights Reserved
 * @module core
 */

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Event } from '@core/models';
import { Configuration } from '@core/configuration';
import { EventService } from '../../backend';
import { MiddlewareService } from './middleware-service';

/**
 * HttpMiddleware Database
 * @access protected -- only to be used on supporting module, not experience based components
 * @abstract
 *
 * HttpMiddleware Database class, handles all basic REST transactions to the HttpMiddleware Chain
 */
export abstract class HttpMiddlewareDatabase<Type, EventType extends Event> {

  /**
   * Stream that emits whenever the data has been modified.
   */
  public dataChange: BehaviorSubject<Type[]> = new BehaviorSubject<Type[]>([]);
  public loadingDispatcher: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(protected backendService: MiddlewareService<Type>,
              protected eventService: EventService<Type, EventType>,
              private keyIdentifier: string,
              initalMockData: Type[] = []) {
    if (Configuration.MOCK) {
      this.dataChange.next(initalMockData);
    }
    this.getAll()
      .then(() => {
        this.loadingDispatcher.next(false);
      })
      .catch(() => {
        throw new Error('HttpMiddleware Database Failed to retrieve');
      });

    if (!this.keyIdentifier) {
      throw new Error(`Required Key Identifier for database ("this.keyIdentifier") missing, 
      ${this.backendService.NAMESPACE}`);
    }

    if (!Configuration.MOCK) {
      this.streamEvents();
    }
  }

  /**
   * Stream indicating loading
   * @TODO embed with other methods
   * @return {Observable<boolean>}
   */
  public loading(): Observable<boolean> {
    return this.loadingDispatcher.asObservable();
  }

  /**
   * Gets the current data stored in stream
   * @returns {Type[]}
   */
  public get data(): Type[] {
    return this.dataChange.value;
  }

  public getAll(): Promise<void> {
    if (Configuration.MOCK) {
      return Promise.resolve();
    } else {
      return this.backendService.getAll()
        .toPromise()
        .then((items: Type[]) => {
          this.dataChange.next(items);
          return;
        });
    }
  }

  /**
   * Add Item on
   * @param item
   * @returns {Promise<void>}
   */
  public addItem(item: Type): Promise<void> {
    if (Configuration.MOCK) {
      const copiedData: Type[] = this.data.slice();
      copiedData.push(item);
      this.dataChange.next(copiedData);
      return Promise.resolve();
    } else {
      return this.backendService.addAsset(item)
        .toPromise()
        .then((result: Type) => {
          const copiedData: Type[] = this.data.slice();
          copiedData.push(result);
          this.dataChange.next(copiedData);
        });
    }
  }

  /**
   * Delete item on
   * @param id
   * @returns {Promise<void>}
   */
  public deleteItem(id: string): Promise<void> {
    if (Configuration.MOCK) {
      return this.getItem(id)
        .then((item: Type) => {
          const copiedData: Type[] = this.data.slice().filter((instance: Type) => {
            console.log(`Instance: ${instance[this.keyIdentifier]}`);
            if (item === null) {
              return false;
            } else {
              return instance[this.keyIdentifier] !== item[this.keyIdentifier];
            }
          });
          this.dataChange.next(copiedData);
        });
    } else {
      return this.backendService.deleteAsset(id)
        .toPromise()
        .then((result: Type) => {

          console.log(`Inside HttpMiddleware Service: ${result}`);
          const copiedData: Type[] = this.data.slice().filter((instance: Type) => {
            console.log(`Instance: ${instance[this.keyIdentifier]}`);
            if (result === null) {
              return false;
            } else {
              return instance[this.keyIdentifier] !== result[this.keyIdentifier];
            }
          });
          this.dataChange.next(copiedData);
        });
    }
  }

  /**
   * Update item on
   * @param id
   * @param item
   * @returns {Promise<Type>}
   */
  public updateItem(id: string, item: Type): Promise<void> {
    if (Configuration.MOCK) {
      const copiedData: Type[] = this.data.slice().map((instance: Type) => {
        if (instance[this.keyIdentifier] === item[this.keyIdentifier]) {
          instance = item;
        }
        return instance;
      });
      this.dataChange.next(copiedData);
      return Promise.resolve();
    } else {
      // Remove key identifier from object since we can't include that?
      delete item[this.keyIdentifier];
      return this.backendService.updateAsset(id, item)
        .toPromise()
        .then((result: Type) => {
          const copiedData: Type[] = this.data.slice().map((instance: Type) => {
            if (instance[this.keyIdentifier] === result[this.keyIdentifier]) {
              instance = result;
            }
            return instance;
          });
          this.dataChange.next(copiedData);
        });
    }
  }

  public getItem(id: string): Promise<Type> {
    if (Configuration.MOCK) {
      return Promise.resolve(this.retrieveCache(id));
    } else {
      const item: Type = this.retrieveCache(id);

      if (item) {
        // Local
        return Promise.resolve(item);
      } else {
        // Server
        return this.backendService.getAsset(id)
          .toPromise()
          .then((serverItem: Type) => {
            // Sometimes the local cache can be updated in mid request, check if it exists
            const temp: Type = this.retrieveCache(id);
            if (!temp) {
              // Sync with server
              this.eventService.notifyLocalUpdate();
            }
            return serverItem;
          });
      }
    }

  }

  /**
   * Retrieve code from local cache
   * @param {string} id
   * @returns {Type}
   */
  protected retrieveCache(id: string): Type {

    for (let i: number = 0; i < this.data.length; i++) {
      if (this.data[i][this.keyIdentifier] === id) {
        return this.data[i];
      }
    }

  }

  private streamEvents(): void {
    // Stream update events
    this.eventService.message().subscribe((message: EventType) => {
      console.log('update event', message.$class);
      this.reset();
    });
  }

  private reset(): void {
    this.getAll()
      .then(() => {
        return this.eventService.notifyLocalUpdate();
      })
      .catch((error: Error) => {
        console.error(error);
        throw new Error(`Failed to initialize ${this.backendService.NAMESPACE} Database - ${error}`);
      });
  }


}
