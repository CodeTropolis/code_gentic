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

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
};

@Component({
  selector: 'app-products',
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
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss']
})
export class ProductsPage {
  readonly products: Product[] = [
    {
      id: 1,
      name: 'Ionic Starter Kit',
      description: 'A minimal starter bundle for rapid prototyping.',
      price: '$19.00',
      imageUrl: 'https://via.placeholder.com/50'
    },
    {
      id: 2,
      name: 'Angular UI Pack',
      description: 'Reusable UI components and patterns.',
      price: '$29.00',
      imageUrl: 'https://via.placeholder.com/50'
    },
    {
      id: 3,
      name: 'Design Tokens',
      description: 'Color, spacing, and typography tokens.',
      price: '$12.00',
      imageUrl: 'https://via.placeholder.com/50'
    },
    {
      id: 4,
      name: 'Icon Set',
      description: 'A curated set of modern outline icons.',
      price: '$9.00',
      imageUrl: 'https://via.placeholder.com/50'
    },
    {
      id: 5,
      name: 'Pro Templates',
      description: 'Ready-to-use screens for common flows.',
      price: '$49.00',
      imageUrl: 'https://via.placeholder.com/50'
    }
  ];

  constructor() {
    addIcons({ chevronForwardOutline });
  }

  trackById = (_: number, item: Product) => item.id;
}
