import { Component, OnInit } from '@angular/core';
import { Case } from '@core/models';
import { InputCategory, InputElement } from '@shared/models';
import { CurrentCasesService } from '../current-cases.service';
import { CaseBackendService } from '../../../backend/case-backend';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public cases: Case[] = [];
  public paginatedCases: Case[][] = [];
  public selectedIndex: number = 0;

  constructor(private currentCasesService: CurrentCasesService, private caseBackend: CaseBackendService) {
  }

  public ngOnInit(): void {
    this.caseBackend.datasource.connect().subscribe((cases: Case[]) => {
      this.paginatedCases = this.paginate(cases);
      if (this.paginatedCases.length > 0) {
        this.cases = this.paginatedCases[this.selectedIndex];
      }
    });
    this.currentCasesService.filters().subscribe((filters: InputCategory[]) => {
      this.filterCases(filters);
    });
  }

  public selectIndex(i: number): void {
    this.selectedIndex = i;
    if (this.paginatedCases.length > 0 && this.paginatedCases[this.selectedIndex]) {
      this.cases = this.paginatedCases[this.selectedIndex];
    }
  }

  public previous(): void {
    if (this.selectedIndex >= 0 && this.paginatedCases[this.selectedIndex - 1]){
      this.selectedIndex = this.selectedIndex - 1;
      this.cases = this.paginatedCases[this.selectedIndex];
    }
  }

  public next(): void {
    if (this.selectedIndex >= 0 && this.paginatedCases[this.selectedIndex + 1]){
      this.selectedIndex = this.selectedIndex + 1;
      this.cases = this.paginatedCases[this.selectedIndex];
    }
  }

  public isActive(i: number): boolean {
    return i === this.selectedIndex;
  }

  private paginate(cases: Case[]): Case[][] {
    const results: Case[][] = [];
    while (cases.length > 0) {
      results.push(cases.splice(0, 10));
    }
    return results;
  }

  private filterCases(filters: InputCategory[]): void {
    // @TODO migrate
    const elements: InputElement[] = [];
    filters.forEach((filter: InputCategory) => {
      filter.elements.forEach((element: InputElement) => {
        if (element.active) {
          elements.push(element);
        }
      });
    });
    this.caseBackend.datasource.caseFilterChange.next(elements);
  }

}
