import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseBackendService } from './case-backend.service';
import { CaseProviderService } from './case-provider.service';
import { CaseConfig } from './case-config';
import { CaseEventService } from './case-event.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [CaseBackendService, CaseProviderService, CaseConfig, CaseEventService]
})
export class CaseBackendModule { }
