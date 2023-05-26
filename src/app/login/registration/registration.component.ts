import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SpinnerService} from "../../spinner/spinner.service";
import {AuthenticationService} from "../../_services/authentication.service";
import {Router} from "@angular/router";
import {ErrorService} from "../../error/error.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  regGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private router: Router,
              private errorService: ErrorService,
              private spinner: SpinnerService) {}

  ngOnInit(): void {
    this.regGroup = this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      login: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      repeatPassword: this.fb.control('', [Validators.required]),
      image: this.fb.control(null),
    });

    this.spinner.hide();
  }

  setImage(image: string | ArrayBuffer) {
    this.image.setValue(image);
  }

  get image() {
    return this.regGroup.controls['image'];
  }

  registration() {
    if (this.regGroup.invalid) {
      return;
    }

    const data = this.regGroup.value;

    this.authService.registrationUser(data).subscribe((user) => {

      this.router.navigate(['client/dialogs']);
    }, (error) => {
      this.errorService.show(error.error.errorMessage);
    });
  }

}
