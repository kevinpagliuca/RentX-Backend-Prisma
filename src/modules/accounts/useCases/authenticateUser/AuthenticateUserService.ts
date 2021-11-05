import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { User } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Omit<User, 'password'>;
  token: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('Email or password incorrect', 401);
    }
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect', 401);
    }

    delete user.password;

    const token = sign({}, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '1d',
    });

    if (!user.is_admin) {
      delete user.is_admin;
    }

    const tokenReturn: IResponse = {
      token,
      user,
    };
    return tokenReturn;
  }
}

export default new AuthenticateUserService();
