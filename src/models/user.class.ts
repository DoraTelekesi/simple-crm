export class User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: number;
  street: string;
  zipCode: number;
  city: string;

  constructor(obj?: any) {
    this.id = obj?.id || '';
    // wenn wir ein new User () bauen, können wir machen ohne json hinzuzufügen
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.birthDate = obj ? obj.birthDate : '';
    this.street = obj ? obj.street : '';
    this.zipCode = obj ? obj.zipCode : '';
    this.city = obj ? obj.city : ''; //wir müssen überprüfen ob diese Object existiert
  }

  toJSON(): any {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate,
      street: this.street,
      zipCode: this.zipCode,
      city: this.city,
    };
  }
}

// export interface User {
//   id?: string; // Optional if you're using Firestore doc ID
//   firstName: string;
//   lastName: string;
//   birthDate: number;
//   street: string;
//   zipCode: number;
//   city: string;
// }
