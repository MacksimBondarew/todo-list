import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { TaskDto } from './task.dto';

@Controller('user/tasks')
export class taskController {
    constructor(private readonly taskService: TaskService) {}
    @Get()
    @Auth()
    async getAll(@CurrentUser('id') userId: string) {
        return this.taskService.getAll(userId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Auth()
    async create(@CurrentUser('id') userId: string, @Body() dto: TaskDto) {
        return this.taskService.create(userId, dto);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Auth()
    async update(
        @CurrentUser('id') userId: string,
        @Body() dto: TaskDto,
        @Param('id') id: string,
    ) {
        return this.taskService.update(userId, id, dto);
    }

    @Delete(':id')
    @HttpCode(200)
    @Auth()
    async delete(@Param('id') id: string,) {
        return this.taskService.delete(id);
    }
}
