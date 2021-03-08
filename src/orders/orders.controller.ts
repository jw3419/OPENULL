import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { OrderAttributes } from 'src/interfaces/orders.interface';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get('findList')
  findAll(@Req() req: FastifyRequest) {
    return this.orderService.findList(req);
  }
  @Post('create')
  create(@Body() orderData, @Req() req: FastifyRequest) {
    return this.orderService.create(orderData, req);
  }
}
