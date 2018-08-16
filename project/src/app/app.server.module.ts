import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
  // The AppServerModule should import your AppModule followed
  // by the ServerModule from @angular/platform-server.
  // *Important* ModuleMapLoaderModule is needed to have lazy-loaded routes work
  imports: [AppModule, ServerModule, ModuleMapLoaderModule],

  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [AppComponent]
})
export class AppServerModule {}
