import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../services/data.service';
import { WeekData } from '../../interfaces/weekdata.interface';
import { TableData } from '../../interfaces/table-data.interface';

import { DAYS_OF_WEEK, TIME_OF_DAY } from '../../constants/week.constant';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {
  timePeriods: string[] = TIME_OF_DAY;
  jsonData: WeekData[] = [];
  filteredJsonData: WeekData[] = [];

  displayedColumns: string[] = ['Time Period', ...DAYS_OF_WEEK];
  dataSource: MatTableDataSource<TableData>;
  selectedDateRange: any = {
    startDate: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  };

  constructor(private dataService: DataService) {
    this.dataSource = new MatTableDataSource<TableData>([]);
  };

  ngOnInit() {
    this.dataService.getDummyData().subscribe(data => {
      this.jsonData = data;
      this.onDateRangeFilter(this.selectedDateRange);
    });
  };

  generateTimePeriods = () => {
    return this.timePeriods.map((timePeriod) => { return {"Time Period": timePeriod}});
  };

  public onDateRangeFilter(range: { startDate: Date, endDate: Date }) {

    const startDate = new Date(range.startDate);
    const endDate = new Date(range.endDate);

    this.filteredJsonData = this.jsonData.filter(item => {
      const itemDate = new Date(item.date_time);
      return itemDate >= startDate && itemDate <= endDate;
    });

    this.initialTableData();
    this.updateTableData();
  };

  initialTableData() {
    const initalTimePeriods = this.generateTimePeriods();
    this.dataSource.data = initalTimePeriods.map(row =>
      Object.assign({}, row, ...DAYS_OF_WEEK.map(day => ({ [day]: '-' })))
    );
  };

  updateTableData() {
    let updatedData = this.filteredJsonData.reduce((data, item) => {
      const itemDate = new Date(item.date_time);
      const getDayofWeek: string = DAYS_OF_WEEK[itemDate.getDay()];
      const hour = itemDate.getHours();
      (data as any)[hour][getDayofWeek] = item.display_value

      return data;
    }, [...this.dataSource.data]);

    this.dataSource.data = updatedData;
  };
};





