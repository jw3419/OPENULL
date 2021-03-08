import 'dotenv/config';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { AdminsModule } from './admin/admin.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    OrdersModule,
    AdminsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
