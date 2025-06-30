import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  Firestore,
  collection,
  collectionData,
  onSnapshot,
  doc,
  getDoc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  userId = '';
  user: User = new User();
  // users: User[] = [];
  firestore: Firestore = inject(Firestore);
  userCollection = collection(this.firestore, 'users');
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    console.log('User ID from route:', this.userId);
    this.getUser();
  }

  getUser() {
    const userDocRef = doc(this.firestore, 'users', this.userId);
    onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        this.user = new User({ id: docSnap.id, ...docSnap.data() });
        console.log('Retrieved user:', this.user);
      } else {
        console.log('No such user!');
      }
    });
  }
}
