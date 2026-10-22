import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TagsModule } from './tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

const ENV = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    UserModule,
    TodoModule,
    PostsModule,
    AuthModule,
    TagsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${ENV}`,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log({
          environment: {
            environment: configService.get('environment.environment'),
          },
          database: {
            DB_TYPE: configService.get('database.type'),
            DB_PORT: configService.get('database.port'),
            DB_USERNAME: configService.get('database.username'),
            DB_PASSWORD: configService.get('database.password'),
            DB_HOST: configService.get('database.host'),
            DB_NAME: configService.get('database.name'),
          },
        });
        return {
          type: configService.get<any>('database.type') || 'postgres',
          // entities: [User, Post, Tag, MetaOption],
          autoLoadEntities: configService.get('database.autoLoadEntities'),
          synchronize:
            configService.get('environment.environment') === 'development',
          port: +configService.get<number>('database.port') || 5432,
          username: configService.get<string>('database.username') || 'root',
          password: configService.get<string>('database.password') || 'root',
          host: configService.get<string>('database.host') || 'localhost',
          database:
            configService.get<string>('database.name') || 'nestjs_intro',
        };
      },
    }),
    MetaOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
