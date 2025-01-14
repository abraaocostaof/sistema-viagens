"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Search, ArrowRight, Star, Bus, Shield, Phone, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HomeScreen = () => {
  const router = useRouter();
  const [searchData, setSearchData] = useState({
    origin: '',
    destination: '',
    date: '',
    passengers: 1
  });

  const popularRoutes = [
    {
      id: 1,
      origin: 'São Paulo',
      destination: 'Rio de Janeiro',
      price: 89.90,
      time: '6h',
      nextDeparture: '08:00'
    },
    {
      id: 2,
      origin: 'Curitiba',
      destination: 'Florianópolis',
      price: 69.90,
      time: '4h',
      nextDeparture: '09:30'
    },
    {
      id: 3,
      origin: 'Belo Horizonte',
      destination: 'São Paulo',
      price: 99.90,
      time: '7h',
      nextDeparture: '07:00'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Construir a URL com os parâmetros
    const searchParams = new URLSearchParams({
      origin: searchData.origin,
      destination: searchData.destination,
      date: searchData.date
    });

    // Redirecionar para a página de resultados
    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Viaje com conforto e segurança
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Encontre as melhores rotas para sua viagem com preços acessíveis
            </p>

            {/* Search Form */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Origem"
                        className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                        value={searchData.origin}
                        onChange={(e) => setSearchData({...searchData, origin: e.target.value})}
                        required
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="Destino"
                        className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                        value={searchData.destination}
                        onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                        required
                      />
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                        value={searchData.date}
                        onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Search className="mr-2" size={20} />
                      Buscar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Popular Routes Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Rotas Populares</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularRoutes.map((route) => (
              <Card key={route.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {route.origin} → {route.destination}
                      </h3>
                      <p className="text-gray-600">Duração: {route.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">A partir de</p>
                      <p className="text-2xl font-bold text-blue-600">
                        R$ {route.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-600">
                      Próxima saída: {route.nextDeparture}
                    </span>
                    <Button variant="outline" className="gap-2">
                      Ver Detalhes
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Por que viajar conosco?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bus className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Frota Moderna</h3>
              <p className="text-gray-600">
                Veículos confortáveis e bem mantidos para sua segurança
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Segurança</h3>
              <p className="text-gray-600">
                Motoristas profissionais e seguros em todas as viagens
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suporte 24/7</h3>
              <p className="text-gray-600">
                Atendimento disponível a qualquer momento
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;