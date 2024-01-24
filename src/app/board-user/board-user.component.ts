import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {User} from "./user.model";

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService) {
  }

  userInfo: User;


  ngOnInit(): void {
    this.userService.getUserBoard().subscribe((result) => {
      if (result) {

        this.userInfo = result;
      }
    })
  }
}
