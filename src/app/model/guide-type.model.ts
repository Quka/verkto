import { CompanyGuide } from "./company-guide.model";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { Observable } from "rxjs";

export class GuideType {
    docId: string;
    id: number;
    instructionId: number;
    title: string;
    companyGuides: ObservableArray<CompanyGuide>;
}
