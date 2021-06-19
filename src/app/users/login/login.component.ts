import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../_services/auth/authentication.service';
import { first } from 'rxjs/operators';
import { User } from '../../_models/user.model';
import { UserService } from '../../_services/auth/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from 'src/app/_services/auth/token-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  private subscription: Subscription;
  errorMessage;
  successMessage;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    ) { }

    ngOnInit() {
      this.loginForm = this.formBuilder.group({

      email: ['', Validators.required],
      password: ['', Validators.required],

    });
  }



  onSubmit(): void{


  this.subscription=this.authService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe({
      next: (response) => {
        this.errorMessage = null;
      this.successMessage = '';
      setTimeout(()=>{
        this.successMessage = null;
        this.router.navigate(['/home']);
      },2000);


      },
      error:(error)=>{
        this.errorMessage = error;
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
      console.log(error);
      },
      complete:console.log

    });



  }
}
