import { Body, Controller, Headers, Post, Req, Res } from '@nestjs/common';
import { UserAttributes } from 'src/interfaces/users.interface';
import { UsersService } from './users.service';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('signup')
  signUp(@Body() userData: UserAttributes) {
    return this.userService.signUp(userData);
  }

  @Post('signin')
  signIn(
    @Body() userData: UserAttributes,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    return this.userService.signIn(userData, res);
  }

  @Post('signout')
  signOut(
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) res: FastifyReply,
  ) {
    return this.userService.signOut(req, res);
  }
}
