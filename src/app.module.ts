import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DBHOST,
    //   port: Number(process.env.DBPORT),
    //   username: String(process.env.DB_USER),
    //   password: String(process.env.DB_PASS),
    //   database: String(process.env.DB_NAME),
    //   entities: [__dirname + '/../**/*.entity.{js, ts}'],
    //   synchronize: process.env.TYPEORM_SYNC == 'true' ? true : false,
    // }),
    // ProductModule,
    // CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
