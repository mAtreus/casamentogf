import { useState } from 'react';
import { formatCurrency } from '../../lib/utils';
import { Gift } from '../../types';
import { GiftImage } from './GiftImage';
import { GiftProgress } from './GiftProgress';
import { ContributionForm } from './ContributionForm';
import { ContributorTag } from './ContributorTag';

interface GiftCardProps {
  gift: Gift;
  onContribute: (giftId: string, amount: number) => Promise<void>;
}

export function GiftCard({ gift, onContribute }: GiftCardProps) {
  const [showContribution, setShowContribution] = useState(false);

  const handleContribute = async (amount: number) => {
    await onContribute(gift.id, amount);
    setShowContribution(false);
  };

  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <GiftImage
          src={gift.image}
          alt={gift.name}
          status={gift.status}
        />
        <ContributorTag count={gift.contributors} />
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-500 transition-colors">
            {gift.name}
          </h3>
          {gift.status !== 'received' && (
            <p className="mt-1 text-gray-600">
              Valor restante: {formatCurrency(gift.remainingPrice)}
            </p>
          )}
        </div>

        {gift.status !== 'received' && (
          <>
            <GiftProgress
              total={gift.totalPrice}
              remaining={gift.remainingPrice}
              contributors={gift.contributors}
            />

            {!showContribution ? (
              <button
                onClick={() => setShowContribution(true)}
                className="w-full bg-blue-400 text-white py-3 rounded-xl hover:bg-blue-500 transition-colors relative overflow-hidden group"
              >
                <span className="relative z-10 font-bold">Presentear</span>
                <span className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            ) : (
              <ContributionForm
                remainingPrice={gift.remainingPrice}
                onContribute={handleContribute}
                onCancel={() => setShowContribution(false)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}