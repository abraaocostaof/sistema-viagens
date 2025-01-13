"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, User, Truck, Building2, ChevronRight } from 'lucide-react';

const DriverManagement = () => {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    phone: '',
    address: '',
    cnh: '',
    renavam: '',
    licensePlate: '',
    vehicleType: '',
    company: '',
    login: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/drivers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Motorista cadastrado com sucesso!');
        setFormData({
          name: '',
          cpf: '',
          phone: '',
          address: '',
          cnh: '',
          renavam: '',
          licensePlate: '',
          vehicleType: '',
          company: '',
          login: '',
          password: ''
        });
      } else {
        alert('Erro ao cadastrar motorista');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar motorista');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-blue-600 font-medium">Cadastro de Motorista</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Card className="shadow-lg border-0 overflow-hidden transition-shadow duration-300 hover:shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <User className="h-7 w-7" />
              Cadastro de Motorista
            </CardTitle>
            <p className="mt-2 text-blue-100 font-light">
              Preencha os dados do novo motorista
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Informações Pessoais */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-3 text-gray-800">
                  <User size={20} className="text-blue-600" />
                  Informações Pessoais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Nome Completo</label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">CPF</label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                      value={formData.cpf}
                      onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Telefone</label>
                    <input
                      type="tel"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Endereço</label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Informações do Veículo */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-3 text-gray-800">
                  <Truck size={20} className="text-blue-600" />
                  Informações do Veículo
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">CNH</label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                      value={formData.cnh}
                      onChange={(e) => setFormData({...formData, cnh: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">RENAVAM</label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                      value={formData.renavam}
                      onChange={(e) => setFormData({...formData, renavam: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Placa do Veículo</label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                      value={formData.licensePlate}
                      onChange={(e) => setFormData({...formData, licensePlate: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Tipo de Veículo</label>
                    <select
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer"
                      value={formData.vehicleType}
                      onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="Carro">Carro</option>
                      <option value="Van">Van</option>
                      <option value="Micro-ônibus">Micro-ônibus</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Informações da Empresa */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-3 text-gray-800">
                  <Building2 size={20} className="text-blue-600" />
                  Informações da Empresa
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Empresa</label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Login</label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                      value={formData.login}
                      onChange={(e) => setFormData({...formData, login: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Senha</label>
                    <input
                      type="password"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/20"
              >
                <Plus className="h-5 w-5" />
                Cadastrar Motorista
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverManagement;