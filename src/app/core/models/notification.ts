import { NotificationStyleType, NotificationType } from '@swimlane/ngx-ui';

export class NgxNotification {
  public body?: string;
  public styleType?: string | NotificationStyleType;
  public timeout?: boolean | number;
  public rateLimit?: boolean;
  public icon?: string;
  public pauseOnHover?: boolean;
  public type?: string | NotificationType;
  public showClose?: boolean;
  public sound?: boolean;

  constructor(public title: string) {

  }
}
