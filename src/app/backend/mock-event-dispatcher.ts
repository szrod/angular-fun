/**
 * @copyright 2001-2017 Accenture LLC. All Rights Reserved
 * @module backend
 */

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Event } from '@core/models';

/**
 * Structure mock event handling
 * Notifies backend to handle updates
 */
export abstract class MockEventDispatcher<Type, EventType extends Event> {

  protected cache: BehaviorSubject<Type[]> = new BehaviorSubject([]);
  private addItemDispatcher: Subject<{ item: Type }> = new Subject();
  private updateItemDispatcher: Subject<{ item: Type, id: string }> = new Subject();
  private deleteItemDispatcher: Subject<{ id: string }> = new Subject();
  private requestCache: Subject<void> = new Subject();

  constructor() {

  }

  public emitUpdate(): void {

  }

  public onAddItem(): Observable<{ item: Type }> {
    return this.addItemDispatcher.asObservable();
  }

  public onUpdateItem(): Observable<{ item: Type, id: string }> {
    return this.updateItemDispatcher.asObservable();
  }

  public onDeleteItem(): Observable<{ id: string }> {
    return this.deleteItemDispatcher.asObservable();
  }

  public onRequestCache(): Observable<void> {
    return this.requestCache.asObservable();
  }

  public updateCache(items: Type[]): void {
    this.cache.next(items);
  }

  protected emitAddItem(item: Type): void {
    this.addItemDispatcher.next({item: item});
    this.requestCache.next();
  }

  protected emitUpdateItem(item: Type, id: string): void {
    this.updateItemDispatcher.next({item: item, id: id});
    this.requestCache.next();
  }

  protected emitDeleteItem(id: string): void {
    this.deleteItemDispatcher.next({id: id});
    this.requestCache.next();
  }

}

