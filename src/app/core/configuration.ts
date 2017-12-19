/**
 * @copyright 2001-2017 Accenture LLC. All Rights Reserved
 * @module core
 */

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export enum LogLevel {
  DEBUG,
  NORMAL,
  NONE
}

/**
 * Project configuration
 * @access private -- limited use and only available on core classes
 * @TODO make static
 */
@Injectable()
export class Configuration {
  public static readonly MOCK: boolean = environment.mock;
  public static readonly LOG_LEVEL: LogLevel = environment.log;
  public static readonly NETWORK_NAMESPACE: string = '';
  public static readonly DISABLE_SOCKET: boolean = environment.disableSocket;
  public readonly SOCKET_SERVER: string = '';
  public readonly SERVER: string = environment.api;
  public readonly PROD: boolean = environment.production;
}
