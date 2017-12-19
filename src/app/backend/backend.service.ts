/**
 * @copyright 2001-2017 Accenture LLC. All Rights Reserved
 * @module backend
 */

import { Configuration } from '@core/configuration';
import { HttpMiddlewareDatabase, DatasourceMiddleware } from '@core/http-middleware';
import { Event } from '@core/models';
import { EventService } from './event-service';

/**
 * Abstract Service for Backend Services
 * @access protected
 */
export abstract class BackendService<Type, TypeID extends string, EventType extends Event> {

  public datasource: DatasourceMiddleware<Type>;
  public database: HttpMiddlewareDatabase<Type, EventType>;

  constructor(protected messagingService: EventService<Type, EventType>) {
    if (Configuration.MOCK) {
      this.offlineEvents();
    }
  }

  public add(item: Type): Promise<void> {
    return this.database.addItem(item);
  }

  public update(id: TypeID, item: Type): Promise<void> {
    return this.database.updateItem(id, item);
  }

  public delete(id: TypeID): Promise<void> {
    return this.database.deleteItem(id);
  }

  public get(id: TypeID): Promise<Type> {
    return this.database.getItem(id);
  }

  /**
   * Handles all Mock Dispatcher Calls
   */
  private offlineEvents(): void {
    this.messagingService.mockEventDispatcher.onAddItem().subscribe((event: {item: Type}) => {
      this.add(event.item)
        .catch((err: Error) => {
          console.error('Mock Add Error', err.message);
        });
    });
    this.messagingService.mockEventDispatcher.onDeleteItem().subscribe((event: {id: TypeID}) => {
      this.delete(event.id)
        .catch((err: Error) => {
          console.error('Mock Delete Error', err.message);
        });
    });
    this.messagingService.mockEventDispatcher.onUpdateItem().subscribe((event: {item: Type, id: TypeID}) => {
      this.update(event.id, event.item)
        .catch((err: Error) => {
          console.error('Mock Update Error', err.message);
        });
    });
    this.messagingService.mockEventDispatcher.onRequestCache().subscribe(() => {
      this.messagingService.mockEventDispatcher.updateCache(this.database.dataChange.getValue());
    });
  }

}
