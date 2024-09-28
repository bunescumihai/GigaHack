import { Routes } from '@angular/router';
import {APP_ROUTER_TOKENS} from "./app-router-tokens";
import {HomeComponent} from "./pages/home/home.component";
import {AnalysisPageComponent} from "./pages/analysis-page/analysis-page.component";
import {AgenciesPageComponent} from "./pages/agencies-page/agencies-page.component";

export const routes: Routes = [
  {
    path: APP_ROUTER_TOKENS.HOME,
    component: AnalysisPageComponent
  },
  {
    path: APP_ROUTER_TOKENS.ANALISYS,
    redirectTo: APP_ROUTER_TOKENS.HOME,
    pathMatch: 'full'
  },
  {
    path: APP_ROUTER_TOKENS.AGENCIES,
    component: AgenciesPageComponent
  }
];
