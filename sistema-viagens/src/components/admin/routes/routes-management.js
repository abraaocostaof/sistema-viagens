"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Edit, 
  Trash2,
  ChevronRight
} from 'lucide-react';

const RoutesManagement = () => {
  const [routes, setRoutes] = useState([
    {
      id: 1,
      origin: 'São Paulo',
      destination: 'Rio de Janeiro',
      duration: '6h',
      price: 89.90,
      stops: ['Guarulhos', 'São José dos Campos', 'Resende'],
      status: 'active'
    },
    {
      id: 2,
      origin: 'Curitiba',
      destination: 'Florianópolis',
      duration: '4h',
      price: 69.90,
      stops: ['Joinville', 'Itajaí'],
      status: 'active'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRoute, setNewRoute] = useState({
    origin: '',
    destination: '',
    duration: '',
    price: '',
    stops: ''
  });

  const handleAddRoute = (e) => {
    e.preventDefault();
    const newRouteData = {
      id: routes.length + 1,
      ...newRoute,
      stops: newRoute.stops.split(',').map(stop => stop.trim()),
      status: 'active'
    };
    setRoutes([...routes, newRouteData]);
    setNewRoute({
      origin: '',
      destination: '',
      duration: '',
      price: '',
      stops: ''
    });
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-blue-600 font-medium">Gestão de Rotas</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Gestão de Rotas</h1>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nova Rota
          </Button>
        </div>

        {/* Formulário de Adição */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Nova Rota</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddRoute} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Origem</label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      value={newRoute.origin}
                      onChange={(e) => setNewRoute({...newRoute, origin: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Destino</label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      value={newRoute.destination}
                      onChange={(e) => setNewRoute({...newRoute, destination: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Duração</label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      value={newRoute.duration}
                      onChange={(e) => setNewRoute({...newRoute, duration: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Preço</label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      value={newRoute.price}
                      onChange={(e) => setNewRoute({...newRoute, price: e.target.value})}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">Paradas (separadas por vírgula)</label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      value={newRoute.stops}
                      onChange={(e) => setNewRoute({...newRoute, stops: e.target.value})}
                      placeholder="Ex: Cidade 1, Cidade 2, Cidade 3"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Salvar Rota
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Barra de Pesquisa */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Pesquisar rotas..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Lista de Rotas */}
        <div className="space-y-4">
          {routes.filter(route => 
            route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            route.destination.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((route) => (
            <Card key={route.id} className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Origem e Destino */}
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="text-blue-600" size={20} />
                      <span className="font-semibold">{route.origin} → {route.destination}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Paradas: {route.stops.join(' → ')}
                    </div>
                  </div>

                  {/* Duração e Preço */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="text-gray-400" size={16} />
                      <span>{route.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="text-gray-400" size={16} />
                      <span>R$ {route.price.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" className="w-10 h-10 p-0">
                      <Edit size={16} />
                    </Button>
                    <Button variant="outline" className="w-10 h-10 p-0 text-red-600 hover:text-red-700">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutesManagement;