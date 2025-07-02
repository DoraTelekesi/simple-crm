import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../firebase-services/user.service';
import { Input } from '@angular/core';
@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule,
    NgIf,
    MatCardModule,
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class DialogAddUserComponent {
  // user: User = new User();
  birthDate?: Date;
  // firestore: Firestore = inject(Firestore);

  // userCollection = collection(this.firestore, 'users');
// @Input() user = User;
  firstName = '';
  lastName = '';
  email = '';
  street = '';
  zipCode = 0;
  city = '';

  loading = false;
  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<DialogAddUserComponent>
  ) {}

  saveUser() {
    let user: User = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate ? this.birthDate.getTime() : Date.now(),
      street: this.street,
      zipCode: this.zipCode,
      city: this.city,
    };

    this.userService.addUser(user);
    this.dialogRef.close();
  }
  // saveUser() {
  //   if (this.birthDate) {
  //     this.user.birthDate = this.birthDate.getTime();
  //   }
  //   this.loading = true;
  //   addDoc(this.userCollection, this.user.toJSON())
  //     .then((docRef) => {
  //       this.loading = false;
  //       console.log('User added with ID:', docRef.id);
  //       this.dialogRef.close();
  //     })
  //     .catch((err) => console.error('Error adding user:', err));
  // }
}
