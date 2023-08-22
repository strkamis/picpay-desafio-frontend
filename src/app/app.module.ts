import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginnComponent } from './lib/loginn/loginn.component';
import { DashboardComponent } from './lib/dashboard/dashboard.component';
import { SendDialogComponent } from './lib/send-dialog/send-dialog.component';
import { DeleteDialogComponent } from './lib/delete-dialog/delete-dialog.component';
import { AddDialogComponent } from './lib/add-dialog/add-dialog.component';

import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AuthService } from './shared/services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginnComponent,
    DashboardComponent,
    SendDialogComponent,
    DeleteDialogComponent,
    AddDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    // MatTableDataSource,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule
    ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
