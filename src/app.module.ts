import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Authentication, Notes } from './entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'jwt',
			password: 'root',
			database: 'postgres',
			entities: [Authentication, Notes],
			synchronize: true,
		}),
		TypeOrmModule.forFeature([Authentication, Notes]),
		JwtModule.register({
			secret: 'secretKey',
			signOptions: { expiresIn: '6hr' },
		}),
	],
	controllers: [AppController],
	providers: [AppService, JwtService],
})
export class AppModule {}
