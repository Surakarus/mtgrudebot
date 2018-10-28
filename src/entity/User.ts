import {Entity, Column, PrimaryColumn, BaseEntity} from "typeorm";

@Entity()
export class User extends BaseEntity{

    @PrimaryColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    username: string;

    @Column({default: false})
    isAdmin: boolean;

}
