import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { DefaultHttpService } from './default-http.service';


@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private http: DefaultHttpService) { }

  createUser(user: User) {
    return this.http.post<User>(`/account/create-user`, user)
  }

  forgotPassword(username: String) {
    return this.http.post<User>(`/account/forgot-password/${username}`, null)
  }

  changePasswordForgotKey(user: User) {
    return this.http.post<User>(`/account/forgot-password`, user)
  }

  verifyForgotKey(forgotKey: String) {
    return this.http.get<Boolean>(`/account/getByForgotKey/${forgotKey}`)
  }

}