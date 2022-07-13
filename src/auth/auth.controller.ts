import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto';
import { AuthService } from './auth.service';

@Controller('supporter/login')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post()
  post(@Body() createUserDto: CreateUserDto) {
    return this.authService.validateLogin(createUserDto)
  }

}
