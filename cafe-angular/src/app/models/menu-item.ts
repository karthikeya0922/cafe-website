export type Category = 'Coffee' | 'Tea' | 'Shakes' | 'Bakery' | 'Snacks';

export interface MenuItem {
  id: number;
  name: string;
  category: Category;
  price: number;
  rating: number;
  veg: boolean;
  icon: string;
  description: string;
}

export interface CartLine {
  item: MenuItem;
  quantity: number;
}
