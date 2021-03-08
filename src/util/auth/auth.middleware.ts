import { FastifyReply, FastifyRequest } from 'fastify';
import { JwtService } from '@nestjs/jwt';
import { UserAttributes } from 'src/interfaces/users.interface';
import { User } from 'src/models/users.model';
import HttpException from '../exceptions/exceptions';
import { LoginUserDto } from 'src/users/dto/users.dto';

var jwt = new JwtService({ secret: process.env.JWT_SECRET });

export const createToken = (userData: UserAttributes) => {
  delete userData.password;
  const expiresIn: number = 60 * 60;
  const accessToken = jwt.sign(userData, {
    expiresIn: expiresIn,
  });

  return accessToken;
};

// create cookie function
export const createCookie = (tokenData, res: FastifyReply) => {
  let now = new Date();
  res.setCookie('accessToken', tokenData, {
    path: '/',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 60 * 60,
  });
};

export const authHandler = async (req: FastifyRequest) => {
  try {
    const cookies = req.cookies; // request user의 cookie
    // cookie 인증
    if (cookies.accessToken) {
      const verificationResponse = jwt.verify(cookies.accessToken);
      const userEmail = verificationResponse.email;

      const findUser: UserAttributes = await User.findOne({
        where: { email: userEmail },
      });

      if (findUser) {
        return findUser;
      } else {
        throw new HttpException(401, 'Wrong authentication token');
      }
    } else {
      throw new HttpException(404, 'Authentication token missing');
    }
  } catch (error) {
    throw new HttpException(401, 'Wrong authentication token');
  }
};
