"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter,
  MapPin,
  Calendar,
  Clock,
  Users,
  Bus,
  ArrowRight,
  Wifi,
  Coffee,
  Tv,
  ChevronDown
} from 'lucide-react';

const SearchResults = () => {
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    departureTime: [],
    vehicleType: [],
    amenities: []
  });

    // Buscar viagens da API quando o componente carregar
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        // Pegar parâmetros da URL
        const params = new URLSearchParams(window.location.search);
        const origin = params.get('origin');
        const destination = params.get('destination');
        const date = params.get('date');

        // Fazer a requisição para a API
        const response = await fetch(`/api/trips?origin=${origin}&destination=${destination}&date=${date}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar viagens');
        }

        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao carregar viagens. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleSelectTrip = (tripId) => {
    window.location.href = `/booking?tripId=${tripId}`;
  };

  // Mostrar loading enquanto carrega
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="relative md:col-span-2">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                defaultValue="São Paulo → Rio de Janeiro"
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="date"
                defaultValue="2025-01-15"
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-3 text-gray-400" size={20} />
              <select className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500">
                <option>1 passageiro</option>
                <option>2 passageiros</option>
                <option>3 passageiros</option>
                <option>4 passageiros</option>
              </select>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="mr-2" size={20} />
              Buscar
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar com Filtros */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter size={20} />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Horário de Partida */}
                <div>
                  <h3 className="font-semibold mb-4">Horário de Partida</h3>
                  <div className="space-y-2">
                    {['Manhã (06:00 - 12:00)', 'Tarde (12:00 - 18:00)', 'Noite (18:00 - 00:00)'].map((time) => (
                      <label key={time} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 mr-2" />
                        <span className="text-sm">{time}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tipo de Veículo */}
                <div>
                  <h3 className="font-semibold mb-4">Tipo de Veículo</h3>
                  <div className="space-y-2">
                    {['Ônibus Executivo', 'Ônibus Convencional', 'Micro-ônibus'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 mr-2" />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Resultados */}
          <div className="md:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                {trips.length} viagens encontradas
              </p>
              <select className="rounded-lg border p-2">
                <option>Menor preço</option>
                <option>Menor duração</option>
                <option>Mais cedo</option>
              </select>
            </div>

            <div className="space-y-4">
              {trips.map((trip) => (
                <Card key={trip.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {/* Horários e Empresa */}
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Bus className="text-blue-600" size={20} />
                          <span className="font-semibold">{trip.route?.origin} → {trip.route?.destination}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                          <div className="text-center">
                            <p className="font-semibold text-lg">
                              {new Date(trip.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <p className="text-sm text-gray-600">{trip.route?.origin}</p>
                          </div>
                          <div className="flex-1 px-4">
                            <div className="relative">
                              <div className="h-1 bg-gray-200 absolute w-full top-3"></div>
                              <div className="flex justify-between relative">
                                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                              </div>
                            </div>
                            <p className="text-center text-sm text-gray-600 mt-2">
                              {trip.route?.duration}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold text-lg">
                              {new Date(trip.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <p className="text-sm text-gray-600">{trip.route?.destination}</p>
                          </div>
                        </div>
                      </div>

                      {/* Informações do Veículo */}
                      <div>
                        <p className="text-sm text-gray-600 mb-2">{trip.driver?.vehicleType}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <Users size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {trip.totalSeats - (trip.bookings?.length || 0)} lugares disponíveis
                          </span>
                        </div>
                      </div>

                      {/* Preço e Botão */}
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">a partir de</p>
                        <p className="text-2xl font-bold text-blue-600 mb-2">
                          R$ {trip.price.toFixed(2)}
                        </p>
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleSelectTrip(trip.id)}
                        >
                          Selecionar
                          <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
