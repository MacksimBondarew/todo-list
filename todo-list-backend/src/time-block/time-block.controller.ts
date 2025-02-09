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
import { TimeBlockService } from './time-block.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { TimeBlockDto } from './dto/time-block.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('user/time-blocks')
export class TimeBlockController {
    constructor(private readonly timeBlockService: TimeBlockService) {}
    @Get()
    @Auth()
    async getAll(@CurrentUser('id') userId: string) {
        return this.timeBlockService.getAll(userId);
    }
    @Post()
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Auth()
    async create(@CurrentUser('id') userId: string, @Body() dto: TimeBlockDto) {
        return this.timeBlockService.create(dto, userId);
    }
    @Put('update-order')
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Auth()
    async updateOrder(@Body() dto: UpdateOrderDto) {
        return this.timeBlockService.updateOrder(dto.ids);
    }
    @Put(':id')
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Auth()
    async update(
        @CurrentUser('id') userId: string,
        @Body() dto: TimeBlockDto,
        @Param('id') id: string,
    ) {
        return this.timeBlockService.update(dto, userId, id);
    }
    @Delete(':id')
    @HttpCode(200)
    @Auth()
    async delete(@Param('id') id: string, @CurrentUser('id') userId: string) {
        return this.timeBlockService.delete(id, userId);
    }
}
