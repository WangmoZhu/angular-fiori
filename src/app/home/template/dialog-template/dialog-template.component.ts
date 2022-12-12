import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatetimeAdapter, DialogRef, FdDate, MobileModeConfig } from '@fundamental-ngx/core';
import { Metric, METRIC_DEFAULT_VALUE } from '../../mode/metric';
import { MetricSettingService } from '../../service/metric-setting.service';
import { MetricFormValidators } from '../../validators/mertic-form-validators';
import { MessageBoxService, MessageBoxType } from '@fundamental-ngx/core/message-box';

@Component({
  selector: 'app-dialog-template',
  templateUrl: './dialog-template.component.html',
  styleUrls: ['./dialog-template.component.css']
})
export class DialogTemplateComponent implements OnInit {
  metricForm!: FormGroup
  metricItem!: Metric
  supplierGroup!: string[]
  secondConfig: MobileModeConfig = {
    approveButtonText: 'Approve',
    cancelButtonText: 'Cancel',
    hasCloseButton: true,
    dialogConfig: {
      ariaLabel: 'Select fruits dialog'
    }
  };
  constructor(
    public dialogRef: DialogRef,
    private fb: FormBuilder,
    private datetimeAdapter: DatetimeAdapter<FdDate>,
    private metricService: MetricSettingService,
    private _messageBoxService: MessageBoxService) { }

  ngOnInit(): void {

    this.metricService.getSupplierGroup().subscribe((value: any) => {
      // console.log(value)
      this.supplierGroup = value.supplierGroup ? value.supplierGroup : []
    })

    this.metricItem = this.dialogRef.data.metricItem ? this.dialogRef.data.metricItem : METRIC_DEFAULT_VALUE

    this.metricForm = this.fb.group({
      metricId: this.metricItem.metricId,
      metricTitle: [this.metricItem.metricTitle, Validators.required],
      earlyLimit: [this.metricItem.earlyLimit, { validators: [MetricFormValidators.DeliveryOnTimeLimitValidator('earlyLimit')] }],
      lateLimit: [this.metricItem.lateLimit, { validators: [MetricFormValidators.DeliveryOnTimeLimitValidator('lateLimit')] }],
      alwaysEarly: this.metricItem.alwaysEarly,
      underMaximum: [this.metricItem.underMaximum, { validators: [MetricFormValidators.DeliveryInfullMaxValidator('underdelivery')] }],
      overMaximum: [this.metricItem.overMaximum, { validators: [MetricFormValidators.DeliveryInfullMaxValidator('overdelivery')] }],
      alwaysOver: this.metricItem.alwaysOver,
      isActive: this.metricItem.isActive,
      isAfterDate: this.metricItem.isAfterDate,
      activeDate: this.metricItem.activeDate,
      // supplierGroup: this.metricItem?.supplierGroup || [],
      supplierGroup: [this.metricItem.supplierGroup],
      checkSupplierGroup: this.metricItem.checkSupplierGroup,
      purchaseGroup: [this.metricItem.purchaseGroup],
      checkPurchaingGroup: this.metricItem.checkPurchaingGroup,
      purchaeOrg: [this.metricItem.purchaeOrg],
      checkPurchaseOrg: this.metricItem.checkPurchaseOrg
    })

    if (this.metricForm.get("alwaysEarly")?.value) {
      this.earlyLimit?.reset()
      this.earlyLimit?.disable()
      this.lateLimit?.disable()
    }

    if (this.metricForm.get("alwaysOver")?.value) {
      this.overMaximum?.reset()
      this.overMaximum?.disable()
      this.underMaximum?.disable()
    }

    if (!this.metricForm.get("isAfterDate")?.value) {
      this.metricForm.get('activeDate')?.disable()
    }

    this.metricForm.get("alwaysEarly")?.valueChanges.subscribe(value => {
      if (value) {
        this.earlyLimit?.reset()
        this.earlyLimit?.disable()
        this.lateLimit?.disable()
        this.lateLimit?.setValue(0)
      } else {
        this.earlyLimit?.setValue(0)
        this.earlyLimit?.enable()
        this.lateLimit?.enable()
      }
      // value ? this.earlyLimit?.disable() : this.earlyLimit?.enable()
    })

    this.metricForm.get("alwaysOver")?.valueChanges.subscribe(value => {
      if (value) {
        this.overMaximum?.reset()
        this.overMaximum?.disable()
        this.underMaximum?.disable()
        this.underMaximum?.setValue(0)
      } else {
        this.overMaximum?.setValue(0)
        this.overMaximum?.enable()
        this.underMaximum?.enable()
      }
      // value ? this.overMaximum?.disable() : this.overMaximum?.enable()
    })

    this.metricForm.get("isAfterDate")?.valueChanges.subscribe(value => {
      value ? this.metricForm.get('activeDate')?.enable() : this.metricForm.get('activeDate')?.disable()
    })

    this.metricForm.get("checkSupplierGroup")?.valueChanges.subscribe(value => {
      if (!value) this.metricForm.get("supplierGroup")?.setValue([])
    })

    this.metricForm.get("checkPurchaingGroup")?.valueChanges.subscribe(value => {
      if (!value) this.metricForm.get("purchaseGroup")?.setValue([])
    })

    this.metricForm.get("checkPurchaseOrg")?.valueChanges.subscribe(value => {
      if (!value) this.metricForm.get("purchaeOrg")?.setValue([])
    })
  }

