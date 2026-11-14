import React, { useState } from 'react';
import { 
  Student, 
  Instructor, 
  Lesson, 
  Role 
} from '../types';
import { 
  DEMO_DATE, 
  DEMO_WEEK_LABEL 
} from '../mocks/fixtures';
import { IkoBadge, LessonStatusBadge } from '../components/common/Badge';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Plus, 
  Clock, 
  MapPin, 
  Wind, 
  User, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface SchedulePageProps {
  currentRole: Role;
  students: Student[];
  instructors: Instructor[];
  lessons: Lesson[];
  onOpenLessonDetails: (lesson: Lesson) => void;
  onOpenNewLesson: () => void;
  onShowToast: (msg: string) => void;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({
  currentRole,
  students,
  instructors,
  lessons,
  onOpenLessonDetails,
  onOpenNewLesson,
  onShowToast,
}) => {
  const [selectedInstructorId, setSelectedInstructorId] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [activeDayDate, setActiveDayDate] = useState<string>(DEMO_DATE);

  // Week days for 13-19 July 2026
  const weekDays = [
    { date: '2026-07-13', name: 'Poniedziałek', shortName: 'Pon', dayNum: '13' },
    { date: '2026-07-14', name: 'Wtorek', shortName: 'Wt', dayNum: '14' },
    { date: '2026-07-15', name: 'Środa (Dzień Demo)', shortName: 'Śr', dayNum: '15', isDemoDay: true },
    { date: '2026-07-16', name: 'Czwartek', shortName: 'Czw', dayNum: '16' },
    { date: '2026-07-17', name: 'Piątek', shortName: 'Pt', dayNum: '17' },
    { date: '2026-07-18', name: 'Sobota', shortName: 'Sob', dayNum: '18' },
    { date: '2026-07-19', name: 'Niedziela', shortName: 'Ndz', dayNum: '19' },
  ];

  const timeSlots = [
    { start: '08:00', end: '10:00' },
    { start: '10:00', end: '12:00' },
    { start: '12:00', end: '14:00' },
    { start: '14:00', end: '16:00' },
    { start: '16:00', end: '18:00' },
  ];

  // Filter lessons by instructor
  const filteredLessons = lessons.filter(lesson => {
    if (selectedInstructorId !== 'all' && lesson.instructorId !== selectedInstructorId) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-card border border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-ocean-strong">
              Harmonogram Szkoły Kitesurfingu
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sand-200 text-navy">
              Półwysep Helski
            </span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-navy">
            Kalendarz zajęć na wodzie
          </h1>
          <p className="text-xs text-muted mt-1">
            Tydzień demonstracyjny: <strong className="text-navy">{DEMO_WEEK_LABEL}</strong> · Środa 15.07 to dzień bieżący
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Day / Week View Switcher */}
          <div className="bg-sand-200 p-1 rounded-xl flex items-center border border-border">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'week' ? 'bg-white text-navy shadow-sm' : 'text-muted hover:text-navy'
              }`}
            >
              Widok tygodnia
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'day' ? 'bg-white text-navy shadow-sm' : 'text-muted hover:text-navy'
              }`}
            >
              Widok dnia (Środa)
            </button>
          </div>

          <button
            onClick={onOpenNewLesson}
            className="px-4 py-2 rounded-xl bg-ocean hover:bg-ocean-strong text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
          >
            <Plus size={16} />
            Dodaj lekcję
          </button>
        </div>
      </div>

      {/* Instructor Filter Pills */}
      <div className="bg-white p-4 rounded-2xl shadow-card border border-border flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-navy">
          <Filter size={16} className="text-ocean" />
          <span>Filtruj wg instruktora:</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedInstructorId('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedInstructorId === 'all'
                ? 'bg-navy text-white'
                : 'bg-sand hover:bg-sand-200 text-muted'
            }`}
          >
            Wszyscy ({instructors.length})
          </button>
          {instructors.map((inst) => {
            const isSelected = selectedInstructorId === inst.id;
            return (
              <button
                key={inst.id}
                onClick={() => setSelectedInstructorId(inst.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-ocean-strong text-white'
                    : 'bg-sand hover:bg-sand-200 text-navy'
                }`}
              >
                <span>{inst.fullName.split(' ')[0]}</span>
                {inst.availabilityStatus === 'absent' && (
                  <span className="w-2 h-2 rounded-full bg-coral inline-block" title="Nieobecny" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Calendar Grid View */}
      {viewMode === 'week' ? (
        <div className="bg-white rounded-2xl shadow-card border border-border overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Days Header */}
            <div className="grid grid-cols-8 border-b border-border bg-sand-50/70">
              <div className="p-3 text-center text-xs font-bold uppercase tracking-wider text-muted border-r border-border flex items-center justify-center">
                Godzina
              </div>
              {weekDays.map((day) => (
                <div
                  key={day.date}
                  className={`p-3 text-center border-r border-border last:border-r-0 ${
                    day.isDemoDay ? 'bg-ocean-50/60' : ''
                  }`}
                >
                  <p className="text-xs text-muted font-medium">{day.shortName}</p>
                  <p className="text-base font-extrabold font-heading text-navy">
                    {day.dayNum}.07
                  </p>
                  {day.isDemoDay && (
                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-ocean text-white uppercase tracking-wider">
                      Dziś
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Time Slot Rows */}
            <div className="divide-y divide-border/60">
              {timeSlots.map((slot) => (
                <div key={slot.start} className="grid grid-cols-8 min-h-[110px]">
                  {/* Time label */}
                  <div className="p-3 border-r border-border bg-sand-50/30 flex flex-col justify-center items-center text-center">
                    <span className="text-xs font-bold text-navy font-heading">
                      {slot.start}
                    </span>
                    <span className="text-[10px] text-muted">
                      {slot.end}
                    </span>
                    <span className="text-[9px] text-ocean-strong font-semibold mt-1">
                      2h blok
                    </span>
                  </div>

                  {/* Days cells */}
                  {weekDays.map((day) => {
                    // Find lessons in this slot on this day
                    const slotLessons = filteredLessons.filter(
                      l => l.date === day.date && l.startTime === slot.start
                    );

                    return (
                      <div
                        key={day.date}
                        className={`p-1.5 border-r border-border last:border-r-0 flex flex-col gap-1.5 ${
                          day.isDemoDay ? 'bg-ocean-50/20' : ''
                        }`}
                      >
                        {slotLessons.map((lesson) => {
                          const student = students.find(s => s.id === lesson.studentId);
                          const instructor = instructors.find(i => i.id === lesson.instructorId);

                          const isAlert = lesson.status === 'needs-change';
                          const isCompleted = lesson.status === 'completed';

                          return (
                            <div
                              key={lesson.id}
                              onClick={() => onOpenLessonDetails(lesson)}
                              className={`p-2 rounded-xl text-left cursor-pointer transition-all hover:scale-[1.02] shadow-sm border ${
                                isAlert
                                  ? 'bg-coral-50 border-coral-200 text-coral-strong'
                                  : isCompleted
                                  ? 'bg-sand border-border text-muted'
                                  : 'bg-white border-ocean-100 hover:border-ocean text-navy shadow-card'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-extrabold uppercase tracking-wider">
                                  {lesson.startTime}
                                </span>
                                <IkoBadge level={lesson.ikoLevel} className="text-[9px] px-1.5 py-0" />
                              </div>

                              <p className="text-xs font-bold text-navy line-clamp-1">
                                {student?.fullName}
                              </p>

                              <p className="text-[11px] text-muted truncate mt-0.5">
                                Inst: {instructor?.fullName.split(' ')[0]}
                              </p>

                              {isAlert && (
                                <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-coral-strong">
                                  <AlertCircle size={10} />
                                  <span>Wymaga uwagi</span>
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {slotLessons.length === 0 && (
                          <div 
                            onClick={onOpenNewLesson}
                            className="h-full w-full rounded-lg border border-dashed border-transparent hover:border-sand-300 hover:bg-sand-50 flex items-center justify-center group cursor-pointer transition-colors"
                          >
                            <span className="text-sand-300 group-hover:text-ocean text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                              + wolny slot
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Single Day View (Focused on Demo Day 15.07) */
        <div className="bg-white rounded-2xl shadow-card border border-border p-6 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <h3 className="font-heading font-bold text-lg text-navy">
                Plan dnia: Środa, 15 lipca 2026
              </h3>
              <p className="text-xs text-muted">
                Spot Chałupy 3 · Wiatr 21 kts WNW · 6 zaplanowanych lekcji dwugodzinnych
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-ocean-50 text-ocean-strong">
              Dzień Demo
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {timeSlots.map((slot) => {
              const slotLessons = filteredLessons.filter(
                l => l.date === DEMO_DATE && l.startTime === slot.start
              );

              return (
                <div key={slot.start} className="p-4 rounded-xl border border-border bg-sand-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-sm text-navy">
                      Godz. {slot.start} – {slot.end}
                    </span>
                    <span className="text-xs text-muted font-medium">
                      {slotLessons.length} lekcja(e)
                    </span>
                  </div>

                  {slotLessons.length > 0 ? (
                    slotLessons.map(l => {
                      const student = students.find(s => s.id === l.studentId);
                      const instructor = instructors.find(i => i.id === l.instructorId);

                      return (
                        <div
                          key={l.id}
                          onClick={() => onOpenLessonDetails(l)}
                          className="p-3 bg-white rounded-xl border border-border hover:border-ocean cursor-pointer transition-all shadow-sm flex items-center justify-between"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-navy">{student?.fullName}</span>
                              <IkoBadge level={l.ikoLevel} />
                            </div>
                            <p className="text-xs text-muted mt-0.5">
                              Instruktor: <strong>{instructor?.fullName}</strong> ({instructor?.weightKg} kg)
                            </p>
                          </div>
                          <LessonStatusBadge status={l.status} />
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-4 text-center text-xs text-muted italic">
                      Brak zaplanowanych zajęć w tym oknie
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
