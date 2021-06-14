import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogin: boolean = false;
  errorMessage: string = '';

  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.isUserLogin();
  }

  onSubmit(form: NgForm) {
    console.log('Your form data: ', form.value);
    this._api.postTypeRequest('user/login', form.value).subscribe((res: any) => {
      console.log(res);
      if(res.status) {
        console.log(res);
        this._auth.setDataInLocalStorage('userData',JSON.stringify(res.data));
        this._auth.setDataInLocalStorage('token', res.token);
        this._router.navigate(['']);
      } else {
        console.log("login error");
      }
    }, err => {
      this.errorMessage = err['error'].message;
    });
  }

  isUserLogin() {
    console.log(this._auth.getUserDetails());
    if(this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }

  logout() {
    this._auth.clearStorage();
    this._router.navigate(['']);
  }

}
