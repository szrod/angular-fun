import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { InputCategory } from '@shared/models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CurrentCasesService {

  private filterDispatcher: BehaviorSubject<InputCategory[]> = new BehaviorSubject([]);

  constructor() {
  }

  public setFilters(filters: InputCategory[]): void {
    this.filterDispatcher.next(filters);
  }

  public filters(): Observable<InputCategory[]> {
    return this.filterDispatcher.asObservable();
  }

}
