import { Routes } from '@angular/router';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { DetailsUserComponent } from './components/details-user/details-user.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: ListUsersComponent,
  },
  {
    path: 'users/:id',
    component: DetailsUserComponent,
    canActivate: [AuthGuardService],
  },
];
