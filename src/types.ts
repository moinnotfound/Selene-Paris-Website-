/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  frenchName: string;
  category: "toothbrush" | "toothpaste" | "soap" | "candle";
  price: number;
  description: string;
  ingredients: { name: string; info: string; origin: string }[];
  ceremonySteps: { step: string; title: string; description: string }[];
  pairWithIds: string[];
  image: string;
  limitedRemaining?: number;
  isLimited?: boolean;
  notes?: string;
  originCountry: string;
  // Simulated multiple angles for 360 rotation interaction
  rotationImages: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  pullQuote: string;
  readTime: string;
  image: string;
}

export interface SourcingPoint {
  id: string;
  name: string;
  material: string;
  coordinates: { x: number; y: number }; // Percentage values on raw map container
  location: string;
  description: string;
}

export interface PressMention {
  id: string;
  publisher: string;
  logoText: string;
  statement: string;
}
