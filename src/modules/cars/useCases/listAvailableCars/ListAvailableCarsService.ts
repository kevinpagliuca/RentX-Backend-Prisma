import { Car } from '@prisma/client';
import { prismaClient } from '@shared/prisma';

interface IResponse {
  cars: Car[];
  totalCount: number;
}

class ListAvailableCarsService {
  async execute(): Promise<IResponse> {
    const totalCount = await prismaClient.car.count();
    const cars = await prismaClient.car.findMany({
      where: {
        available: {
          equals: true,
        },
      },
      select: {
        id: true,
        available: true,
        brand: true,
        daily_rate: true,
        fine_amount: true,
        license_plate: true,
        description: true,
        name: true,
        category: true,
        category_id: true,
        fuel_type: true,
        horse_power: true,
        max_velocity: true,
        seats: true,
        transmission_type: true,
        created_at: true,
      },
    });
    return { totalCount, cars };
  }
}

export default new ListAvailableCarsService();
