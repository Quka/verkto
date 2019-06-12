import { GuideType } from "./guide-type.model";

export class CompanyGuide {
    id: number;
    guideTypeId: number;
    name: string;
    contentLines: { image: string; content: string; }[];
    source: string; // a url/link to the source of this company guide
}
