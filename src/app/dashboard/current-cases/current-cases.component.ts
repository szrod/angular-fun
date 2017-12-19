import { Component, OnInit, Input } from '@angular/core';
import { Case } from '@core/models';
import { InputCategory } from '@shared/models';
import { CurrentCasesService } from './current-cases.service';

@Component({
  selector: 'app-current-cases',
  templateUrl: './current-cases.component.html',
  styleUrls: ['./current-cases.component.scss']
})
export class CurrentCasesComponent implements OnInit {

  @Input() public cases: Case[];

  constructor(private currentCasesService: CurrentCasesService) {
  }

  public ngOnInit(): void {
  }

  public onFilterSelect(filters: InputCategory[]): void {
    this.currentCasesService.setFilters(filters); // @TODO maybe include an eventemitter inside the table?
  }

}
