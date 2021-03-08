import { Body, Controller, Patch, Post, Query, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { VoucherAttributes } from 'src/interfaces/vouchers.interface';
import { AdminsService } from './admin.service';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminService: AdminsService) {}

  @Post('addVoucher')
  createVoucher(@Body() voucherData: VoucherAttributes) {
    return this.adminService.createVoucher(voucherData);
  }

  @Patch('promote')
  updateAdminUser(@Req() req: FastifyRequest) {
    return this.adminService.updateAdminUser(req);
  }

  @Patch('status')
  updateOrderStatus(@Req() req: FastifyRequest, @Query('orderId') orderId: number, @Body() { status }) {
    return this.adminService.updateOrderStatus(req, orderId, status);
  }
}
