import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { User } from '../models'

@Injectable()
export class UserService {
  public USER = {
    success: false
  }
  constructor (private http: HttpClient) { }
  setUser (USER) {
    localStorage.setItem('user', JSON.stringify(USER))
    localStorage.setItem('token', USER.token)
    this.USER = USER
  }
  resetUser () {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    this.USER = {
      success: false
    }
  }
  postAuthenticate (user: any) {
    return this.http.post('/api/user/authenticate', user)
  }
  getAuthenticate () {
    return this.http.get('/api/user/authenticate')
        .toPromise()
        .then(this.setUser.bind(this))
  }
  postLogout () {
    return this.http.post('/api/user/logout',{})
        .subscribe(
          data => {
            this.resetUser.bind(this)
            location.reload(true)
          },
          error => {
            console.log(error)
            this.resetUser.bind(this)
            location.reload(true)
          })
  }
  postForgot (user: User) {
    return this.http.post('/api/user/forgot', user)
  }
  getResetToken (token: string) {
    return this.http.get(`/api/user/reset/${token}`)
  }
  postResetToken (user: User) {
    return this.http.post('/api/user/reset/:token', user)
  }
  postSignup (user: User) {
    return this.http.post('/api/user/signup', user)
  }
  putProfile (user: User) {
    return this.http.put('/api/user/profile', user)
  }
  putPassword (user: User) {
    return this.http.put('/api/user/password', user)
  }
  deleteUser () {
    return this.http.delete('/api/user/delete')
  }
  getToken (user: User) {
    return this.http.get('/api/user/token')
  }
  postToken (user: User) {
    return this.http.post('/api/user/token', user)
  }
  getTokenReset (user: User) {
    return this.http.get('/api/user/token/reset')
  }
}
