import { Component } from '@angular/core';
import {pageLoadingAnimation} from "../../animations/page-loading-animation";
import {AgencyCardComponent} from "../../components/agency-card/agency-card.component";

@Component({
  selector: 'app-agencies-page',
  standalone: true,
  imports: [
    AgencyCardComponent
  ],
  templateUrl: './agencies-page.component.html',
  styleUrl: './agencies-page.component.scss',
  animations: pageLoadingAnimation
})
export class AgenciesPageComponent {

}
