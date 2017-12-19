/**
 * @copyright 2001-2017 Accenture LLC. All Rights Reserved
 * @module traffic
 */

/* tslint:disable:no-any no-magic-numbers */

import { InputCategory, InputElementInput } from '@shared/models';

export class FilterConfig {

  private static SERVICE_META: InputElementInput[] = [
    {
      title: 'Benefits Verification',
      value: 'BV'
    },
    {
      title: 'Prior Authorization',
      value: 'PA'
    },
    {
      title: 'Prescription Referral',
      value: 'PR'
    },
    {
      title: 'PAP',
      value: 'PAP'
    },
    {
      title: 'Copay',
      value: 'CoPay'
    }
  ];

  private static STATUS_META: InputElementInput[] = [
    {
      title: 'Action Needed',
      value: 'ActionNeeded'
    },
    {
      title: 'In Progress',
      value: 'InProgress'
    },
    {
      title: 'Completed',
      value: 'Completed'
    }
  ];

  public filters: InputCategory[] = [];

  constructor() {
    this.addSheet('statusKey', 'Status', FilterConfig.STATUS_META);
    this.addSheet('service', 'Service', FilterConfig.SERVICE_META);
  }

  private addSheet(prop: string, title: string, data: InputElementInput[]): void {
    const sheet: InputCategory = new InputCategory(prop, title);
    data.forEach((input: InputElementInput) => {
      sheet.addElement(input);
    });
    this.filters.push(sheet);
  }

}
