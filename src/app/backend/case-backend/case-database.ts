/**
 * @copyright 2001-2017 Accenture LLC. All Rights Reserved
 * @module backend
 */

import { HttpMiddlewareDatabase } from '@core/http-middleware';
import { Case, CaseEvent } from '@core/models';
import { CaseProviderService } from './case-provider.service';
import { CaseEventService } from './case-event.service';

/**
 * Case Database
 * Used to make updates to Backend Change and send reactive updates
 * @access private - only accessible via backend service
 */
export class CaseDatabase extends HttpMiddlewareDatabase<Case, CaseEvent> {

  constructor(private caseProviderService: CaseProviderService,
              private caseEventService: CaseEventService) {
    super(caseProviderService, caseEventService, 'patientID');

  }

}
