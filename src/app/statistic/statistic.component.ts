import {Component, OnInit} from '@angular/core';
import {TotalSold, TotalSpend} from "./statistics.model";
import {StatisticService} from "../_services/statistic.service";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  constructor(private statisticsService: StatisticService) {
  }

  totalSpend: TotalSpend
  totalSold: TotalSold

  ngOnInit(): void {
    this.statisticsService.getTopSpenders().subscribe((result) => {
      if (result) {
        this.totalSpend = result
        console.log(result)
      }
    })
  }

  getTotalSold(): void {
    this.statisticsService.getTotalSold().subscribe((result) => {
      if (result) {
        this.totalSold = result
        console.log(result)
      }
    })
  }

  // ngOnInit(): void {
  //   this.statisticsService.getTopSpenders().subscribe((result) => {
  //     if (result) {
  //       this.totalSpend = result
  //       console.log(result)
  //     }
  //   })


}
