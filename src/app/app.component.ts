import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TestRepository} from "./services/repositories/test.repository";
import {IconsModule} from "./icons/icons-module";
import {LeftSideBarComponent} from "./components/left-side-bar/left-side-bar.component";
import { latLng, tileLayer, marker, icon, Marker } from 'leaflet';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import * as L from 'leaflet';
import {NgSelectModule} from "@ng-select/ng-select";
import {catchError, debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap} from "rxjs";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LocationsRepositoryService} from "./services/repositories/locations-repository.service";
import {AsyncPipe} from "@angular/common";
import {LogicService} from "./services/logic.service";
import {TechnicianIncident} from "./models/technician-incident";
import {TechnicianRepositoryService} from "./services/repositories/technician-repository.service";
import 'leaflet.markercluster';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IconsModule, LeftSideBarComponent, LeafletModule, NgbDropdownModule, NgSelectModule, DashboardComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'parking';
  test = inject(TestRepository);
  locationsRepository = inject(LocationsRepositoryService);
  logic = inject(LogicService);
  technicianRepository = inject(TechnicianRepositoryService);


  changeLocations(location: string){
    this.logic.location$.set(location);
    console.log(location);
  }


  ngOnInit(): void {
    this.test.getTestData().subscribe( data => {
      console.log(data);
    })

    this.technicianRepository.technicianIncidents$.subscribe(data => {
      console.log(data);
    })

  }

  constructor() {
  }


  makePostRequest(city: { name: string, lat: number, lng: number }) {
  }

  private map!: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,
      zoomControl: false
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });


    tiles.addTo(this.map);

    // Define a custom icon
    const customIcon = L.icon({
      iconUrl: '/assets/images/marker.png', // Provide the correct URL to your icon
      iconSize: [40, 40], // Size of the icon
      iconAnchor: [22, 94], // Point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76] // Point from which the popup should open relative to the iconAnchor
    });

    // Add markers for cities (example cities)
    const cities = [
      { name: 'Nimes', lat: 43.838, lng: 4.3601 },
      { name: 'Strasbourg', lat: 48.5734, lng: 7.7521 },
      { name: 'Gap', lat: 44.5593, lng: 6.0785 },
      { name: 'Paris', lat: 48.8566, lng: 2.3522 },
      { name: 'Nancy', lat: 48.6921, lng: 6.1844 },
      { name: 'Versailles', lat: 48.8014, lng: 2.1301 },
      { name: 'Belfort', lat: 47.637, lng: 6.863 },
      { name: 'Le Havre', lat: 49.4944, lng: 0.1079 },
      { name: 'Montrouge', lat: 48.8199, lng: 2.3071 },
      { name: 'Epernay', lat: 49.0432, lng: 3.959 },
    ];

    cities.forEach(city => {
      const marker = L.marker([city.lat, city.lng], { icon: customIcon }).addTo(this.map);
      marker.bindPopup(`<b>${city.name}</b>`);

      marker.on('click', (data) => {
        this.logic.location$.set(city.name);
      });

      marker.on('mouseover', () => {
        marker.openPopup();  // Show popup when hovered
      });

      // Hide the popup when the mouse moves away
      marker.on('mouseout', () => {
        marker.closePopup();  // Hide popup when no longer hovering
      });

    });
  }


  ngAfterViewInit(): void {
    this.initMap();
  }

  search$ = new Subject<string>();  // Now using Subject<string> instead of Observable
  loading = false;


  onCitySelect(selectedCity: any) {
    console.log('City selected:', selectedCity);
    // Handle city selection
  }
}
