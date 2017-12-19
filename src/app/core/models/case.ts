import { Event } from './backend';

export enum CaseStatus {
  ACTION_NEEDED = 'ActionNeeded',
  IN_PROGRESS = 'InProgress',
  COMPLETED = 'Completed'
}

export enum CaseService {
  BV = 'BV',
  PA = 'PA',
  COPAY = 'CoPay',
  PAP = 'PAP',
  PR = 'PR'
}

export class Case {
  public statusKey: CaseStatus | string;
  public patientID: number | string;
  public dob: string;
  public name: string;
  public serviceID: number;
  public service: CaseService | string;

  constructor() {

  }

  // public get dateOfBirth(): Date {
  //   return new Date(this.dob);
  // }
}

export class CaseEvent extends Event {
  public $class: string = 'CaseEvent';
  public case: Case;
}
