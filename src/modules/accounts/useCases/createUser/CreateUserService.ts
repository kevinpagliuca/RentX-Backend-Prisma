import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';

interface IRequest {
  name: string;
  username: string;
  email: string;
  driver_license: string;
  password: string;
}

class CreateUserService {
  async execute({ username, driver_license, name, email, password }: IRequest) {
    const userExists = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new AppError('User already exists', 400);
    }

    const hashPassword = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        driver_license,
        email,
        name,
        username,
        password: hashPassword,
      },
      select: {
        id: true,
        is_admin: true,
        driver_license: true,
        email: true,
        name: true,
        created_at: true,
        username: true,
      },
    });

    const token = sign({}, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '30d',
    });

    if (!user.is_admin) delete user.is_admin;

    return { token, user };
  }
}

export default new CreateUserService();
