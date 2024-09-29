import {Component, Input} from '@angular/core';
import {Agency} from "../../models/agency";

@Component({
  selector: 'app-agency-card',
  standalone: true,
  imports: [],
  templateUrl: './agency-card.component.html',
  styleUrl: './agency-card.component.scss'
})
export class AgencyCardComponent {

  @Input() agency!: Agency;
}
