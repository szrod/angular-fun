import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InputCategory, InputElement } from '@shared/models';
import { FilterConfig } from './filter-config';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: [
    './table-filter.component.scss',
    './filter-checkbox.scss'
  ]
})
export class TableFilterComponent implements OnInit {

  @Output() public onFilterSelect: EventEmitter<InputCategory[]> = new EventEmitter();
  public filters: InputCategory[] = [];
  private filterConfig: FilterConfig;

  constructor() {
    this.filterConfig = new FilterConfig();
    this.filters = this.filterConfig.filters;
  }

  public ngOnInit(): void {
  }

  public clear(): void {
    this.filters.forEach((filter: InputCategory) => {
      filter.clear();
      this.onFilterSelect.next(this.filters);
    });
  }

  public toggleFilter(element: InputElement): void {
    element.click();
    this.onFilterSelect.next(this.filters);
  }

}
