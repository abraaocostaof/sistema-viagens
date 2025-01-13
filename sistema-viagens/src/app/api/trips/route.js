import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    const date = searchParams.get('date');

    console.log('Parâmetros recebidos:', { origin, destination, date });

    // Primeiro, vamos verificar se existem rotas
    const routes = await prisma.route.findMany();
    console.log('Rotas encontradas:', routes);

    // Agora vamos buscar as viagens
    const trips = await prisma.trip.findMany({
      where: {
        route: {
          origin: {
            contains: origin || ''
          },
          destination: {
            contains: destination || ''
          }
        }
      },
      include: {
        route: true,
        driver: true,
        bookings: true
      }
    });

    console.log('Viagens encontradas:', trips);

    return NextResponse.json(trips);
  } catch (error) {
    console.error('Erro detalhado:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao buscar viagens' },
      { status: 500 }
    );
  }
}