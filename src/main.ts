import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

/*bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [provideHttpClient(withFetch())]
}).catch((err) => console.error(err));*/

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));