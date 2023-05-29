import {AfterViewChecked, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SpinnerService} from "../../../../spinner/spinner.service";
import {ActivatedRoute} from "@angular/router";
import {Room} from "../../../../_models/room-list-item";
import {RoomService} from "../../room.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {FormControl, Validators} from "@angular/forms";
import {map, mergeMap, ReplaySubject, take, takeUntil} from "rxjs";
import {SliceParamsRequest} from "../../../../_models/slice-params";
import {User} from "../../../../_models";
import {AuthenticationService} from "../../../../_services/authentication.service";
import {DOCUMENT} from "@angular/common";
import {ErrorService} from "../../../../error/error.service";

@Component({
  selector: 'app-current-room',
  templateUrl: './current-room.component.html',
  styleUrls: ['./current-room.component.scss']
})
export class CurrentRoomComponent implements OnInit, OnDestroy, AfterViewChecked {

  room: Room;
  messageControl: FormControl;
  authUser: User;

  private unsubscribe$ = new ReplaySubject(1);
  private scrolled = false;
  private maxIndex = 0;
  private initialUnreadMessagesCount: number = 0;

  private sliceParams: SliceParamsRequest;

  private getAllMessages = false;

  private multiplier: number;

  @ViewChild('scroll', {static: false})
  dialogElem: ElementRef;

