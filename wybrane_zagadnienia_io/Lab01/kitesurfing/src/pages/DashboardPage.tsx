import React, { useState } from 'react';
import { 
  Student, 
  Instructor, 
  Lesson, 
  ChangeIssue, 
  WeatherFixture,
  Role
} from '../types';
import { 
  DEMO_DATE, 
  DEMO_DATE_LABEL, 
  DEMO_LOCATION 
} from '../mocks/fixtures';
import { WeatherWidget } from '../components/common/WeatherWidget';
import { KpiCard } from '../components/common/KpiCard';
import { IkoBadge, LessonStatusBadge } from '../components/common/Badge';
import { Drawer } from '../components/common/Drawer';
import { 
  CalendarDays, 
  Users, 
  AlertTriangle, 
  Plus, 
  Clock, 
  UserCheck, 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  Info
} from 'lucide-react';

interface DashboardPageProps {
  currentRole: Role;
  students: Student[];
  instructors: Instructor[];
  lessons: Lesson[];
  issues: ChangeIssue[];
  weather: WeatherFixture;
  onNavigateToSchedule: () => void;
  onNavigateToStudents: () => void;
  onNavigateToChanges: () => void;
  onShowToast: (msg: string) => void;
  onOpenLessonDetails: (lesson: Lesson) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  currentRole,
  students,
  instructors,
  lessons,
  issues,
  weather,
  onNavigateToSchedule,
  onNavigateToStudents,
  onNavigateToChanges,
  onShowToast,
  onOpenLessonDetails,
}) => {
  const [isNewLessonOpen, setIsNewLessonOpen] = useState(false);
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<ChangeIssue | null>(null);

  // Form states for New Lesson modal
  const [formStudentId, setFormStudentId] = useState(students[0]?.id || '');
  const [formInstructorId, setFormInstructorId] = useState(instructors[0]?.id || '');
  const [formDate, setFormDate] = useState(DEMO_DATE);
  const [formTime, setFormTime] = useState('10:00');

  // Filter lessons for today demo date
  const todayLessons = lessons.filter(l => l.date === DEMO_DATE);
  const availableInstructors = instructors.filter(i => i.availabilityStatus === 'available' || i.availabilityStatus === 'teaching');
  const pendingIssues = issues.filter(i => i.resolutionStatus === 'pending');

  const handleCreateLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewLessonOpen(false);
    onShowToast('To demonstracja — formularz nie zapisał lekcji w bazie.');
  };

  const handleResolveIssueSubmit = () => {
    setIsResolveModalOpen(false);
    onShowToast('To demonstracja — zastępstwo zostało przypisane demonstracyjnie.');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-card border border-border/80 bg-gradient-to-r from-navy via-navy-light to-ocean-strong text-white p-6 sm:p-8">
        {/* Subtle decorative wave overlay */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-sand-100 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-ocean" />
              <span>{DEMO_DATE_LABEL}</span>
              <span className="text-white/40">•</span>
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-coral" /> {DEMO_LOCATION}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight text-white">
              Cześć, Jan! Szkoła działa na pełnych obrotach 🏄‍♂️
            </h1>
            
            <p className="text-sm text-sand-200 leading-relaxed">
              Warunki na Zatoce Puckiej są dziś wybitne: wiatr <strong className="text-white">21 węzłów WNW</strong>. 
              Zaplanowano <strong className="text-white">6 lekcji</strong> na wodzie, 2 zgłoszenia wymagają Twojej decyzji.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsNewLessonOpen(true)}
              className="px-5 py-3 rounded-xl bg-ocean hover:bg-ocean-strong text-white font-semibold text-sm shadow-lg shadow-ocean/25 hover:shadow-ocean/40 transition-all flex items-center gap-2 group"
            >
              <Plus size={18} className="group-hover:rotate-90 transition-transform duration-200" />
              Zaplanuj nową lekcję
            </button>
            <button
              onClick={onNavigateToSchedule}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-sm border border-white/15 transition-all flex items-center gap-2"
            >
              <CalendarDays size={18} />
              Zobacz harmonogram
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <KpiCard
          title="Dzisiejsze lekcje"
          value={todayLessons.length}
          subtitle="6 sesji na wodzie (08:00 - 18:00)"
          icon={CalendarDays}
          variant="ocean"
          badge="100% obłożenia"
          onClick={onNavigateToSchedule}
        />
        <KpiCard
          title="Dostępni instruktorzy"
          value={`${availableInstructors.length} / ${instructors.length}`}
          subtitle="Piotr Bałtycki — zwolnienie"
          icon={UserCheck}
          variant="emerald"
          badge="4 na wodzie"
        />
        <KpiCard
          title="Oczekujące zgłoszenia"
          value="3"
          subtitle="Zainteresowani lekcją IKO 1/2"
          icon={Users}
          variant="navy"
          badge="Nowe"
          onClick={onNavigateToStudents}
        />
        <KpiCard
          title="Wymagające uwagi"
          value={pendingIssues.length}
          subtitle="1 absencja, 1 słaby wiatr jutro"
          icon={AlertTriangle}
          variant="coral"
          badge="Akcja wymagana"
          onClick={onNavigateToChanges}
        />
      </div>

      {/* Main Content: Weather Widget & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Live Weather & Alerts (1 col) */}
        <div className="space-y-6">
          <WeatherWidget weather={weather} />

          {/* Alert Center Widget */}
          <div className="bg-white rounded-2xl p-6 shadow-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-coral-50 text-coral-strong flex items-center justify-center">
                  <AlertTriangle size={18} />
                </div>
                <h3 className="font-heading font-bold text-navy text-base">
                  Centrum zmian i alertów
                </h3>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-coral-50 text-coral-strong">
                {pendingIssues.length} aktywne
              </span>
            </div>

            <div className="space-y-3">
              {pendingIssues.map((issue) => {
                const lesson = lessons.find(l => l.id === issue.lessonId);
                const student = students.find(s => s.id === lesson?.studentId);
                return (
                  <div
                    key={issue.id}
                    className="p-3.5 rounded-xl border border-coral-100 bg-coral-50/40 hover:bg-coral-50/70 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-coral-strong uppercase tracking-wider">
                        {issue.reasonType === 'instructor_absence' ? 'Absencja instruktora' : 'Warunki pogodowe'}
                      </span>
                      <span className="text-[11px] font-medium text-muted">
                        Dziś, {lesson?.startTime}
                      </span>
                    </div>
                    <p className="text-xs text-navy font-medium mt-1 leading-snug">
                      {issue.reasonText}
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-coral-200/50 flex items-center justify-between">
                      <span className="text-[11px] text-muted">
                        Kursant: <strong className="text-navy">{student?.fullName}</strong>
                      </span>
                      <button
                        onClick={() => {
                          setSelectedIssue(issue);
                          setIsResolveModalOpen(true);
                        }}
                        className="text-xs font-bold text-ocean-strong hover:text-ocean underline underline-offset-2"
                      >
                        Rozwiąż →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={onNavigateToChanges}
              className="w-full mt-4 py-2.5 rounded-xl bg-sand hover:bg-sand-200 text-navy text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              Wszystkie zgłoszenia w Centrum zmian
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Column: Today's Schedule on the water (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-card border border-border flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border">
              <div>
                <h3 className="font-heading font-bold text-lg text-navy">
                  Harmonogram zajęć na wodzie — Dziś
                </h3>
                <p className="text-xs text-muted mt-0.5">
                  Środa, 15 lipca 2026 · Zatoka Pucka (Chałupy 3)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted font-medium">Widok:</span>
                <span className="px-3 py-1 rounded-lg bg-sand-200 text-xs font-bold text-navy">
                  Dzisiejsze lekcje ({todayLessons.length})
                </span>
                <button
                  onClick={onNavigateToSchedule}
                  className="text-xs font-bold text-ocean-strong hover:text-ocean flex items-center gap-1 ml-2"
                >
                  Pełny kalendarz <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* List of Today's Lessons */}
            <div className="divide-y divide-border/60 mt-2">
              {todayLessons.map((lesson) => {
                const student = students.find(s => s.id === lesson.studentId);
                const instructor = instructors.find(i => i.id === lesson.instructorId);

                return (
                  <div
                    key={lesson.id}
                    onClick={() => onOpenLessonDetails(lesson)}
                    className="py-4 hover:bg-sand-50/80 px-2 rounded-xl transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    {/* Time slot & status */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 text-center shrink-0">
                        <span className="text-sm font-extrabold font-heading text-navy block">
                          {lesson.startTime}
                        </span>
                        <span className="text-[11px] text-muted block">
                          {lesson.endTime}
                        </span>
                      </div>

                      <div className="h-10 w-0.5 bg-border group-hover:bg-ocean transition-colors" />

                      {/* Student info */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading font-bold text-sm text-navy group-hover:text-ocean-strong transition-colors">
                            {student?.fullName}
                          </h4>
                          <IkoBadge level={lesson.ikoLevel} />
                        </div>
                        <p className="text-xs text-muted mt-0.5 flex items-center gap-2">
                          <span>Instruktor: <strong className="text-navy">{instructor?.fullName}</strong></span>
                          <span>•</span>
                          <span>Spot: {lesson.spot || 'Chałupy 3'}</span>
                        </p>
                      </div>
                    </div>

                    {/* Right side: Equipment & Status */}
                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <LessonStatusBadge status={lesson.status} />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenLessonDetails(lesson);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-sand group-hover:bg-ocean group-hover:text-white text-navy text-xs font-semibold transition-all"
                      >
                        Szczegóły
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick info note */}
          <div className="mt-6 p-4 rounded-xl bg-sand-100/70 border border-sand-300 flex items-center justify-between text-xs text-muted">
            <span className="flex items-center gap-2">
              <Info size={16} className="text-ocean" />
              Standardowy czas trwania bloku lekcji kitesurfingu wynosi <strong>2 godziny</strong>.
            </span>
            <button
              onClick={() => setIsNewLessonOpen(true)}
              className="font-bold text-ocean-strong hover:underline"
            >
              + Dodaj kolejną
            </button>
          </div>
        </div>
      </div>

      {/* Drawer: Nowa lekcja (US-005) */}
      <Drawer
        isOpen={isNewLessonOpen}
        onClose={() => setIsNewLessonOpen(false)}
        title="Zaplanuj nową lekcję"
        subtitle="Formularz demonstracyjny przydziału kursanta do instruktora"
        footer={
          <>
            <button
              type="button"
              onClick={() => setIsNewLessonOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-border text-navy text-sm font-semibold hover:bg-sand transition-colors"
            >
              Anuluj
            </button>
            <button
              type="button"
              onClick={handleCreateLessonSubmit}
              className="px-5 py-2.5 rounded-xl bg-ocean hover:bg-ocean-strong text-white text-sm font-semibold shadow-md shadow-ocean/20 transition-colors"
            >
              Zapisz lekcję
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateLessonSubmit} className="space-y-4">
          <div className="p-3 bg-ocean-50 rounded-xl border border-ocean-100 text-xs text-ocean-strong flex items-center gap-2">
            <Sparkles size={16} className="shrink-0" />
            <span>Wszystkie formularze działają w jednolitym kontrakcie demonstracyjnym (Section 2).</span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
              Kursant *
            </label>
            <select
              value={formStudentId}
              onChange={(e) => setFormStudentId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm text-navy focus:border-ocean focus:ring-1 focus:ring-ocean bg-white"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.fullName} ({s.ikoLevel.toUpperCase()}, {s.weightKg} kg)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
              Instruktor *
            </label>
            <select
              value={formInstructorId}
              onChange={(e) => setFormInstructorId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm text-navy focus:border-ocean focus:ring-1 focus:ring-ocean bg-white"
            >
              {instructors.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.fullName} ({i.experienceYears} lat dośw., {i.availabilityStatus === 'available' ? 'Dostępny' : i.availabilityStatus})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Data lekcji *
              </label>
              <input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm text-navy bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Godzina startu *
              </label>
              <select
                value={formTime}
                onChange={(e) => setFormTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm text-navy bg-white"
              >
                <option value="08:00">08:00 – 10:00</option>
                <option value="10:00">10:00 – 12:00</option>
                <option value="12:00">12:00 – 14:00</option>
                <option value="14:00">14:00 – 16:00</option>
                <option value="16:00">16:00 – 18:00</option>
              </select>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-sand border border-border/80 text-xs text-muted space-y-1">
            <p className="font-semibold text-navy">Czas trwania: 2 godziny (standard IKO)</p>
            <p>Warunki wiatrowe: 21 kts WNW (Zatoka Pucka · optymalne)</p>
          </div>
        </form>
      </Drawer>

      {/* Drawer: Rozwiąż zgłoszenie / Przypisz zastępstwo (US-013) */}
      <Drawer
        isOpen={isResolveModalOpen}
        onClose={() => setIsResolveModalOpen(false)}
        title="Centrum zmian: Wybór zastępstwa"
        subtitle="Zgłoszona niedyspozycja instruktora"
        footer={
          <>
            <button
              onClick={() => setIsResolveModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-border text-navy text-sm font-semibold hover:bg-sand transition-colors"
            >
              Anuluj
            </button>
            <button
              onClick={handleResolveIssueSubmit}
              className="px-5 py-2.5 rounded-xl bg-ocean hover:bg-ocean-strong text-white text-sm font-semibold shadow-md shadow-ocean/20 transition-colors"
            >
              Przypisz zastępcę
            </button>
          </>
        }
      >
        <div className="space-y-5">
          <div className="p-4 rounded-xl bg-coral-50 border border-coral-200">
            <h4 className="font-bold text-sm text-coral-strong mb-1">
              Problem: Absencja instruktora Piotra Bałtyckiego
            </h4>
            <p className="text-xs text-navy leading-relaxed">
              Lekcja z kursantką <strong>Aleksandrą Wiśniewską</strong> (IKO 2) zaplanowana na dziś 14:00-16:00.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-2">
              Dostępni kandydaci na zastępstwo (zgodność wagowa i IKO)
            </h4>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3.5 rounded-xl border-2 border-ocean bg-ocean-50/50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <input type="radio" name="substitute" defaultChecked className="text-ocean focus:ring-ocean" />
                  <div>
                    <p className="text-sm font-bold text-navy">Tomasz Wiatr</p>
                    <p className="text-xs text-muted">8 lat dośw. • Waga 78 kg • Dostępny w tym oknie</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-success-text">
                  Rekomendowany
                </span>
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-border hover:bg-sand cursor-pointer">
                <div className="flex items-center gap-3">
                  <input type="radio" name="substitute" className="text-ocean focus:ring-ocean" />
                  <div>
                    <p className="text-sm font-bold text-navy">Zofia Błękitna</p>
                    <p className="text-xs text-muted">3 lata dośw. • Waga 58 kg • Dostępna</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-sand-200 text-navy">
                  Dostępna
                </span>
              </label>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
