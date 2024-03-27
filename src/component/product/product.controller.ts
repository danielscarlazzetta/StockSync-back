import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //! CREATE
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  //! FIND ALL
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  //! FIND BY ID
  @Get(':id')
  findByOneID(@Param('id') id: string) {
    return this.productService.findOneById(id);
  }

  @Get('nameProduct/:id')
  findByOneName(@Param('nameProduct') nameProduct: string) {
    return this.productService.findOneByName(nameProduct);
  }

  //! UPDATE
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  //! REMOVE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
