import { Injectable } from '@angular/core';
import { CaseEvent, Event } from '@core/models';
import { BackendConfig } from '../backend-config';

@Injectable()
export class CaseConfig implements BackendConfig {
  public eventClass: Event = new CaseEvent();
}
