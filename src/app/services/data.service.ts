import { Injectable } from '@angular/core';
import { Instruction } from '../model/instruction.model';
import { GuideType } from '../model/guide-type.model';
import { CompanyGuide } from '../model/company-guide.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getInstructionItems(): Array<Instruction> {
    let instructions: Array<Instruction> = [
      { id: 1, name: "Tagkonstruktion", cover: "roof.jpg", guideTypes: null, companyGuides: null, },
      { id: 2, name: "Vægge i trækonstruktion", cover: "wall.jpg", guideTypes: null, companyGuides: null },
      { id: 3, name: "Gulv", cover: "floor.jpg", guideTypes: null, companyGuides: null },
    ]

    instructions.forEach(instr => {
      instr.guideTypes = this.getGuideTypes().filter(g => g.instructionId == instr.id);
    });

    return instructions;
  }

  getGuideTypes(): Array<GuideType> {
    let guides: Array<GuideType> = [
      { id: 1, instructionId: 2, title: "Vægbeklædning", companyGuides: null },
      { id: 2, instructionId: 2, title: "Isolering", companyGuides: null },
      { id: 3, instructionId: 2, title: "Dampspærre", companyGuides: null },
      { id: 4, instructionId: 2, title: "Vindspærre", companyGuides: null },
      { id: 5, instructionId: 2, title: "Facadebeklædning", companyGuides: null },
    ]

    guides.forEach(g => {
      g.companyGuides = this.getCompanyGuides().filter(cg => cg.guideTypeId == g.id)
    });

    return guides;
  }

  getCompanyGuides(): Array<CompanyGuide> {
    let companyGuides: Array<CompanyGuide> = [
      {
        id: 1,
        guideTypeId: 1,
        name: "Gips / Knauf",
        contentLines: [
          { image: "cc450.png", content: "Stolpesamlinger. Som hovedregel skal stolper være i fuld længde. Eventuelle samlinger af stolper skal være forskudt fra stolpe til stolpe." },
          { image: "cc600.png", content: "Installationshuller. Der må udføres ekstra huller i profilkroppen, når hullet ikke overstiger 40% af kroppens bredde og en højde på max. 200 mm. " },
          { image: "", content: "Hullerne skal udføres min. 300 mm fra profilenderne og med en indbyrdes afstand på > 250 mm." },
          { image: "plademontage.png", content: "Plademontage. Pladerne kan monteres på langs eller på tværs af stolperne. Pladerne tilpasses, så de måler 10 - 15 mm mindre end den færdige væghøjde" },
          { image: "", content: "Tværmontage. Ved tværmontage monteres pladerne på tværs af stolpernes længderetning. Alle kortkanter skal samles over stolper. Ved beklædninger med 2 lag gipsplader forskydes samlingerne i de enkelte lag, som vist på tegningen." },
          { image: "lm_under_25m.png", content: "Længdemontage (indtil 2,5 m). Ved længdemontage monteres pladerne i stolpernes retning. Pladerne bør monteres uden kortkantsamlinger, når væghøjden er mindre end 2,5 meter." },
          { image: "lm_over_25m.png", content: "Længdemontage (over 2,5 m). Langkanter samles over stolpe. I yderste pladelag skal kortkanter være understøttet af T-samlestykke eller båndstål. Ved vægge med flere pladelag skal kortkantsamlingerne forskydes mindst 150 mm." },
          { image: "skruer_trae.png", content: "" },
          { image: "skrueafstande_lm.png", content: "Skrueafstande - Længdemontage. Inderste pladelag fastskrues pr. ca. 450 mm i alle stolperne. Yderste pladelag fastskrues langs kanter pr. 200 mm i stolper og pr. 200 - 225 mm i top- og bundskinne. Inde på pladen skrues pr. 300 mm i alle stolper. " },
          { image: "skrueafstande_tm.png", content: "Skrueafstande - Tværmontage. Inderste pladelag fastskrues i alle stolper med en afstand, der svarer til den halve pladebredde. Yderste pladelag fastskrues pr. 200 mm i stolper og pr. 200 - 225 mm i top- og bundskinne. Inde på pladen skrues pr. 300 mm i alle stolper." },
        ],
        source: "https://www.google.com"
      },
      { id: 2, guideTypeId: 2, name: "Rockwool", contentLines: [{ image: "", content: "rockrro brocrro" }], source: "https://www.google.com" },
      { id: 3, guideTypeId: 3, name: "Dafa", contentLines: [{ image: "", content: "daferro raferro" }], source: "https://www.google.com" },
      { id: 4, guideTypeId: 4, name: "Nordland", contentLines: [{ image: "", content: "norderro orderro" }], source: "https://www.google.com" },
      { id: 5, guideTypeId: 5, name: "Klemmelister", contentLines: [{ image: "", content: "selvrro elverro" }], source: "https://www.google.com" },
      { id: 5, guideTypeId: 5, name: "Træbeklædning", contentLines: [{ image: "", content: "adsf kjaslkdfj alskdjf" }], source: "https://www.google.com" },
      { id: 5, guideTypeId: 5, name: "Eternit", contentLines: [{ image: "", content: "zxcvlkzxjcklvzlxckvj zlkjxcv lzækjvc" }], source: "https://www.google.com" },
    ]

    return companyGuides;
  }
}
