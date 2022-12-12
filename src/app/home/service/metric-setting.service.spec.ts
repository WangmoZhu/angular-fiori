import { TestBed } from '@angular/core/testing';

import { MetricSettingService } from './metric-setting.service';

describe('MetricSettingService', () => {
  let service: MetricSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetricSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
