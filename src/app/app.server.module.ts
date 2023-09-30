import { NgModule, inject } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { LOCAL_STORAGE_TOKEN } from './tokens/localStorage';
import { WINDOW_TOKEN } from './tokens/window';
import { windowServer } from './server/browser-api/window';

@NgModule({
  imports: [AppModule, ServerModule],
  providers: [
    {
      provide: LOCAL_STORAGE_TOKEN,
      useFactory: () => {
        return inject<Window>(WINDOW_TOKEN).localStorage;
      }
    },
    {
      provide: WINDOW_TOKEN,
      useFactory: () => {
        return windowServer;
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
