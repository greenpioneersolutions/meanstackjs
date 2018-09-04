import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AppComponent, HeaderComponent, FooterComponent, AlertComponent } from './components'
import { AlertService, AuthenticationService, UserService } from './services'
import { AuthGuard } from './guards'
import { JwtInterceptor, ErrorInterceptor } from './interceptors'
import { IndexContainer, LoginContainer,AccountContainer,RegisterContainer } from './containers'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { routing } from './routers/app.routing'
import { ReactiveFormsModule } from '@angular/forms'
@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    IndexContainer,
    LoginContainer,
    AccountContainer,
    RegisterContainer
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: function (userService: UserService) {
      return () => userService.getAuthenticate()
    }, deps: [UserService], multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
