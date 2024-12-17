import { useState } from 'react';
import { Gift } from '../types';
import { formatCurrency } from '../lib/utils';

interface GiftCardProps {
  gift: Gift;
  onContribute: (giftId: string, amount: number) => void;
}

export function GiftCard({ gift, onContribute }: GiftCardProps) {
  const [showPayment, setShowPayment] = useState(false);
  const [amount, setAmount] = useState(gift.remainingPrice);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={gift.image}
        alt={gift.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{gift.name}</h3>
        <p className="text-gray-600">
          {gift.status === 'received' ? (
            <span className="text-green-500">Presente Recebido</span>
          ) : (
            <>
              Valor restante: {formatCurrency(gift.remainingPrice)}
              {gift.contributors > 0 && (
                <span className="ml-2 text-sm text-green-500">
                  ({gift.contributors} colaborador{gift.contributors > 1 ? 'es' : ''})
                </span>
              )}
            </>
          )}
        </p>
        
        {gift.status !== 'received' && (
          <div className="mt-4">
            {!showPayment ? (
              <button
                onClick={() => setShowPayment(true)}
                className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-500 transition-colors"
              >
                Contribuir
              </button>
            ) : (
              <div className="space-y-4">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  min={1}
                  max={gift.remainingPrice}
                  className="w-full border rounded-md p-2"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => onContribute(gift.id, amount)}
                    className="flex-1 bg-blue-400 text-white py-2 rounded-md hover:bg-blue-500"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => setShowPayment(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}