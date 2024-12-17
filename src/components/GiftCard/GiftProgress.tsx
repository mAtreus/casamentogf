import { cn } from '../../lib/utils';

interface GiftProgressProps {
  total: number;
  remaining: number;
  contributors: number;
}

export function GiftProgress({ total, remaining, contributors }: GiftProgressProps) {
  const progress = ((total - remaining) / total) * 100;
  
  return (
    <div className="space-y-2">
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>
          {contributors} contribuidor{contributors !== 1 ? 'es' : ''}
        </span>
        <span>{Math.round(progress)}% alcançado</span>
      </div>
    </div>
  );
}