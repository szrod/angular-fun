import { Component, OnInit, Input } from '@angular/core';
import { Case, CaseStatus } from '@core/models';
import { CaseService } from 'app/core/models/case';
import { CaseBackendService } from '../../backend/case-backend';

@Component({
  selector: 'app-completed-cases',
  templateUrl: './completed-cases.component.html',
  styleUrls: ['./completed-cases.component.scss']
})
export class CompletedCasesComponent implements OnInit {

  @Input() public cases: Case[];

  // @TODO create grouping class
  public bv: Case[] = [];
  public pa: Case[] = [];
  public pr: Case[] = [];
  public pap: Case[] = [];
  public copay: Case[] = [];

  constructor(private caseBackend: CaseBackendService) {
  }

  public ngOnInit(): void {
    this.caseBackend.datasource.connect().subscribe((cases: Case[]) => {
      this.cases = cases.filter((myCase: Case) => {
        return myCase.statusKey === CaseStatus.COMPLETED;
      });
      this.organize();
    });
  }

  private organize(): void {
    // looping through cases to separate them
    this.reset();
    this.cases.forEach((comCase: Case) => {
      switch (comCase.service) {
        case CaseService.BV:
          this.bv.push(comCase);
          break;
        case CaseService.PA:
          this.pa.push(comCase);
          break;
        case CaseService.PR:
          this.pr.push(comCase);
          break;
        case CaseService.PAP:
          this.pap.push(comCase);
          break;
        case CaseService.COPAY:
          this.copay.push(comCase);
          break;
        default:
          throw new Error('Unexpected Case');
      }
    });
  }

  private reset(): void {
    this.bv = [];
    this.pa = [];
    this.pr = [];
    this.pap = [];
    this.copay = [];
  }

}