  disableFunction = (fdDate: FdDate): boolean => this.datetimeAdapter.compareDate(fdDate, FdDate.getToday()) < 0;

  handleSaveMetricSetting() {
    const metric: Metric = this.metricForm.getRawValue();
    this.metricService.getMetricItems().subscribe(metricItems => {
      debugger
      let existMetricItems = this.isExistInMetricItems(metricItems, metric);
      if (existMetricItems.length === 0) {
        this.dialogRef.close({
          behavior: "save",
          data: metric
        })
      } else {
        let msg = existMetricItems.reduce((msg, curr) => msg + curr.item.metricTitle, "");
        const messageBoxRef: any = this._messageBoxService.open(
          {
            title: "Error",
            content: "The same rule already exist in " + msg,
            approveButton: 'Ok',
            cancelButton: 'Cancel',
            approveButtonCallback: () => messageBoxRef.close('Approved'),
            cancelButtonCallback: () => messageBoxRef.close('Canceled'),
            closeButtonCallback: () => messageBoxRef.dismiss('Dismissed')
          },
          {
            type: "error",
            showSemanticIcon: true,
            ariaLabelledBy: 'fd-message-box-semantic-types-header fd-message-box-semantic-types-body',
            ariaDescribedBy: 'fd-message-box-semantic-types-types'
          }
        )
      }
    })
  }

  private isExistInMetricItems(metricItems: Metric[], metric: Metric): { isExist: boolean, item: Metric }[] {
    let isExistItem = [];
    metricItems = metricItems.filter(item => item.metricTitle !== metric.metricTitle);
    for (let i = 0; i < metricItems.length; i++) {
      let isExistPO = true;
      let isExistPG = true;
      let isExistSG = true;
      let item = metricItems[i];
      if(metric.purchaeOrg.length === 0 && item.purchaeOrg.length === 0) isExistPO = true
      if(metric.purchaseGroup.length === 0 && item.purchaeOrg.length !== 0) isExistPO = false
      for (let j = 0; j < metric.purchaeOrg.length; j++) {
        let po = metric.purchaeOrg[j];
        if (!item.purchaeOrg.includes(po)) {
          isExistPO = false
        }
      }
      
      if(metric.purchaseGroup.length === 0 && item.purchaseGroup.length === 0) isExistPG = true
      if(metric.purchaseGroup.length === 0 && item.purchaseGroup.length !== 0) isExistPO = false
      for (let j = 0; j < metric.purchaseGroup.length; j++) {
        let pg = metric.purchaseGroup[j];
        if (!item.purchaseGroup.includes(pg)) {
          isExistPG = false
        }
      }

      if(metric.supplierGroup.length === 0 && item.supplierGroup.length === 0) isExistSG = true
      if(metric.supplierGroup.length === 0 && item.supplierGroup.length !== 0) isExistPO = false
      for (let j = 0; j < metric.supplierGroup.length; j++) {
        let sg = metric.supplierGroup[j];
        if (!item.supplierGroup.includes(sg)) {
          isExistSG = false
        }
      }
      isExistItem.push({
        isExist: isExistPO && isExistPG && isExistSG,
        item: metricItems[i]
      })
    }

    isExistItem = isExistItem.filter(item => item.isExist);

    return isExistItem;
  }

  handleDeleteMetricSetting() {
    this.dialogRef.close({
      behavior: "delete",
      data: this.metricForm.getRawValue()
    })
  }

  get checkSupplierGroup() {
    return this.metricForm.get('checkSupplierGroup')
  }

  get checkPurchaingGroup() {
    return this.metricForm.get('checkPurchaingGroup')
  }

  get checkPurchaseOrg() {
    return this.metricForm.get('checkPurchaseOrg')
  }

  get earlyLimit() {
    return this.metricForm.get('earlyLimit')
  }

  get lateLimit() {
    return this.metricForm.get('lateLimit')
  }

  get overMaximum() {
    return this.metricForm.get('overMaximum')
  }

  get underMaximum() {
    return this.metricForm.get('underMaximum')
  }

  get isAfterDate() {
    return this.metricForm.get('isAfterDate')
  }
}
