import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {StorageService} from '../_services/storage.service';
import {ProfileComponent} from "../profile/profile.component";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = 'hata';
  roles: string[] = [];
  currentUser: any;


  constructor(private authService: AuthService, private storageService: StorageService) {
  }


  ngOnInit(): void {
    this.currentUser = this.storageService.getUser().currentUser;
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    const {username, password} = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        localStorage.setItem('Token', data.access_token)
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  protected readonly ProfileComponent = ProfileComponent;
}
