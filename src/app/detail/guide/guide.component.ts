import { Component, OnInit, Input } from '@angular/core';
import { GuideType } from '../../model/guide-type.model';
import { CompanyGuide } from '~/app/model/company-guide.model';

@Component({
  selector: 'ns-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss'],
  moduleId: module.id,
})
export class GuideComponent implements OnInit {

  @Input() guide: GuideType;
  selectedCompanyGuide: CompanyGuide;

  constructor() { }

  ngOnInit() {
    this.selectedCompanyGuide = this.guide.companyGuides[0];
  }

  onCompanyTap(company: CompanyGuide): void {
    this.selectedCompanyGuide = company;
  }

}
