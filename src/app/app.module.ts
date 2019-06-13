import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

// NativeScript wrapper for the popular IQKeyboardManager iOS framework, 
// which provides an elegant solution for preventing the iOS keyboard from covering UITextView controls.
import { registerElement } from "nativescript-angular";
registerElement("PreviousNextView", () => require("nativescript-iqkeyboardmanager").PreviousNextView);


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

/**
 * Costum imports / installs
 */
//import firebase = require('nativescript-plugin-firebase');

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
    ],
    declarations: [
        AppComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
