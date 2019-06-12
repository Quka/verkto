import { CompanyGuide } from "./company-guide.model";

export class GuideType {
    id: number;
    instructionId: number;
    title: string;
    companyGuides: CompanyGuide[];
}
