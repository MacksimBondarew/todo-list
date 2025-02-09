import { Module } from '@nestjs/common';
import { taskController } from './pomodoro.controller';
import { PrismaService } from 'src/prisma.service';
import { PomodoroService } from './pomodoro.service';

@Module({
    controllers: [taskController],
    providers: [PomodoroService, PrismaService],
    exports: [PomodoroService],
})
export class PomodoroModule {}
