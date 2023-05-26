import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../_services/authentication.service";
import {Router} from "@angular/router";
import {SpinnerService} from "../../spinner/spinner.service";
import {ErrorService} from "../../error/error.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private spinner: SpinnerService,
              private errorService: ErrorService,
              private router: Router) {
    this.formGroup = this.fb.group({
      login: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.spinner.hide();
  }

  authorize() {
    if (this.formGroup.invalid) {
      this.errorService.show('Нужно заполнить все поля ввода');
      return;
    }

    const login = this.formGroup.controls['login'].value;
    const password = this.formGroup.controls['password'].value;

    this.authService.authorize(login, password).subscribe(user => {
      if (user !== null) {
        this.router.navigate(['client/dialogs']);
      } else {
        this.errorService.show('Неверный логин/пароль');
      }
    }, (error) => {
      console.log(error);
      this.errorService.show('Неверный логин/пароль');
    });
  }
}
