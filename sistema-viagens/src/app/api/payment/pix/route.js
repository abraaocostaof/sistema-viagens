import { NextResponse } from 'next/server';
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

export async function POST(request) {
  try {
    const data = await request.json();

    const paymentData = {
      transaction_amount: data.amount,
      payment_method_id: 'pix',
      description: 'Passagem de ônibus',
      payer: {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        identification: {
          type: 'CPF',
          number: data.document
        }
      }
    };

    const payment = await mercadopago.payment.create(paymentData);

    return NextResponse.json({
      qrCode: payment.point_of_interaction.transaction_data.qr_code,
      qrCodeBase64: payment.point_of_interaction.transaction_data.qr_code_base64,
      paymentId: payment.id
    });
  } catch (error) {
    console.error('Erro ao gerar PIX:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar PIX' },
      { status: 500 }
    );
  }
}