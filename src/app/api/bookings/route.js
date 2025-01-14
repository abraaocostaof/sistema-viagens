import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Dados recebidos:', data);

    // Validar dados necessários
    if (!data.tripId || !data.seatNumber) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    // Verificar se o assento já está ocupado
    const existingBooking = await prisma.booking.findFirst({
      where: {
        tripId: data.tripId,
        seatNumber: data.seatNumber,
        status: {
          not: 'cancelled'
        }
      }
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: 'Assento já ocupado' },
        { status: 400 }
      );
    }

    // Criar a reserva
    const booking = await prisma.booking.create({
      data: {
        tripId: data.tripId,
        userId: 1, // Temporariamente fixo até implementarmos autenticação
        seatNumber: data.seatNumber,
        totalPrice: data.totalPrice,
        status: 'pending',
        paymentStatus: 'pending'
      },
      include: {
        trip: {
          include: {
            route: true
          }
        }
      }
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    return NextResponse.json(
      { error: 'Erro ao criar reserva' },
      { status: 500 }
    );
  }
}