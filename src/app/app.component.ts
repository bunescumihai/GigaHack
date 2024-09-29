import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TestRepository} from "./services/repositories/test.repository";
import {IconsModule} from "./icons/icons-module";
import {LeftSideBarComponent} from "./components/left-side-bar/left-side-bar.component";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LocationsRepositoryService} from "./services/repositories/locations-repository.service";
import {AsyncPipe} from "@angular/common";
import {LogicService} from "./services/logic.service";
import {AnalysisPageComponent} from "./pages/analysis-page/analysis-page.component";
import {APP_ROUTER_TOKENS} from "./app-router-tokens";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IconsModule, LeftSideBarComponent, LeafletModule, NgbDropdownModule, NgSelectModule, DashboardComponent, AsyncPipe, RouterLink, AnalysisPageComponent, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'parking';
  test = inject(TestRepository);
  locationsRepository = inject(LocationsRepositoryService);
  logic = inject(LogicService);


  changeLocations(location: string){
    if(location != '')
      this.logic.location$.set(location);
    console.log(location);
  }

  routes = {
    analysis: `/${APP_ROUTER_TOKENS.HOME}`,
    agencies: `/${APP_ROUTER_TOKENS.AGENCIES}`
  }

  ngOnInit(): void {
  }

  constructor() {
  }


