import { Component, Injectable, Output, EventEmitter } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';

@Injectable()
export class SevenDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<Date | any>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createSevenDayRange(date);
  };

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createSevenDayRange(activeDate);
  };

  private _createSevenDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, 0);
      const end = this._dateAdapter.addCalendarDays(date, 6);
      return new DateRange<D>(start, end);
    };
    return new DateRange<D>(null, null);
  };

};

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: SevenDayRangeSelectionStrategy,
    },
  ],
})

export class DateRangePickerComponent {
  @Output() dateRangeSelected = new EventEmitter<{ startDate: any, endDate: any }>();
  startDate: Date = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  endDate: Date  = new Date();

  constructor() {}

  onDateRangeSelected() {
    this.dateRangeSelected.emit({ startDate: this.startDate, endDate: this.endDate });
  };

};
