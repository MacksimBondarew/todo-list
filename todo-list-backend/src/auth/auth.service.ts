import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { verify } from 'argon2';
import { Response } from 'express';

@Injectable()
export class AuthService {
    REFRESH_TOKEN_NAME = 'refreshToken';
    EXPIRE_DAY_REFRESH_TOKEN = 1;
    constructor(
        private jwt: JwtService,
        private userService: UserService,
    ) {}
    async login(dto: AuthDto) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...user } = await this.validateUser(dto);
        const tokens = this.issueTokens(user.id);
        return {
            user,
            ...tokens,
        };
    }
    async register(dto: AuthDto) {
        const oldUser = await this.userService.getByEmail(dto.email);
        if (oldUser) throw new Error('User already exists');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...user } = await this.userService.create(dto);
        const tokens = this.issueTokens(user.id);
        return {
            user,
            ...tokens,
        };
    }
    private issueTokens(userId: string) {
        const data = { id: userId };
        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h',
        });
        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d',
        });
        return { refreshToken, accessToken };
    }
    private async validateUser(dto: AuthDto) {
        const user = await this.userService.getByEmail(dto.email);
        if (!user) {
            throw new Error('User not found');
        }
        const isValid = await verify(user.password, dto.password);
        if (!isValid) throw new Error('Invalid password');
        return user;
    }
    addRefreshToken(res: Response, refreshToken: string) {
        const expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);
        res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
            domain: 'localhost',
            expires: expiresIn,
            secure: true,
            sameSite: 'none',
        });
    }
    removeRefreshToken(res: Response) {
        res.cookie(this.REFRESH_TOKEN_NAME, '', {
            httpOnly: true,
            domain: 'localhost',
            expires: new Date(0),
            secure: true,
            sameSite: 'none',
        });
    }
    async getNewTokens(refreshToken: string) {
        const result = await this.jwt.verifyAsync<{ id: string }>(refreshToken);
        if (!result) throw new UnauthorizedException('Invalid refresh token');

        const { ...user } = await this.userService.getById(result.id);

        const tokens = this.issueTokens(user.id);
        return {
            user,
            ...tokens,
        };
    }
}
