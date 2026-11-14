import React from 'react';
import { IkoLevel, LessonStatus, ConfirmationStatus } from '../../types';

export const IkoBadge: React.FC<{ level: IkoLevel; className?: string }> = ({ level, className = '' }) => {
  const configs: Record<IkoLevel, { label: string; bg: string; text: string; border: string }> = {
    beginner: {
      label: 'Początkujący',
      bg: 'bg-sand-200/80',
      text: 'text-navy',
      border: 'border-sand-300',
    },
    iko1: {
      label: 'IKO 1 · Discovery',
      bg: 'bg-ocean-50',
      text: 'text-ocean-strong',
      border: 'border-ocean-100',
    },
    iko2: {
      label: 'IKO 2 · Intermediate',
      bg: 'bg-blue-50',
      text: 'text-navy',
      border: 'border-blue-200',
    },
    iko3: {
      label: 'IKO 3 · Independent',
      bg: 'bg-coral-50',
      text: 'text-coral-strong',
      border: 'border-coral-100',
    },
  };

  const c = configs[level] || configs.beginner;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${c.bg} ${c.text} ${c.border} ${className}`}>
      {c.label}
    </span>
  );
};

export const LessonStatusBadge: React.FC<{ status: LessonStatus; className?: string }> = ({ status, className = '' }) => {
  const configs: Record<LessonStatus, { label: string; dot: string; bg: string; text: string; border: string }> = {
    planned: {
      label: 'Zaplanowana',
      dot: 'bg-ocean-500',
      bg: 'bg-ocean-50',
      text: 'text-ocean-strong',
      border: 'border-ocean-100',
    },
    'needs-change': {
      label: 'Wymaga uwagi',
      dot: 'bg-coral-500 animate-pulse',
      bg: 'bg-coral-50',
      text: 'text-coral-strong',
      border: 'border-coral-100',
    },
    completed: {
      label: 'Odbyta',
      dot: 'bg-success',
      bg: 'bg-emerald-50',
      text: 'text-success-text',
      border: 'border-emerald-200',
    },
    cancelled: {
      label: 'Odwołana',
      dot: 'bg-gray-400',
      bg: 'bg-gray-100',
      text: 'text-gray-600',
      border: 'border-gray-200',
    },
  };

  const c = configs[status] || configs.planned;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${c.bg} ${c.text} ${c.border} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
};

export const ConfirmationBadge: React.FC<{ status: ConfirmationStatus }> = ({ status }) => {
  if (status === 'confirmed') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-success-text border border-emerald-200">
        ✓ Podpisano
      </span>
    );
  }
  if (status === 'pending') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-warningText border border-amber-200">
        ⌛ Oczekuje na podpis
      </span>
    );
  }
  return null;
};
