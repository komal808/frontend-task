import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DateRangePickerComponent } from './date-range-picker.component';

describe('DateRangePickerComponent', () => {
  let component: DateRangePickerComponent;
  let fixture: ComponentFixture<DateRangePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        BrowserAnimationsModule ,
        FormsModule, 
        MatFormFieldModule, 
        MatDatepickerModule, 
        MatNativeDateModule ],
      declarations: [ DateRangePickerComponent ],
    });
    fixture = TestBed.createComponent(DateRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected date range', async() => {
    const emittedRange = {
      startDate: new Date('2023-08-01'),
      endDate: new Date('2023-08-07')
    };
    let emittedData: any;
    component.dateRangeSelected.subscribe((data: { startDate: any, endDate: any }) => {
      emittedData = data;
    });
    component.startDate = emittedRange.startDate;
    component.endDate = emittedRange.endDate;
    component.onDateRangeSelected();
    expect(emittedData).toEqual(emittedRange);
  });
  
});
