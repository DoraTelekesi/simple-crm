import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { onSnapshot, doc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { UserService } from '../firebase-services/user.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [NgIf,MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  userId = '';
  user:User | null= null;
  // users: User[] = [];
  // firestore: Firestore = inject(Firestore);
  // userCollection = collection(this.firestore, 'users');
  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    console.log('User ID from route:', this.userId);
    // this.userService.getUser(this.userId);
   this.getUser(this.userId);
  }

  getUser(id: string) {
    const userDocRef = this.userService.getSingleDocRef('users', id);
    onSnapshot(userDocRef, (userItem) => {
      if (userItem.exists()) {
        this.user = new User({ id: userItem.id, ...userItem.data() });
        console.log('Retrieved user:', this.user);
      } else {
        console.log('No such user!');
      }
    });
  }

  editAddress() {
    this.dialog.open(DialogEditAddressComponent, {
      data: this.user
    });
  }

  editUser() {
    this.dialog.open(DialogEditUserComponent, {
      data: this.user
    });
  }
}
