/**
 * @copyright 2001-2017 Accenture LLC. All Rights Reserved
 * @module core
 */

import { Observable } from 'rxjs/Observable';
import { DataService } from './data.service';

/**
 * HttpMiddleware Service, handles all Composer generated REST operations
 */
export abstract class MiddlewareService<Type> {

  public NAMESPACE: string;

  constructor(protected dataService: DataService<Type>) {

  }

  /**
   * Get all items with Type on the
   * @returns {Observable<Type[]>}
   */
  public getAll(): Observable<Type[]> {
    return this.dataService.getAll(this.NAMESPACE);
  }

  /**
   * Get get item with Id on the
   * @param id of the item to get
   * @returns {Observable<Type>}
   */
  public getAsset(id: string): Observable<Type> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  /**
   * Add item to the
   * @param itemToAdd item to add to the chain
   * @returns {Observable<Type>}
   */
  public addAsset(itemToAdd: Type): Observable<Type> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  /**
   * Update item on the
   * @param id ID of the item
   * @param itemToUpdate the item metadata to replace
   * @returns {Observable<Type>}
   */
  public updateAsset(id: string, itemToUpdate: Type): Observable<Type> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  /**
   * Delete item on the
   * @param id ID of them Item to delete
   * @returns {Observable<Type>}
   */
  public deleteAsset(id: string): Observable<Type> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}
