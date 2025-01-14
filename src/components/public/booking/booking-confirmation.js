"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  QrCode, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone,
  Download,
  Share2,
  ArrowLeft,
  Bus
} from 'lucide-react';
import Link from 'next/link';

const BookingConfirmation = () => {
  const bookingDetails = {
    bookingNumber: 'RSV123456',
    trip: {
      origin: 'São Paulo',
      destination: 'Rio de Janeiro',
      date: '15/01/2025',
      departureTime: '08:00',
      arrivalTime: '14:00',
      seat: '15A',
      company: 'Viação Express'
    },
    passenger: {
      name: 'João da Silva',
      email: 'joao.silva@email.com',
      phone: '(11) 98765-4321',
      document: '123.456.789-00'
    },
    payment: {
      method: 'Cartão de Crédito',
      total: 99.90
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Minha Passagem',
          text: `Reserva ${bookingDetails.bookingNumber} - ${bookingDetails.trip.origin} → ${bookingDetails.trip.destination}`,
          url: window.location.href
        });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header com confirmação */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Reserva Confirmada!</h1>
          <p className="text-gray-600">
            Seu código de reserva é: <span className="font-bold">{bookingDetails.bookingNumber}</span>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          {/* QR Code */}
          <Card className="mb-8">
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                <QrCode size={200} className="mx-auto" />
              </div>
              <p className="text-sm text-gray-600">
                Apresente este QR Code no embarque ou salve seu comprovante
              </p>
              <div className="flex gap-4 justify-center mt-6">
                <Button variant="outline" className="gap-2">
                  <Download size={20} />
                  Baixar Comprovante
                </Button>
                <Button variant="outline" className="gap-2" onClick={handleShare}>
                  <Share2 size={20} />
                  Compartilhar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Detalhes da Viagem */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Detalhes da Viagem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Rota e Horários */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={20} className="text-blue-600" />
                    <div>
                      <p className="font-medium">Origem</p>
                      <p>{bookingDetails.trip.origin}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={20} className="text-blue-600" />
                    <div>
                      <p className="font-medium">Horário de Partida</p>
                      <p>{bookingDetails.trip.departureTime}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={20} className="text-blue-600" />
                    <div>
                      <p className="font-medium">Destino</p>
                      <p>{bookingDetails.trip.destination}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={20} className="text-blue-600" />
                    <div>
                      <p className="font-medium">Horário de Chegada</p>
                      <p>{bookingDetails.trip.arrivalTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mais Detalhes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={20} className="text-blue-600" />
                  <div>
                    <p className="font-medium">Data</p>
                    <p>{bookingDetails.trip.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Bus size={20} className="text-blue-600" />
                  <div>
                    <p className="font-medium">Assento</p>
                    <p>{bookingDetails.trip.seat}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Bus size={20} className="text-blue-600" />
                  <div>
                    <p className="font-medium">Empresa</p>
                    <p>{bookingDetails.trip.company}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dados do Passageiro */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Dados do Passageiro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <User size={20} className="text-blue-600" />
                  <div>
                    <p className="font-medium">Nome</p>
                    <p>{bookingDetails.passenger.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <User size={20} className="text-blue-600" />
                  <div>
                    <p className="font-medium">Documento</p>
                    <p>{bookingDetails.passenger.document}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={20} className="text-blue-600" />
                  <div>
                    <p className="font-medium">E-mail</p>
                    <p>{bookingDetails.passenger.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={20} className="text-blue-600" />
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p>{bookingDetails.passenger.phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instruções */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Instruções Importantes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-600 mt-1" />
                  <div>
                    <p className="font-medium">Chegue com antecedência</p>
                    <p className="text-sm text-gray-600">
                      Recomendamos chegar ao local de embarque com 30 minutos de antecedência
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-600 mt-1" />
                  <div>
                    <p className="font-medium">Documentos necessários</p>
                    <p className="text-sm text-gray-600">
                      Apresente um documento oficial com foto e este comprovante de passagem
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-green-600 mt-1" />
                  <div>
                    <p className="font-medium">Bagagem</p>
                    <p className="text-sm text-gray-600">
                      Você tem direito a uma bagagem de até 23kg no bagageiro e uma bagagem de mão
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex gap-4">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full gap-2">
                <ArrowLeft size={20} />
                Voltar para Home
              </Button>
            </Link>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 gap-2">
              <Download size={20} />
              Baixar Comprovante
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;