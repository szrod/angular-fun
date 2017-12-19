import { Injectable } from '@angular/core';
import { NgxNotification } from './models';
import { NotificationService } from '@swimlane/ngx-ui/release';
import Timer = NodeJS.Timer;

/**
 * Handles any messages or notifications that need to be loaded to the user
 */
@Injectable()
export class MessengerService {

  private irritatedState: boolean = false;
  private consecutiveClicks: number = 0;
  private consecutiveLimit: number = 8;
  private consessionTimeout: number = 3000;
  private timer: Timer;

  constructor(private notificationService: NotificationService) {
  }

  public send(message: NgxNotification): void {
    console.log(message);
    this.notificationService.create(message);
  }

}
