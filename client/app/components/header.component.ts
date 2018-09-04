import { Component } from '@angular/core'
import { UserService } from '../services/user.service'
@Component({
  selector: 'app-header',
  template: `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand"  [routerLink]="['/']">
      Mean Stack JS
    </a>

    <button class="navbar-toggler" type="button" (click)="toggleNavbar()">
      <span class="navbar-toggler-icon"></span>
    </button>


    <div class="collapse navbar-collapse" [ngClass]="{ 'show': navbarOpen }">
      <ul class="navbar-nav">
        <li class="nav-item" *ngIf="userService.USER.success">
          <a class="nav-link" [routerLink]="['/account']">{{userService.USER.user.profile.name}}</a>
        </li>
        <li class="nav-item" *ngIf="userService.USER.success">
          <a class="nav-link"  (click)="userService.postLogout()">Logout</a>
        </li>
        <li class="nav-item" *ngIf="!userService.USER.success">
          <a class="nav-link"  [routerLink]="['/login']">Login</a>
        </li>
        <li class="nav-item" *ngIf="!userService.USER.success">
          <a class="nav-link" [routerLink]="['/register']">Sign Up</a>
        </li>
      </ul>
    </div>
  </nav>
  `
})
export class HeaderComponent {
  navbarOpen = false
  constructor (private userService: UserService) {
    console.log(this.userService,'HERE')
  }
  toggleNavbar () {
    this.navbarOpen = !this.navbarOpen
  }
}
