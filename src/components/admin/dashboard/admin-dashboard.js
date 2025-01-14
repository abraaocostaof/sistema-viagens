"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Users, 
  Bus, 
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  MapPin,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {
  // Dados simulados
  const metrics = {
    totalPassengers: "1,234",
    activeTrips: "45",
    monthlyRevenue: "R$ 98.765,43",
    totalDrivers: "28"
  };

  const recentTrips = [
    {
      id: 1,
      origin: "São Paulo",
      destination: "Rio de Janeiro",
      date: "15/01/2025",
      status: "Em andamento",
      driver: "João Silva",
      passengers: 15
    },
    {
      id: 2,
      origin: "Curitiba",
      destination: "Florianópolis",
      date: "15/01/2025",
      status: "Agendada",
      driver: "Maria Santos",
      passengers: 12
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-2">Bem-vindo ao painel administrativo</p>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total de Passageiros */}
          <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Passageiros</p>
                  <h3 className="text-2xl font-bold text-gray-900">{metrics.totalPassengers}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Viagens Ativas */}
          <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Bus className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Viagens Ativas</p>
                  <h3 className="text-2xl font-bold text-gray-900">{metrics.activeTrips}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Receita Mensal */}
          <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Receita Mensal</p>
                  <h3 className="text-2xl font-bold text-gray-900">{metrics.monthlyRevenue}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total de Motoristas */}
          <Card className="bg-white hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Motoristas</p>
                  <h3 className="text-2xl font-bold text-gray-900">{metrics.totalDrivers}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Viagens Recentes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Viagens Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="p-4 border-b">Rota</th>
                    <th className="p-4 border-b">Data</th>
                    <th className="p-4 border-b">Motorista</th>
                    <th className="p-4 border-b">Passageiros</th>
                    <th className="p-4 border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrips.map((trip) => (
                    <tr key={trip.id} className="hover:bg-gray-50">
                      <td className="p-4 border-b">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                          {trip.origin} → {trip.destination}
                        </div>
                      </td>
                      <td className="p-4 border-b">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          {trip.date}
                        </div>
                      </td>
                      <td className="p-4 border-b">{trip.driver}</td>
                      <td className="p-4 border-b">{trip.passengers}</td>
                      <td className="p-4 border-b">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          trip.status === 'Em andamento' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {trip.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Alertas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Alertas e Notificações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start p-4 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-yellow-800">Manutenção Programada</h4>
                  <p className="text-sm text-yellow-700 mt-1">Veículo ABC-1234 precisa de revisão em 3 dias</p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-blue-50 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-800">Viagem Próxima</h4>
                  <p className="text-sm text-blue-700 mt-1">5 viagens agendadas para amanhã</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;