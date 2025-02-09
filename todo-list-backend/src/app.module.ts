import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { taskModule } from './task/task.module';
import { TimeBlockModule } from './time-block/time-block.module';
import { PomodoroModule } from './pomodoro/pomodoro.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule, UserModule, taskModule, TimeBlockModule, PomodoroModule],
})
export class AppModule {}
