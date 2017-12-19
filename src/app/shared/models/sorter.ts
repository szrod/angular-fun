import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
  UNKNOWN = ''
}

export class Sorter {
  public active: string;
  public direction: SortDirection;
  public sortChange: BehaviorSubject<any>;
}
