import React, { useState } from 'react';
import { Role, Lesson } from './types';
import { 
  STUDENTS, 
  INSTRUCTORS, 
  LESSONS, 
  CHANGE_ISSUES, 
  NOTIFICATIONS, 
  WEATHER_FIXTURES,
  DEMO_DATE 
} from './mocks/fixtures';
import { TopBar } from './components/layout/TopBar';
import { Sidebar } from './components/layout/Sidebar';
import { Toast } from './components/common/Toast';
import { LessonDetailsDrawer } from './components/common/LessonDetailsDrawer';
import { Drawer } from './components/common/Drawer';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { SchedulePage } from './pages/SchedulePage';
import { StudentsPage } from './pages/StudentsPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { Sparkles, CalendarDays } from 'lucide-react';

export const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<Role>('manager');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Selected lesson for details drawer
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // New lesson modal
  const [isNewLessonGlobalOpen, setIsNewLessonGlobalOpen] = useState(false);

  // Handle role switch (US-001)
  const handleRoleChange = (newRole: Role) => {
    setCurrentRole(newRole);
    setActiveTab('dashboard');
    setSelectedLesson(null);
    setIsNewLessonGlobalOpen(false);
    showToast(`Przełączono na widok: ${newRole === 'manager' ? 'Manager Bazy' : newRole === 'instructor' ? 'Instruktor (Marta Falista)' : 'Kursant (Aleksandra Wiśniewska)'}`);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  // Demo active student for student role view
  const demoActiveStudent = STUDENTS[0]; // Aleksandra Wiśniewska

  return (
    <div className="min-h-screen bg-sand flex flex-col font-sans selection:bg-ocean-100 selection:text-ocean-strong">
      {/* TopBar Header */}
      <TopBar
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        notifications={NOTIFICATIONS}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
        onShowToast={showToast}
      />

      {/* Main Body with Sidebar & Content */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <Sidebar
          currentRole={currentRole}
          activeTab={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId)}
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
          changeIssuesCount={CHANGE_ISSUES.filter(i => i.resolutionStatus === 'pending').length}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {/* Conditional rendering depending on Role and Active Tab */}
          {currentRole === 'student' ? (
            <StudentDashboardPage
              student={demoActiveStudent}
              instructors={INSTRUCTORS}
              lessons={LESSONS}
              weather={WEATHER_FIXTURES.current}
              onShowToast={showToast}
              onOpenLessonDetails={(lesson) => setSelectedLesson(lesson)}
            />
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <DashboardPage
                  currentRole={currentRole}
                  students={STUDENTS}
                  instructors={INSTRUCTORS}
                  lessons={LESSONS}
                  issues={CHANGE_ISSUES}
                  weather={WEATHER_FIXTURES.current}
                  onNavigateToSchedule={() => setActiveTab('schedule')}
                  onNavigateToStudents={() => setActiveTab('students')}
                  onNavigateToChanges={() => {
                    setActiveTab('dashboard');
                    showToast('Przewinięto do sekcji Centrum zmian i alertów');
                  }}
                  onShowToast={showToast}
                  onOpenLessonDetails={(lesson) => setSelectedLesson(lesson)}
                />
              )}

              {activeTab === 'schedule' && (
                <SchedulePage
                  currentRole={currentRole}
                  students={STUDENTS}
                  instructors={INSTRUCTORS}
                  lessons={LESSONS}
                  onOpenLessonDetails={(lesson) => setSelectedLesson(lesson)}
                  onOpenNewLesson={() => setIsNewLessonGlobalOpen(true)}
                  onShowToast={showToast}
                />
              )}

              {activeTab === 'students' && (
                <StudentsPage
                  currentRole={currentRole}
                  students={STUDENTS}
                  instructors={INSTRUCTORS}
                  lessons={LESSONS}
                  onShowToast={showToast}
                  onOpenLessonDetails={(lesson) => setSelectedLesson(lesson)}
                />
              )}

              {/* Other tabs fallback to informative views */}
              {(activeTab === 'instructors' || activeTab === 'changes' || activeTab === 'notifications' || activeTab === 'training-log' || activeTab === 'availability' || activeTab === 'enroll') && (
                <div className="bg-white rounded-2xl shadow-card border border-border p-8 text-center space-y-4 max-w-xl mx-auto my-12">
                  <div className="w-12 h-12 rounded-2xl bg-ocean-50 text-ocean-strong flex items-center justify-center mx-auto">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-navy">
                    Moduł: {activeTab.toUpperCase()}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    W ramach prototypu 3 kluczowe widoki główne (<strong>Dashboard Managera</strong>, <strong>Harmonogram Szkolenia</strong> oraz <strong>Baza Kursantów / Panel Kursanta</strong>) są w pełni zaimplementowane i interaktywne.
                  </p>
                  <div className="pt-4 flex items-center justify-center gap-3">
                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className="px-4 py-2 bg-navy text-white text-xs font-bold rounded-xl"
                    >
                      Powrót do Dashboardu
                    </button>
                    <button
                      onClick={() => setActiveTab('schedule')}
                      className="px-4 py-2 bg-ocean text-white text-xs font-bold rounded-xl"
                    >
                      Przejdź do Harmonogramu
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Persistent subtle demo indicator */}
          <footer className="mt-12 py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-2">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ocean" />
              Prototyp UI KiteSchool · Hawaiian Surf / Tropical Modern
            </span>
            <span>
              Wszystkie akcje działają w trybie demonstracyjnym bez zapisu danych
            </span>
          </footer>
        </main>
      </div>

      {/* Slide-over Lesson Details Drawer (US-006) */}
      <LessonDetailsDrawer
        lesson={selectedLesson}
        onClose={() => setSelectedLesson(null)}
        students={STUDENTS}
        instructors={INSTRUCTORS}
        currentRole={currentRole}
        onShowToast={showToast}
      />

      {/* Global Quick New Lesson Drawer */}
      <Drawer
        isOpen={isNewLessonGlobalOpen}
        onClose={() => setIsNewLessonGlobalOpen(false)}
        title="Zaplanuj nową lekcję"
        subtitle="Szybkie dodawanie lekcji w harmonogramie"
        footer={
          <>
            <button
              onClick={() => setIsNewLessonGlobalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-border text-navy text-sm font-semibold hover:bg-sand transition-colors"
            >
              Anuluj
            </button>
            <button
              onClick={() => {
                setIsNewLessonGlobalOpen(false);
                showToast('To demonstracja — dane nie zostały zapisane.');
              }}
              className="px-5 py-2.5 rounded-xl bg-ocean hover:bg-ocean-strong text-white text-sm font-semibold shadow-md shadow-ocean/20 transition-colors"
            >
              Zapisz lekcję
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
              Wybierz kursanta
            </label>
            <select className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm text-navy bg-white">
              {STUDENTS.map(s => (
                <option key={s.id} value={s.id}>{s.fullName} ({s.ikoLevel.toUpperCase()})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
              Wybierz instruktora
            </label>
            <select className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm text-navy bg-white">
              {INSTRUCTORS.map(i => (
                <option key={i.id} value={i.id}>{i.fullName} ({i.availabilityStatus})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Data
              </label>
              <input type="date" defaultValue={DEMO_DATE} className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm text-navy" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Godzina startu
              </label>
              <select className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm text-navy bg-white">
                <option>10:00</option>
                <option>12:00</option>
                <option>14:00</option>
                <option>16:00</option>
              </select>
            </div>
          </div>
        </div>
      </Drawer>

      {/* Accessible Floating Toast */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};

export default App;
