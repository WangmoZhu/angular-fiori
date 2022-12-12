import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metric-settings',
  templateUrl: './metric-settings.component.html',
  styleUrls: ['./metric-settings.component.css']
})
export class MetricSettingsComponent implements OnInit {
  isAlwaysOntime = false
  isAlwaysInfull = false
  isApplySupplierGroup = false
  isApplyPurchaseOrg = false
  isApplyPurchaseGroup = false
  constructor() { }

  ngOnInit(): void {
  }

}
