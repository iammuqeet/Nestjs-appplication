import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post('new')
  addProducts(
    @Body('name') name: string,
    @Body('description') description: string,
  ): any {
    const generatedId = this.productsService.insertProducts(name, description);
    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProduct(@Param() params: any): Product | string {
    return this.productsService.getProduct(params);
  }

  @Patch('update/:id')
  updateProduct(
    @Param('id') productId: string,
    @Body('name') productName: string,
    @Body('description') productDescription: string,
  ) {
    return this.productsService.updateProduct(
      productId,
      productName,
      productDescription,
    );
  }
}
