import { GuideType } from "./guide-type.model";
import { CompanyGuide } from "./company-guide.model";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";

export class Instruction {
    id: number;
    name: string;
    cover: string;
    guideTypes: ObservableArray<GuideType>;
    // companyGuides: CompanyGuide[];
}
