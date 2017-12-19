import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { CompletedCasesComponent } from './completed-cases/completed-cases.component';
import { CurrentCasesComponent } from './current-cases/current-cases.component';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
import { CaseCardComponent } from './completed-cases/case-card/case-card.component';
import { TableComponent } from './current-cases/table/table.component';
import { TableFilterComponent } from './current-cases/table-filter/table-filter.component';
import { CurrentCasesService } from './current-cases/current-cases.service';
import { CaseBackendModule } from '../backend/case-backend';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    FlexLayoutModule,
    NgbAccordionModule,
    CaseBackendModule
  ],
  declarations: [CompletedCasesComponent, CurrentCasesComponent, DashboardComponent, CaseCardComponent, TableComponent,
    TableFilterComponent],
  providers: [CurrentCasesService]
})
export class DashboardModule {
}
