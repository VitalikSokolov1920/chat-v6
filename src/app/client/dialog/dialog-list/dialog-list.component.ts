import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dialog-list',
  templateUrl: './dialog-list.component.html',
  styleUrls: ['./dialog-list.component.scss']
})
export class DialogListComponent implements OnInit, OnDestroy {
  isDialogSelected = false;

  set dialogSelected(isSelected: boolean) {
    sessionStorage.setItem('isDialogSelected', String(isSelected));

    this.isDialogSelected = isSelected;
  }

  dialogList: any[] = [
    {
      first_name: 'User1',
      last_name: 'Test',
      last_message: 'Hello',
      isOnline: true,
      unread_messages_amount: 10,
      id: 0,
    },
    {
      first_name: 'Vitalik',
      last_name: 'Sokolov',
      last_message: 'Hello from Vitalik Sokolov!',
      isOnline: false,
      unread_messages_amount: 0,
      id: 1,
    },
    {
      first_name: 'User1',
      last_name: 'Test',
      last_message: 'Hello',
      isOnline: true,
      unread_messages_amount: 10,
      id: 2,
    },
    {
      first_name: 'Vitalik',
      last_name: 'Sokolov',
      last_message: 'Hello from Vitalik Sokolov!',
      isOnline: false,
      unread_messages_amount: 0,
      id: 3,
    },
    {
      first_name: 'User1',
      last_name: 'Test',
      last_message: 'Hello',
      isOnline: true,
      unread_messages_amount: 10,
      id: 4,
    },
    {
      first_name: 'Vitalik',
      last_name: 'Sokolov',
      last_message: 'Hello from Vitalik Sokolov!',
      isOnline: false,
      unread_messages_amount: 0,
      id: 5,
    },
    {
      first_name: 'User1',
      last_name: 'Test',
      last_message: 'Hello',
      isOnline: true,
      unread_messages_amount: 10,
      id: 6,
    },
    {
      first_name: 'Vitalik',
      last_name: 'Sokolov',
      last_message: 'Hello from Vitalik Sokolov!',
      isOnline: false,
      unread_messages_amount: 0,
      id: 7,
    },
  ];

  constructor(private router: Router) {
    if (sessionStorage.getItem('isDialogSelected')) {
      this.isDialogSelected = sessionStorage.getItem('isDialogSelected') === 'true';
    }
  }

  ngOnInit(): void {
  }

  backToDialogs() {
    this.dialogSelected = false;
    this.router.navigate(['client/dialogs']);
  }

  private clear() {
    this.dialogSelected = false;
  }

  ngOnDestroy() {
    this.clear();
  }

}
