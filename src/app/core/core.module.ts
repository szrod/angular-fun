import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NotificationModule } from '@swimlane/ngx-ui';
import { Configuration } from './configuration';
import { MessengerService } from './messenger.service';
import { HttpMiddlewareModule } from '@core/http-middleware';

@NgModule({
  imports: [
    CommonModule,
    NotificationModule,
    HttpClientModule,
    HttpMiddlewareModule
  ],
  providers: [Configuration, MessengerService]
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [Configuration]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
