import React, { useState } from 'react';
import { 
  Lesson, 
  Student, 
  Instructor, 
  Role 
} from '../../types';
import { Drawer } from './Drawer';
import { IkoBadge, LessonStatusBadge, ConfirmationBadge } from './Badge';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Wind, 
  User, 
  Scale, 
  Edit3, 
  UserPlus, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

interface LessonDetailsDrawerProps {
  lesson: Lesson | null;
  onClose: () => void;
  students: Student[];
  instructors: Instructor[];
  currentRole: Role;
  onShowToast: (msg: string) => void;
}

export const LessonDetailsDrawer: React.FC<LessonDetailsDrawerProps> = ({
  lesson,
  onClose,
  students,
  instructors,
  currentRole,
  onShowToast,
}) => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  if (!lesson) return null;

  const student = students.find(s => s.id === lesson.studentId);
  const instructor = instructors.find(i => i.id === lesson.instructorId);

  const handleEditClick = () => {
    onClose();
    onShowToast('To demonstracja — edycja parametrów lekcji.');
  };

  const handleChangeInstructorClick = () => {
    onClose();
    onShowToast('To demonstracja — przejście do wyboru zastępstwa.');
  };

  const handleCancelLessonSubmit = () => {
    setShowCancelConfirm(false);
    onClose();
    onShowToast('To demonstracja — lekcja została odwołana w trybie demo.');
  };

  return (
    <Drawer
      isOpen={Boolean(lesson)}
      onClose={() => {
        setShowCancelConfirm(false);
        onClose();
      }}
      title="Szczegóły lekcji kitesurfingu"
      subtitle={`Lekcja #${lesson.id} · ${lesson.date} (${lesson.startTime} – ${lesson.endTime})`}
      footer={
        currentRole === 'manager' ? (
          <>
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="px-3.5 py-2.5 rounded-xl text-coral-strong hover:bg-coral-50 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Trash2 size={15} />
              Odwołaj lekcję
            </button>
            <button
              onClick={handleChangeInstructorClick}
              className="px-3.5 py-2.5 rounded-xl border border-border text-navy hover:bg-sand text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <UserPlus size={15} />
              Zmień instruktora
            </button>
            <button
              onClick={handleEditClick}
              className="px-4 py-2.5 rounded-xl bg-ocean hover:bg-ocean-strong text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Edit3 size={15} />
              Edytuj lekcję
            </button>
          </>
        ) : (
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-colors"
          >
            Zamknij podgląd
          </button>
        )
      }
    >
      <div className="space-y-6">
        {/* Status header banner */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-sand-100 border border-border">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted">Status lekcji:</span>
            <LessonStatusBadge status={lesson.status} />
          </div>
          <ConfirmationBadge status={lesson.confirmationStatus} />
        </div>

        {/* Confirmation dialog confirmation state */}
        {showCancelConfirm && (
          <div className="p-4 rounded-2xl bg-coral-50 border-2 border-coral-strong/30 space-y-3 animate-in fade-in">
            <div className="flex items-center gap-2 text-coral-strong">
              <AlertTriangle size={18} />
              <h4 className="font-bold text-sm">Czy na pewno chcesz odwołać tę lekcję?</h4>
            </div>
            <p className="text-xs text-navy leading-relaxed">
              Odwołanie lekcji wyśle powiadomienie SMS do kursanta ({student?.fullName}) oraz zwolni slot instruktora.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="px-3 py-1.5 rounded-lg border border-border bg-white text-xs font-bold text-navy"
              >
                Cofnij
              </button>
              <button
                onClick={handleCancelLessonSubmit}
                className="px-3 py-1.5 rounded-lg bg-coral-strong text-white text-xs font-bold hover:bg-red-700"
              >
                Odwołaj lekcję demonstracyjnie
              </button>
            </div>
          </div>
        )}

        {/* Time and Spot */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white border border-border flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-ocean-50 text-ocean-strong flex items-center justify-center shrink-0">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-[10px] text-muted uppercase font-bold">Czas trwania</p>
              <p className="text-xs font-bold text-navy">{lesson.startTime} – {lesson.endTime} (2h)</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-border flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-coral-50 text-coral-strong flex items-center justify-center shrink-0">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-[10px] text-muted uppercase font-bold">Lokalizacja</p>
              <p className="text-xs font-bold text-navy">{lesson.spot || 'Chałupy 3 Zatoka'}</p>
            </div>
          </div>
        </div>

        {/* Student Section */}
        <div className="p-4 rounded-2xl bg-white border border-border space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
            Kursant na wodzie
          </span>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {student?.avatar ? (
                <img src={student.avatar} alt={student.fullName} className="w-12 h-12 rounded-xl object-cover ring-1 ring-border" />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-sand-200 text-navy font-bold flex items-center justify-center text-sm">
                  {student?.fullName.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <div>
                <h4 className="font-heading font-bold text-sm text-navy">{student?.fullName}</h4>
                <p className="text-xs text-muted flex items-center gap-2 mt-0.5">
                  <span>Waga: <strong>{student?.weightKg} kg</strong></span>
                  <span>•</span>
                  <span>{student?.phone}</span>
                </p>
              </div>
            </div>
            <IkoBadge level={lesson.ikoLevel} />
          </div>
        </div>

        {/* Instructor Section */}
        <div className="p-4 rounded-2xl bg-white border border-border space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
            Instruktor prowadzący
          </span>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {instructor?.avatar ? (
                <img src={instructor.avatar} alt={instructor.fullName} className="w-12 h-12 rounded-xl object-cover ring-1 ring-border" />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-sand-200 text-navy font-bold flex items-center justify-center text-sm">
                  {instructor?.fullName.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <div>
                <h4 className="font-heading font-bold text-sm text-navy">{instructor?.fullName}</h4>
                <p className="text-xs text-muted mt-0.5">
                  Doświadczenie: <strong>{instructor?.experienceYears} lat</strong> · Waga: {instructor?.weightKg} kg
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sand-200 text-navy">
              Instruktor IKO
            </span>
          </div>
        </div>

        {/* Equipment & Wind */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-sand-50 to-sand-100 border border-border space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-navy">
            <Wind size={16} className="text-ocean" />
            <span>Wyposażenie i dobór sprzętu pod wiatr</span>
          </div>
          <p className="text-muted leading-relaxed">
            {lesson.equipmentInfo || 'Zestaw szkoleniowy Kite Duotone Neo + deska twintip + kask z komunikacją radiową.'}
          </p>
          <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted">
            <span>Prognoza na spot: 21 kts WNW</span>
            <span className="font-bold text-ocean-strong">Warunki optymalne</span>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