  constructor(@Inject(DOCUMENT) private document: Document,
              private spinner: SpinnerService,
              private roomService: RoomService,
              private sanitizer: DomSanitizer,
              private errorService: ErrorService,
              private authService: AuthenticationService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.messageControl = new FormControl('', Validators.required);

    this.authUser = this.authService.authUser;

    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.unsubscribe$),
        map(params => {
          this.maxIndex = 0;

          this.scrolled = false;

          this.getAllMessages = false;

          this.multiplier = 1;

          this.room = new Room();

          this.room.messages = [];

          this.room.roomMessagesCount = 0;

          return params.get('id');
        }),
        mergeMap(roomId =>
          this.roomService.getCurrentRoomInfoById$(roomId).pipe(
            map(result => {
              if (result.actionResult) {
                this.room = result.result;
              } else {
                this.errorService.show(result.error);
              }
              return this.room.room_id;
            })
          )
        ),
        mergeMap(roomId =>
          this.roomService.getRoomMessagesCount$(roomId).pipe(
            map(result => {
              if (result.actionResult) {
                this.room.roomMessagesCount = result.result.messagesCount;
                const unreadMessagesCount = result.result.unreadMessagesCount;

                const multiplier = Math.ceil(unreadMessagesCount / 25);
                const limit = multiplier * 25;

                if (limit <= 25) {
                  if (this.room.roomMessagesCount - 25 * this.multiplier <= 0) {
                    this.sliceParams = {
                      limit: 25,
                      offset: 0
                    }
                  } else {
                    this.sliceParams = {
                      limit: 25,
                      offset: this.room.roomMessagesCount - 25 * this.multiplier++
                    }
                  }
                } else {
                  this.multiplier = multiplier;

                  if (this.room.roomMessagesCount - 25 * this.multiplier <= 0) {
                    this.sliceParams = {
                      limit: limit,
                      offset: 0
                    }
                  } else {
                    this.sliceParams = {
                      limit: limit,
                      offset: this.room.roomMessagesCount - 25 * this.multiplier++
                    }
                  }
                }
              } else {
                this.errorService.show(result.error);
              }

              return roomId;
            })
          )
        ),
        mergeMap(roomId =>
          this.roomService.getRoomMessages$(roomId, this.sliceParams).pipe(
            map(result => {
              if (result.actionResult) {
                this.room.messages = result.result;

                this.getAllMessages = result.isEnd;

                this.room.roomMessagesCount = result.total_count;
              } else {
                this.errorService.show(result.error);
              }

              return this.room.room_id;
            })
          )
        ),
        mergeMap(roomId =>
          this.roomService.getRoomMembers$(roomId).pipe(
            map(result => {
              if (result.actionResult) {
                this.room.members = result.result;
                this.room.roomMembersCount = result.result.length;
              } else {
                this.errorService.show(result.error);
              }

              return this.room.room_id;
            })
          )
        )
      )
      .subscribe(() => {
        this.spinner.hide();
      });

    this.roomService.waitMessage$().subscribe(result => {
      if (result?.room_id == this.room.room_id) {
        this.room.messages.push(result);
      }
    });

    this.roomService.waitMessageRead$().subscribe(messageId => {
      const msg = this.room?.messages?.find(msg => msg.id == messageId);

      if (msg) {
        msg.is_read = true;
      }
    });
  }

  getRoomImage() : SafeUrl {
    if (this.room?.image?.type && this.room?.image?.data) {
      return this.sanitizer.bypassSecurityTrustUrl(`data:${this.room.image.type};base64, ${this.room.image.data}`);
    } else {
      return `/assets/images/default-user-avatar.svg`;
    }
  }

  sendMessage() {
    const value = this.messageControl.value.trim();

    this.messageControl.setValue(value);

    if (this.messageControl.invalid) {
      return;
    }

    this.roomService.sendMessage$(this.messageControl.value, this.authUser.id, this.room.room_id).subscribe(() => {
      this.scrolled = false;
    });
    this.scrolled = false;

    this.messageControl.setValue(null);
  }

  scrollTop() {
    if (this.dialogElem && this.dialogElem.nativeElement && this.room.messages && this.room.messages.length != 0) {
      if (this.dialogElem.nativeElement.scrollTop == 0 && !this.getAllMessages) {
        if (this.room.roomMessagesCount - 25 * this.multiplier < 0) {
          this.sliceParams = {
            limit: 25 + (this.room.roomMessagesCount - 25 * this.multiplier),
            offset: 0
          }
        } else {
          this.sliceParams = {
            limit: 25,
            offset: this.room.roomMessagesCount - 25 * this.multiplier++
          }
        }

        this.roomService.getRoomMessages$(this.room.room_id, this.sliceParams).pipe(take(1)).subscribe((response) => {
          if (response.actionResult) {
            this.getAllMessages = response.isEnd;

            this.room.messages.unshift(...response.result);

            this.dialogElem.nativeElement.scrollTop = 1;
          } else {
            this.errorService.show(response.error);
          }
        });
      }
    }
  }

  ngAfterViewChecked() {
    this.scrollBottom();
  }

  private scrollBottom() {
    if (this.dialogElem && this.dialogElem.nativeElement && !this.scrolled && this.room.messages && this.room.messages.length != 0) {
      const firstUnreadMsg = this.room.messages.find(msg => !msg.is_read && msg.send_from_id != this.authUser.id);

      if (!firstUnreadMsg) {
        this.dialogElem.nativeElement.scrollTop = this.dialogElem.nativeElement.scrollHeight;
      } else {
        const elem = this.document.getElementById(firstUnreadMsg.id);

        elem.scrollIntoView();
      }
      this.scrolled = true;
    }
  }

  onMessageVisible(messageId: string) {
    const msg = this.room.messages.find(msg => msg.id == messageId);
    if (msg.send_from_id != this.authUser.id && !msg.is_read) {
      this.roomService.markMessageRead$(messageId, this.authUser.id, this.room.room_id, msg.send_from_id).pipe(take(1)).subscribe();
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  getOtherUserSendFrom(send_from_id: string) {
    return this.room.members.find(user => user.id == send_from_id);
  }

  isShowDateSeparator(date1: string, date2: string) {
    return diffDates(date1, date2);
  }
}

export function diffDates(date1: string, date2: string) {
  if (!date2) {
    return false;
  }

  const d1 = new Date(date1);
  const d2 = new Date(date2);

  if (d1.getFullYear() != d2.getFullYear()) {
    return true;
  } else if (d1.getMonth() != d2.getMonth()) {
    return true
  } else if (d1.getDate() != d2.getDate()) {
    return true;
  }

  return false;
}
