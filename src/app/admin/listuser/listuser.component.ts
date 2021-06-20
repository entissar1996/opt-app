import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/users/confirmation-dialog/confirmation-dialog.component';
import { IApiResponse } from 'src/app/_models/api-response.model';
import { User } from 'src/app/_models/user.model';
import { UserService } from 'src/app/_services/auth/user.service';
import { environment } from 'src/environments/environment';
import { SideNavService } from '../side-nav.service';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent implements OnInit {

  UserData: any = [];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'firstname', 'lastname',
    'email', 'ville','phone',
    'adresse','avatar'];
    @ViewChild('sidenav') public sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(
    private router: Router,
    private UserApi: UserService,
    public dialog: MatDialog,
    private sideNavService: SideNavService
    ) {
    this.UserApi.getAllUsers().subscribe(data => {

      this.UserData = data.payload;
      console.log(this.UserData);
      this.dataSource = new MatTableDataSource<User>(this.UserData);
      console.log(this.dataSource);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })
  }

  ngOnInit() { }
  getUrl(url){
    return `${environment.baseUri}/uploadsavatar/${url}`;
}
mouseenter() {
  if (!this.isExpanded) {
    this.isShowing = true;
  }
}

mouseleave() {
  if (!this.isExpanded) {
    this.isShowing = false;
  }
}




}
