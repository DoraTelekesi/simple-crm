import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-b7c8f","appId":"1:495551166564:web:157c09ca2295b267f20771","storageBucket":"simple-crm-b7c8f.firebasestorage.app","apiKey":"AIzaSyCzT1MQzV6B733hMjjQ2IfVVOKze-Bq4pE","authDomain":"simple-crm-b7c8f.firebaseapp.com","messagingSenderId":"495551166564"})), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())],
};
