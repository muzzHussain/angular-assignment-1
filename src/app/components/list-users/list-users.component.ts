import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UserModel } from '../../Model/userModel';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-users',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css',
})
export class ListUsersComponent implements OnInit {
  usersData: any[] = [];
  backUp: any[] = [];
  paginatedData: any[] = [];
  noResultFound: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  itemsPerPageOptions: number[] = [5, 10, 15, 25, 50, 100];

  passUserData: UserModel | null = null;

  sortDirections: { [key: string]: 'asc' | 'desc' | '' } = {
    first_name: '',
    last_name: '',
    age: '',
    email: '',
    web: '',
  };

  constructor(private _userService: UsersService) {}

  ngOnInit(): void {
    this.GetUsersData();
  }

  GetUsersData() {
    this._userService.GetUsers().subscribe(
      (resp) => {
        this.backUp = resp;
        this.usersData = [...this.backUp];
        this.totalPages = Math.ceil(this.usersData.length / this.itemsPerPage);
        this.setDataToPage(this.currentPage);
      },
      (error) => {
        console.error('Error while receiving data throgh api', error);
      }
    );
  }

  filterUser(searchQuery: Event) {
    const queryValue = (searchQuery.target as HTMLInputElement).value;

    const query = (queryValue || '').toLowerCase().trim();

    if (query === ' ') {
      this.usersData = [...this.backUp];
      this.noResultFound = false;
    } else {
      this.usersData = this.backUp.filter(
        (user) =>
          user.first_name.toLowerCase().includes(query) ||
          user.last_name.toLowerCase().includes(query)
      );
    }
    if (this.usersData.length > 0) {
      this.noResultFound = false;
      this.totalPages = Math.ceil(this.usersData.length / this.itemsPerPage);
      this.setDataToPage(1);
    } else {
      this.paginatedData = [];
      this.noResultFound = this.usersData.length === 0;
      this.setDataToPage(0);
    }
  }

  sortColumn(column: any) {
    if (this.sortDirections[column] === 'asc') {
      this.sortDirections[column] = 'desc';
    } else if (this.sortDirections[column] === 'desc') {
      this.sortDirections[column] = '';
      this.usersData = [...this.backUp];
    } else {
      this.sortDirections[column] = 'asc';
    }

    if (this.sortDirections[column] === 'asc') {
      this.usersData = this.usersData.sort((a, b) => {
        if (typeof a[column] === 'number') return a[column] - b[column];
        else return a[column].localeCompare(b[column]);
      });
    } else if (this.sortDirections[column] === 'desc') {
      this.usersData = this.usersData.sort((a, b) => {
        if (typeof a[column] === 'number') return b[column] - a[column];
        else return b[column].localeCompare(a[column]);
      });
    }

    // this.totalPages = Math.ceil(this.usersData.length / this.totalPages);
    this.setDataToPage(1);
  }

  setDataToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const startIdx = (this.currentPage - 1) * this.itemsPerPage;
    const endIdx = startIdx + this.itemsPerPage;

    this.paginatedData = this.usersData.slice(startIdx, endIdx);
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.setDataToPage(this.currentPage - 1);
    }
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.setDataToPage(this.currentPage + 1);
    }
  }

  onItemsPerPage() {
    this.itemsPerPage = Number(this.itemsPerPage);
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.usersData.length / this.itemsPerPage);
    this.setDataToPage(this.currentPage);
  }

  fetchData(id: number) {
    const user = this.paginatedData.find((prop) => prop.id === id);
    if (user) {
      this._userService.setUserData(user);
    }
  }
}
