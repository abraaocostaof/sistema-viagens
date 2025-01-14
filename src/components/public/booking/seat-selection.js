"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign,
  User,
  Mail,
  Phone,
  AlertCircle,
  ChevronRight,
  Bus,
  CheckCircle
} from 'lucide-react';

const SeatSelection = () => {
  // Layout do ônibus: 4 assentos por fileira (2-2)
  const totalRows = 10;
  const seatsPerRow = 4;
  
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [occupiedSeats] = useState(['1A', '2B', '5C', '7D']);
  const [passengerData, setPassengerData] = useState({
    name: '',
    email: '',
    phone: '',
    document: ''
  });

  const getSeatLabel = (row, position) => {
    const letter = ['A', 'B', 'C', 'D'][position];
    return `${row + 1}${letter}`;
  };

  const isSeatOccupied = (seatLabel) => occupiedSeats.includes(seatLabel);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSeat) {
      alert('Por favor, selecione um assento');
      return;
    }
  
    try {
      // Pegar o tripId da URL
      const params = new URLSearchParams(window.location.search);
      const tripId = parseInt(params.get('tripId'));
  
      if (!tripId) {
        alert('Viagem não encontrada');
        return;
      }
  
      // Criar reserva
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripId: tripId,
          seatNumber: selectedSeat,
          totalPrice: 99.90, // Você deve pegar o preço real da viagem
          ...passengerData
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar reserva');
      }
  
      const booking = await response.json();
      console.log('Reserva criada:', booking);
      
      // Redirecionar para a página de pagamento
      window.location.href = `/payment?bookingId=${booking.id}`;
    } catch (error) {
      console.error('Erro:', error);
      alert(error.message || 'Erro ao processar reserva. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header com informações da viagem */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <span>Resultados</span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-blue-600 font-medium">Seleção de Assento</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Detalhes da Viagem */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Detalhes da Viagem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
                  <div className="flex items-center gap-2 text-gray-600">
                    <Bus size={20} className="text-blue-600" />
                    <p>Ônibus Executivo</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-gray-600 mb-2">Resumo do preço</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Passagem</span>
                      <span>R$ 89,90</span>
                    </div>
                    <div className="flex justify-between">
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
          </div>

          {/* Seleção de Assento e Formulário */}
          <div className="md:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Escolha seu Assento</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Legenda */}
                <div className="flex gap-6 mb-8 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded border-2 border-blue-600"></div>
                    <span className="text-sm">Disponível</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-blue-600"></div>
                    <span className="text-sm">Selecionado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-gray-200"></div>
                    <span className="text-sm">Ocupado</span>
                  </div>
                </div>

                {/* Mapa de Assentos */}
                <div className="flex flex-col items-center mb-8">
                  {/* Motorista */}
                  <div className="w-full max-w-md mb-8 flex justify-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <Bus size={32} className="text-gray-500" />
                    </div>
                  </div>

                  {/* Assentos */}
                  <div className="grid grid-cols-4 gap-4 w-full max-w-md">
                    {Array.from({ length: totalRows }).map((_, row) => (
                      <React.Fragment key={row}>
                        {Array.from({ length: seatsPerRow }).map((_, seat) => {
                          const seatLabel = getSeatLabel(row, seat);
                          const isOccupied = isSeatOccupied(seatLabel);
                          const isSelected = selectedSeat === seatLabel;

                          return (
                            <button
                              key={seatLabel}
                              className={`
                                w-12 h-12 rounded-lg flex items-center justify-center font-medium
                                ${isOccupied ? 'bg-gray-200 cursor-not-allowed' : 
                                  isSelected ? 'bg-blue-600 text-white' : 
                                  'border-2 border-blue-600 hover:bg-blue-50'}
                                ${seat === 1 ? 'mr-8' : seat === 2 ? 'ml-8' : ''}
                              `}
                              onClick={() => !isOccupied && setSelectedSeat(seatLabel)}
                              disabled={isOccupied}
                            >
                              {seatLabel}
                            </button>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {selectedSeat && (
                  <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-2 mb-6">
                    <CheckCircle className="text-blue-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-blue-800">Assento {selectedSeat} selecionado!</p>
                      <p className="text-sm text-blue-600">Por favor, preencha seus dados abaixo para continuar.</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Formulário do Passageiro */}
            <Card>
              <CardHeader>
                <CardTitle>Dados do Passageiro</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nome Completo</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="text"
                          className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                          value={passengerData.name}
                          onChange={(e) => setPassengerData({...passengerData, name: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CPF</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="text"
                          className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                          value={passengerData.document}
                          onChange={(e) => setPassengerData({...passengerData, document: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">E-mail</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="email"
                          className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                          value={passengerData.email}
                          onChange={(e) => setPassengerData({...passengerData, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Telefone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="tel"
                          className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                          value={passengerData.phone}
                          onChange={(e) => setPassengerData({...passengerData, phone: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={!selectedSeat}
                    >
                      Continuar para Pagamento
                      <ChevronRight className="ml-2" size={16} />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;