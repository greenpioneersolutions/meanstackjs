import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { AlertService, UserService } from '../services'

@Component({
  selector: 'app-login',
  styleUrls: ['../styles/user.container.scss'],
  template: `
<div class="container">
<form class="form-signin" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
    <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Login</h1>
        <p>Build form controls with floating labels via the <code>:placeholder-shown</code> pseudo-element. <a href="https://caniuse.com/#feat=css-placeholder-shown">Works in latest Chrome, Safari, and Firefox.</a></p>
    </div>

    <div class="form-label-group">
        <label for="email">email</label>
        <input type="text" formControlName="email" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.email.errors }" />
        <div *ngIf="submitted && f.email.errors" class="invalid-feedback">
            <div *ngIf="f.email.errors.required">Email is required</div>
        </div>
    </div>

    <div class="form-label-group">
        <label for="password">Password</label>
        <input type="password" formControlName="password" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.password.errors }" />
        <div *ngIf="submitted && f.password.errors" class="invalid-feedback">
            <div *ngIf="f.password.errors.required">Password is required</div>
        </div>
    </div>

    <div class="checkbox mb-3">
        <label>
        <input type="checkbox" formControlName="remember"> Remember me
        </label>
    </div>
    <button class="btn btn-lg btn-primary btn-block" type="submit" [disabled]="loading">Sign in</button>
    <button class="btn btn-lg btn-link btn-block" [routerLink]="['/register']">Register</button>
    <p class="mt-5 mb-3 text-muted text-center">Mean Stack JS</p>
</form>
</div>
`
})
export class LoginContainer implements OnInit {
  loginForm: FormGroup
  loading = false
  submitted = false
  returnUrl: string

  constructor (
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) {}

  ngOnInit () {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      remember: ['', null]
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
  }
  get f () { return this.loginForm.controls }

  onSubmit () {
    this.submitted = true
    if (this.loginForm.invalid) {
      return
    }
    this.loading = true
    this.userService.postAuthenticate({ email: this.f.email.value, password: this.f.password.value })
      .subscribe(
        data => {
          this.userService.setUser(data)
          this.router.navigate([this.returnUrl])
            .then(() => { /** noop */ })
            .catch(() => { /** noop */ })
        },
        error => {
          this.alertService.error(error)
          this.loading = false
        })
  }
}
