/**
 * @copyright 2001-2017 Accenture LLC. All Rights Reserved
 * @module backend
 */

import { Injectable } from '@angular/core';
import { Case } from '@core/models';
import { DataService, MiddlewareService } from '@core/http-middleware';

/**
 * Case Provider Service
 * Provides the connection between data source and base to the core data service
 */
@Injectable()
export class CaseProviderService extends MiddlewareService<Case> {

  public NAMESPACE: string = '';

  constructor(protected dataService: DataService<Case>) {
    super(dataService);
  }

}
