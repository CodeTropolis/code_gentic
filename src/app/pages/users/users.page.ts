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
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline } from 'ionicons/icons';

type ListType = 'users' | 'contacts' | 'blank';

interface UserRow {
  id: number;
  name: string;
  email: string;
  photoUrl: string;
}

interface ContactRow {
  id: number;
  name: string;
  phone: string;
}

@Component({
  selector: 'app-users-page',
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
    IonIcon
  ],
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss']
})
export class UsersPage {
  readonly listType: ListType = 'users';

  readonly users: UserRow[] = [
    {
      id: 1,
      name: 'Ethan Walker',
      email: 'ethan.walker@example.com',
      photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 2,
      name: 'Mia Johnson',
      email: 'mia.johnson@example.com',
      photoUrl: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: 3,
      name: 'Noah Martinez',
      email: 'noah.martinez@example.com',
      photoUrl: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      id: 4,
      name: 'Ava Chen',
      email: 'ava.chen@example.com',
      photoUrl: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    {
      id: 5,
      name: 'Liam Patel',
      email: 'liam.patel@example.com',
      photoUrl: 'https://randomuser.me/api/portraits/men/5.jpg'
    }
  ];

  readonly contacts: ContactRow[] = [
    { id: 1, name: 'Jordan Reed', phone: '(555) 123-4567' },
    { id: 2, name: 'Taylor Brooks', phone: '(555) 987-6543' },
    { id: 3, name: 'Casey Morgan', phone: '(555) 222-8899' }
  ];

  readonly blankRows = Array.from({ length: 6 }, (_, i) => ({ id: i + 1 }));

  constructor() {
    addIcons({ chevronForwardOutline });
  }

  get title(): string {
    switch (this.listType) {
      case 'users':
        return 'Users';
      case 'contacts':
        return 'Contacts';
      case 'blank':
        return 'List';
      default:
        return 'List';
    }
  }

  trackById<T extends { id: number }>(_: number, item: T): number {
    return item.id;
  }
}
