"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CreditCard,
  QrCode,
  Receipt,
  User,
  Calendar,
  Clock,
  MapPin,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';

// Inicializando o Mercado Pago
initMercadoPago('TEST-ee02e40c-a9b4-489e-a0ce-0c153d73e2ce');

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [pixData, setPixData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    document: '',
    qrCode: null,
    qrCodeBase64: null
  });
  const [boletoData, setBoletoData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    document: '',
    boletoUrl: null,
    barCode: null
  });

  const initialization = {
    amount: 99.90,
    payer: {
      email: "test@test.com",
    },
  };

  const onSubmit = async (data) => {
    console.log('Dados recebidos em onSubmit:', JSON.stringify(data, null, 2));
    try {
      let paymentMethodId, formData;
      
      if (typeof data === 'object') {
        console.log('Chaves do objeto data:', Object.keys(data));
        if (data.token) {
          paymentMethodId = data.token;
          formData = data;
        } else if (data.id) {
          paymentMethodId = data.id;
          formData = data;
        } else {
          throw new Error('Formato de dados de pagamento não reconhecido');
        }
      } else {
        throw new Error(`Tipo de dados inesperado: ${typeof data}`);
      }

      console.log('Dados do pagamento:', { paymentMethodId, formData });

      const response = await fetch('https://d4dd-190-89-121-180.ngrok-free.app/api/payment/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId,
          formData,
          amount: 99.90,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Falha na resposta do servidor: ${response.status} ${errorText}`);
      }

      const result = await response.json();

      if (result.status === 'approved') {
        window.location.href = `/confirmation?paymentId=${result.id}`;
      } else {
        alert(`Pagamento não aprovado. Status: ${result.status}`);
      }
    } catch (error) {
      console.error('Erro no pagamento:', error);
      alert(`Erro ao processar pagamento: ${error.message}. Por favor, verifique os dados e tente novamente.`);
    }
  };

  const onError = async (error) => {
    console.error('Erro no formulário:', error);
  };

  const handlePixPayment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/payment/pix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...pixData,
          amount: 99.90
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar PIX');
      }

      const data = await response.json();
      setPixData(prev => ({ ...prev, ...data }));
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao gerar PIX. Tente novamente.');
    }
  };

  const handleBoletoPayment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/payment/boleto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...boletoData,
          amount: 99.90
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar boleto');
      }

      const data = await response.json();
      setBoletoData(prev => ({ ...prev, ...data }));
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao gerar boleto. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header com progresso */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <span>Seleção de Assento</span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-blue-600 font-medium">Pagamento</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Resumo da Compra */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Resumo da Compra</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Detalhes da Viagem */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={20} className="text-blue-600" />
                    <div>
                      <p className="font-medium">São Paulo → Rio de Janeiro</p>
                      <p className="text-sm">Via Dutra</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={20} className="text-blue-600" />
                    <p>15 de Janeiro de 2025</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={20} className="text-blue-600" />
                    <p>Saída: 08:00 - Chegada: 14:00</p>
                  </div>
                </div>

                {/* Dados do Passageiro */}
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <User size={20} className="text-blue-600" />
                    <p className="font-medium">Dados do Passageiro</p>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>João da Silva</p>
                    <p>CPF: 123.456.789-00</p>
                    <p>Assento: 15A</p>
                  </div>
                </div>

                {/* Resumo do Preço */}
                <div className="border-t pt-4">
                  <p className="font-medium mb-2">Resumo do preço</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Passagem</span>
                      <span>R$ 89,90</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Taxa de serviço</span>
                      <span>R$ 10,00</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t">
                      <span>Total</span>
                      <span>R$ 99,90</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Segurança */}
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <div className="flex gap-2">
                <Shield className="text-green-600" size={24} />
                <div>
                  <p className="font-medium text-green-800">Pagamento Seguro</p>
                  <p className="text-sm text-green-600">Seus dados estão protegidos e a transação é segura</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pagamento */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Forma de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="credit" onValueChange={setPaymentMethod}>
                  <TabsList className="grid grid-cols-3 mb-8">
                    <TabsTrigger value="credit" className="flex items-center gap-2">
                      <CreditCard size={20} />
                      Cartão de Crédito
                    </TabsTrigger>
                    <TabsTrigger value="pix" className="flex items-center gap-2">
                      <QrCode size={20} />
                      PIX
                    </TabsTrigger>
                    <TabsTrigger value="boleto" className="flex items-center gap-2">
                      <Receipt size={20} />
                      Boleto
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="credit">
                    <div className="w-full">
                      <CardPayment
                        initialization={initialization}
                        onSubmit={onSubmit}
                        onError={onError}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="pix">
                    <div className="text-center p-8">
                      {!pixData.qrCode ? (
                        <form onSubmit={handlePixPayment} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Nome</label>
                            <input
                              type="text"
                              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                              value={pixData.firstName}
                              onChange={(e) => setPixData({...pixData, firstName: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Sobrenome</label>
                            <input
                              type="text"
                              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                              value={pixData.lastName}
                              onChange={(e) => setPixData({...pixData, lastName: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">E-mail</label>
                            <input
                              type="email"
                              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                              value={pixData.email}
                              onChange={(e) => setPixData({...pixData, email: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">CPF</label>
                            <input
                              type="text"
                              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                              value={pixData.document}
                              onChange={(e) => setPixData({...pixData, document: e.target.value})}
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            Gerar PIX
                          </Button>
                        </form>
                      ) : (
                        <div>
                          <img
                            src={`data:image/png;base64,${pixData.qrCodeBase64}`}
                            alt="QR Code PIX"
                            className="mx-auto mb-4"
                          />
                          <p className="text-sm text-gray-600 mb-4">
                            Escaneie o QR Code acima ou copie o código abaixo
                          </p>
                          <div className="bg-gray-50 p-4 rounded-lg mb-6">
                            <p className="font-mono text-sm break-all">{pixData.qrCode}</p>
                          </div>
                          <Button
                            onClick={() => navigator.clipboard.writeText(pixData.qrCode)}
                            className="w-full"
                          >
                            Copiar Código PIX
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="boleto">
                    <div className="text-center p-8">
                      {!boletoData.boletoUrl ? (
                        <form onSubmit={handleBoletoPayment} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Nome</label>
                            <input
                              type="text"
                              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                              value={boletoData.firstName}
                              onChange={(e) => setBoletoData({...boletoData, firstName: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Sobrenome</label>
                            <input
                              type="text"
                              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                              value={boletoData.lastName}
                              onChange={(e) => setBoletoData({...boletoData, lastName: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">E-mail</label>
                            <input
                              type="email"
                              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                              value={boletoData.email}
                              onChange={(e) => setBoletoData({...boletoData, email: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">CPF</label>
                            <input
                              type="text"
                              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                              value={boletoData.document}
                              onChange={(e) => setBoletoData({...boletoData, document: e.target.value})}
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            Gerar Boleto
                          </Button>
                        </form>
                      ) : (
                        <div>
                          <Receipt size={64} className="mx-auto mb-4 text-gray-400" />
                          <h3 className="font-semibold mb-2">Boleto Gerado!</h3>
                          <p className="text-sm text-gray-600 mb-6">
                            Seu boleto foi gerado com sucesso. Clique no botão abaixo para visualizar.
                          </p>
                          <div className="space-y-4">
                            <Button
                              onClick={() => window.open(boletoData.boletoUrl, '_blank')}
                              className="w-full"
                            >
                              Visualizar Boleto
                            </Button>
                            <div className="bg-gray-50 p-4 rounded-lg mt-4">
                              <p className="font-mono text-sm break-all">{boletoData.barCode}</p>
                            </div>
                            <Button
                              onClick={() => navigator.clipboard.writeText(boletoData.barCode)}
                              className="w-full mt-4"
                            >
                              Copiar Código de Barras
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;