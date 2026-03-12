import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
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

export type ProductCategory = 'shoes' | 'headphones' | 'backpack' | 'laptop' | 'smartwatch' | 'sunglasses';

export interface Product {
  id: number;
  category: ProductCategory;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
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
      category: 'shoes',
      name: 'Lightweight Running Shoes',
      description: 'Breathable mesh runners with cushioned support for daily miles.',
      price: 89.99,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=50&h=50&fit=crop'
    },
    {
      id: 2,
      category: 'headphones',
      name: 'Wireless Headphones',
      description: 'Comfort-fit over-ear headphones with rich bass and clear calls.',
      price: 129.0,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=50&h=50&fit=crop'
    },
    {
      id: 3,
      category: 'backpack',
      name: 'Travel Backpack',
      description: 'Carry-on friendly backpack with organized compartments and padded straps.',
      price: 74.5,
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=50&h=50&fit=crop'
    },
    {
      id: 4,
      category: 'laptop',
      name: 'Ultrabook Laptop',
      description: 'Slim, fast laptop for work and travel with all-day battery life.',
      price: 999.0,
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=50&h=50&fit=crop'
    },
    {
      id: 5,
      category: 'smartwatch',
      name: 'Fitness Smartwatch',
      description: 'Track workouts, heart rate, and sleep with a bright always-on display.',
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=50&h=50&fit=crop'
    },
    {
      id: 6,
      category: 'sunglasses',
      name: 'Polarized Sunglasses',
      description: 'Glare-reducing polarized lenses with a lightweight, durable frame.',
      price: 59.99,
      imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=50&h=50&fit=crop'
    }
  ];

  constructor() {
    addIcons({ chevronForwardOutline });
  }

  trackById = (_: number, item: Product) => item.id;
}
