import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { PageRoute, RouterExtensions } from 'nativescript-angular/router';
import * as app from "tns-core-modules/application";

import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

import { Instruction } from '../model/instruction.model';
import { DataService } from '../services/data.service';
import { CompanyGuide } from '../model/company-guide.model';


@Component({
  selector: 'ns-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  moduleId: module.id,
})
export class DetailComponent implements OnInit {

  instructionId: number;
  instruction: Instruction;
  instructions: Array<Instruction>;

  constructor(
    private pageRoute: PageRoute,
    private routerExtensions: RouterExtensions,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.instructions = this.dataService.getInstructionItems();

    // Get the passed params and set the instructionId as the passed Id
    // and set the instruction object to the coressponding one in the service
    this.pageRoute.activatedRoute.pipe(
      switchMap(activatedRoute => activatedRoute.params)
    ).forEach((params) => {
      this.instructionId = + params["id"];
      this.instruction = this.instructions.filter(i => i.id == this.instructionId)[0];
    });
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

}
