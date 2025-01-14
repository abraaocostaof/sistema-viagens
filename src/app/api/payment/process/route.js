import { NextResponse } from 'next/server';
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
  notification_url: 'https://d4dd-190-89-121-180.ngrok-free.app/api/payment/notification'
});

export async function POST(request) {
  try {
    const { token, paymentMethodId, installments, amount } = await request.json();
    const payment = await mercadopago.payment.create({
      transaction_amount: Number(amount),
      token: token,
      description: 'Passagem de ônibus',
      installments: Number(installments),
      payment_method_id: paymentMethodId,
      payer: {
        email: "test@test.com"
      },
      notification_url: 'https://d4dd-190-89-121-180.ngrok-free.app/api/payment/notification'
    });
    
    console.log('Pagamento processado:', payment);
    
    return NextResponse.json(payment, {
      headers: {
        'Access-Control-Allow-Origin': '*', // Idealmente, especifique o domínio do Mercado Pago aqui
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Erro ao processar pagamento:', error);
    return NextResponse.json(
      { error: error.message || 'Erro ao processar pagamento' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*', // Idealmente, especifique o domínio do Mercado Pago aqui
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}