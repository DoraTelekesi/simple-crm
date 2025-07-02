import { Injectable } from '@angular/core';
import { inject } from '@angular/core';


import {
  Firestore,
  collection,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { User } from '../../models/user.class';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [];
  firestore = inject(Firestore);
  // users$;
  user: User = new User();
  unsubList?: () => void;
  unsubSingle?: () => void;
  userId = '';
 

  constructor() {
    this.unsubList = onSnapshot(this.getUserRef(), (list) => {
      this.users = [];
      list.forEach((element) => {
        this.users.push(this.setUserObject(element.data(), element.id));
        console.log(this.users);
      });
    });
  }
  // this.unsubSingle = onSnapshot(
  //   this.getSingleDocRef('users', this.userId),
  //   (element) => {
  //     console.log(element.data());
  //   }
  // );

  // this.users$ = collectionData(this.getUserRef());

  /**
   * Listen to a single user document by ID
   */
// getUser(userId: string) {
//   if (this.unsubSingle) {
//     this.unsubSingle();
//   }

//   this.unsubSingle = onSnapshot(
//     this.getSingleDocRef('users', userId),
//     (userItem) => {
//       if (userItem.exists()) {
//         const user = this.setUserObject(userItem.data(), userItem.id);
//         this.user = user;
//         this.user$.next(user); // ✅ Push the user to subscribers
//         console.log('Fetched user:', user);
//       } else {
//         console.log('No such user!');
//         this.user$.next(null);
//       }
//     }
//   );
// }
  // getUser(id: string) {
  //   this.getSingleDocRef('users', id);

  //   // const userDocRef = doc(this.firestore, 'users', this.userId);
  //   // onSnapshot(userDocRef, (docSnap) => {
  //   //   if (docSnap.exists()) {
  //   //     this.user = new User({ id: docSnap.id, ...docSnap.data() });
  //   //     console.log('Retrieved user:', this.user);
  //   //   } else {
  //   //     console.log('No such user!');
  //   //   }
  //   // });
  // }

  async addUser(user: User) {
    await addDoc(this.getUserRef(), user)
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef?.id);
      });
  }

  async updateUser(user:User){
    if(user.id){
    await updateDoc(this.getSingleDocRef('users', user.id), this.getCleanJSON(user)).catch(
      (err)=>{console.error(err)}
    ).then()
    }

  }
  // async updateUser(user: User) {
  //   if (user.id) {
  //     await updateDoc(
  //       this.getSingleDocRef('users', user.id),
  //       this.getCleanJSON(user)
  //     )
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //       .then();
  //   }
  // }

  getCleanJSON(user: User): {} {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthDate: user.birthDate,
      street: user.street,
      zipCode: user.zipCode,
      city: user.city,
    };
  }

  //wenn wir mehrere collections haben -->

  // getColIdFromNote(user: User) {
  //   if (user.type == 'type-A') {
  //     return 'type-A';
  //   } else {
  //     return 'type-B';
  //   }
  // }

  ngOnDestroy() {
    if (this.unsubList) this.unsubList();
    if (this.unsubSingle) this.unsubSingle();
  }

  setUserObject(obj: any, id: string): User {
    return {
      id: id,
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      email: obj.email || '',
      birthDate: obj.birthDate || '',
      street: obj.street || '',
      zipCode: obj.zipCode || '',
      city: obj.city || '',
    };
  }

  getUserRef() {
    return collection(this.firestore, 'users');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }
}
