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
  this.firstName = obj?.firstName || '';
  this.lastName = obj?.lastName || '';
  this.email = obj?.email || '';
  this.birthDate = obj?.birthDate ?? 0;     // ✅ number fallback
  this.street = obj?.street || '';
  this.zipCode = obj?.zipCode ?? 0;         // ✅ number fallback
  this.city = obj?.city || '';
}

// toJSON(): any {
//   return {
//     firstName: this.firstName ?? '',
//     lastName: this.lastName ?? '',
//     email: this.email ?? '',
//     birthDate: this.birthDate ?? 0,
//     street: this.street ?? '',
//     zipCode: this.zipCode ?? 0,
//     city: this.city ?? '',
//   };
// }
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
