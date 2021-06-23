import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/auth/user.service';

@Component({
  selector: 'app-consulte-profil',
  templateUrl: './consulte-profil.component.html',
  styleUrls: ['./consulte-profil.component.scss']
})
export class ConsulteProfilComponent implements OnInit {
  user: any = [];
  values = JSON.parse(localStorage.getItem("currentUser"));
  idUser = this.values._id;

  constructor( private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,) { }

  ngOnInit(): void {
    this.userService.getUserById(this.idUser).subscribe((data)=> {
      this.user = data.payload;
    });
  }

}
