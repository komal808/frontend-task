import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { TableComponent } from './table.component';
import { DataService } from 'src/app/services/data.service';
import { DateRangePickerComponent } from '../date-range-picker/date-range-picker.component';
import { MatTableModule } from '@angular/material/table';
import { WeekData } from '../../interfaces/weekdata.interface';

import { DAYS_OF_WEEK, TIME_OF_DAY } from '../../constants/week.constant';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule
      ],
      providers: [DataService],
      declarations: [
        TableComponent,
        DateRangePickerComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    });
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dataService = TestBed.inject(DataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", ()=> {
    it('should fetch data and call onDateRangeFilter and generateTimePeriods on initialization', async () => {
      const dummyData:any = [];
      const dataServiceSpy = spyOn(dataService, 'getDummyData').and.returnValue(of(dummyData));
      const onDateRangeFilterSpy = spyOn(component, 'onDateRangeFilter');
      component.ngOnInit();

      expect(dataServiceSpy).toHaveBeenCalled();
      expect(component.jsonData).toEqual(dummyData);
      expect(onDateRangeFilterSpy).toHaveBeenCalledWith(component.selectedDateRange);
    });
  });

  describe('onDateRangeFilter', () => {
    it('should filter and update data source', () => {

      const mockData: WeekData[] = [
        { date_time: '2023-08-01T10:00:00Z', display_value: "3"  },
        { date_time: '2023-08-02T14:00:00Z', display_value: "3" },
        { date_time: '2023-08-03T12:00:00Z', display_value: "3" }
      ];

      component.jsonData = mockData;
      const startDate = new Date('2023-08-02T00:00:00Z');
      const endDate = new Date('2023-08-09T23:59:59Z');

      const expectedFilteredData = [
        { date_time: '2023-08-02T14:00:00Z', display_value: "3" },
        { date_time: '2023-08-03T12:00:00Z', display_value: "3" }
      ];
      component.onDateRangeFilter({ startDate, endDate });
       expect(component.filteredJsonData).toEqual(expectedFilteredData);
    });
  });

});
