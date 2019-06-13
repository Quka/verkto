import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import * as firebase from "nativescript-plugin-firebase";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  register(user: User) {
    return firebase.createUser({
      email: user.email,
      password: user.password
    })
      .then((user) => { return user; })
      .catch(error => { return this.handleErrors(error) });
  }

  login(user: User) {
    return firebase.login({
      type: firebase.LoginType.PASSWORD,
      passwordOptions: {
        email: user.email,
        password: user.password
      }
    })
      .then(result => { return result; })
      .catch(error => { return this.handleErrors(error); });
  }

  logout() {
    // return Kinvey.User.logout()
    //   .catch(this.handleErrors);
    return true;
  }

  resetPassword(email) {
    // return Kinvey.User.resetPassword(email)
    //   .catch(this.handleErrors);
    return true;
  }

  handleErrors(error: string) {
    return Promise.reject(error);
  }
}