"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus,
  Search,
  Ticket,
  Calendar,
  Percent,
  Tag,
  ChevronRight,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';

const CouponsManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [coupons] = useState([
    {
      id: 1,
      code: 'VERAO2025',
      discount: 20,
      type: 'percentage',
      validFrom: '2025-01-01',
      validUntil: '2025-03-31',
      usageLimit: 100,
      usageCount: 45,
      status: 'active',
      minimumValue: 100.00,
      description: 'Desconto de verão'
    },
    {
      id: 2,
      code: 'PRIMEIRA10',
      discount: 10,
      type: 'percentage',
      validFrom: '2025-01-01',
      validUntil: '2025-12-31',
      usageLimit: 500,
      usageCount: 123,
      status: 'active',
      minimumValue: 50.00,
      description: 'Desconto primeira viagem'
    }
  ]);

  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: '',
    type: 'percentage',
    validFrom: '',
    validUntil: '',
    usageLimit: '',
    minimumValue: '',
    description: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  const handleAddCoupon = (e) => {
    e.preventDefault();
    // Implementar lógica de adicionar cupom
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
            <span className="text-blue-600 font-medium">Cupons de Desconto</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Cupons de Desconto</h1>
            <p className="text-gray-600 mt-2">Gerencie os cupons de desconto do sistema</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Cupom
          </Button>
        </div>

        {/* Formulário de Novo Cupom */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Novo Cupom de Desconto</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddCoupon} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Código do Cupom</label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      value={newCoupon.code}
                      onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Tipo de Desconto</label>
                    <select
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      value={newCoupon.type}
                      onChange={(e) => setNewCoupon({...newCoupon, type: e.target.value})}
                      required
                    >
                      <option value="percentage">Porcentagem (%)</option>
                      <option value="fixed">Valor Fixo (R$)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Valor do Desconto</label>
                    <input
                      type="number"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      value={newCoupon.discount}
                      onChange={(e) => setNewCoupon({...newCoupon, discount: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Valor Mínimo da Compra</label>
                    <input
                      type="number"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      value={newCoupon.minimumValue}
                      onChange={(e) => setNewCoupon({...newCoupon, minimumValue: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Data Inicial</label>
                    <input
                      type="date"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      value={newCoupon.validFrom}
                      onChange={(e) => setNewCoupon({...newCoupon, validFrom: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Data Final</label>
                    <input
                      type="date"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      value={newCoupon.validUntil}
                      onChange={(e) => setNewCoupon({...newCoupon, validUntil: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">Limite de Uso</label>
                    <input
                      type="number"
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      value={newCoupon.usageLimit}
                      onChange={(e) => setNewCoupon({...newCoupon, usageLimit: e.target.value})}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-gray-700">Descrição</label>
                    <textarea
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      rows="3"
                      value={newCoupon.description}
                      onChange={(e) => setNewCoupon({...newCoupon, description: e.target.value})}
                      required
                    ></textarea>
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
                    Criar Cupom
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Lista de Cupons */}
        <div className="space-y-4">
          {coupons.map((coupon) => (
            <Card key={coupon.id} className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Informações do Cupom */}
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Ticket className="text-blue-600" size={20} />
                      <h3 className="font-semibold text-lg">{coupon.code}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{coupon.description}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <span className="inline-flex items-center text-sm text-gray-600">
                        <Percent size={16} className="mr-1" />
                        {coupon.discount}% de desconto
                      </span>
                      <span className="inline-flex items-center text-sm text-gray-600">
                        <Tag size={16} className="mr-1" />
                        Mín: R$ {coupon.minimumValue}
                      </span>
                    </div>
                  </div>

                  {/* Status e Uso */}
                  <div>
                    <div className="mb-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                        coupon.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {coupon.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Usado: {coupon.usageCount}/{coupon.usageLimit}</p>
                      <p className="mt-1">
                        Válido até: {new Date(coupon.validUntil).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" className="gap-2">
                      <Edit size={16} />
                      Editar
                    </Button>
                    <Button variant="outline" className="text-red-600 hover:text-red-700 gap-2">
                      <Trash2 size={16} />
                      Excluir
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

export default CouponsManagement;