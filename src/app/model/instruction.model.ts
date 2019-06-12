import { GuideType } from "./guide-type.model";
import { CompanyGuide } from "./company-guide.model";

export class Instruction {
    id: number;
    name: string;
    cover: string;
    guideTypes: GuideType[];
    companyGuides: CompanyGuide[];
}
