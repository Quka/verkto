import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import { DataService } from "../services/data.service";
import { Instruction } from "../model/instruction.model";
import { RouterExtensions } from "nativescript-angular/router";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    private _instructionItemsArray: ObservableArray<Instruction>;

    constructor(private routerExtensions: RouterExtensions, private dataService: DataService) {
        // Use the component constructor to inject providers.

    }

    ngOnInit(): void {
        // Init your component properties here.
        this._instructionItemsArray = this.dataService.retrieveInstructionItems();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    get instructionItemsArray(): ObservableArray<Instruction> {
        return this._instructionItemsArray;
    }

    showInstructionItem(id: number): void {
        console.log('Tapped on' + id);
        this.routerExtensions.navigate(["detail/" + id, {
            animated: true,
            transition: {
                name: "slideTop",
                duration: 380,
                curve: "easeIn"
            }
        }]);
    }

    generateGridRows() {
        let rows = "*";
        for (let i = 0; i < this._instructionItemsArray.length - 1; i++) {
            rows += ",*"
        }
        return rows;
    }
}
