/**
 * @copyright 2001-2017 Accenture LLC. All Rights Reserved
 * @module backend
 */

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { DatasourceMiddleware } from '@core/http-middleware';
import { Case } from '@core/models';
import { InputElement } from '@shared/models';
import { CaseDatabase } from './case-database';

/* tslint:disable:no-any */

/**
 * Case Datasource
 * @access private - only accessible via backend service
 */
export class CaseDatasource extends DatasourceMiddleware<Case> {

  public caseFilterChange: BehaviorSubject<InputElement[]> = new BehaviorSubject([]);
  private sizeDispatcher: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private caseDatabase: CaseDatabase) {
    super();
    this.displayChanges = [
      // this.filterChange,
      this.caseFilterChange,
      this.caseDatabase.dataChange,
    ];
    this.sizeDispatcher.next(this.caseDatabase.data.length);
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   */
  public connect(): Observable<Case[]> {
    console.log(this.displayChanges, Observable.merge);
    return Observable.merge(...this.displayChanges)
      .map(() => {
        let filteredCase: Case[] = this.caseDatabase.data.slice()
          .filter((item: Case) => {
            return this.filterElements(item, this.caseFilterChange.getValue());
          })
          .filter((item: Case) => {
            const searchStr: string = (JSON.stringify(item)).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        if (this.sort) {
          filteredCase = this.getSortedData(filteredCase);
        }
        this.sizeDispatcher.next(filteredCase.length);
        return filteredCase;
      });
  }

  public size(): Observable<number> {
    return this.sizeDispatcher.asObservable();
  }

  /**
   * @TODO abstract this and abstract InputCategory
   * @param {Case} item
   * @param {InputCategory} filters
   */
  private filterElements(item: Case, filters: InputElement[]): boolean {
    if (filters && filters.length > 0) {
      for (let i: number = 0; i < filters.length; i++) {
        if (item[filters[i].parent.prop]) {
          if (item[filters[i].parent.prop] === filters[i].value) {
            return true;
          }
        } else {
          throw new Error(`Item must have prop value: ${filters[i].parent.prop}`);
        }
      }
      return false;
    } else {
      return true;
    }
  }

}
