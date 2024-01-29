import {Component, OnInit} from '@angular/core';
import {StorageService} from '../_services/storage.service';
import {UserService} from "../_services/user.service";
import {User} from "../board-user/user.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService) {
  }

  ngOnInit(): any {
    this.userService.getMe().subscribe((result) => {
      console.log(result)
      if (result) {
        this.currentUser = result;
      }
    })
  }
}
