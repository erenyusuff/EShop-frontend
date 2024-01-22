import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {TotalSold, TotalSpend} from "../statistic/statistics.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient) { }

  getTopSpenders() {
    return this.http.get<TotalSpend>(environment.api + '/statistics/topSpenders');
  }
  getTotalSold() {
    return this.http.get<TotalSold>(environment.api + '/statistics/products');
  }
}
