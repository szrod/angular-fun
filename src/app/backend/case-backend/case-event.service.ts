/**
 * @copyright 2001-2017 Accenture LLC. All Rights Reserved
 * @module backend
 */

import { Injectable } from '@angular/core';
import { Case, CaseEvent } from '@core/models';
import { CaseConfig } from './case-config';
import { CaseMockDispatcher } from './case-mock-dispatcher';
import { EventService } from '../event-service';
import { ServerSocket } from '@core/http-middleware';

/**
 * Case Event Service for any socket events related to the Case model
 */
@Injectable()
export class CaseEventService extends EventService<Case, CaseEvent> {

  public caseMockDispatcher: CaseMockDispatcher;

  constructor(private serverSocket: ServerSocket, private caseConfig: CaseConfig) {
    super(caseConfig.eventClass.$class, serverSocket);

    this.caseMockDispatcher = new CaseMockDispatcher();
    this.loadMockDispatcher(this.caseMockDispatcher);
  }

}
