import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';

interface IRequest {
  id: string;
  name: string;
  username: string;
  email: string;
  driver_license: string;
}

class UpdateUserService {
  async execute({ id, name, username, email, driver_license }: IRequest) {
    if (!id) {
      throw new AppError('User ID is required.', 401);
    }

    const userExists = await prismaClient.user.findFirst({
      where: { id },
    });

    if (!userExists) {
      throw new AppError('User not found', 404);
    }

    const emailExists = await prismaClient.user.findFirst({
      where: { email },
    });

    if (emailExists.id !== id) {
      throw new AppError('E-mail already taken', 401);
    }

    const user = await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        email,
        driver_license,
        name,
        username,
      },
    });

    delete user.password;

    if (!user.is_admin) {
      delete user.is_admin;
    }

    return user;
  }
}

export default new UpdateUserService();
