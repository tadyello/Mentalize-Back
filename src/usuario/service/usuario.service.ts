import { Injectable } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";


@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) { }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            relations: {
                postagem: true
            }

        })
    }

    async findById(id: number): Promise<Usuario> {
        let usuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
            relations: {
                postagem: true
            }
        })

        if (!usuario)
            throw new HttpException('Usuário não existe!', HttpStatus.NOT_FOUND)

        return usuario
    }
    async findByUsuario(usuario: string): Promise<Usuario | undefined> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            }
        })
    }

    async findByNome(nome: string): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            }
        })
    }
    async findByEmail(usuario: string): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            where: {
                usuario: usuario
            },
            relations: {
                postagem: true
            }

        })
    }

    async create(usuario: Usuario): Promise<Usuario> {
        let buscarUsuario = await this.findByUsuario(usuario.usuario)

        if (!buscarUsuario) {
            usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
            return await this.usuarioRepository.save(usuario)
        }

        throw new HttpException('O Usuario já está cadastrado', HttpStatus.BAD_REQUEST)
    }

    async update(usuario: Usuario): Promise<Usuario> {
        let buscarUsuario = await this.findById(usuario.id)

        if (!buscarUsuario || !usuario.id)
            throw new HttpException('Usuário não existe!', HttpStatus.NOT_FOUND)

        if (buscarUsuario && buscarUsuario.id !== usuario.id)
            throw new HttpException('Usuario Já cadastrado', HttpStatus.BAD_REQUEST)

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario)
    }

}