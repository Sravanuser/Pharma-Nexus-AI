import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt"
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) { }

    async register(userData: RegisterDto) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: userData.email
            }
        })
        if (user) {
            throw new BadRequestException("User already exists");
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10)
        await this.prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword
            }
        })
        return "User Registered Successfully"
    }

    async login(userData: LoginDto) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: userData.email
            }
        })
        if (!user) {
            throw new BadRequestException("User does not exist");
        }
        const isMatch = await bcrypt.compare(userData.password, user.password)
        if (!isMatch) {
            throw new BadRequestException("Password does not match");
        }
        const payload = {
            sub: user.id,
            email: user.email,
        };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
}
