import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersStrongService } from './users.strongservice';
import { UsersYakuService } from './users.yakuservice';


@Module({
  controllers: [UsersController],
  providers: [UsersYakuService, UsersStrongService]
})
export class UsersModule {}
