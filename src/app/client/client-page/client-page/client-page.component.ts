import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Image, UserListItem} from "../../../_models";
import {UserService} from "../../user.service";
import {map, mergeMap, ReplaySubject, takeUntil} from "rxjs";
import {AuthenticationService} from "../../../_services/authentication.service";
import {FormControl} from "@angular/forms";
import {SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {
  isAuthClientPage: boolean;
  userImage: string | SafeUrl;
  user: UserListItem;

  imageControl: FormControl;

  private unsubscribe$ = new ReplaySubject(1);

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.imageControl = new FormControl('');

    this.activatedRoute.paramMap.pipe(
      takeUntil(this.unsubscribe$),
      map(params => params.get('id')),
      mergeMap((id) => {
        this.isAuthClientPage = id == this.authService.authUser.id;
          return this.userService.getUserImage$(id).pipe(
            map(image => {
              this.userImage = image;
              return id;
            })
          )
        }
      ),
      mergeMap((id) => this.userService.getUserById$(id))
    ).subscribe((user) => {
      this.user = user;
    });
  }

  get fullName() {
    return this.user.last_name.trim() + ' ' + this.user.first_name.trim();
  }

  imageLoaded(image: string | ArrayBuffer) {
    if (!image) {
      return;
    }

    const paths = image.toString().split(';');

    const type = paths[0].slice(5);

    const data = paths[1].slice(7);

    const img: Image = {
      type,
      data,
    };

    this.userService.sendUserImage(img).subscribe(image => {
      this.userImage = image;
    });
  }

  imageLoadError(error: any) {
    console.log(error);
  }

  navigateToDialog() {

  }

  addToFriends() {

  }

  removeFromFriends() {

  }
}
