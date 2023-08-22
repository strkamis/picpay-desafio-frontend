import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginnComponent } from './lib/loginn/loginn.component';
import { DashboardComponent } from './lib/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginnComponent },
  { path: 'dashboard',component: DashboardComponent,},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
