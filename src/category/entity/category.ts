import { IsNotEmpty, minLength } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DateUtils } from "typeorm/util/DateUtils.js";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name_category: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}