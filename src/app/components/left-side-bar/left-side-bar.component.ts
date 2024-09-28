import { Component } from '@angular/core';
import {IconsModule} from "../../icons/icons-module";
import {RouterLink, RouterModule} from "@angular/router";

@Component({
  selector: 'app-left-side-bar',
  standalone: true,
  imports: [IconsModule, RouterModule, RouterLink],
  templateUrl: './left-side-bar.component.html',
  styleUrl: './left-side-bar.component.scss'
})
export class LeftSideBarComponent {

}
