import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { doc, onSnapshot } from 'firebase/firestore';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  // user: User = new User(); //Variable: Typ = Instance
  users: User[] = [];
  userCollection = collection(this.firestore, 'users');

  ngOnInit(): void {
    onSnapshot(this.userCollection, (snapshot) => {
      this.users = snapshot.docs.map((doc) => {
        return new User({ id: doc.id, ...doc.data() });
      });
      console.log('Users array:', this.users);
    });
  }

  constructor(firestore: Firestore, public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
