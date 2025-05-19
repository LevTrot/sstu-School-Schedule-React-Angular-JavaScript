import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentsManagementComponent } from './pages/students-management/students-management.component';
import { TeachersManagementComponent } from './pages/teachers-management/teachers-management.component';
import { ScheduleManagementComponent } from './pages/schedule-management/schedule-management.component';
import { GradesManagementComponent } from './pages/grades-management/grades-management.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AdminGuard] },
  { path: 'students', component: StudentsManagementComponent, canActivate: [AdminGuard] },
  { path: 'teachers', component: TeachersManagementComponent, canActivate: [AdminGuard] },
  { path: 'schedule', component: ScheduleManagementComponent, canActivate: [AdminGuard] },
  { path: 'grades', component: GradesManagementComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