/*
  private map!: any;
  private initMap(): void {
    // Initialize the map
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,
      zoomControl: false
    });

    // Add the tile layer
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    // Define a custom icon
    const customIcon = L.icon({
      iconUrl: '/assets/images/marker3.png', // Provide the correct URL to your icon
      iconSize: [35, 40],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76]
    });

    // Add markers for cities (example cities)
    const cities = [
      { "name": "Nimes", "lat": 43.8367, "lng": 4.3601 },
      { "name": "Strasbourg", "lat": 48.5734, "lng": 7.7521 },
      { "name": "Gap", "lat": 44.5593, "lng": 6.0790 },
      { "name": "Paris", "lat": 48.8566, "lng": 2.3522 },
      { "name": "Nancy", "lat": 48.6921, "lng": 6.1844 },
      { "name": "Versailles", "lat": 48.8014, "lng": 2.1301 },
      { "name": "Belfort", "lat": 47.6396, "lng": 6.8638 },
      { "name": "Le Havre", "lat": 49.4944, "lng": 0.1079 },
      { "name": "Montrouge", "lat": 48.8160, "lng": 2.3245 },
      { "name": "Epernay", "lat": 49.0436, "lng": 3.9580 },
      { "name": "Thionville", "lat": 49.3572, "lng": 6.1690 },
      { "name": "Roissy En France", "lat": 49.0027, "lng": 2.5176 },
      { "name": "Boulogne Billancourt", "lat": 48.8359, "lng": 2.2414 },
      { "name": "Rouen", "lat": 49.4432, "lng": 1.0993 },
      { "name": "Clermont", "lat": 49.3781, "lng": 2.4146 },
      { "name": "Le Grau Du Roi", "lat": 43.5385, "lng": 4.1386 },
      { "name": "Dijon", "lat": 47.3220, "lng": 5.0415 },
      { "name": "Aix En Provence", "lat": 43.5297, "lng": 5.4474 },
      { "name": "Clermont Ferrand", "lat": 45.7772, "lng": 3.0870 },
      { "name": "Lyon", "lat": 45.7640, "lng": 4.8357 },
      { "name": "Esch/Alzette", "lat": 49.4951, "lng": 5.9804 },
      { "name": "Cergy", "lat": 49.0365, "lng": 2.0760 },
      { "name": "Luxembourg", "lat": 49.6117, "lng": 6.1319 },
      { "name": "Limoges", "lat": 45.8336, "lng": 1.2611 },
      { "name": "Brive La Gaillarde", "lat": 45.1593, "lng": 1.5339 },
      { "name": "Grasse", "lat": 43.6584, "lng": 6.9230 },
      { "name": "Caen", "lat": 49.1829, "lng": -0.3707 },
      { "name": "Lens", "lat": 50.4339, "lng": 2.8276 },
      { "name": "Lille", "lat": 50.6292, "lng": 3.0573 },
      { "name": "Vitry Sur Seine", "lat": 48.7874, "lng": 2.4033 },
      { "name": "Montmorency", "lat": 48.9913, "lng": 2.3269 },
      { "name": "Saint Etienne", "lat": 45.4397, "lng": 4.3872 },
      { "name": "Juan Les Pins", "lat": 43.5679, "lng": 7.1118 },
      { "name": "Chamonix", "lat": 45.9237, "lng": 6.8694 },
      { "name": "Louvigny", "lat": 49.1504, "lng": -0.4107 },
      { "name": "Cassis", "lat": 43.2161, "lng": 5.5396 },
      { "name": "Quimper", "lat": 48.0000, "lng": -4.1000 },
      { "name": "Nanterre", "lat": 48.8910, "lng": 2.2061 },
      { "name": "Lagny Sur Marne", "lat": 48.8766, "lng": 2.7067 },
      { "name": "Brunoy", "lat": 48.6954, "lng": 2.4931 },
      { "name": "Courbevoie", "lat": 48.8967, "lng": 2.2563 },
      { "name": "Nice", "lat": 43.7102, "lng": 7.2620 },
      { "name": "Troyes", "lat": 48.2973, "lng": 4.0744 },
      { "name": "Muret", "lat": 43.4630, "lng": 1.3250 },
      { "name": "Montigny Le Bretonneux", "lat": 48.7858, "lng": 2.0366 },
      { "name": "Neuilly Sur Seine", "lat": 48.8848, "lng": 2.2687 },
      { "name": "Marseille", "lat": 43.2965, "lng": 5.3698 },
      { "name": "Amiens", "lat": 49.8941, "lng": 2.2958 },
      { "name": "Salon De Provence", "lat": 43.6419, "lng": 5.0956 },
      { "name": "Rosny Sous Bois", "lat": 48.8742, "lng": 2.4790 },
      { "name": "Narbonne", "lat": 43.1843, "lng": 3.0031 },
      { "name": "Metz", "lat": 49.1193, "lng": 6.1757 },
      { "name": "Montbeliard", "lat": 47.5109, "lng": 6.8009 },
      { "name": "Vénissieux", "lat": 45.7082, "lng": 4.8724 },
      { "name": "Roubaix", "lat": 50.6942, "lng": 3.1746 },
      { "name": "Bordeaux", "lat": 44.8378, "lng": -0.5792 },
      { "name": "La Ciotat", "lat": 43.1748, "lng": 5.6058 },
      { "name": "Morzine", "lat": 46.1792, "lng": 6.7046 },
      { "name": "Avignon", "lat": 43.9493, "lng": 4.8055 },
      { "name": "Vallauris", "lat": 43.5788, "lng": 7.0556 },
      { "name": "Chaumont", "lat": 48.1115, "lng": 5.1387 },
      { "name": "Orléans", "lat": 47.9029, "lng": 1.9093 },
      { "name": "Vannes", "lat": 47.6582, "lng": -2.7608 },
      { "name": "Issy Les Moulineaux", "lat": 48.8210, "lng": 2.2770 },
      { "name": "Colmar", "lat": 48.0796, "lng": 7.3585 },
      { "name": "Lyon 7", "lat": 45.7425, "lng": 4.8378 },
      { "name": "Hyères", "lat": 43.1201, "lng": 6.1286 },
      { "name": "Thonon-Les-Bains", "lat": 46.3730, "lng": 6.4781 },
      { "name": "Vitrolles", "lat": 43.4644, "lng": 5.2481 },
      { "name": "Le Bouscat", "lat": 44.8577, "lng": -0.6127 },
      { "name": "Cambrai", "lat": 50.1753, "lng": 3.2347 },
      { "name": "Oullins", "lat": 45.7157, "lng": 4.8061 },
      { "name": "Levallois Perret", "lat": 48.8939, "lng": 2.2886 },
      { "name": "Rueil-Malmaison", "lat": 48.8765, "lng": 2.1897 },
      { "name": "Plessis Robinson", "lat": 48.7812, "lng": 2.2615 },
      { "name": "Asnieres Sur Seine", "lat": 48.9101, "lng": 2.2829 },
      { "name": "Vatry (Bussy-Lettrée)", "lat": 48.7616, "lng": 4.1976 },
      { "name": "Enghien Les Bains", "lat": 48.9687, "lng": 2.3077 },
      { "name": "Antibes", "lat": 43.5804, "lng": 7.1251 },
      { "name": "Oyonnax", "lat": 46.2605, "lng": 5.6551 },
      { "name": "Geneve", "lat": 46.2044, "lng": 6.1432 },
      { "name": "Sarreguemines", "lat": 49.1095, "lng": 7.0681 },
      { "name": "Dax", "lat": 43.7102, "lng": -1.0530 },
      { "name": "Armentieres", "lat": 50.6852, "lng": 2.8839 },
      { "name": "Sans", "lat": 43.6797, "lng": 1.8351 },
      { "name": "Chantilly", "lat": 49.1920, "lng": 2.4719 },
      { "name": "Menton", "lat": 43.7745, "lng": 7.4975 },
      { "name": "Toulouse", "lat": 43.6047, "lng": 1.4442 },
      { "name": "Beauvais", "lat": 49.4305, "lng": 2.0841 },
      { "name": "Le Plessis Trevise", "lat": 48.8218, "lng": 2.5886 },
      { "name": "Trouville Sur Mer", "lat": 49.3670, "lng": 0.0804 },
      { "name": "Honfleur", "lat": 49.4191, "lng": 0.2329 },
      { "name": "Caen/Carpiquet", "lat": 49.1730, "lng": -0.4582 },
      { "name": "Le Mans", "lat": 48.0061, "lng": 0.1996 },
      { "name": "Ajaccio", "lat": 41.9192, "lng": 8.7386 },
      { "name": "Bezanne", "lat": 49.2306, "lng": 4.0011 },
      { "name": "Reims", "lat": 49.2583, "lng": 4.0317 },
      { "name": "Les Auxons", "lat": 47.2697, "lng": 5.9483 },
      { "name": "Cagnes Sur Mer", "lat": 43.6647, "lng": 7.1487 },
      { "name": "Brest", "lat": 48.3904, "lng": -4.4861 },
      { "name": "Angers", "lat": 47.4784, "lng": -0.5632 },
      { "name": "Kremlin Bicetre", "lat": 48.8106, "lng": 2.3577 },
      { "name": "Draguignan", "lat": 43.5368, "lng": 6.4644 },
      { "name": "Montereau-Fault-Yonne", "lat": 48.3833, "lng": 2.9667 },
      { "name": "Perpignan", "lat": 42.6887, "lng": 2.8948 },
      { "name": "Salles La Source", "lat": 44.5083, "lng": 2.5111 },
      { "name": "Toulon", "lat": 43.1242, "lng": 5.9280 },
      { "name": "Villeneuve D'Ascq", "lat": 50.6214, "lng": 3.1266 },
      { "name": "Mulhouse", "lat": 47.7508, "lng": 7.3359 },
      { "name": "Aigues Mortes", "lat": 43.5667, "lng": 4.1917 },
      { "name": "Collioure", "lat": 42.5259, "lng": 3.0833 },
      { "name": "Uzes", "lat": 44.0131, "lng": 4.4194 },
      { "name": "Palaiseau", "lat": 48.7144, "lng": 2.2438 },
      { "name": "La Ferté-Sous-Jouarre", "lat": 48.9466, "lng": 3.1271 },
      { "name": "Clermont-Ferrand", "lat": 45.7772, "lng": 3.0870 },
      { "name": "Flaine", "lat": 46.0012, "lng": 6.6929 },
      { "name": "Meudon La Foret", "lat": 48.7904, "lng": 2.2283 },
      { "name": "Perigueux", "lat": 45.1840, "lng": 0.7212 },
      { "name": "Wattrelos", "lat": 50.7011, "lng": 3.2179 },
      { "name": "La Madeleine", "lat": 50.6512, "lng": 3.0776 },
      { "name": "La Tronche", "lat": 45.2047, "lng": 5.7281 },
      { "name": "Tulle", "lat": 45.2671, "lng": 1.7700 },
      { "name": "Suresnes", "lat": 48.8715, "lng": 2.2212 },
      { "name": "Noisy Le Grand", "lat": 48.8496, "lng": 2.5639 },
      { "name": "Creil", "lat": 49.2579, "lng": 2.4782 },
      { "name": "Méribel Les Allues", "lat": 45.3955, "lng": 6.5652 },
      { "name": "Mantes La Jolie", "lat": 48.9903, "lng": 1.7207 },
      { "name": "Sanary Sur Mer", "lat": 43.1179, "lng": 5.8046 },
      { "name": "Metz ( Peltre)", "lat": 49.0999, "lng": 6.2119 },
      { "name": "Saint Chamond", "lat": 45.4732, "lng": 4.5139 },
      { "name": "Dole", "lat": 47.0923, "lng": 5.4942 },
      { "name": "Arcachon", "lat": 44.6544, "lng": -1.1700 },
      { "name": "Bourg-En-Bresse", "lat": 46.2056, "lng": 5.2258 },
      { "name": "Châtel", "lat": 46.2701, "lng": 6.8402 },
      { "name": "Douai", "lat": 50.3706, "lng": 3.0799 },
      { "name": "Arras", "lat": 50.2910, "lng": 2.7776 },
      { "name": "Lomme", "lat": 50.6374, "lng": 3.0067 },
      { "name": "Epernon", "lat": 48.6067, "lng": 1.6750 },
      { "name": "Saint Mard - Dammartin", "lat": 49.0530, "lng": 2.6471 },
      { "name": "Rueil Malmaison", "lat": 48.8765, "lng": 2.1897 },
      { "name": "Martigues", "lat": 43.4057, "lng": 5.0481 },
      { "name": "Manosque", "lat": 43.8342, "lng": 5.7863 },
      { "name": "Longueville", "lat": 48.5189, "lng": 2.9913 },
      { "name": "Charleville Mezieres", "lat": 49.7734, "lng": 4.7208 },
      { "name": "Niort", "lat": 46.3237, "lng": -0.4588 },
      { "name": "Vichy", "lat": 46.1261, "lng": 3.4217 },
      { "name": "Besancon", "lat": 47.2378, "lng": 6.0241 },
      { "name": "Jouy-Aux-Arches", "lat": 49.0636, "lng": 6.0867 },
      { "name": "La Plagne", "lat": 45.5071, "lng": 6.6773 },
      { "name": "Athis Mons", "lat": 48.7082, "lng": 2.3791 },
      { "name": "Châteauroux", "lat": 46.8117, "lng": 1.6933 },
      { "name": "Venissieux", "lat": 45.7082, "lng": 4.8724 },
      { "name": "Moirans", "lat": 45.3322, "lng": 5.5667 },
      { "name": "Bar Le Duc Cedex", "lat": 48.7736, "lng": 5.1611 },
      { "name": "Dieppe", "lat": 49.9225, "lng": 1.0770 },
      { "name": "Nantes", "lat": 47.2184, "lng": -1.5536 },
      { "name": "Boussy-Saint-Antoine", "lat": 48.6960, "lng": 2.5413 },
      { "name": "Vence", "lat": 43.7224, "lng": 7.1133 },
      { "name": "Chambery", "lat": 45.5646, "lng": 5.9178 },
      { "name": "Estrees Deniecourt Péronne", "lat": 49.8689, "lng": 2.8241 },
      { "name": "Bourg En Bresse", "lat": 46.2056, "lng": 5.2258 },
      { "name": "Bagnolet", "lat": 48.8704, "lng": 2.4167 },
      { "name": "Chalon Sur Saone", "lat": 46.7833, "lng": 4.8542 },
      { "name": "Meyzieu", "lat": 45.7716, "lng": 5.0104 },
      { "name": "Montevrain", "lat": 48.8726, "lng": 2.7466 },
      { "name": "Vaires", "lat": 48.8703, "lng": 2.6435 },
      { "name": "Chessy", "lat": 48.8801, "lng": 2.7645 },
      { "name": "Yvoire", "lat": 46.3708, "lng": 6.3251 },
      { "name": "Tavaux", "lat": 47.0272, "lng": 5.4157 },
      { "name": "Cahos", "lat": 44.4471, "lng": 1.4405 },
      { "name": "Villefranche-Sur-Saône", "lat": 45.9908, "lng": 4.7157 },
      { "name": "Saint-Jean", "lat": 43.6616, "lng": 1.5131 },
      { "name": "Vierzon", "lat": 47.2212, "lng": 2.0673 },
      { "name": "Tourcoing", "lat": 50.7239, "lng": 3.1612 },
      { "name": "Saint Germain En Laye", "lat": 48.8985, "lng": 2.0939 },
      { "name": "Fontenay Sous Bois", "lat": 48.8553, "lng": 2.4819 },
      { "name": "Ouistreham", "lat": 49.2762, "lng": -0.2582 },
      { "name": "Ales", "lat": 44.1239, "lng": 4.0811 },
      { "name": "Chalons En Champagne", "lat": 48.9563, "lng": 4.3673 },
      { "name": "L Hay Les Roses", "lat": 48.7831, "lng": 2.3461 },
      { "name": "Fontainebleau", "lat": 48.4039, "lng": 2.7016 },
      { "name": "Villepinte", "lat": 48.9597, "lng": 2.5484 },
      { "name": "Pantin", "lat": 48.8944, "lng": 2.4097 },
      { "name": "Fleury Les Aubrais", "lat": 47.9332, "lng": 1.9049 },
      { "name": "Bezons", "lat": 48.9291, "lng": 2.2098 },
      { "name": "Quint-Fonsegrives", "lat": 43.5831, "lng": 1.5173 },
      { "name": "Saint Cloud", "lat": 48.8458, "lng": 2.2202 },
      { "name": "Creteil", "lat": 48.7904, "lng": 2.4556 },
      { "name": "Sartrouville", "lat": 48.9419, "lng": 2.1616 },
      { "name": "Noisy-Le-Sec", "lat": 48.8905, "lng": 2.4629 },
      { "name": "Arles", "lat": 43.6766, "lng": 4.6278 },
      { "name": "Rungis", "lat": 48.7477, "lng": 2.3514 },
      { "name": "Gennevilliers", "lat": 48.9292, "lng": 2.3061 },
      { "name": "Paray Vieille Poste", "lat": 48.7237, "lng": 2.3686 },
      { "name": "Viroflay", "lat": 48.8027, "lng": 2.1711 },
      { "name": "Massy Palaiseau", "lat": 48.7301, "lng": 2.2773 },
      { "name": "Meaux", "lat": 48.9609, "lng": 2.8771 },
      { "name": "Beausoleil", "lat": 43.7430, "lng": 7.4183 },
      { "name": "Le Mesnil Amelot", "lat": 49.0131, "lng": 2.5813 },
      { "name": "Maisons Alfort", "lat": 48.8105, "lng": 2.4395 },
      { "name": "Schiltigheim", "lat": 48.6107, "lng": 7.7497 },
      { "name": "Béthune", "lat": 50.5296, "lng": 2.6438 },
      { "name": "Clichy", "lat": 48.9069, "lng": 2.3070 },
      { "name": "Villefranche Sur Saône", "lat": 45.9908, "lng": 4.7157 },
      { "name": "Nantes (Bouguenais)", "lat": 47.1584, "lng": -1.6191 },
      { "name": "Aubervilliers", "lat": 48.9140, "lng": 2.3840 },
      { "name": "Pomponne", "lat": 48.8860, "lng": 2.7032 },
      { "name": "Saacy-Sur-Marne", "lat": 48.9700, "lng": 3.2056 },
      { "name": "Albertville", "lat": 45.6759, "lng": 6.3900 },
      { "name": "Pont A Mousson", "lat": 48.9041, "lng": 6.0548 },
      { "name": "Louvres", "lat": 49.0315, "lng": 2.5085 },
      { "name": "Évry-Courcouronnes", "lat": 48.6265, "lng": 2.4526 },
      { "name": "Lourdes", "lat": 43.0950, "lng": -0.0463 },
      { "name": "Cahors", "lat": 44.4471, "lng": 1.4405 },
      { "name": "Bezannes", "lat": 49.2306, "lng": 4.0011 },
      { "name": "Six Fours Les Plages", "lat": 43.1007, "lng": 5.8315 },
      { "name": "La Seyne/Mer", "lat": 43.0995, "lng": 5.8848 },
      { "name": "Bellegarde Sur Valserine", "lat": 46.1084, "lng": 5.8217 },
      { "name": "Evreux", "lat": 49.0241, "lng": 1.1508 },
      { "name": "Villejuif", "lat": 48.7931, "lng": 2.3599 },
      { "name": "Saint Jean De Luz", "lat": 43.3895, "lng": -1.6587 },
      { "name": "Villeurbanne", "lat": 45.7719, "lng": 4.8902 },
      { "name": "Pavillons Sous Bois", "lat": 48.9037, "lng": 2.4961 },
      { "name": "Cornebarrieu", "lat": 43.6640, "lng": 1.3362 },
      { "name": "Morlaix", "lat": 48.5767, "lng": -3.8294 },
      { "name": "Saint Ouen", "lat": 48.9115, "lng": 2.3291 },
      { "name": "Pessac", "lat": 44.8068, "lng": -0.6413 },
      { "name": "Pontoise", "lat": 49.0500, "lng": 2.1000 },
      { "name": "Latresne", "lat": 44.7883, "lng": -0.4974 },
      { "name": "Neuilly Plaisance", "lat": 48.8580, "lng": 2.5206 },
      { "name": "Agen", "lat": 44.2049, "lng": 0.6204 },
      { "name": "Saint Cyr Sur Mer", "lat": 43.1770, "lng": 5.7117 },
      { "name": "Villefranche Sur Mer", "lat": 43.7053, "lng": 7.3085 },
      { "name": "Villefranche Sur Saone", "lat": 45.9908, "lng": 4.7157 },
      { "name": "Sausheim", "lat": 47.7969, "lng": 7.3661 },
      { "name": "Biarritz", "lat": 43.4832, "lng": -1.5586 },
      { "name": "Cayenne", "lat": 4.9224, "lng": -52.3135 },
      { "name": "Howald (Luxembourg)", "lat": 49.5908, "lng": 6.1326 },
      { "name": "Sainte Colombe", "lat": 44.5737, "lng": -0.2819 },
      { "name": "Saint Gratien", "lat": 48.9706, "lng": 2.2854 },
      { "name": "Vanves", "lat": 48.8210, "lng": 2.2885 },
      { "name": "Castres", "lat": 43.6086, "lng": 2.2449 },
      { "name": "Hendaye", "lat": 43.3579, "lng": -1.7784 },
      { "name": "Huningue", "lat": 47.6022, "lng": 7.5767 },
      { "name": "Le Chesnay", "lat": 48.8235, "lng": 2.1252 },
      { "name": "La Garenne-Colombe", "lat": 48.9050, "lng": 2.2441 },
      { "name": "Massy", "lat": 48.7268, "lng": 2.2724 },
      { "name": "Montlucon", "lat": 46.3407, "lng": 2.6027 },
      { "name": "Ivry Sur Seine", "lat": 48.8133, "lng": 2.3853 },
      { "name": "Charenton Le Pont", "lat": 48.8229, "lng": 2.4134 },
      { "name": "Valenciennes", "lat": 50.3570, "lng": 3.5251 },
      { "name": "Dunkerque", "lat": 51.0344, "lng": 2.3768 },
      { "name": "Beaumont Sur Oise", "lat": 49.1439, "lng": 2.2842 },
      { "name": "Bourg La Reine", "lat": 48.7740, "lng": 2.3191 },
      { "name": "Quiberon", "lat": 47.4833, "lng": -3.1203 },
      { "name": "Sarlat La Caneda", "lat": 44.8896, "lng": 1.2162 },
      { "name": "Saint Denis", "lat": 48.9362, "lng": 2.3574 },
      { "name": "Bondy", "lat": 48.9047, "lng": 2.4825 },
      { "name": "Sillans La Cascade", "lat": 43.5615, "lng": 6.1802 },
      { "name": "Meudon", "lat": 48.8130, "lng": 2.2354 },
      { "name": "L'Ile Rousse", "lat": 42.6360, "lng": 8.9381 },
      { "name": "Divonne Les Bains", "lat": 46.3591, "lng": 6.1358 },
      { "name": "Le Touquet", "lat": 50.5183, "lng": 1.5812 },
      { "name": "Arpajon", "lat": 48.5919, "lng": 2.2444 },
      { "name": "Tarare", "lat": 45.8964, "lng": 4.4296 },
      { "name": "Cesson Sevigne", "lat": 48.1211, "lng": -1.6038 },
      { "name": "Le Cannet", "lat": 43.5769, "lng": 7.0186 },
      { "name": "Merignac", "lat": 44.8420, "lng": -0.6436 },
      { "name": "Toul", "lat": 48.6743, "lng": 5.8917 },
      { "name": "Montlhery", "lat": 48.6414, "lng": 2.2761 },
      { "name": "Mercy", "lat": 49.0550, "lng": 6.1455 },
      { "name": "Quincy Sous Senart", "lat": 48.6584, "lng": 2.5404 },
      { "name": "Chartres", "lat": 48.4587, "lng": 1.5033 },
      { "name": "Bussy-St-Georges", "lat": 48.8376, "lng": 2.7006 },
      { "name": "Lavandou", "lat": 43.1379, "lng": 6.3703 },
      { "name": "Dourges", "lat": 50.4322, "lng": 2.9804 },
      { "name": "Cannes", "lat": 43.5528, "lng": 7.0174 },
      { "name": "Evry", "lat": 48.6265, "lng": 2.4526 },
      { "name": "Romainville", "lat": 48.8892, "lng": 2.4344 },
      { "name": "Carpiquet", "lat": 49.1775, "lng": -0.4631 },
      { "name": "Ville D'Avray", "lat": 48.8271, "lng": 2.1867 },
      { "name": "Sainte Marie De La Reunion", "lat": -20.8970, "lng": 55.5505 },
      { "name": "Neuville Sur Oise", "lat": 49.0207, "lng": 2.0496 },
      { "name": "Saacy-Sur-Marne // Nanteuil", "lat": 48.9731, "lng": 3.2101 },
      { "name": "Blagnac", "lat": 43.6328, "lng": 1.3882 },
      { "name": "La Roche Sur Foron", "lat": 46.0674, "lng": 6.3115 },
      { "name": "Pierre Benite", "lat": 45.7037, "lng": 4.8227 },
      { "name": "Monteux", "lat": 44.0486, "lng": 5.0025 },
      { "name": "Bourg", "lat": 44.9765, "lng": -0.5535 },
      { "name": "Echternach (Luxembourg)", "lat": 49.8127, "lng": 6.4219 },
      { "name": "Carry Le Rouet", "lat": 43.3292, "lng": 5.1555 },
      { "name": "La Garenne Colombes", "lat": 48.9050, "lng": 2.2441 },
      { "name": "Talence", "lat": 44.8060, "lng": -0.5956 },
      { "name": "Matoury", "lat": 4.8472, "lng": -52.3354 },
      { "name": "Lausanne", "lat": 46.5197, "lng": 6.6323 },
      { "name": "Chatellerault", "lat": 46.8170, "lng": 0.5456 },
      { "name": "Nangis", "lat": 48.5535, "lng": 3.0135 },
      { "name": "Chambéry", "lat": 45.5646, "lng": 5.9178 },
      { "name": "Evry Courcouronnes", "lat": 48.6265, "lng": 2.4526 },
      { "name": "Forbach", "lat": 49.1851, "lng": 6.8966 },
      { "name": "Thorigny", "lat": 48.8868, "lng": 2.7372 },
      { "name": "Velizy Villacoublay", "lat": 48.7823, "lng": 2.1914 },
      { "name": "Chevilly Larue", "lat": 48.7650, "lng": 2.3477 },
      { "name": "Bois Guillaume", "lat": 49.4716, "lng": 1.1157 },
      { "name": "Orly", "lat": 48.7474, "lng": 2.3967 },
      { "name": "Chateauroux", "lat": 46.8120, "lng": 1.6932 },
      { "name": "Briancon", "lat": 44.8987, "lng": 6.6350 },
      { "name": "Saint Denis De La Reunion", "lat": -20.8789, "lng": 55.4481 },
      { "name": "Chalon En Champagne", "lat": 48.9534, "lng": 4.3667 },
      { "name": "Obernai", "lat": 48.4577, "lng": 7.4814 },
      { "name": "Mandelieu", "lat": 43.5513, "lng": 6.9379 },
      { "name": "Rillieux La Pape", "lat": 45.8154, "lng": 4.8897 },
      { "name": "Noisy Le Sec", "lat": 48.8905, "lng": 2.4629 },
      { "name": "Senlis", "lat": 49.2071, "lng": 2.5885 },
      { "name": "Tignes", "lat": 45.4680, "lng": 6.9073 },
      { "name": "Marne La Coquette", "lat": 48.8481, "lng": 2.1627 },
      { "name": "Darnetal", "lat": 49.4405, "lng": 1.1462 },
      { "name": "La Seyne Sur Mer", "lat": 43.0995, "lng": 5.8848 },
      { "name": "Gentilly", "lat": 48.8156, "lng": 2.3431 },
      { "name": "Villepinte - Roissy En France", "lat": 48.9597, "lng": 2.5484 },
      { "name": "Six Fours", "lat": 43.1007, "lng": 5.8315 },
      { "name": "Velizy", "lat": 48.7823, "lng": 2.1914 },
      { "name": "Chatel Guyon", "lat": 45.9221, "lng": 3.0597 },
      { "name": "Annecy", "lat": 45.8992, "lng": 6.1294 },
      { "name": "Test", "lat": 48.8566, "lng": 2.3522 },
      { "name": "Bron", "lat": 45.7358, "lng": 4.9089 },
      { "name": "Saint-Gratien", "lat": 48.9706, "lng": 2.2854 },
      { "name": "Calais", "lat": 50.9513, "lng": 1.8587 },
      { "name": "Kumasi", "lat": 6.6744, "lng": -1.5719 },
      { "name": "Brusc", "lat": 43.0684, "lng": 5.7936 },
      { "name": "Mondelange", "lat": 49.2667, "lng": 6.1833 },
      { "name": "Moret Sur Loing", "lat": 48.3756, "lng": 2.8129 },
      { "name": "Belley", "lat": 45.7579, "lng": 5.6887 },
      { "name": "Abidjan", "lat": 5.3453, "lng": -4.0244 },
      { "name": "Argeles Sur Mer", "lat": 42.5407, "lng": 3.0215 },
      { "name": "Colombes", "lat": 48.9183, "lng": 2.2541 },
      { "name": "Delle", "lat": 47.5097, "lng": 6.9995 },
      { "name": "Le Conquet", "lat": 48.3609, "lng": -4.7716 },
      { "name": "La Chaux-De-Fonds", "lat": 47.1046, "lng": 6.8286 },
      { "name": "Magny-Le-Hongre", "lat": 48.8700, "lng": 2.8075 },
      { "name": "Magny Le Hongre", "lat": 48.8700, "lng": 2.8075 },
      { "name": "Labege", "lat": 43.5360, "lng": 1.5319 },
      { "name": "Entzheim", "lat": 48.5327, "lng": 7.6348 },
      { "name": "Bussy-Letree", "lat": 48.7616, "lng": 4.1976 },
      { "name": "Thorigny - Pomponne", "lat": 48.8870, "lng": 2.7369 },
      { "name": "Montreuil", "lat": 48.8638, "lng": 2.4485 },
      { "name": "Le Port Marly", "lat": 48.8846, "lng": 2.1039 },
      { "name": "Stasbourg", "lat": 48.5734, "lng": 7.7521 },
      { "name": "Rillieux", "lat": 45.8154, "lng": 4.8897 },
      { "name": "Rezé", "lat": 47.1816, "lng": -1.5580 },
      { "name": "Grenoble", "lat": 45.1885, "lng": 5.7245 },
      { "name": "Villeneuve D Ascq", "lat": 50.6214, "lng": 3.1266 },
      { "name": "Haguenau", "lat": 48.8144, "lng": 7.7904 },
      { "name": "Montmeyan", "lat": 43.6284, "lng": 6.0317 },
      { "name": "Bourg En Besse", "lat": 46.2056, "lng": 5.2258 },
      { "name": "Montréal (Québec)", "lat": 45.5017, "lng": -73.5673 },
      { "name": "Indigo", "lat": 45.7640, "lng": 4.8357 },
      { "name": "Guéret", "lat": 46.1728, "lng": 1.8724 },
      { "name": "Vienne", "lat": 45.5186, "lng": 4.8741 },
      { "name": "Orsay", "lat": 48.6974, "lng": 2.1889 },
      { "name": "Puy En Velay", "lat": 45.0428, "lng": 3.8857 },
      { "name": "Laval", "lat": 48.0650, "lng": -0.7667 },
      { "name": "Essai", "lat": 48.8566, "lng": 2.3522 },
      { "name": "Valence", "lat": 44.9334, "lng": 4.8924 },
      { "name": "Villeneuve La Garenne", "lat": 48.9416, "lng": 2.3279 },
      { "name": "Bagneux", "lat": 48.7952, "lng": 2.3126 },
      { "name": "Hagueanu", "lat": 48.8144, "lng": 7.7904 },
      { "name": "Perrignier", "lat": 46.3075, "lng": 6.4687 },
      { "name": "Sevran", "lat": 48.9397, "lng": 2.5271 },
      { "name": "Villennes Sur Seine", "lat": 48.9364, "lng": 1.9996 },
      { "name": "Sainte Clotide", "lat": -20.8904, "lng": 55.5101 },
      { "name": "Aix Les Bains", "lat": 45.6888, "lng": 5.9110 },
      { "name": "Montfermeil", "lat": 48.8963, "lng": 2.5586 },
      { "name": "Saclay", "lat": 48.7289, "lng": 2.1691 },
      { "name": "Caluire", "lat": 45.7977, "lng": 4.8464 },
      { "name": "Gonesse", "lat": 48.9862, "lng": 2.4492 },
      { "name": "Goussainville", "lat": 49.0133, "lng": 2.4699 },
      { "name": "Charenton", "lat": 48.8229, "lng": 2.4134 },
      { "name": "Angouleme", "lat": 45.6484, "lng": 0.1560 },
      { "name": "Bry Sur Marne", "lat": 48.8384, "lng": 2.5232 },
      { "name": "Villefranche", "lat": 45.9908, "lng": 4.7157 },
      { "name": "Le Creusot", "lat": 46.8055, "lng": 4.4163 }
    ]



    // Initialize the marker cluster group
    const markerClusterGroup = L.markerClusterGroup();

    // Loop through the cities and add markers to the cluster group
    cities.forEach(city => {
      const marker = L.marker([city.lat, city.lng], { icon: customIcon });

      // Bind popup to the marker
      marker.bindPopup(`<b>${city.name}</b>`);

      // Add click, mouseover, and mouseout events
      marker.on('click', (data: any) => {
        this.logic.location$.set(city.name);
      });

      marker.on('mouseover', () => {
        marker.openPopup();  // Show popup when hovered
      });

      marker.on('mouseout', () => {
        marker.closePopup();  // Hide popup when no longer hovering
      });

      // Add marker to the cluster group
      markerClusterGroup.addLayer(marker);
    });

    // Add the marker cluster group to the map
    this.map.addLayer(markerClusterGroup);
  }
*/

  ngAfterViewInit(): void {
    // this.initMap();
  }

}
