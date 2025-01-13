"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  ChevronRight,
  Star,
  Flag,
  MoreVertical,
  Eye
} from 'lucide-react';

const CustomersManagement = () => {
  const [customers] = useState([
    {
      id: 1,
      name: 'Maria Silva',
      email: 'maria.silva@email.com',
      phone: '(11) 98765-4321',
      totalTrips: 8,
      lastTrip: '2024-12-20',
      status: 'active',
      rating: 4.8
    },
    {
      id: 2,
      name: 'João Santos',
      email: 'joao.santos@email.com',
      phone: '(11) 98765-4322',
      totalTrips: 5,
      lastTrip: '2024-12-15',
      status: 'active',
      rating: 4.5
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-blue-600 font-medium">Gestão de Clientes</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Gestão de Clientes</h1>
          <p className="text-gray-600 mt-2">Gerencie todos os clientes cadastrados no sistema</p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total de Clientes</p>
                  <h3 className="text-2xl font-bold">{customers.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Média de Avaliação</p>
                  <h3 className="text-2xl font-bold">4.7</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Viagens Realizadas</p>
                  <h3 className="text-2xl font-bold">156</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Flag className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Clientes Ativos</p>
                  <h3 className="text-2xl font-bold">89%</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Barra de Pesquisa */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nome, email..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Lista de Clientes */}
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Cliente</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Contato</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Viagens</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Última Viagem</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Avaliação</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        {customer.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{customer.totalTrips} viagens</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {new Date(customer.lastTrip).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-900">{customer.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye size={16} />
                        Detalhes
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersManagement;