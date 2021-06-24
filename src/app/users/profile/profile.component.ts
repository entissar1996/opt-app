import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/auth/user.service';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../../_services/auth/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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
  getUrl(url){
    return `${environment.baseUri}/uploadsavatar/${url}`;
}


}
