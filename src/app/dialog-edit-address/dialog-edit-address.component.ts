import { Component, OnInit, inject, Inject } from '@angular/core';
import { User } from '../../models/user.class';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Firestore } from '@angular/fire/firestore';
import { UserService } from '../firebase-services/user.service';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatDialogContent,
    MatProgressBarModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss',
})
export class DialogEditAddressComponent implements OnInit {
  user: User;
  userId: string = '';
  firestore: Firestore = inject(Firestore);
  loading = false;
  ngOnInit(): void {}
  constructor(
    public userService: UserService,
    public dialogRef: MatDialogRef<DialogEditAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    // Create a deep copy of the user object to edit locally
    this.user = JSON.parse(JSON.stringify(data));
    if (this.user && this.user.id) {
      this.userId = this.user.id;
    }
  }

  async saveEditedAddress() {
    this.loading = true;
    try {
      await this.userService.updateUser(this.user);
      this.dialogRef.close();
    } catch (error) {
      console.error('Failed to update user:', error);
    } finally {
      this.loading = false;
    }
  }
}
