import { IsNotEmpty, MaxLength } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,  UpdateDateColumn } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Tema } from 'src/tema/entities/tema.entity';
import { ApiProperty } from '@nestjs/swagger';


@Entity({ name: "tb_postagens" })
export class Postagem {

       @ApiProperty()
       @PrimaryGeneratedColumn()
       id: number;

       @IsNotEmpty()
       @MaxLength(100)
       @Column({ length: 100, nullable: false })
       @ApiProperty()
       titulo: string;

       @MaxLength(2000)
       @Column({ length: 2000, nullable: false })
       @ApiProperty()
       midia_url: string;

       @IsNotEmpty()
       @MaxLength(3000)
       @Column({ length: 3000, nullable: false })
       @ApiProperty()
       texto: string;

       @UpdateDateColumn()
       @ApiProperty()
       data: Date;

       @ApiProperty({ type: () => Usuario })
       @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
              onDelete: "CASCADE"
       })
       usuario: Usuario;

       @ApiProperty({ type: () => Tema })
       @ManyToOne(() => Tema, (tema) => tema.postagem, {
              onDelete: "CASCADE"
       })
       tema: Tema;

}
