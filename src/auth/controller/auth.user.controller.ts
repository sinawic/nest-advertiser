import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../dto';
import { UserAuthService } from '../service';

@Controller('user/')
export class UserAuthController {
  constructor(private authService: UserAuthService) { }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    console.log('loginUserDto', loginUserDto)
    return this.authService.validateUserLogin(loginUserDto)
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto)
  }

}
