import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './modules/shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './enviroments.validator';
import { EnterprisesModule } from './modules/enterprises/enterprises.module';
import { AuthModule } from './modules/auth/auth.module';
import { CagesModule } from './modules/cages/cages.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CountersModule } from './modules/counters/counters.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
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
    EnterprisesModule,
    AuthModule,
    CagesModule,
    CategoriesModule,
    CountersModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
