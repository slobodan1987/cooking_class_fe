import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ICompanyData } from '../../models/model';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { CurrentLanguageSharedService } from '../../services/current-language-shared.service';

/**
 * InfoSectionComponent displays information about the booking engine state.
 * It shows details such as price per person, start and end times, address, phone, and email.
 * The component is designed to be used in a standalone manner and can be integrated into various parts of the application.
 */
@Component({
  selector: 'app-info-section[companyData]',
  standalone: true,
  imports: [TranslatePipe, CommonModule],
  templateUrl: './info-section.component.html',
  styleUrl: './info-section.component.scss',
})
export class InfoSectionComponent {
  constructor(public currentLanguageService: CurrentLanguageSharedService) {}

  @Input()
  set companyData(value: ICompanyData | null) {
    this._companyData = value;
    this.setup();
  }
  get companyData(): ICompanyData | null {
    return this._companyData;
  }
  private _companyData: ICompanyData | null = null;
  pricePerPerson: number | null = null;

  startTime: string | null = null;
  endTime: string | null = null;

  address: string | null = null;
  companyPhone: string | null = null;
  companyMail: string | null = null;
  setup() {
    this.pricePerPerson = this._companyData?.pricePerPerson ?? null;

    this.startTime = this._companyData?.startTime ?? null;
    this.endTime = this._companyData?.endTime ?? null;

    this.address = this._companyData?.address ?? null;
    this.companyPhone = this._companyData?.phone ?? null;
    this.companyMail = this._companyData?.email ?? null;
  }
}
