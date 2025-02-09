import { Module } from '@nestjs/common';
import { taskController } from './task.controller';
import { PrismaService } from 'src/prisma.service';
import { TaskService } from './task.service';

@Module({
    controllers: [taskController],
    providers: [TaskService, PrismaService],
    exports: [TaskService],
})
export class taskModule {}
