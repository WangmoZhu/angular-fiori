import { Component, OnInit } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core';
import { DialogService } from '@fundamental-ngx/core/dialog';
import { map } from 'rxjs';
import { Metric } from './mode/metric';
import { MetricSettingService } from './service/metric-setting.service';
import { DialogTemplateComponent } from './template/dialog-template/dialog-template.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  metricItems!: Metric[]

  constructor(private _dialogService: DialogService, private metricService: MetricSettingService) { }

  ngOnInit(): void {
    this.metricService.getMetricItems()
      .pipe(map(items => {
        items.forEach(item => {
          item.activeDate = FdDate.getNow()
        })
        return items
      }))
      .subscribe(items => {
        this.metricItems = items
        this.metricService.setMetricItems(this.metricItems)
      })
  }

  onClick(event: any): void {
    console.log(event)
  }

  openCreateMetricsDialog(): void {
    const dialogRef = this._dialogService.open(DialogTemplateComponent, {
      data: {
        isEdit: false,
        metricItems: this.metricItems
      },
      responsivePadding: true,
      focusTrapped: true,
      verticalPadding: true
    });

    dialogRef.afterClosed.subscribe(
      (result) => {
        // this.confirmationReason = 'Dialog closed with result: ' + result;
        let metric: Metric = result.data
        debugger
        if (result.behavior === 'save') {
          this.metricItems.unshift(metric)
          
        } 
      },
      (error) => {
        // this.confirmationReason = 'Dialog dismissed with result: ' + error;
      }
    );
  }



  saveItemChange(metric: Metric): void {
    this.metricService.updateMetric(metric)
      .subscribe(value => {
        console.log(value)
        let index = this.metricItems.findIndex(item => item.metricId === metric.metricId)
        console.log(index)
        this.metricItems[index] = value
      })
    // console.log(metric)
  }

  deleteItem(id: number): void {
    this.metricService.deleteMetric(id)
      .subscribe(value => {
        let index = this.metricItems.findIndex(item => item.metricId === id)
        this.metricItems.splice(index, 1)
      })
  }
}
