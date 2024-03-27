import { IsDateString, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    nameProduct: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    descriptionProduct: string;

    @IsNumber()
    @IsNotEmpty()
    priceBuyProdcut: number;

    @IsNumber()
    @IsNotEmpty()
    priceSellProduct: number;

    @IsNumber()
    @IsNotEmpty()
    amountProduct: number;

    @IsDateString()
    dateCreateProduct?: string;
}
