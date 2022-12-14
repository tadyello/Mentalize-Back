import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Olá Mundo!';
  }
  getProjeto(): string {
    return 'Mentalize';
  }
  getCidade(): string {
    return 'Rio de Janeiro';
  }
}
