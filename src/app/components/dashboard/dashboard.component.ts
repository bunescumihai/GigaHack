import {
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA, effect,
  ElementRef, HostListener,
  inject,
  OnInit, signal,
  ViewChild
} from '@angular/core';
import {IconsModule} from "../../icons/icons-module";
import {NgbDropdownModule, NgbNavModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {AsyncPipe, NgClass, NgIf, NgStyle, NgTemplateOutlet} from "@angular/common";
import {NgApexchartsModule} from "ng-apexcharts";

import {LogicService} from "../../services/logic.service";

import {marked} from "marked";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
} from "ng-apexcharts";
import {toObservable} from "@angular/core/rxjs-interop";
import {EMPTY, Observable, of, shareReplay, switchMap, tap} from "rxjs";
import {IncidentsRepositoryService} from "../../services/repositories/incidents-repository.service";
import {ApiResponse} from "../../services/api/api-response";
import {LoadingComponent} from "../loading/loading.component";
import {ChartsRepositoryService} from "../../services/charts-repository.service";

import {
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexStroke,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  stroke: ApexStroke;
};


export type CostOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
};
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [IconsModule, NgbDropdownModule, AsyncPipe, NgApexchartsModule, NgIf, NgStyle, NgClass, NgbNavModule, NgbTooltipModule, LoadingComponent, NgTemplateOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent implements OnInit{
  @ViewChild('dashboardMain') dashboardMain!: ElementRef;
  @ViewChild('rightSideContainer') rightSideContainer!: ElementRef;

  windowWidth = signal<number>(window.innerWidth - 60);
  windowHeight = signal<number>(window.innerHeight - 100);

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth.set(event.target.innerWidth);
    this.windowHeight.set(event.target.innerHeight);
  }

  logic = inject(LogicService);
  chartsRepository = inject(ChartsRepositoryService);

  incidentsRepository = inject(IncidentsRepositoryService);

  insights$: Observable<ApiResponse<string>>;
  costs$!: Observable<BarChartOptions>;

  public chartCostOptions: CostOptions;
  public chartInsightsOptions: BarChartOptions;

  showDashboard: boolean = false;
  showChart: boolean = false;


  markdownText: string | Promise<string> = marked('');

  toggleDashBoard(state: boolean | undefined = undefined){

    if(state == false){
      this.showDashboard = false;
      this.showChart = false;
      return;
    }

    if(state == true){
      this.showDashboard = true;
      setTimeout(() => {
        this.showChart = !this.showChart;
      }, 350);
      return;
    }


    this.showDashboard = !this.showDashboard;
    if(!this.showChart){
      setTimeout(() => {
        this.showChart = !this.showChart;
      }, 350);
    }
    else
    this.showChart = !this.showChart;
  }

  constructor(private cdr: ChangeDetectorRef) {

    this.insights$ = toObservable(this.logic.location$).pipe(
      switchMap(data => {
        if(data == undefined){
          this.showDashboard = false;
          this.showChart = false;
          this.logic.location$.set('');
          this.toggleDashBoard(false);
          return EMPTY
        }

        return this.incidentsRepository.getInsightsByLocation(data)
      })
    );

    this.costs$ = toObservable(this.logic.location$).pipe(
      switchMap(data => this.chartsRepository.costs(data))
    );

    this.costs$.subscribe(data => {
      this.chartInsightsOptions = {
        series: [
          {
            name: "Free Cash Flow",
            data: data[0].payments.map(dt => dt.sum)
          }
        ],
        chart: {
          type: "bar",
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          title: {
            text: "Payment type"
          },
          categories: data[0].payments.map(dt => dt.type)
        },
        yaxis: {
          title: {
            text: "Sum"
          }
        },
        fill: {
          opacity: 1
        },
      };
      setTimeout(() => {
        this.cdr.detectChanges();

      }, 1000)
    });

    this.chartCostOptions = {
      series: [{
        name: "Category 1",
        data: [
          [16.4, 5.4], [21.7, 2], [25.4, 3], [19, 2], [10.9, 1], [13.6, 3.2], [10.9, 7.4], [10.9, 0], [10.9, 8.2], [16.4, 0], [16.4, 1.8], [13.6, 0.3], [13.6, 0], [29.9, 0], [27.1, 2.3], [16.4, 0], [13.6, 3.7], [10.9, 5.2], [16.4, 6.5], [10.9, 0], [24.5, 7.1], [10.9, 0], [8.1, 4.7], [19, 0], [21.7, 1.8], [27.1, 0], [24.5, 0], [27.1, 0], [29.9, 1.5], [27.1, 0.8], [22.1, 2]]
      },{
        name: "Category 2",
        data: [
          [36.4, 13.4], [1.7, 11], [5.4, 8], [9, 17], [1.9, 4], [3.6, 12.2], [1.9, 14.4], [1.9, 9], [1.9, 13.2], [1.4, 7], [6.4, 8.8], [3.6, 4.3], [1.6, 10], [9.9, 2], [7.1, 15], [1.4, 0], [3.6, 13.7], [1.9, 15.2], [6.4, 16.5], [0.9, 10], [4.5, 17.1], [10.9, 10], [0.1, 14.7], [9, 10], [12.7, 11.8], [2.1, 10], [2.5, 10], [27.1, 10], [2.9, 11.5], [7.1, 10.8], [2.1, 12]]
      },{
        name: "Category 3",
        data: [
          [21.7, 3], [23.6, 3.5], [24.6, 3], [29.9, 3], [21.7, 20], [23, 2], [10.9, 3], [28, 4], [27.1, 0.3], [16.4, 4], [13.6, 0], [19, 5], [22.4, 3], [24.5, 3], [32.6, 3], [27.1, 4], [29.6, 6], [31.6, 8], [21.6, 5], [20.9, 4], [22.4, 0], [32.6, 10.3], [29.7, 20.8], [24.5, 0.8], [21.4, 0], [21.7, 6.9], [28.6, 7.7], [15.4, 0], [18.1, 0], [33.4, 0], [16.4, 0]]
      }],
      chart: {
        height: 350,
        type: 'scatter',
        zoom: {
          enabled: true,
          type: 'xy'
        }
      },
      xaxis: {
        tickAmount: 10,
        labels: {
          formatter: function(val) {
            return parseFloat(val).toFixed(1)
          }
        }
      },
      yaxis: {
        tickAmount: 7
      }
    };


    this.chartInsightsOptions = undefined;


    effect(() => {
      let data = this.logic.location$();
      if(data != '')
        this.toggleDashBoard(true);
    })
  }

  ngOnInit(): void {
  }

  mark(data: any){
    return marked(data as string);
  }
}
