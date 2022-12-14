import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common/decorators";
import { HttpStatus } from "@nestjs/common/enums";
import { ParseIntPipe } from "@nestjs/common/pipes";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "../service/usuario.service";

@ApiTags('Usuario')
@UseGuards(JwtAuthGuard)
@Controller('/usuarios')
@ApiBearerAuth()
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }
   
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
        return this.usuarioService.findById(id)
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome') nome: string): Promise<Usuario[]> {
        return this.usuarioService.findByNome(nome)
    }

    @Get('/email/:email')
    @HttpCode(HttpStatus.OK)
    findByUsuario(@Param('email') usuario: string): Promise<Usuario[]> {
        return this.usuarioService.findByEmail(usuario)
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/cadastrar')
    async create(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.create(usuario);
    }
 
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Put('/atualizar')
    async update(@Body() usuario: Usuario): Promise<Usuario> {
        return this.usuarioService.update(usuario)
    }


}