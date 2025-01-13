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
      payment_method_id: 'bolbradesco',
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
      boletoUrl: payment.transaction_details.external_resource_url,
      barCode: payment.barcode.content,
      paymentId: payment.id
    });
  } catch (error) {
    console.error('Erro ao gerar boleto:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar boleto' },
      { status: 500 }
    );
  }
}