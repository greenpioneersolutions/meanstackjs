import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AlertService, UserService } from '../services'

@Component({
  selector: 'app-register',
  styleUrls: ['../styles/user.container.scss'],
  template: `
  <form class="form-signin" [formGroup]="registerForm" (ngSubmit)="onSubmit()">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Register</h1>
        <p>Build form controls with floating labels via the <code>:placeholder-shown</code> pseudo-element. <a href="https://caniuse.com/#feat=css-placeholder-shown">Works in latest Chrome, Safari, and Firefox.</a></p>
      </div>
      <div class="form-label-group">
          <label for="firstName">First Name</label>
          <input type="text" formControlName="firstName" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.firstName.errors }" />
          <div *ngIf="submitted && f.firstName.errors" class="invalid-feedback">
              <div *ngIf="f.firstName.errors.required">First Name is required</div>
          </div>
      </div>
      <div class="form-label-group">
          <label for="lastName">Last Name</label>
          <input type="text" formControlName="lastName" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.lastName.errors }" />
          <div *ngIf="submitted && f.lastName.errors" class="invalid-feedback">
              <div *ngIf="f.lastName.errors.required">Last Name is required</div>
          </div>
      </div>
      <div class="form-label-group">
          <label for="email">Email</label>
          <input type="text" formControlName="email" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.email.errors }" />
          <div *ngIf="submitted && f.email.errors" class="invalid-feedback">
              <div *ngIf="f.email.errors.required">Email is required</div>
          </div>
      </div>
      <div class="form-label-group">
          <label for="username">Username</label>
          <input type="text" formControlName="username" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.username.errors }" />
          <div *ngIf="submitted && f.username.errors" class="invalid-feedback">
              <div *ngIf="f.username.errors.required">Username is required</div>
          </div>
      </div>
      <div class="form-label-group mb-3">
          <label for="password">Password</label>
          <input type="password" formControlName="password" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.password.errors }" />
          <div *ngIf="submitted && f.password.errors" class="invalid-feedback">
              <div *ngIf="f.password.errors.required">Password is required</div>
              <div *ngIf="f.password.errors.minlength">Password must be at least 6 characters</div>
          </div>
      </div>
      <button class="btn btn-lg btn-primary btn-block" [disabled]="loading">Register</button>
      <button class="btn btn-lg btn-link btn-block" [routerLink]="['/login']">Cancel</button>
      <p class="mt-5 mb-3 text-muted text-center">Mean Stack JS</p>
  </form>
  `
})
export class RegisterContainer implements OnInit {
  registerForm: FormGroup
  loading = false
  submitted = false

  constructor (
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

  ngOnInit () {
    this.registerForm = this.formBuilder.group({
      firstName: ['jason', Validators.required],
      lastName: ['test', Validators.required],
      email: ['jason@test.com', Validators.required],
      username: ['tester', Validators.required],
      password: ['acdclive', [Validators.required, Validators.minLength(6)]]
    })
  }

    // convenience getter for easy access to form fields
  get f () { return this.registerForm.controls }

  onSubmit () {
    this.submitted = true

        // stop here if form is invalid
    if (this.registerForm.invalid) {
      return
    }

    this.loading = true
    this.userService.postSignup(this.registerForm.value)
    .subscribe(
        data => {
          this.alertService.success('Registration successful', true)
          this.router.navigate(['/login']).then(() => { /** noop */ }).catch(() => { /** noop */ })
        },
        error => {
          this.alertService.error(error)
          this.loading = false
        })
  }
}
