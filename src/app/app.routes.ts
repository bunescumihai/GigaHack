import { Routes } from '@angular/router';
import {AppRouterTokens} from "./app-router-tokens";
import {HomeComponent} from "./pages/home/home.component";

export const routes: Routes = [
  {
    path: AppRouterTokens.HOME,
    component: HomeComponent
  }
];
