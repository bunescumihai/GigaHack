import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA, effect,
  ElementRef,
  inject,
  OnInit,
  ViewChild
} from '@angular/core';
import {IconsModule} from "../../icons/icons-module";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {AsyncPipe, NgClass, NgIf, NgStyle} from "@angular/common";
import {NgApexchartsModule} from "ng-apexcharts";

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import {LogicService} from "../../services/logic.service";

import {marked} from "marked";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [IconsModule, NgbDropdownModule, AsyncPipe, NgApexchartsModule, NgIf, NgStyle, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent implements OnInit{
  @ViewChild('dashboardMain') dashboardMain!: ElementRef;
  @ViewChild('rightSideContainer') rightSideContainer!: ElementRef;

  logic = inject(LogicService);

  public chartOptions: ChartOptions;

  showDashboard: boolean = false;
  showChart: boolean = false;


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


  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "My First Angular Chart"
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun",  "Jul",  "Aug", "Sep"]
      }
    };
    effect(() => {
      let data = this.logic.location$();
      if(data != '')
        this.toggleDashBoard(true);
    })
  }
  markdownText: string | Promise<string> = marked(  "Based on the analysis of the provided data, here are some business insights:\n" +
    "\n" +
    "**Cost Savings Opportunities**: The average hourly labor rate is 54.73 euros, which may be higher than necessary for certain types of interventions. Identifying opportunities to optimize labor costs could lead to significant savings.\n" +
    "\n" +
    "**Intervention Efficiency**: The majority of intervention durations (31 out of 35) are less than or equal to 1 hour, indicating that most repairs can be completed quickly and efficiently. This suggests that the organization may not need a large team of technicians to manage these types of interventions.\n" +
    "\n" +
    "**Technician Productivity**: With an average of 28 interventions lasting 2 hours or more, there is potential for technicians to complete multiple tasks during their working hours. Focusing on optimizing technician productivity could lead to increased efficiency and cost savings.\n" +
    "\n" +
    "**Equipment Maintenance**: The list of equipment names includes a mix of specialized and general-purpose tools. Identifying the most frequently used equipment types could inform targeted maintenance schedules and reduce downtime.\n" +
    "\n" +
    "**Service Optimization**: By analyzing the distribution of intervention durations, it appears that there may be opportunities to optimize service routes and schedules to reduce travel time and costs.\n" +
    "\n" +
    "**Insight**: With an average of 3 parkings in HYERES, there is potential for the organization to scale its services without significant increases in costs or infrastructure.\n");

  ngOnInit(): void {

  }
}
