import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerSocket } from './websocket';
import { DataService } from './data.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ServerSocket, DataService]
})
export class HttpMiddlewareModule {
}
