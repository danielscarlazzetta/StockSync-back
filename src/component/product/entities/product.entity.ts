import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

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
    
    @CreateDateColumn({ type: 'timestamp' })
    dateCreateProduct: Date;
}
