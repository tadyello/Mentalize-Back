import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tema } from "../entities/tema.entity";

@Injectable()
export class TemaService {

    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>
    ) { }

    async findAll(): Promise<Tema[]> {
        return await this.temaRepository.find({
            relations: {
                postagem: true
            }

        })
    }

    async findById(id: number): Promise<Tema> {

        let tema = await this.temaRepository.findOne({
            where: {
                id
            },
            relations: {
                postagem: true
            }

        })

        if (!tema)
            throw new HttpException('Tema não existe!', HttpStatus.NOT_FOUND)

        return tema
    }

    async findByNome(nome: string): Promise<Tema[]> {
        return await this.temaRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations: {
                postagem: true
            }
        })
    }
    async findByAbordagem(abordagem: string): Promise<Tema[]> {
        return await this.temaRepository.find({
            where: {
                abordagem: ILike(`%${abordagem}%`)
            },
            relations: {
                postagem: true
            }
        })
    }    

    async create(tema: Tema): Promise<Tema> {
        return await this.temaRepository.save(tema)
    }

    async update(tema: Tema): Promise<Tema> {
        let buscarTema = await this.findById(tema.id)

        if (!buscarTema || !buscarTema.id)
            throw new HttpException('Tema não existe!', HttpStatus.NOT_FOUND)

        return await this.temaRepository.save(tema)
    }


    async delete(id: number): Promise<DeleteResult> {
        let buscarTema = await this.findById(id)

        if (!buscarTema)
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND)

        return await this.temaRepository.delete(id)
    }

}