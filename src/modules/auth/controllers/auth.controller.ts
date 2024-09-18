import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CredentialsDto, RefreshTokenDto } from 'src/validators/auth.dto';
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
}
