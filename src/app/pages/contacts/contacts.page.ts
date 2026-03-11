import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline } from 'ionicons/icons';

type Contact = {
  id: number;
  name: string;
  phone: string;
};

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
  ],
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage {
  readonly title = 'Contacts';

  readonly contacts: Contact[] = [
    { id: 1, name: 'Ava Johnson', phone: '(555) 123-4567' },
    { id: 2, name: 'Noah Martinez', phone: '(555) 987-6543' },
    { id: 3, name: 'Mia Chen', phone: '(555) 222-8899' },
    { id: 4, name: 'Liam Patel', phone: '(555) 444-1212' },
    { id: 5, name: 'Sophia Nguyen', phone: '(555) 777-3030' },
  ];

  constructor() {
    addIcons({ chevronForwardOutline });
  }

  trackById = (_: number, item: Contact) => item.id;
}
