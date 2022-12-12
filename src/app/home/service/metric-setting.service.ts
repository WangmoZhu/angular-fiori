import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Metric } from '../mode/metric';

@Injectable({
  providedIn: 'root'
})
export class MetricSettingService {

  private metricItems: Metric[] | undefined;

  constructor(private http: HttpClient) { }

  getMetricItems(): Observable<Metric[]> {
    if(this.metricItems){
      return of(this.metricItems);
    }else{
      return this.http.get<Metric[]>("assets/metricItems.json")
    }
  }

  setMetricItems(metricItems: Metric[]){
    this.metricItems = metricItems
  }

  createMetricItem(item: Metric){
    // this.http.post()
    return item
  }

  getSupplierGroup(){
    return this.http.get("assets/supplierGroup.json")
  }

  updateMetric(item: Metric){
    return of(item)
  }

  deleteMetric(id: number){
    return of(id)
  }
}
