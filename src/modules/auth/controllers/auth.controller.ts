import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  CredentialsDto,
  ForgotPasswordDto,
  RefreshTokenDto,
  ResetPasswordDto,
  VerifyCodeDto,
} from 'src/validators/auth.dto';
import { AuthService } from '../services/auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  signIn(@Body() credentials: CredentialsDto) {
    return this.authService.signIn(credentials.username, credentials.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/refresh')
  @ApiOperation({ summary: 'Refresh token' })
  refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refreshToken(body);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send email to reset password' })
  @Post('/forgot-password')
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body.email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/verify-code')
  @ApiOperation({ summary: 'Verify rest code' })
  verifyCode(@Body() body: VerifyCodeDto) {
    return this.authService.verifyCode(body.email, body.code);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/reset-password')
  @ApiOperation({ summary: 'Reset password' })
  resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.changePassword(
      body.email,
      body.password,
      body.code,
    );
  }
}
