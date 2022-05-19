import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
