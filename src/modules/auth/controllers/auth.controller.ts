import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  CredentialsDto,
  ForgotPasswordDto,
  RefreshTokenDto,
  ResetPasswordDto,
  VerifyCodeDto,
} from 'src/validators/auth.dto';
import { AuthService } from '../services/auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  signIn(@Body() credentials: CredentialsDto) {
    return this.authService.signIn(credentials.username, credentials.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refreshToken(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/forgot-password')
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body.email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/verify-code')
  verifyCode(@Body() body: VerifyCodeDto) {
    return this.authService.verifyCode(body.email, body.code);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/reset-password')
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.changePassword(
      body.email,
      body.password,
      body.code,
    );
  }
}
