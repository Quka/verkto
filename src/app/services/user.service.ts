import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import * as firebase from "nativescript-plugin-firebase";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: User;

  constructor() {
    // TODO: Get login credentials from local storage
    this.currentUser = new User();
    this.getCurrentUser();
  }

  isUserLoggedIn(): Promise<boolean> {
    console.log("is user logged in called");
    return firebase.getCurrentUser()
      .then(user => {

        if (typeof user !== "undefined") {
          return true;
        }
        else {
          return false;
        }

      })
      .catch(err => {
        console.error(err);
        return false;
      });
  }

  getCurrentUser() {
    return firebase.getCurrentUser()
      .then(user => {

        this.currentUser.uid = user.uid;
        this.currentUser.email = user.email;
        this.currentUser.displayName = user.displayName;

        return user;
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  }

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
      .then(user => {
        this.currentUser.uid = user.uid;
        this.currentUser.email = user.email;
        this.currentUser.displayName = user.displayName;
        return user;
      })
      .catch(error => { return this.handleErrors(error); });
  }

  logout() {
    // return Kinvey.User.logout()
    //   .catch(this.handleErrors);
    return true;
  }

  resetPassword(email) {
    return firebase.sendPasswordResetEmail(email)
      .then(() => { return Promise.resolve(email) })
      .catch(error => { return this.handleErrors(error) });
  }

  handleErrors(error: string) {
    return Promise.reject(error);
  }
}