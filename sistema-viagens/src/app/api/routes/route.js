import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Listar todas as rotas
export async function GET() {
  try {
    const routes = await prisma.route.findMany({
      include: {
        trips: true
      }
    });
    return NextResponse.json(routes);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar rotas' },
      { status: 500 }
    );
  }
}

// POST - Criar nova rota
export async function POST(request) {
  try {
    const data = await request.json();
    const route = await prisma.route.create({ data });
    return NextResponse.json(route, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar rota' },
      { status: 500 }
    );
  }
}