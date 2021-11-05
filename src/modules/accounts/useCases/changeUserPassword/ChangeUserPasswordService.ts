import { compare, hash } from 'bcryptjs';

import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';

class ChangeUserPasswordService {
  async execute(
    id: string,
    current_password: string,
    new_password: string
  ): Promise<void> {
    const userExists = await prismaClient.user.findFirst({
      where: { id },
    });

    if (!userExists) {
      throw new AppError('User not found', 404);
    }

    const isPasswordValid = await compare(
      current_password,
      userExists.password
    );

    if (!isPasswordValid) {
      throw new AppError('Invalid password', 401);
    }

    const hashedPassword = await hash(new_password, 8);

    await prismaClient.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });
  }
}

export default new ChangeUserPasswordService();
