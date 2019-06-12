import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { DetailRoutingModule } from "./detail-routing.module";
import { DetailComponent } from "./detail.component";

import { GuideComponent } from './guide/guide.component';



/**
 * Custom imports and installs
 */
// RadListView
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        DetailRoutingModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        DetailComponent,
        GuideComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class DetailModule { }
