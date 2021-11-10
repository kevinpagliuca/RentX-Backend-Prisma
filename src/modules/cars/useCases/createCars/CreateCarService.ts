import { Car } from '@prisma/client';
import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  seats: number;
  max_velocity: number;
  fuel_type: 'Gasolina' | 'Alcool' | 'Híbrido' | 'Flex' | 'Elétrico';
  transmission_type: 'Manual' | 'Automático';
  horse_power: number;
  category_id: string;
  id?: string;
}

class CreateCarService {
  async execute({
    name,
    brand,
    description,
    daily_rate,
    fine_amount,
    license_plate,
    category_id,
    fuel_type,
    horse_power,
    max_velocity,
    seats,
    transmission_type,
  }: IRequest): Promise<Car> {
    const carExists = await prismaClient.car.findFirst({
      where: { license_plate },
    });

    if (carExists) {
      throw new AppError('Car already exists!', 400);
    }

    const car = await prismaClient.car.create({
      data: {
        name,
        brand,
        description,
        daily_rate,
        fine_amount,
        license_plate,
        category_id,
        fuel_type,
        horse_power,
        max_velocity,
        seats,
        transmission_type,
      },
    });

    return car;
  }
}

export default new CreateCarService();
