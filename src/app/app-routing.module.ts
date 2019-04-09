import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'form',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},
  { path: 'form', loadChildren: './form/form.module#FormPageModule' },
  { path: 'revenue', loadChildren: './revenue/revenue.module#RevenuePageModule' },
  { path: 'head-count', loadChildren: './head-count/head-count.module#HeadCountPageModule' },
  { path: 'srf', loadChildren: './srf/srf.module#SrfPageModule' },  { path: 'cost', loadChildren: './cost/cost.module#CostPageModule' },
  { path: 'schedule', loadChildren: './schedule/schedule.module#SchedulePageModule' },
  { path: 'automation', loadChildren: './automation/automation.module#AutomationPageModule' },
  { path: 'innovation', loadChildren: './innovation/innovation.module#InnovationPageModule' },
  { path: 'trends', loadChildren: './trends/trends.module#TrendsPageModule' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
