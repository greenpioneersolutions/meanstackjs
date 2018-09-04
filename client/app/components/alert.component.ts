import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { AlertService } from '../services'

@Component({
  selector: 'alert',
  template: `
  <div *ngIf="message" [ngClass]="{ 'alert': message, 'alert-success': message.type === 'success', 'alert-danger': message.type === 'error' }">{{message.text}}</div>
  `
})

export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription
  message: any

  constructor (private alertService: AlertService) { }

  ngOnInit () {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message
    })
  }

  ngOnDestroy () {
    this.subscription.unsubscribe()
  }
}
