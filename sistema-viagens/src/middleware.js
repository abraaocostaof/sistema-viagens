import { NextResponse } from 'next/server';

// Lista de rotas públicas que não precisam de autenticação
const publicRoutes = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/trips',
  '/api/routes',
  '/api/bookings',
  '/api/payment/process'
];

export function middleware(request) {
  // Se for uma rota pública, permite o acesso
  if (publicRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Para outras rotas, verifica autenticação
  const token = request.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json(
      { error: 'Token não fornecido' },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};