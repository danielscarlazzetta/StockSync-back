import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 50 })
    nameProduct: string;

    @Column({ length: 100 })
    descriptionProduct: string;

    @Column({ type: 'bigint', nullable: false })
    priceBuyProdcut: number;

    @Column({ type: 'bigint', nullable: false })
    priceSellProduct: number;

    @Column({ type: 'bigint', nullable: false })
    amountProduct: number;
    
    @Column({ length: 50 })
    dateCreateProduct: string;
}
