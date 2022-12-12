import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core';
import { Metric } from '../mode/metric';
import { MetricSettingService } from '../service/metric-setting.service';
import { DialogTemplateComponent } from '../template/dialog-template/dialog-template.component';

/**
 * The about component
 *
 * Display some text with links for details about TodoMVC & Compodoc.
 */
@Component({
  selector: 'app-metric-item',
  templateUrl: './metric-item.component.html',
  styleUrls: ['./metric-item.component.css']
})
export class MetricItemComponent implements OnInit {
  @Input('metricItem') item!: Metric
  @Output('itemChange') itemChange = new EventEmitter<Metric>() 
  @Output('itemDelete') itemDelete = new EventEmitter<number>() 
  confirmationReason: string = '';
  constructor(private _dialogService: DialogService, private metricService: MetricSettingService) { }

  ngOnInit(): void {
  }

  editMetricSetting(metricItem: Metric){
    const dialogRef = this._dialogService.open(DialogTemplateComponent, {
      data: {
        isEdit: true,
        metricItem
      },
      responsivePadding: true,
      focusTrapped: true,
      verticalPadding: true
    });

    dialogRef.afterClosed.subscribe(
      (result) => {
        // this.confirmationReason = 'Dialog closed with result: ' + result;
        // console.log(result)
        // this.itemChange.emit(result)
        let metric: Metric = result.data
        if (result.behavior === 'save') {
          this.itemChange.emit(metric)
        }else if(result.behavior === 'delete'){
          this.itemDelete.emit(metric.metricId)
          // this.metricService.deleteMetric(metric.metricId)
          //   .subscribe(value => {
          //     let index = this.metricItems.findIndex(item => item.metricId === metric.metricId)
          //     this.metricItems.splice(index,1)
          //   })
        }
      },
      (error) => {
        this.confirmationReason = 'Dialog dismissed with result: ' + error;
      }
    );
  }
}
