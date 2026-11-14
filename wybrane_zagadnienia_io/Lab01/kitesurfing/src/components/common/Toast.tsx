import React, { useEffect } from 'react';
import { Info, X, CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'demo' | 'success';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'demo', onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div 
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-navy text-white px-5 py-3.5 rounded-xl shadow-panel border border-ocean/30 animate-in fade-in slide-in-from-bottom-5 duration-200"
    >
      {type === 'demo' ? (
        <div className="w-8 h-8 rounded-full bg-ocean/20 text-ocean flex items-center justify-center shrink-0">
          <Info size={18} />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-success/20 text-success flex items-center justify-center shrink-0">
          <CheckCircle2 size={18} />
        </div>
      )}
      <div>
        <p className="text-xs uppercase tracking-wider font-semibold text-ocean">
          {type === 'demo' ? 'Tryb Demonstracyjny' : 'Informacja'}
        </p>
        <p className="text-sm font-medium text-sand-50">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-3 text-sand-300 hover:text-white p-1 rounded-lg transition-colors"
        aria-label="Zamknij powiadomienie"
      >
        <X size={16} />
      </button>
    </div>
  );
};
