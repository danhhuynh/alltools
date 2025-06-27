import { Controller, Post, Get, Body, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupData: { email: string; password: string }) {
    return this.authService.signup(signupData.email, signupData.password);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginData: { email: string; password: string }) {
    return this.authService.login(loginData.email, loginData.password);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() verifyData: { email: string; otp: string }) {
    return this.authService.verifyOtp(verifyData.email, verifyData.otp);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return { user: req.user };
  }
}
