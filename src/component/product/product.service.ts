import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { format } from 'date-fns';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

//! CREATE
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const newProduct = this.mapCreateProductDtoToProductEntity(createProductDto);
      return await this.productRepository.save(newProduct);

    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Algo ha ocurrido');
    }
  }

  private mapCreateProductDtoToProductEntity(createProductDto: CreateProductDto): Product {
    const newProduct = new Product();
    newProduct.nameProduct = createProductDto.nameProduct;
    newProduct.descriptionProduct = createProductDto.descriptionProduct;
    newProduct.priceBuyProdcut = createProductDto.priceBuyProdcut;
    newProduct.priceSellProduct = createProductDto.priceSellProduct;
    newProduct.amountProduct = createProductDto.amountProduct;
    newProduct.dateCreateProduct = format(new Date(), 'dd/MM/yyyy');
    return newProduct;
  }

  private formatDate(date: Date): string {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

  //! FIND ALL
  async findAll(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar producto');
    }
  }

  //! FIND ONE ID
  async findOneById(id: string): Promise<Product> {
    try {
      const user = await this.productRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('Producto no encontrado');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar usuario por ID');
    }
  }

  async findOneByName(nameProduct: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({ where: { nameProduct } });
      if (!product) {
        throw new NotFoundException('Producto no encontrado');
      }
      return product;
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar usuario por nameProduct');
    }
  }

  //! UPDATE
  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  //! REMOVE
  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
