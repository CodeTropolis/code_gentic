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
    IonIcon
  ],
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss']
})
export class UsersPage {
  readonly title = 'Users';

  readonly users: User[] = [
    {
      id: 1,
      name: 'Ethan Walker',
      email: 'ethan.walker@example.com',
      photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 2,
      name: 'Ava Johnson',
      email: 'ava.johnson@example.com',
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
      name: 'Mia Chen',
      email: 'mia.chen@example.com',
      photoUrl: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    {
      id: 5,
      name: 'Liam Patel',
      email: 'liam.patel@example.com',
      photoUrl: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    {
      id: 6,
      name: 'Sophia Davis',
      email: 'sophia.davis@example.com',
      photoUrl: 'https://randomuser.me/api/portraits/women/6.jpg'
    }
  ];

  trackById = (_: number, user: User) => user.id;
}
