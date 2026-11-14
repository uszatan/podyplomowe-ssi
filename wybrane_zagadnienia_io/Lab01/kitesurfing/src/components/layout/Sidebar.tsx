import React from 'react';
import { 
  Role 
} from '../../types';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  GraduationCap, 
  AlertTriangle, 
  Bell, 
  FileCheck, 
  Clock, 
  CalendarCheck, 
  Award, 
  SendHorizontal,
  X,
  Compass
} from 'lucide-react';

interface SidebarProps {
  currentRole: Role;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
  changeIssuesCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  activeTab,
  onTabChange,
  mobileOpen,
  onMobileClose,
  changeIssuesCount = 2,
}) => {
  // Navigation config per role
  const menuConfig: Record<Role, Array<{ id: string; label: string; icon: any; badge?: string }>> = {
    manager: [
      { id: 'dashboard', label: 'Dashboard bazy', icon: LayoutDashboard },
      { id: 'schedule', label: 'Harmonogram szkoły', icon: CalendarDays },
      { id: 'students', label: 'Baza kursantów', icon: Users },
      { id: 'instructors', label: 'Instruktorzy', icon: GraduationCap },
      { 
        id: 'changes', 
        label: 'Centrum zmian', 
        icon: AlertTriangle, 
        badge: changeIssuesCount > 0 ? `${changeIssuesCount}` : undefined 
      },
      { id: 'notifications', label: 'Powiadomienia i SMS', icon: Bell },
      { id: 'training-log', label: 'Rejestr szkoleń', icon: FileCheck },
    ],
    instructor: [
      { id: 'dashboard', label: 'Mój dashboard', icon: LayoutDashboard },
      { id: 'schedule', label: 'Mój harmonogram', icon: CalendarDays },
      { id: 'availability', label: 'Moja dostępność', icon: Clock },
      { id: 'students', label: 'Moi kursanci', icon: Users },
      { id: 'notifications', label: 'Powiadomienia', icon: Bell },
    ],
    student: [
      { id: 'dashboard', label: 'Mój panel kursanta', icon: LayoutDashboard },
      { id: 'schedule', label: 'Moje zajęcia', icon: CalendarDays },
      { id: 'enroll', label: 'Zapisz się na lekcję', icon: SendHorizontal },
      { id: 'students', label: 'Historia i Paszport IKO', icon: Award },
      { id: 'notifications', label: 'Powiadomienia', icon: Bell },
    ],
  };

  const navItems = menuConfig[currentRole];

  const handleSelectTab = (tabId: string) => {
    onTabChange(tabId);
    onMobileClose();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-navy text-sand-50 w-64 justify-between border-r border-navy-700/60">
      <div>
        {/* Mobile Header Close */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10">
          <span className="font-heading font-bold text-white text-lg">Menu KiteSchool</span>
          <button
            onClick={onMobileClose}
            className="p-1.5 text-sand-200 hover:text-white rounded-lg hover:bg-white/10"
            aria-label="Zamknij menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Section title */}
        <div className="px-6 pt-6 pb-3">
          <p className="text-[11px] font-bold tracking-wider uppercase text-ocean/80">
            Nawigacja · {currentRole.toUpperCase()}
          </p>
        </div>

        {/* Nav Links */}
        <nav className="px-3 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-ocean-strong text-white font-semibold shadow-md shadow-black/10'
                    : 'text-sand-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={19}
                    className={isActive ? 'text-white' : 'text-ocean'}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-coral text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tropical Modern Bottom Banner */}
      <div className="p-4 m-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-2 text-ocean">
          <Compass size={16} />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Spot Hel · Półwysep
          </span>
        </div>
        <p className="text-xs text-sand-300 leading-relaxed">
          KiteSchool System v1.0. Prototyp demonstracyjny UI Hawaiian Surf.
        </p>
        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-sand-300 font-medium">
          <span>Dane fikcyjne</span>
          <span className="text-ocean font-bold">15.07.2026</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop static sidebar */}
      <aside className="hidden md:block w-64 shrink-0 h-[calc(100vh-5rem)] sticky top-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-navy/60 backdrop-blur-sm"
            onClick={onMobileClose}
            aria-hidden="true"
          />
          <div className="relative z-10 w-72 max-w-[85vw] h-full shadow-panel animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
