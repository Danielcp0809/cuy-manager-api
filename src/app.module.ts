import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './modules/shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './enviroments.validator';
import config from './config/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
