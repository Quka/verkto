import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { User } from '../model/user.model';
import { Page } from 'tns-core-modules/ui/page/page';
import { UserService } from '../services/user.service';
import { RouterExtensions } from 'nativescript-angular';

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  moduleId: module.id,
})
export class LoginComponent implements OnInit {

  appTitle: string = "VERKTO";
  isLoggingIn = true;
  user: User;
  processing = false;

  @ViewChild("password", { static: false }) password: ElementRef;
  @ViewChild("confirmPassword", { static: false }) confirmPassword: ElementRef;

  constructor(
    private page: Page,
    private userService: UserService,
    private routerExtensions: RouterExtensions
  ) {
    this.page.actionBarHidden = true;
    this.user = new User();
    this.user.email = "arlind13@hotmail.com";
    this.user.password = "1234567";
  }

  ngOnInit() {
  }

  toggleForm() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  submit() {
    if (!this.user.email || !this.user.password) {
      this.alert("Please provide both an email address and password.");
      return;
    }

    this.processing = true;

    if (this.isLoggingIn) {
      this.login();
    }
    else {
      this.register();
    }
  }

  login() {
    this.userService.login(this.user)
      .then(result => {
        this.processing = false;
        this.routerExtensions.navigate(["/home"], { clearHistory: true });
      })
      .catch(() => {
        this.processing = false;
        this.alert("Unfortunately we could not find your account.");
      });
  }


  register() {
    if (this.user.password != this.user.confirmPassword) {
      this.alert("Your passwords do not match.");
      this.processing = false;
      return;
    }

    this.userService.register(this.user)
      .then(() => {
        this.processing = false;
        this.alert("Your account was successfully created.");
        this.isLoggingIn = true;
      })
      .catch(() => {
        this.processing = false;
        this.alert("Unfortunately we were unable to create your account.");
      });
  }


  forgotPassword() {

    prompt({
      title: "Forgot Password",
      message: "Enter the email address you used to register for " + this.appTitle + " to reset your password.",
      inputType: "email",
      defaultText: "",
      okButtonText: "Ok",
      cancelButtonText: "Cancel"
    })
      .then((data) => {
        if (data.result) {
          this.userService.resetPassword(data.text.trim())
            .then(() => {
              this.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
            }).catch(() => {
              this.alert("Unfortunately, an error occurred resetting your password.");
            });
        }
      });
  }

  focusPassword() {
    this.password.nativeElement.focus();
  }
  focusConfirmPassword() {
    if (!this.isLoggingIn) {
      this.confirmPassword.nativeElement.focus();
    }
  }

  alert(message: string) {
    return alert({
      title: this.appTitle,
      okButtonText: "OK",
      message: message
    });
  }

}
