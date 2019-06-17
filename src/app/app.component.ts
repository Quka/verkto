import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import { User } from "./model/user.model";
import { UserService } from "./services/user.service";

// Import Google Firebase
const firebase = require('nativescript-plugin-firebase');

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;
    currentUser: User;

    constructor(
        private router: Router,
        private routerExtensions: RouterExtensions,
        private userService: UserService) {
        // Use the component constructor to inject services.
    }

    ngOnInit(): void {
        // Init Firebase as the first thing once the app runs
        firebase.init({
        }).then(
            () => console.log('Firebase initialised!'),
            error => {
                console.log(`firebase.init error: ${error}`);
            }
        )

        this.userService.isUserLoggedIn()
            .then(isLoggedIn => {
                if (isLoggedIn) {
                    this.routerExtensions.navigate(["/home"], { clearHistory: true });
                }
                else {
                    this.routerExtensions.navigate(["/login"], { clearHistory: true });
                }
            })
            .catch(() => {
            });

        // Sets the current user
        this.currentUser = this.userService.currentUser;

        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    logout(): void {
        firebase.logout();
        this.routerExtensions.navigate(["/login"]);

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
