"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Calendar,
  Clock,
  MapPin,
  Users,
  AlertCircle,
  ChevronRight,
  Filter,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';

const TripsManagement = () => {
  const [trips] = useState([
    {
      id: 1,
      route: 'São Paulo → Rio de Janeiro',
      date: '2025-01-15',
      time: '08:00',
      driver: 'João Silva',
      vehicle: 'Micro-ônibus ABC-1234',
      capacity: 28,
      bookedSeats: 15,
      status: 'scheduled',
      passengers: [
        { name: 'Maria Santos', seat: '1A' },
        { name: 'José Oliveira', seat: '1B' }
      ]
    },
    {
      id: 2,
      route: 'Curitiba → Florianópolis',
      date: '2025-01-15',
      time: '09:30',
      driver: 'Ana Costa',
      vehicle: 'Van DEF-5678',
      capacity: 15,
      bookedSeats: 8,
      status: 'in_progress',
      passengers: [
        { name: 'Carlos Lima', seat: '1A' },
        { name: 'Paula Silva', seat: '1B' }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const getStatusBadge = (status) => {
    const statusConfig = {
      scheduled: {
        color: 'bg-blue-100 text-blue-800',
        text: 'Agendada'
      },
      in_progress: {
        color: 'bg-green-100 text-green-800',
        text: 'Em Andamento'
      },
      completed: {
        color: 'bg-gray-100 text-gray-800',
        text: 'Concluída'
      },
      cancelled: {
        color: 'bg-red-100 text-red-800',
        text: 'Cancelada'
      }
    };

    return statusConfig[status] || statusConfig.scheduled;
  };

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || trip.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-blue-600 font-medium">Gestão de Viagens</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Gestão de Viagens</h1>
          <p className="text-gray-600 mt-2">Gerencie todas as viagens do sistema</p>
        </div>

        {/* Filtros e Busca */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por rota ou motorista..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <select
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">Todos os Status</option>
              <option value="scheduled">Agendadas</option>
              <option value="in_progress">Em Andamento</option>
              <option value="completed">Concluídas</option>
              <option value="cancelled">Canceladas</option>
            </select>
          </div>
        </div>

        {/* Lista de Viagens */}
        <div className="space-y-4">
          {filteredTrips.map((trip) => (
            <Card key={trip.id} className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Informações da Rota */}
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="text-blue-600" size={20} />
                      <h3 className="font-semibold text-lg">{trip.route}</h3>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{new Date(trip.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{trip.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status e Ocupação */}
                  <div>
                    <div className="mb-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getStatusBadge(trip.status).color}`}>
                        {getStatusBadge(trip.status).text}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-400" />
                        <span>{trip.bookedSeats}/{trip.capacity} lugares</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 rounded-full h-2"
                          style={{ width: `${(trip.bookedSeats / trip.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" className="gap-2">
                      <Eye size={16} />
                      Detalhes
                    </Button>
                    {trip.status === 'scheduled' && (
                      <>
                        <Button variant="outline" className="text-green-600 hover:text-green-700 gap-2">
                          <CheckCircle size={16} />
                          Iniciar
                        </Button>
                        <Button variant="outline" className="text-red-600 hover:text-red-700 gap-2">
                          <XCircle size={16} />
                          Cancelar
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Alertas (se houver) */}
                {trip.status === 'scheduled' && trip.bookedSeats < 5 && (
                  <div className="mt-4 flex items-start p-4 bg-yellow-50 rounded-lg">
                    <AlertCircle className="text-yellow-600 mt-0.5" size={20} />
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Poucos passageiros registrados para esta viagem.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripsManagement;