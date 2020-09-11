import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateRuleComponent } from './pages/create-rule/create-rule.component';
import { EditeRuleComponent } from './pages/edite-rule/edite-rule.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'create',
    component: CreateRuleComponent
  },
  {
    path: 'edit/:chain/:num',
    component: EditeRuleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
