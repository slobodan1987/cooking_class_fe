import { Component, OnInit } from '@angular/core';
import { mockBeStateWithDates } from '../models/mock';
import { IBEState } from '../models/model';

/** * AdminPageComponent serves as the main entry point for the admin page of the application.
 * It initializes the booking engine state with predefined dates and company data.
 * The component is designed to be standalone and can be used independently in different parts of the application.
 */
@Component({
  selector: 'app-admin-page',
  imports: [],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent implements OnInit {
  beState: IBEState | null = null;

  ngOnInit(): void {
    this.readBEState();
  }
  readBEState() {
    this.beState = mockBeStateWithDates;
  }
}
