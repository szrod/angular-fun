import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Case, CaseEvent} from '@core/models';
import { CaseDatasource } from './case-datasource';
import { CaseDatabase } from './case-database';
import { CaseProviderService } from './case-provider.service';
import { CaseEventService } from './case-event.service';
import { BackendService } from '../backend.service';

/**
 * Case Backend Service
 * @access public
 */
@Injectable()
export class CaseBackendService extends BackendService<Case, string, CaseEvent> {

  public datasource: CaseDatasource;
  public database: CaseDatabase;

  constructor(protected caseProvider: CaseProviderService,
              protected caseEvent: CaseEventService) {
    super(caseEvent);
    this.database = new CaseDatabase(
      this.caseProvider,
      this.caseEvent
    );
    this.datasource = new CaseDatasource(this.database);
  }

}
