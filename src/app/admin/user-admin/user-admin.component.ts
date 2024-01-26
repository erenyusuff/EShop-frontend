import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {AuthService} from "../../_services/auth.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../_services/user.service";

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-admin.component.html',
  styleUrl: './user-admin.component.css'
})
export class UserAdminComponent {
  userForm = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
  });
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private userService: UserService) {
  }
  isSubMenuOpen: boolean = false;

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }
  addUser(): void {
    const {userName, email, password, role} = this.userForm.value;
    this.userService.addUser({
      userName,
      email,
      password,
      role,
    }).subscribe()
  }


}
