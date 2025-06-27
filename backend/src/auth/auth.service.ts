import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import {Client} from 'node-mailjet';
import { randomInt } from 'crypto';

const mailjet = new Client({
  apiKey: '8a530fe4e938bca137233a8465f8f537',
  apiSecret: '644f56d14fbe4cd4fd11a2e861c4146a'
});
const SENDER_EMAIL = 'weareking0202@gmail.com';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string): Promise<any> {
    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    if(email.includes('@yopmail.com')){
      throw new ConflictException('Yopmail is not valid');
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = randomInt(100000, 999999).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create new user
    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      otp,
      otpExpires,
      isVerified: false,
    });

    // Save user to database
    await this.usersRepository.save(user);

    // Send OTP email
    await mailjet
      .post("send", { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: { Email: SENDER_EMAIL, Name: 'OTP Verification' },
            To: [{ Email: email }],
            Subject: 'Your OTP Code',
            TextPart: `Your OTP code is: ${otp}`,
            HTMLPart: `<h3>Your OTP code is: <b>${otp}</b></h3>`
          },
        ],
      });

    return { message: 'Signup successful, please verify OTP sent to your email.' };
  }

  async login(email: string, password: string): Promise<any> {
    // Find user by email
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!user.isVerified) {
      throw new UnauthorizedException('Please verify your email with the OTP before logging in.');
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  async validateUser(payload: any): Promise<any> {
    return await this.usersRepository.findOne({ where: { id: payload.sub } });
  }

  async verifyOtp(email: string, otp: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.isVerified) {
      return { message: 'User already verified.' };
    }
    if (!user.otp || !user.otpExpires || user.otp !== otp) {
      throw new UnauthorizedException('Invalid OTP');
    }
    if (user.otpExpires < new Date()) {
      throw new UnauthorizedException('OTP expired');
    }
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await this.usersRepository.save(user);
    return { message: 'OTP verified successfully. You can now log in.' };
  }
}