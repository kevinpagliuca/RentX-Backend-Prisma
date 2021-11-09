import dayjs from 'dayjs';

import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';

interface IRequest {
  car_id: string;
  user_id: string;
  start_date: Date;
  expected_return_date: Date;
}

class CreateRentalService {
  async execute({
    car_id,
    user_id,
    start_date,
    expected_return_date,
  }: IRequest) {
    const carRental = await prismaClient.rental.findFirst({
      where: {
        car_id,
      },
      include: {
        car: true,
      },
    });

    const carEndDate =
      carRental?.end_date &&
      dayjs(carRental?.end_date).add(1, 'days').format('DD/MM/YYYY');
    const carExpectedReturnDate =
      carRental?.expected_return_date &&
      dayjs(carRental?.expected_return_date)
        .add(1, 'days')
        .format('DD/MM/YYYY');

    if (carRental) {
      throw new AppError(
        `This car is already rented, it may be available again on ${
          carEndDate || carExpectedReturnDate
        }`,
        401
      );
    }

    const carInfos = await prismaClient.car.findFirst({
      where: {
        id: car_id,
      },
    });

    const diff = expected_return_date.getTime() - start_date.getTime();
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const total = Number(carInfos.daily_rate) * (diffDays + 1);

    const rental = await prismaClient.rental.create({
      data: {
        start_date,
        expected_return_date,
        car_id,
        user_id,
        total,
      },
    });

    await prismaClient.car.update({
      where: {
        id: car_id,
      },
      data: {
        available: false,
      },
    });

    return rental;
  }
}

export default new CreateRentalService();
