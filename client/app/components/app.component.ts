import { Component } from '@angular/core'
@Component({
  selector: 'app-root',
  template: `
  <app-header></app-header>
    <alert></alert>
    <router-outlet></router-outlet>
  <app-footer></app-footer>
  `,
  styleUrls: ['../styles/app.component.scss']
})
export class AppComponent { }
