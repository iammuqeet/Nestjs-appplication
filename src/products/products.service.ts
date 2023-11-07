import { Injectable } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  insertProducts(name: string, description: string) {
    const randomId = new Date().getTime().toString();
    const newProducts = new Product(randomId, name, description);
    this.products.push(newProducts);
    return randomId;
  }
}
