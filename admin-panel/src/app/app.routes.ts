import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { StudentsManagementComponent } from './pages/students-management/students-management.component';
import { TeachersManagementComponent } from './pages/teachers-management/teachers-management.component';
import { ScheduleManagementComponent } from './pages/schedule-management/schedule-management.component';
import { GradesManagementComponent } from './pages/grades-management/grades-management.component';
import { SubjectManagementComponent } from './pages/subject-management/subject-management.component';
import { AdminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin-login',
    pathMatch: 'full'
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'students', pathMatch: 'full' },   
      { path: 'students', component: StudentsManagementComponent, canActivate: [AdminGuard] },
      { path: 'teachers', component: TeachersManagementComponent, canActivate: [AdminGuard] },
      { path: 'schedule', component: ScheduleManagementComponent, canActivate: [AdminGuard] },
      { path: 'grades', component: GradesManagementComponent, canActivate: [AdminGuard] },
      { path: 'subjects', component: SubjectManagementComponent, canActivate: [AdminGuard] }
    ]
  },
];
