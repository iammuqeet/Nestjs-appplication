import { Body, Controller, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

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
}
