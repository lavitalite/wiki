import {Entity, Column, PrimaryGeneratedColumn} from '@nestjs/typeorm'


@Entity()
export class Embed {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  type: string

  @Column()
  aspect: string

  @Column
  src:string

  @Column({nullable: true})
  title?: string

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;
}