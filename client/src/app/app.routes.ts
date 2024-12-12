import { Routes } from '@angular/router';
import { authenticatedGuard, unauthenticatedGuard } from '@shared/guards';
import { CvDetailScreenComponent } from 'src/screens/cv-detail-screen/cv-detail-screen.component';
import { HomeScreenComponent } from 'src/screens/home-screen/home-screen.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Login',
    component: HomeScreenComponent,
    canActivate: [unauthenticatedGuard],
  },
  {
    path: 'resume',
    title: 'Resume',
    component: CvDetailScreenComponent,
    canActivate: [authenticatedGuard],
  },
];
