import { Component, Input } from '@angular/core';
import { IBEState } from '../models/model';
import { CurrentLanguageService } from '../services/current-language.service';
import { TranslatePipe } from '../pipes/translate.pipe';
import { CommonModule } from '@angular/common';

/**
 * InfoSectionComponent displays information about the booking engine state.
 * It shows details such as price per person, start and end times, address, phone, and email.
 * The component is designed to be used in a standalone manner and can be integrated into various parts of the application.
 */
@Component({
  selector: 'app-info-section[beState]',
  standalone: true,
  imports: [TranslatePipe, CommonModule],
  templateUrl: './info-section.component.html',
  styleUrl: './info-section.component.scss',
})
export class InfoSectionComponent {
  private _beState: IBEState | null = null;

  constructor(public currentLanguageService: CurrentLanguageService) {}

  @Input()
  set beState(value: IBEState | null) {
    this._beState = value;
    this.setup();
  }
  get beState(): IBEState | null {
    return this._beState;
  }
  pricePerPerson: number | null = null;

  startTime: string | null = null;
  endTime: string | null = null;

  address: string | null = null;
  companyPhone: string | null = null;
  companyMail: string | null = null;
  setup() {
    this.pricePerPerson = this.beState?.companyData?.pricePerPerson ?? null;

    this.startTime = this.beState?.companyData?.startTime ?? null;
    this.endTime = this.beState?.companyData?.endTime ?? null;

    this.address = this.beState?.companyData?.address ?? null;
    this.companyPhone = this.beState?.companyData?.phone ?? null;
    this.companyMail = this.beState?.companyData?.email ?? null;
  }
}
