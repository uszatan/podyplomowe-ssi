import React, { useState, useRef } from 'react';
import { 
  Student, 
  Instructor, 
  Lesson, 
  WeatherFixture 
} from '../types';
import { IkoBadge, LessonStatusBadge, ConfirmationBadge } from '../components/common/Badge';
import { Drawer } from '../components/common/Drawer';
import { 
  Award, 
  Calendar, 
  Clock, 
  Wind, 
  CheckCircle2, 
  PenTool, 
  SendHorizontal, 
  Sparkles,
  MapPin,
  Waves,
  User
} from 'lucide-react';

interface StudentDashboardPageProps {
  student: Student;
  instructors: Instructor[];
  lessons: Lesson[];
  weather: WeatherFixture;
  onShowToast: (msg: string) => void;
  onOpenLessonDetails: (lesson: Lesson) => void;
}

export const StudentDashboardPage: React.FC<StudentDashboardPageProps> = ({
  student,
  instructors,
  lessons,
  weather,
  onShowToast,
  onOpenLessonDetails,
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [selectedPendingLesson, setSelectedPendingLesson] = useState<Lesson | null>(null);
  const [signatureText, setSignatureText] = useState('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Student's upcoming and completed lessons
  const studentUpcomingLessons = lessons.filter(
    l => l.studentId === student.id && (l.status === 'planned' || l.status === 'needs-change')
  );
  const studentHistoryLessons = lessons.filter(
    l => l.studentId === student.id && l.status === 'completed'
  );

  // Nearest lesson (today 10:00 with Marta Falista)
  const nextLesson = studentUpcomingLessons[0];
  const nextInstructor = instructors.find(i => i.id === nextLesson?.instructorId);

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEnrollOpen(false);
    onShowToast('To demonstracja — preferencje terminu zostały przesłane do szkoły.');
  };

  const handleConfirmSignature = () => {
    setSelectedPendingLesson(null);
    setSignatureText('');
    onShowToast('To demonstracja — podpis demonstracyjny złożony bez skutków prawnych.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-card border border-border/80 bg-gradient-to-r from-navy via-ocean-strong to-ocean text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-sand-100 text-xs font-semibold">
              <Waves size={14} className="text-sand-100" /> Profil Kursantki · KiteSchool Hel
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              Dzień dobry, {student.fullName.split(' ')[0]}! 🪁
            </h1>
            <p className="text-sm text-sand-100 leading-relaxed">
              Dziś na Półwyspie Helskim wieje idealne <strong className="text-white">21 węzłów</strong>. 
              Twoja najbliższa lekcja na wodzie startuje o <strong className="text-white">10:00</strong>.
            </p>
          </div>

          <button
            onClick={() => setIsEnrollOpen(true)}
            className="px-5 py-3 rounded-2xl bg-white hover:bg-sand-50 text-navy font-bold text-sm shadow-lg shadow-black/10 transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <SendHorizontal size={18} className="text-ocean-strong" />
            Zgłoś chęć na kolejną lekcję
          </button>
        </div>
      </div>

      {/* Grid: Next Lesson & IKO Passport Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Lesson Card (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-card border border-border">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-ocean-50 text-ocean-strong flex items-center justify-center">
                <Calendar size={18} />
              </div>
              <h3 className="font-heading font-bold text-base text-navy">
                Twoja najbliższa lekcja na wodzie
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-success-text">
              Dziś · Potwierdzona
            </span>
          </div>

          {nextLesson ? (
            <div className="mt-4 p-5 rounded-2xl bg-sand-50/80 border border-sand-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-extrabold font-heading text-navy">
                    {nextLesson.startTime} – {nextLesson.endTime}
                  </span>
                  <IkoBadge level={nextLesson.ikoLevel} />
                </div>

                <div className="space-y-1 text-xs text-muted">
                  <p className="flex items-center gap-2 text-navy font-medium">
                    <User size={14} className="text-ocean" />
                    Instruktor prowadzący: <strong>{nextInstructor?.fullName}</strong> ({nextInstructor?.experienceYears} lat doświadczenia)
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={14} className="text-coral" />
                    Spot: {nextLesson.spot || 'Chałupy 3 Zatoka'}
                  </p>
                  <p className="flex items-center gap-2">
                    <Wind size={14} className="text-ocean" />
                    Sprzęt: {nextLesson.equipmentInfo || 'Duotone Neo + deska twintip'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onOpenLessonDetails(nextLesson)}
                className="px-4 py-2.5 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-colors self-start md:self-center"
              >
                Szczegóły lekcji
              </button>
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-muted">
              Brak zaplanowanych zajęć na dziś
            </div>
          )}
        </div>

        {/* IKO Passport Status (1 col) */}
        <div className="bg-white rounded-2xl p-6 shadow-card border border-border flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Award size={20} className="text-ocean-strong" />
              <h3 className="font-heading font-bold text-base text-navy">
                Paszport IKO Kursanta
              </h3>
            </div>

            <div className="my-4 text-center">
              <span className="text-3xl font-extrabold font-heading text-ocean-strong">
                Level 2
              </span>
              <p className="text-xs font-bold text-navy mt-1">Intermediate Kiter</p>
              <p className="text-xs text-muted mt-2">
                Pływanie w obu halsach, samodzielny start z wody i zwroty na zatoce.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-sand border border-sand-300 text-xs text-muted space-y-1">
              <div className="flex justify-between font-medium">
                <span>Zrealizowane godziny:</span>
                <strong className="text-navy">{student.completedLessonCount * 2} h na wodzie</strong>
              </div>
              <div className="flex justify-between font-medium">
                <span>Waga doboru latawca:</span>
                <strong className="text-navy">{student.weightKg} kg</strong>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-muted text-center italic mt-4">
            Certyfikacja IKO International Kiteboarding Organization
          </p>
        </div>
      </div>

      {/* Tabs: Moje zajęcia (Nadchodzące vs Historia) */}
      <div className="bg-white rounded-2xl shadow-card border border-border p-6">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`pb-2 text-sm font-bold border-b-2 transition-all ${
                activeTab === 'upcoming'
                  ? 'border-ocean text-ocean-strong'
                  : 'border-transparent text-muted hover:text-navy'
              }`}
            >
              Nadchodzące lekcje ({studentUpcomingLessons.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`pb-2 text-sm font-bold border-b-2 transition-all ${
                activeTab === 'history'
                  ? 'border-ocean text-ocean-strong'
                  : 'border-transparent text-muted hover:text-navy'
              }`}
            >
              Historia i podpisy ({studentHistoryLessons.length})
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {activeTab === 'upcoming' ? (
            studentUpcomingLessons.map(l => {
              const inst = instructors.find(i => i.id === l.instructorId);
              return (
                <div
                  key={l.id}
                  onClick={() => onOpenLessonDetails(l)}
                  className="p-4 rounded-xl border border-border bg-white hover:border-ocean cursor-pointer transition-all flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-navy">{l.date} · godz. {l.startTime} – {l.endTime}</span>
                      <IkoBadge level={l.ikoLevel} />
                    </div>
                    <p className="text-xs text-muted mt-1">
                      Instruktor: <strong>{inst?.fullName}</strong> · Spot: {l.spot || 'Chałupy 3'}
                    </p>
                  </div>
                  <LessonStatusBadge status={l.status} />
                </div>
              );
            })
          ) : (
            studentHistoryLessons.map(l => {
              const inst = instructors.find(i => i.id === l.instructorId);
              const isPending = l.confirmationStatus === 'pending';

              return (
                <div
                  key={l.id}
                  className="p-4 rounded-xl border border-border bg-sand-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-navy">{l.date} · 2 godziny na wodzie</span>
                      <ConfirmationBadge status={l.confirmationStatus} />
                    </div>
                    <p className="text-xs text-muted mt-1">
                      Instruktor: {inst?.fullName} · {l.equipmentInfo || 'Szkolenie IKO 2'}
                    </p>
                  </div>

                  {isPending ? (
                    <button
                      onClick={() => setSelectedPendingLesson(l)}
                      className="px-4 py-2 rounded-xl bg-ocean hover:bg-ocean-strong text-white text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto shadow-sm"
                    >
                      <PenTool size={14} />
                      Potwierdź odbycie (podpis)
                    </button>
                  ) : (
                    <span className="text-xs text-success-text font-bold flex items-center gap-1">
                      <CheckCircle2 size={14} /> Podpisano w paszporcie
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Drawer: Zgłoszenie na lekcję (US-022) */}
      <Drawer
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
        title="Zgłoś chęć na lekcję"
        subtitle="Zgłoszenie preferencji terminu na Zatoce Puckiej"
        footer={
          <>
            <button
              onClick={() => setIsEnrollOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-border text-navy text-sm font-semibold hover:bg-sand transition-colors"
            >
              Anuluj
            </button>
            <button
              onClick={handleEnrollSubmit}
              className="px-5 py-2.5 rounded-xl bg-ocean hover:bg-ocean-strong text-white text-sm font-semibold transition-colors"
            >
              Wyślij zgłoszenie
            </button>
          </>
        }
      >
        <form onSubmit={handleEnrollSubmit} className="space-y-4">
          <div className="p-3 rounded-xl bg-ocean-50 text-xs text-ocean-strong">
            Zgłoszenie trafia do dyspozytora szkoły, który dopasuje instruktora z uwzględnieniem prognozy wiatru.
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
              Twój obecny poziom IKO
            </label>
            <input
              type="text"
              readOnly
              value="IKO Level 2 (Intermediate)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-sand-100 text-sm font-semibold text-navy cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Preferowana data *
              </label>
              <input
                type="date"
                defaultValue="2026-07-16"
                className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm text-navy"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Preferowana godzina *
              </label>
              <select className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm text-navy bg-white">
                <option>10:00 – 12:00</option>
                <option>12:00 – 14:00</option>
                <option>14:00 – 16:00</option>
                <option>16:00 – 18:00</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
              Dodatkowe uwagi / cele szkolenia
            </label>
            <textarea
              rows={3}
              placeholder="np. Chcę przećwiczyć płynne zwroty przez rufę i start z głębokiej wody..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm text-navy"
            />
          </div>
        </form>
      </Drawer>

      {/* Drawer: Potwierdzenie odbycia lekcji & Podpis demonstracyjny (US-024) */}
      <Drawer
        isOpen={Boolean(selectedPendingLesson)}
        onClose={() => setSelectedPendingLesson(null)}
        title="Potwierdzenie odbycia lekcji"
        subtitle="Wpis do Paszportu Szkoleniowego IKO"
        footer={
          <>
            <button
              onClick={() => setSelectedPendingLesson(null)}
              className="px-4 py-2.5 rounded-xl border border-border text-navy text-sm font-semibold hover:bg-sand transition-colors"
            >
              Anuluj
            </button>
            <button
              onClick={handleConfirmSignature}
              className="px-5 py-2.5 rounded-xl bg-ocean hover:bg-ocean-strong text-white text-sm font-semibold transition-colors"
            >
              Potwierdź odbycie lekcji
            </button>
          </>
        }
      >
        <div className="space-y-5">
          <div className="p-4 rounded-xl bg-sand-100 border border-border text-xs text-navy space-y-1">
            <p className="font-bold">Termin: {selectedPendingLesson?.date} · 14:00 – 16:00 (2h)</p>
            <p>Instruktor: Marta Falista (IKO Level 2)</p>
            <p>Spot: Chałupy 3 Zatoka Pucka</p>
          </div>

          {/* Signature area */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
              Podpis demonstracyjny (szkic lub imię) *
            </label>
            <div className="h-32 border-2 border-dashed border-border rounded-xl bg-white flex flex-col items-center justify-center p-3 relative">
              <span className="text-xs text-muted mb-2">
                Pole podpisu demonstracyjnego (bez skutków prawnych)
              </span>
              <input
                type="text"
                placeholder="Wpisz imię i nazwisko jako podpis..."
                value={signatureText}
                onChange={(e) => setSignatureText(e.target.value)}
                className="w-full max-w-sm px-3 py-2 text-center border-b border-navy focus:outline-none text-navy font-semibold text-sm"
              />
            </div>
            <p className="text-[11px] text-muted mt-1.5">
              Zgodnie z Section 2 i Section 6 specyfikacji: podpis nie jest utrwalany w bazach i ma charakter demonstracyjny.
            </p>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
