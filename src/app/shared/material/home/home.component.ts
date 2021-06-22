import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/_services/auth/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  content: string;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    /*
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );*/

  }

}
