import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, BeforeInsert} from "typeorm";
import {User} from './User'

@Entity()
export class Event {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    created: string;

    @OneToOne(type => User, user => user.id)
    creator: User;

    @OneToMany(type => User, user => user.id)
    participants: User[];


    @BeforeInsert()
    validate() {
        console.log('Validation failed: Reason - User has no rights');
        if (!this.creator.isAdmin) {
            throw new Error(`User with id ${this.creator.id} doesn't have permission to create Events`);
        }


    }
}

