import { Body, Controller, Get, HttpCode, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserDto } from './user.dto';

@Controller('user/profile')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @Auth()
  async profile(@CurrentUser('id') id: string) {
    return await this.userService.getProfile(id);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth()
  async update(@CurrentUser('id') id: string, @Body() dto: UserDto) {
    return await this.userService.update(id, dto);
  }
}
