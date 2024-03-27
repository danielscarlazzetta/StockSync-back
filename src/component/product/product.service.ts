import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }


  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const newProduct = this.mapCreateProductDtoToProductEntity(createProductDto);
      return await this.productRepository.save(newProduct);

    } catch (error) {
      throw new InternalServerErrorException('Algo ha ocurrido', error);
    }
  }

  private mapCreateProductDtoToProductEntity(createProductDto: CreateProductDto): Product {
    const newProduct = new Product();
    newProduct.nameProduct = createProductDto.nameProduct;
    newProduct.descriptionProduct = createProductDto.descriptionProduct;
    newProduct.priceBuyProdcut = createProductDto.priceBuyProdcut;
    newProduct.priceSellProduct = createProductDto.priceSellProduct;
    newProduct.amountProduct = createProductDto.amountProduct;
    return newProduct;
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
