import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { BasicStrategy } from '../auth/Strategy';


@Module({
  controllers: [UserController],
  providers: [UserService, BasicStrategy],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])]
})
export class UsersModule { }
