import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Register {
  
  @PrimaryGeneratedColumn()
  id!: number 

  @Column()
  search!: string
}
