import { Module } from '@nestjs/common';
import { LevelAdminController, LevelController } from './controllers';
import { LevelService } from './level.service';

import { MongooseModule } from '@nestjs/mongoose';

import { Level, LevelSchema } from './schemas';
import { BasicStrategy } from '../auth/Strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Level.name, schema: LevelSchema }])],
  controllers: [LevelAdminController, LevelController],
  providers: [LevelService, BasicStrategy]
})
export class LevelModule { }
