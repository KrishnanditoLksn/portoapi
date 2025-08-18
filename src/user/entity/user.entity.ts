import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 255 })
    username: string

    @Column({ type: 'varchar', length: 255 })
    password: string

    @Column({ type: 'varchar', length: 255 })
    email: string

    // @Column({type:'varchar' , length:255})
    // sessionId:string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}