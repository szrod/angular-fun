import { Event } from '@core/models';

export interface UpdateEvent extends Event {
  message: string;
}
