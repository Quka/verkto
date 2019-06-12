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
          { image: "blabla", content: "Placering af stolper" },
          {
            image: "blabla", content: "Gorgeous spiral galaxy M33 seems to have more than its fair share of glowing hydrogen gas." +
              "A prominent member of the local group of galaxies, M33 is also known as the Triangulum Galaxy and" +
              "lies about 3 million light-years distant.The galaxy's inner 30,000 light-years or so are shown in this" +
              "telescopic portrait that enhances its reddish ionized hydrogen clouds or HII regions." +
              "Sprawling along loose spiral arms that wind toward the core, M33's giant HII regions are some" +
              "of the largest known stellar nurseries,sites of the formation of short-lived but very massive stars." +
              "Intense ultraviolet radiation from the luminous, massive stars ionizes" +
              "the surrounding hydrogen gas and ultimately produces the characteristic red glow. To enhance this image," +
              "broadband data was used to produce a color view of the galaxy and combined with narrowband data recorded" +
              "through a hydrogen-alpha filter.That filter transmits the light of the strongest hydrogen emission line."
          },
          { image: "blabla", content: "" },
        ],
        source: "https://www.google.com"
      },
      { id: 2, guideTypeId: 2, name: "Rockwool", contentLines: [{ image: "basdflf asdf", content: "rockrro brocrro" }], source: "https://www.google.com" },
      { id: 3, guideTypeId: 3, name: "Dafa", contentLines: [{ image: "basdflf asdf", content: "daferro raferro" }], source: "https://www.google.com" },
      { id: 4, guideTypeId: 4, name: "Nordland", contentLines: [{ image: "basdflf asdf", content: "norderro orderro" }], source: "https://www.google.com" },
      { id: 5, guideTypeId: 5, name: "Klemmelister", contentLines: [{ image: "basdflf asdf", content: "selvrro elverro" }], source: "https://www.google.com" },
      { id: 5, guideTypeId: 5, name: "Træbeklædning", contentLines: [{ image: "basdflf asdf", content: "adsf kjaslkdfj alskdjf" }], source: "https://www.google.com" },
      { id: 5, guideTypeId: 5, name: "Eternit", contentLines: [{ image: "basdflf asdf", content: "zxcvlkzxjcklvzlxckvj zlkjxcv lzækjvc" }], source: "https://www.google.com" },
    ]

    return companyGuides;
  }
}
