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

  constructor(private currentCasesService: CurrentCasesService, private caseBackend: CaseBackendService) {
  }

  public ngOnInit(): void {
    this.caseBackend.datasource.connect().subscribe((cases: Case[]) => {
      this.cases = cases;
    });
    this.currentCasesService.filters().subscribe((filters: InputCategory[]) => {
      this.filterCases(filters);
    });
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
