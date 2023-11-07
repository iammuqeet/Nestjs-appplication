import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProducts(name: string, description: string) {
    const randomId = new Date().getTime().toString();
    const newProducts = new Product(randomId, name, description);
    this.products.push(newProducts);
    return randomId;
  }

  getAllProducts() {
    return [...this.products];
  }

  getProduct(params) {
    const product = this.findProduct(params.id);

    if (product) {
      return { ...product };
    } else {
      throw new NotFoundException(
        `Product with the ${params.id} does not exist`,
      );
    }
  }

  updateProduct(productId: string, productName, productDescription): Product {
    const product = this.findProduct(productId);
    const productIndex = this.products.findIndex(
      (product) => product.id === productId,
    );

    if (product) {
      const updateProduct = { ...product };
      if (productName) updateProduct.name = productName;
      if (productDescription) updateProduct.description = productDescription;
      this.products[productIndex] = updateProduct;
      return updateProduct;
    } else {
      throw new NotFoundException(`Product with the ${product}`);
    }
  }

  private findProduct(productId) {
    const product = this.products.find((product) => product.id === productId);
    if (product) return product;
    else throw new NotFoundException('Product not found');
  }
}
