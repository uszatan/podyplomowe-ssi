import React, { useState } from 'react';
import { 
  Role, 
  NotificationItem 
} from '../../types';
import { 
  Bell, 
  Wind, 
  User, 
  ChevronDown, 
  CheckCircle2, 
  Menu,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface TopBarProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  notifications: NotificationItem[];
  onOpenMobileMenu: () => void;
  onShowToast: (msg: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentRole,
  onRoleChange,
  notifications,
  onOpenMobileMenu,
  onShowToast,
}) => {
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Active persona details according to role
  const personaMap: Record<Role, { name: string; title: string; avatar: string }> = {
    manager: {
      name: 'Jan Kowalski',
      title: 'Kierownik Bazy KiteSchool',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    },
    instructor: {
      name: 'Marta Falista',
      title: 'Instruktor IKO Level 2',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    },
    student: {
      name: 'Aleksandra Wiśniewska',
      title: 'Kursantka · Poziom IKO 2',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    },
  };

  const persona = personaMap[currentRole];

  return (
    <header className="h-20 bg-white border-b border-border sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
      {/* Left side: Mobile menu toggle + Logo + Spot location */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 text-navy hover:bg-sand rounded-xl focus-visible:outline-none"
          aria-label="Otwórz menu nawigacji"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-ocean-strong via-ocean to-cyan-400 text-white flex items-center justify-center shadow-md shadow-ocean/20">
            <Wind size={24} className="transform -rotate-12" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-xl text-navy tracking-tight">
                Kite<span className="text-ocean">School</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sand-200 text-muted">
                Demo OS
              </span>
            </div>
            <p className="text-xs text-muted flex items-center gap-1 font-medium">
              <Compass size={12} className="text-ocean" /> Hel · Chałupy 3
            </p>
          </div>
        </div>
      </div>

      {/* Center: Role Switcher & Demo Context */}
      <div className="flex items-center gap-3">
        {/* Role Switcher Pills */}
        <div 
          className="bg-sand-200/80 p-1.5 rounded-2xl border border-border flex items-center shadow-inner"
          role="radiogroup"
          aria-label="Wybór roli w systemie"
        >
          {(['manager', 'instructor', 'student'] as Role[]).map((role) => {
            const roleLabels: Record<Role, string> = {
              manager: 'Manager',
              instructor: 'Instruktor',
              student: 'Kursant',
            };
            const isActive = currentRole === role;
            return (
              <button
                key={role}
                role="radio"
                aria-checked={isActive}
                onClick={() => onRoleChange(role)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-muted hover:text-navy hover:bg-white/60'
                }`}
              >
                {roleLabels[role]}
              </button>
            );
          })}
        </div>

        {/* Demo Tag */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-ocean-50 text-ocean-strong border border-ocean-100 rounded-xl text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-ocean animate-ping" />
          Dzień demo: 15.07.2026
        </div>
      </div>

      {/* Right side: Notifications bell & Persona profile */}
      <div className="flex items-center gap-3">
        {/* Notifications Popover Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="w-10 h-10 rounded-xl border border-border/80 flex items-center justify-center text-navy hover:bg-sand relative transition-colors focus-visible:outline-none"
            aria-label="Powiadomienia"
            aria-expanded={showNotifMenu}
          >
            <Bell size={18} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-coral text-white rounded-full text-[10px] font-extrabold flex items-center justify-center border-2 border-white shadow-sm">
                {notifications.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-panel border border-border p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h4 className="font-heading font-bold text-sm text-navy">
                  Powiadomienia i SMS ({notifications.length})
                </h4>
                <span className="text-[11px] text-ocean-strong font-medium">
                  Podgląd demonstracyjny
                </span>
              </div>
              <div className="divide-y divide-border/60 max-h-80 overflow-y-auto my-2">
                {notifications.slice(0, 4).map((n) => (
                  <div key={n.id} className="py-2.5 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-navy">{n.title}</span>
                      <span className="text-[10px] text-muted">{n.sentAtLabel}</span>
                    </div>
                    <p className="text-xs text-muted mt-1 leading-snug line-clamp-2">
                      {n.body}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  setShowNotifMenu(false);
                  onShowToast('To demonstracja — moduł centrum wiadomości.');
                }}
                className="w-full mt-2 py-2 text-center text-xs font-semibold text-ocean-strong hover:bg-ocean-50 rounded-xl transition-colors"
              >
                Przejdź do wszystkich wiadomości →
              </button>
            </div>
          )}
        </div>

        {/* User Persona Profile */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-1.5 pr-2.5 rounded-2xl hover:bg-sand border border-transparent hover:border-border transition-all focus-visible:outline-none"
            aria-expanded={showUserMenu}
          >
            <img
              src={persona.avatar}
              alt={persona.name}
              className="w-9 h-9 rounded-xl object-cover ring-2 ring-ocean/30"
            />
            <div className="text-left hidden md:block">
              <p className="text-xs font-bold text-navy leading-none mb-1">
                {persona.name}
              </p>
              <p className="text-[11px] text-muted leading-none font-medium">
                {persona.title}
              </p>
            </div>
            <ChevronDown size={14} className="text-muted hidden md:block" />
          </button>

          {/* User Popover */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-panel border border-border p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <img
                  src={persona.avatar}
                  alt={persona.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-ocean/30"
                />
                <div>
                  <h4 className="font-heading font-bold text-sm text-navy">{persona.name}</h4>
                  <p className="text-xs text-muted">{persona.title}</p>
                </div>
              </div>
              <div className="mt-3 space-y-2 text-xs text-muted">
                <div className="flex items-center gap-2 text-navy font-medium">
                  <ShieldCheck size={14} className="text-ocean" />
                  Rola: <span className="font-bold capitalize">{currentRole}</span>
                </div>
                <p className="text-[11px] text-muted italic">
                  Przełączanie ról służy celom demonstracyjnym. Brak logowania i sesji.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onShowToast('To demonstracja — profil użytkownika.');
                }}
                className="w-full mt-3 py-2 bg-sand hover:bg-sand-200 text-navy rounded-xl text-xs font-semibold transition-colors"
              >
                Zamknij panel
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
