import {Component, inject} from '@angular/core';
import {pageLoadingAnimation} from "../../animations/page-loading-animation";
import {AgencyCardComponent} from "../../components/agency-card/agency-card.component";
import {AgencyRepositoryService} from "../../services/agency-repository.service";
import {AsyncPipe, NgFor} from "@angular/common";

@Component({
  selector: 'app-agencies-page',
  standalone: true,
  imports: [
    AgencyCardComponent,
    AsyncPipe,
    NgFor
  ],
  templateUrl: './agencies-page.component.html',
  styleUrl: './agencies-page.component.scss',
  animations: pageLoadingAnimation
})
export class AgenciesPageComponent {
  agencyRepository = inject(AgencyRepositoryService);

}
