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
  horse_power?: number;
  category_id: string;
  id?: string;
}

class UpdateCarService {
  async execute({
    id,
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
    if (!id) {
      throw new AppError('Car ID is required.', 401);
    }

    const carExists = await prismaClient.car.findFirst({
      where: { id },
    });

    if (!carExists) {
      throw new AppError('Car not found!', 404);
    }

    const car = await prismaClient.car.update({
      where: {
        id,
      },
      data: {
        name,
        brand,
        description,
        daily_rate: Number(daily_rate),
        fine_amount: Number(fine_amount),
        license_plate,
        category_id,
        fuel_type,
        horse_power,
        max_velocity,
        seats: Number(seats),
        transmission_type,
      },
    });

    return car;
  }
}

export default new UpdateCarService();
