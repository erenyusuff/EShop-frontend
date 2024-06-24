import {Component, OnInit} from '@angular/core';
import {UserService} from "../../_services/user.service";

@Component({
  selector: 'app-user-edit-admin',
  templateUrl: './user-edit-admin.component.html',
  styleUrl: './user-edit-admin.component.css'
})
export class UserEditAdminComponent implements OnInit{
  constructor(private userService: UserService) {
  }
  users: any
  isSubMenuOpen: boolean = false;

  ngOnInit() {
    this.userService.getUsers().subscribe((result) => {
      if (result) {
        this.users = result
      }
    })
  }

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

}
