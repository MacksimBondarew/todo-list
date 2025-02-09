import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PomodoroRoundDto } from './pomodoro.dto';

@Injectable()
export class PomodoroService {
    constructor(private prisma: PrismaService) {}
    async getTotaySession(userId: string) {
        const today = new Date().toISOString().split('T')[0];
        return this.prisma.pomodoroSession.findFirst({
            where: {
                createdAt: {
                    gte: new Date(today),
                },
                userId,
            },
            include: {
                rounds: {
                    orderBy: {
                        id: 'asc',
                    },
                },
            },
        });
    }
    async create(userId: string) {
        const todaySessions = await this.getTotaySession(userId);
        if (todaySessions) {
            return todaySessions;
        }
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                intervalsCount: true,
            },
        });
        if (!user) {
            throw new NotFoundException('user not found');
        }
        const intervalsCount = user.intervalsCount ?? 7;

        return this.prisma.pomodoroSession.create({
            data: {
                rounds: {
                    createMany: {
                        data: Array.from({ length: intervalsCount }, () => ({
                            totalSeconds: 0,
                        })),
                    },
                },
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
            include: {
                rounds: true,
            },
        });
    }
    async update(
        userId: string,
        pomodoroId: string,
        dto: Partial<PomodoroRoundDto>,
    ) {
        return this.prisma.pomodoroSession.update({
            where: {
                userId,
                id: pomodoroId,
            },
            data: dto,
        });
    }
    async updateRound(dto: Partial<PomodoroRoundDto>, roundId: string) {
        return this.prisma.pomodoroRound.update({
            where: {
                id: roundId,
            },
            data: dto,
        });
    }
    async deleteSession(sessionId: string, userId: string) {
        return this.prisma.pomodoroSession.delete({
            where: {
                id: sessionId,
                userId,
            },
        });
    }
}
