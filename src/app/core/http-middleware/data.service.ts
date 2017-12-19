import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationStyleType } from '@swimlane/ngx-ui';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ErrorHandler } from '@core/utils';
import { MessengerService } from '@core/messenger.service';
import { Configuration, LogLevel } from '@core/configuration';

@Injectable()
export class DataService<Type> {

  private actionUrl: string;
  private headers: Headers;
  private errorHandler: ErrorHandler<Type>;

  constructor(private http: HttpClient, private configuration: Configuration,
              private messengerService: MessengerService) {
    this.errorHandler = new ErrorHandler(this.messengerService);
    this.actionUrl = configuration.SERVER;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  /**
   * Get All Items
   * @param ns @TODO implement
   * @returns {Observable<R|T>}
   */
  public getAll(ns: string): Observable<Type[]> {
    return this.http.get<Type[]>(this.actionUrl)
      .pipe(
        tap((items: Type[]) => this.log(items, `Fetched ${items.length} items`)),
        catchError(this.errorHandler.handleError('getAll', []))
      );
  }

  /**
   * Get item by ID
   * @param ns @TODO implement
   * @param id
   * @returns {Observable<Type>}
   */
  public getSingle(ns: string, id: string): Observable<Type> {

    return this.http.get<Type>(`${this.actionUrl}/${id}`)
      .pipe(
        tap((item: Type) => this.log(item, `Fetched Item ${id}, ${JSON.stringify(item)}`)),
        catchError(this.errorHandler.handleError('getSingle', null))
      );
  }

  /**
   * Add Item
   * @param ns @TODO implement
   * @param asset
   * @returns {Observable<R|T>}
   */
  public add(ns: string, item: Type): Observable<Type> {
    console.log('Entered DataService add');

    return this.http.post<Type>(this.actionUrl, item)
      .pipe(
        tap((i: Type) => this.log(i, `Add item ${JSON.stringify(item)}`)),
        catchError(this.errorHandler.handleError('add', item))
      );
  }

  /**
   * Update Item
   * @param ns @TODO implement
   * @param id
   * @param item
   * @returns {Observable<R|T>}
   */
  public update(ns: string, id: string, item: Type): Observable<Type> {
    console.log('what is the id?', id);
    console.log('what is the updated item?', item);

    return this.http.put<Type>(`${this.actionUrl}/${id}`, item)
      .pipe(
        tap((i: Type) => this.log(i, `Update Item ${id}, ${JSON.stringify(item)}`)),
        catchError(this.errorHandler.handleError('update', item))
      );
  }

  /**
   * Delete Item
   * @param ns @TODO implement
   * @param id
   * @returns {Observable<Type>}
   */
  public delete(ns: string, id: string): Observable<Type> {
    return this.http.delete<Type>(`${this.actionUrl}/${id}`)
      .pipe(
        tap((i: Type) => this.log(i, `Delete Item ${id}`)),
        catchError(this.errorHandler.handleError('delete', null))
      );
  }

  private log(items: Type | Type[], message: string): void {
    console.log('Fetched items', items);
    if (Configuration.LOG_LEVEL === LogLevel.DEBUG) {
      this.messengerService.send({
        body: message,
        styleType: NotificationStyleType.info,
        title: 'Server Error'
      });
    }
  }

}
