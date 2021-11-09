import { schedule } from 'node-cron';

import { prismaClient } from '@shared/prisma';

// schedule = 0 seconds, 0 minutes, 0 hours, every days, every-monts, all weekdays [0 0 0 * 1-12 *]
// schedule = [00 00 00 * * *] - todo dia à meia noite

export const verifyCarsStatus = schedule('*/60 * * * * *', async () => {
  const cars = await prismaClient.car.findMany({
    where: {
      available: false,
    },
  });
  const rentals = await prismaClient.rental.findMany({
    include: {
      car: true,
    },
  });
  const today = new Date().getTime();

  console.log(`Rodando cron job. ${new Date(today).toLocaleDateString()}`);

  await Promise.all(
    rentals.map((rental) => {
      const rentalDate = rental?.end_date.getTime();
      if (!rentalDate) return null;

      const diff = today - rentalDate;
      const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

      // Se tiver um end date é porque o carro já foi devolvido.
      if (diffDays >= 1) {
        cars.forEach((car) => {
          if (car.id === rental.car_id) {
            return prismaClient.car.update({
              where: {
                id: car.id,
              },
              data: {
                available: true,
              },
            });
          }
          return car;
        });
      }

      const timeDiff = today - rental.expected_return_date.getTime();
      const diffStart = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      if (diffStart >= 1) {
        let total = rental.total as unknown as number;
        total +=
          Number(rental.car.daily_rate) +
          Number(rental.car.fine_amount) * diffDays;
        return prismaClient.rental.update({
          where: {
            id: rental.id,
          },
          data: {
            total,
          },
        });
      }
      return rental;
    })
  );
});
