import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { Postagem } from "src/postagem/entities/postagem.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";


@Entity({ name: "tb_temas"})
export class Tema{

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @IsNotEmpty()
    @MaxLength(100)
    @Column({ length: 100, nullable: false})
    @ApiProperty()
    nome: string;

    @IsNotEmpty() 
    @MaxLength(100)
    @Column({ length: 100, nullable: false})
    @ApiProperty()
    abordagem: string;

    @ApiProperty({type: () => Postagem})
    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    postagem: Postagem[]
 
} 