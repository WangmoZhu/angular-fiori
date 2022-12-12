import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricSettingsComponent } from './metric-settings.component';

describe('MetricSettingsComponent', () => {
  let component: MetricSettingsComponent;
  let fixture: ComponentFixture<MetricSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
