import {Component, NgModule, OnInit} from '@angular/core';
import {AuthorizeCredentials} from "../../../models/AuthorizeCredentials";
import {AuthorizationService} from "../../../service/authorization.service";
import {Router, RouterModule} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;

  authorizeCredentials: AuthorizeCredentials = {
    email: "",
    password: ""
  }

  constructor(private router: Router,
              private authorizationService: AuthorizationService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.loading = true;
    this.authorizationService.login(this.authorizeCredentials);
    this.loading = false;
  }
}

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
    CommonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class LoginModule {
}

