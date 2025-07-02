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
import { UserService } from '../firebase-services/user.service';

@Component({
  selector: 'app-dialog-edit-user',
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
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent implements OnInit {
  user: User;
  userId: string = '';

  loading = false;
  birthDate?: Date;
  firstName = '';
  lastName = '';
  email = '';
  street = '';
  zipCode = 0;
  city = '';

  ngOnInit(): void {}
  constructor(
    public userService: UserService,
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    // Create a deep copy of the user object to edit locally
    this.user = JSON.parse(JSON.stringify(data));
    if (this.user && this.user.id) {
      this.userId = this.user.id;
    }
  }

  // saveUser() {
  //   let user: User = {
  //     firstName: this.firstName,
  //     lastName: this.lastName,
  //     email: this.email,
  //     birthDate: this.birthDate ? this.birthDate.getTime() : Date.now(),
  //     street: this.street,
  //     zipCode: this.zipCode,
  //     city: this.city,
  //   };

  //   this.userService.addUser(user);
  //   this.dialogRef.close();
  // }

  async saveEditedUser() {
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
  // async saveUser() {
  //   const userDocRef = doc(this.firestore, 'users', this.userId);
  //   console.log(userDocRef)
  //   try {
  //     this.loading = true;
  //     await updateDoc(userDocRef, this.user.toJSON());
  //     this.dialogRef.close();
  //   } catch (error) {
  //     console.error('Failed to update user:', error);
  //   } finally {
  //     this.loading = false;
  //   }
  // }
}
