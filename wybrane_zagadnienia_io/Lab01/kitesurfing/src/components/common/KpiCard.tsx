import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  variant?: 'ocean' | 'navy' | 'coral' | 'emerald';
  badge?: string;
  onClick?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'ocean',
  badge,
  onClick,
}) => {
  const colorMap = {
    ocean: {
      iconBg: 'bg-ocean-50 text-ocean-strong',
      borderHover: 'hover:border-ocean/40',
      badgeBg: 'bg-ocean-100 text-ocean-strong',
    },
    navy: {
      iconBg: 'bg-navy/10 text-navy',
      borderHover: 'hover:border-navy/30',
      badgeBg: 'bg-sand-200 text-navy',
    },
    coral: {
      iconBg: 'bg-coral-50 text-coral-strong',
      borderHover: 'hover:border-coral/40',
      badgeBg: 'bg-coral-100 text-coral-strong',
    },
    emerald: {
      iconBg: 'bg-emerald-50 text-success-text',
      borderHover: 'hover:border-emerald-300',
      badgeBg: 'bg-emerald-100 text-success-text',
    },
  };

  const c = colorMap[variant];

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 shadow-card border border-border/80 transition-all duration-200 ${c.borderHover} ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          {title}
        </span>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.iconBg}`}>
          <Icon size={20} />
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-3xl font-extrabold font-heading text-navy">
          {value}
        </span>
        {badge && (
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${c.badgeBg}`}>
            {badge}
          </span>
        )}
      </div>

      <p className="text-xs text-muted font-medium">{subtitle}</p>
    </div>
  );
};
