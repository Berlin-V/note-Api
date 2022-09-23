import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, BaseEntity, Repository, EntityRepository }     from 'typeorm';

 @Entity('Authentication')
 export class Authentication extends BaseEntity {

  @PrimaryColumn()
   userId:string;
   
   @Column()
   userMail:string;

   @Column()
   password:string;

 }


@Entity('Notes')
 export class Notes extends BaseEntity {
   @PrimaryGeneratedColumn()
    task:number;

    @Column()
    date:string;
     
    @Column()
    time:string;

    @Column()
   userId:string;

   @Column()
   title:string

   @Column()
   description:string;

   @Column({ default: false })
    deleted:boolean;

 }
