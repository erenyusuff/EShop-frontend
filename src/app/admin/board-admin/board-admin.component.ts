import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import {StorageService} from "../../_services/storage.service";
import {UserAdminComponent} from "../user-admin/user-admin.component";

@Component({
  selector: 'app-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  currentUser: any;
  isSubMenuOpen: boolean = false;

  constructor(private userService: UserService, private storageService: StorageService) { }
  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  ngOnInit(): void {
    this.userService.isAdmin().subscribe({

      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });


  }
  isAdmin(): void {
    this.currentUser = this.storageService.getUser();
    this.userService.isAdmin().subscribe({

      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
  }
}
