import { ErrorResponse } from './error-response';
import { Observable } from 'rxjs/Observable';
import { MessengerService } from '@core/messenger.service';
import { NotificationStyleType, NotificationType } from '@swimlane/ngx-ui';
import { of } from 'rxjs/observable/of';
import { Configuration, LogLevel } from '@core/configuration';

/**
 * Error Handler class
 *
 * Handles all Fabric Server REST errors
 */
export class ErrorHandler<Type> {

  constructor(private messengerService: MessengerService) {

  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<Type>(operation: string = 'operation', result?: Type | Type[]): (error: any) => Observable<Type> {
    return (error: any): Observable<Type> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as Type);
    };
  }

  private log(message: string): void {
    if (Configuration.LOG_LEVEL !== LogLevel.NONE) {
      this.messengerService.send({
        body: message,
        styleType: NotificationStyleType.error,
        title: 'Server Error'
      });
    }
  }
}

