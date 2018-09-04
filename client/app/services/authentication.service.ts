import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { UserService } from './user.service'
@Injectable()
export class AuthenticationService {
  constructor (private http: HttpClient, private userService: UserService) { }

  login (email: string, password: string) {
    return this.userService.postAuthenticate({ email: email, password: password })
        .toPromise()
        .then(this.userService.setUser.bind(this))
  }
}
