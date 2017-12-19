import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { EventEmitter } from '@angular/core';
import { ListSort, ListSortInput, Sorter } from '@shared/models';

export type DataChanges<Type> = (EventEmitter<Sorter> | BehaviorSubject<any> | BehaviorSubject<Type[]>)[];

/**
 * Datasource
 * @access protected -- only used on supporting modules, not experience base
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export abstract class DatasourceMiddleware<Type> extends DataSource<Type> {

  protected sort: Sorter;
  protected displayChanges: DataChanges<Type>;
  protected filterChange: BehaviorSubject<string> = new BehaviorSubject('');
  private listSort: ListSort<Type>;

  constructor() {
    super();
  }

  /**
   * Returns filterChange value
   * @returns {string}
   */
  public get filter(): string {
    return this.filterChange.value;
  }

  /**
   * Sets the filter value
   * @param filter
   */
  public set filter(filter: string) {
    this.filterChange.next(filter);
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   * @override required
   */
  public connect(): Observable<Type[]> {
    return null;
  }

  /**
   * Disconnect handler
   * @override required
   * @returns {null}
   */
  public disconnect(): void {
    return null;
  }

  /**
   * Default filter that filters through all keys
   * @param {Type} item
   * @returns {boolean}
   */
  public defaultFilter(item: Type): boolean {
    if (this.filter) {
      let allow: boolean = false;
      Object.keys(item).forEach((key: string) => {
        if (item[key] && item[key].toString().indexOf(this.filter) > -1) {
          allow = true;
        }
      });
      return allow;
    } else {
      console.warn('Filter is not attached');
      return true;
    }
  }

  /**
   * Material Sort Controller, Material Display Columns Array
   * @param {MatSort} sort
   * @param {ListSortInput} sortMapping
   */
  public addSort(sort: Sorter, sortMapping: ListSortInput): void {
    this.sort = sort;
    this.listSort = new ListSort(this.sort, sortMapping);
    this.displayChanges.push(sort.sortChange);
  }

  /**
   * Returns a sorted copy of the database
   * @param {Type[]} items
   * @return {Type[]}
   */
  public getSortedData(items: Type[]): Type[] {
    return this.listSort.sort(items);
  }

}
