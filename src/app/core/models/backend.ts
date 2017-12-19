export abstract class Event {
  public $class: string;
  public eventId?: string;
  public timestamp?: Date;
}
