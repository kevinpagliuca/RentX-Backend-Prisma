import { hash } from 'bcryptjs';

import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

async function main() {
  const password = await hash('123456', 8);

  await prismaClient.user.create({
    data: {
      name: 'Admin',
      driver_license: '12345',
      email: 'admin@rentx.com',
      password,
      username: 'rentxadmin',
      is_admin: true,
    },
  });

  await prismaClient.user.create({
    data: {
      name: 'Kevin Pagliuca',
      driver_license: '123456789',
      email: 'kevin.pagliuca@outlook.com',
      password,
      username: 'kevinpagliuca',
    },
  });

  await prismaClient.user.create({
    data: {
      name: 'Erick Freitas',
      driver_license: '123456789',
      email: 'erick@rentx.com',
      password,
      username: 'ericl',
    },
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prismaClient.$disconnect();
  });
