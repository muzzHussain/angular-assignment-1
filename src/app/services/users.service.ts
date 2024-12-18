import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { UserModel } from '../Model/userModel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userDataSubject = new BehaviorSubject<UserModel | null>(
    this.getStoredData()
  );
  userData$ = this.userDataSubject.asObservable();
  URL = environment.baseURL;

  constructor(private _httpClinet: HttpClient) {}

  GetUsers() {
    return this._httpClinet.get<UserModel[]>(this.URL);
  }

  setUserData(user: UserModel | null) {
    this.userDataSubject.next(user);
    if (user) {
      localStorage.setItem('userData', JSON.stringify(user));
    } else {
      localStorage.removeItem('userData');
    }
  }

  getUserData() {
    return this.userDataSubject.getValue();
  }

  private getStoredData(): UserModel | null {
    if (typeof localStorage !== 'undefined') {
      const storedData = localStorage.getItem('userData');
      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  }

  removeData() {
    localStorage.removeItem('userData');
  }
}
