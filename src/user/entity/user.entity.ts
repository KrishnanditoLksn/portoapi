import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:Number

    @Column({type:'varchar' , length:255})
    username:string

    @Column({type:'varchar' , length:255})
    password:string

    @Column({type:'varchar' , length:255})
    email:string

    @Column({type:'varchar' , length:255})
    sessionId:string
}