import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class PomodoroSeccionDto {
    @IsOptional()
    @IsBoolean()
    isCompleted: boolean
}

export class PomodoroRoundDto {
    @IsNumber()
    totalSeconds: number

    @IsOptional()
    @IsBoolean()
    isCompleted: boolean
}