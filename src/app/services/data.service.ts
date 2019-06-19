import { Injectable, NgZone } from '@angular/core';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { Observable } from 'rxjs';

import { Instruction } from '../model/instruction.model';
import { GuideType } from '../model/guide-type.model';
import { CompanyGuide } from '../model/company-guide.model';

import { firestore } from 'nativescript-plugin-firebase';
import * as firebase from "nativescript-plugin-firebase/app";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _instructionItems: ObservableArray<Instruction>;

  /**
   * 
   * @param zone The most common use of this service is to optimize performance when starting a work consisting of one or more asynchronous tasks that don't require UI updates or error handling to be handled by Angular. Such tasks can be kicked off via runOutsideAngular and if needed, these tasks can reenter the Angular zone via run.
   */
  constructor(private zone: NgZone) { }

  get instructionItems(): ObservableArray<Instruction> {
    return this._instructionItems;
  }

  retrieveInstructionItems(): ObservableArray<Instruction> {
    this._instructionItems = new ObservableArray();

    // Get collection of instructions
    firebase.firestore().collection("instructions").orderBy("id", "asc").get().then(query => {
      query.forEach(doc => {
        let instruction: Instruction = <Instruction>doc.data();
        instruction.guideTypes = new ObservableArray<GuideType>();

        // Foreach instruction, get collection of guideTypes for the corresponding instruction
        const colRef: firestore.CollectionReference = firebase.firestore().collection("guideTypes");
        
        colRef.where("instructionId", "==", instruction.id).orderBy("id", "asc").get().then(snapshot => {
          snapshot.forEach(doc => {

            let guideType: GuideType = <GuideType>doc.data();
            guideType.docId = doc.id;
            guideType.companyGuides = new ObservableArray<CompanyGuide>();
            instruction.guideTypes.push(guideType);

            // Foreach guideType get colection of companGuides for corresponding GuideType
            colRef.doc(doc.id).collection("companyGuide").orderBy("id", "asc").get().then(snapshot => {
              snapshot.forEach(doc => {

                let companyGuide: CompanyGuide = <CompanyGuide>doc.data();
                companyGuide.docId = doc.id;

                guideType.companyGuides.push(companyGuide);
              });
            });
          });
        });

        this._instructionItems.push(instruction);
      })
    });

    return this._instructionItems;
  }
}
