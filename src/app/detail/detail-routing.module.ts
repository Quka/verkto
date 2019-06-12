import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { DetailComponent } from "./detail.component";

const routes: Routes = [
    { path: "", component: DetailComponent, pathMatch: "full" },
    { path: "detail/:id", component: DetailComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class DetailRoutingModule { }
