import {
    Controller,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task/')
export class taskController {
    constructor(private readonly taskService: TaskService) {}

}
