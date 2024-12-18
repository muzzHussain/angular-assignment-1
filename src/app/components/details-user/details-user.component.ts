import { Component, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserModel } from '../../Model/userModel';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-details-user',
  imports: [RouterModule],
  templateUrl: './details-user.component.html',
  styleUrl: './details-user.component.css',
})
export class DetailsUserComponent implements OnInit {
  user: UserModel | null = null;

  constructor(private _router: Router, private _userService: UsersService) {}

  ngOnInit(): void {
    this.user = this._userService.getUserData();
  }

  back() {
    this._userService.removeData();
    this._router.navigate(['/users']);
  }
}
