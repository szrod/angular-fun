/**
 * @copyright 2001-2017 Accenture LLC. All Rights Reserved
 * @module backend
 */

import { Case, CaseEvent } from '@core/models';
import { CoreUtils } from '@core/utils';
import { MockEventDispatcher } from '../mock-event-dispatcher';

/* tslint:disable:no-magic-numbers */

export class CaseMockDispatcher extends MockEventDispatcher<Case, CaseEvent> {

  constructor() {
    super();
  }

  public emitUpdate(): void {
    this.processRandomEvent();
  }

  private processRandomEvent(): void {
    const num: number = CoreUtils.RANDOM(0, 3); // 25% chance a new user is scheduled
    if (num === 0) {
      this.addRandomCase();
    } else {
      this.randomCaseChange();
    }
  }

  private randomCaseChange(): void {
    // const cases: Case[] = this.cache.getValue().slice();
    // if (cases && cases.length > 0) {
    //   return this.emitUpdateItem(myCase, <string>myCase.patientID);
    // }
  }

  private addRandomCase(): void {
    // const newCase: Case = new Case();
    // return this.emitAddItem(newCase);
  }

}
