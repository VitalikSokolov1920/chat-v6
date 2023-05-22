import { Component, OnInit } from '@angular/core';
import {SpinnerService} from "../../../spinner/spinner.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {CreateRoomService} from "./create-room.service";
import {Friend} from "../../../_models/friend";
import {Image} from "../../../_models";

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {

  roomGroup: FormGroup;
  image: SafeUrl;
  imageLoadError: boolean = false;
  createRoomError: string = '';
  friends: Friend[];
  addFriend: Friend[] = [];

  constructor(private spinner: SpinnerService,
              private sanitizer: DomSanitizer,
              private createRoomService: CreateRoomService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.spinner.hide();

    this.roomGroup = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      image: this.fb.control('')
    });

    this.createRoomService.getFriendList().subscribe(friends => {
      if (friends.actionResult) {
        this.friends = friends.result;
        this.friends.forEach(f => {
          f.action = 'Добавить';
          f.isAdd = false;
        });
      } else {
        this.createRoomError = friends.error;
      }
    })
  }

  getImage(image: string | ArrayBuffer) {
    this.image = this.sanitizer.bypassSecurityTrustUrl(image as string);
    this.roomGroup.controls['image'].setValue(image);
  }

  getImageLoadError() {
    this.imageLoadError = true;
  }

  create() {
    if (this.roomGroup.invalid) {
      return;
    }

    const name = this.roomGroup.controls['name'].value;
    const image = this.roomGroup.controls['image'].value || undefined;
    let friendIds: string[] = [];
    this.addFriend.forEach(f => friendIds.push(f.id));

    if (image) {
      const paths = image.toString().split(';');

      const type = paths[0].slice(5);

      const data = paths[1].slice(7);

      const img: Image = {
        type,
        data,
      };

      this.createRoomService.createRoom(name, friendIds, img).subscribe(result => {
        if (result.actionResult) {
          this.createRoomService.setLastCreatedRoomId(result.result);
        } else {
          this.createRoomError = result.error;
        }
      });
    } else {
      this.createRoomService.createRoom(name, friendIds).subscribe(result => {
        if (result.actionResult) {
          this.createRoomService.setLastCreatedRoomId(result.result);
        } else {
          this.createRoomError = result.error;
        }
      });
    }
  }

  getFriendImage(friend: Friend) {
    if (!friend.type || !friend.data) {
      return '/assets/images/default-user-avatar.svg';
    } else {
      return this.sanitizer.bypassSecurityTrustUrl(`data:${friend.type};base64, ${friend.data}`);
    }
  }

  changeFriendState(friend: Friend) {
    if (!friend.isAdd) {
      const item = this.addFriend.find(f => f.id == friend.id);

      if (!item) {
        this.addFriend.push(friend);
        friend.isAdd = true;
        friend.action = 'Удалить';
      }
    } else {
      const index = this.addFriend.indexOf(friend);

      if (index > -1) {
        this.addFriend.splice(index, 1);

        friend.isAdd = false;
        friend.action = 'Добавить';
      }
    }
  }
}
