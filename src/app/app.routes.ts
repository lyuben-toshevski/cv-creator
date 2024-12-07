import { Routes } from '@angular/router';
import { CvDetailScreenComponent } from 'src/screens/cv-detail-screen/cv-detail-screen.component';
import { HomeScreenComponent } from 'src/screens/home-screen/home-screen.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeScreenComponent,
  },
  {
    path: 'resume',
    component: CvDetailScreenComponent,
  },
];
