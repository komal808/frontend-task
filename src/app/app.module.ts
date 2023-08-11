import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule }  from '@angular/material/form-field';
// module
// component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { TableComponent } from './components/table/table.component';
import { DataService } from './services/data.service';

const matModules = [
  MatToolbarModule,
  MatDialogModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule
]

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    DateRangePickerComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ...matModules
  ],
  providers: [ DataService, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
