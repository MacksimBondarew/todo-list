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
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { PomodoroService } from './pomodoro.service';
import { PomodoroSeccionDto } from './pomodoro.dto';

@Controller('user/timer')
export class taskController {
    constructor(private readonly pomodoroService: PomodoroService) {}
    @Get('today')
    @Auth()
    async getAll(@CurrentUser('id') userId: string) {
        return this.pomodoroService.getTotaySession(userId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Auth()
    async create(@CurrentUser('id') userId: string) {
        return this.pomodoroService.create(userId);
    }
    @Put(':id')
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Auth()
    async update(
        @CurrentUser('id') userId: string,
        @Body() dto: PomodoroSeccionDto,
        @Param('id') id: string,
    ) {
        return this.pomodoroService.update(userId, id, dto);
    }
    @Put('round/:id')
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Auth()
    async updateRound(
        @Body() dto: PomodoroSeccionDto,
        @Param('id') id: string,
    ) {
        return this.pomodoroService.updateRound(dto, id);
    }
    @Delete(':id')
    @HttpCode(200)
    @Auth()
    async delete(@Param('id') id: string, userId: string) {
        return this.pomodoroService.deleteSession(id, userId);
    }
}
