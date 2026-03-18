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

type User = {
  id: number;
  name: string;
  email: string;
  photoUrl: string;
};

@Component({
  selector: 'app-users',
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
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage {
  readonly users: User[] = [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 2,
      name: 'Maya Patel',
      email: 'maya.patel@example.com',
      photoUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      id: 3,
      name: 'Chris Lee',
      email: 'chris.lee@example.com',
      photoUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
      id: 4,
      name: 'Sofia Garcia',
      email: 'sofia.garcia@example.com',
      photoUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    {
      id: 5,
      name: 'Noah Williams',
      email: 'noah.williams@example.com',
      photoUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      id: 6,
      name: 'Emma Brown',
      email: 'emma.brown@example.com',
      photoUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
  ];

  constructor() {
    addIcons({ chevronForwardOutline });
  }
}
