import React, { useState } from 'react';
import { 
  Student, 
  Instructor, 
  Lesson, 
  IkoLevel, 
  Role 
} from '../types';
import { IkoBadge, LessonStatusBadge, ConfirmationBadge } from '../components/common/Badge';
import { Drawer } from '../components/common/Drawer';
import { 
  Search, 
  Plus, 
  Filter, 
  Phone, 
  Mail, 
  Scale, 
  Clock, 
  Award, 
  Calendar, 
  User, 
  Edit3, 
  CheckCircle2, 
  FileText,
  Sparkles
} from 'lucide-react';

interface StudentsPageProps {
  currentRole: Role;
  students: Student[];
  instructors: Instructor[];
  lessons: Lesson[];
  onShowToast: (msg: string) => void;
  onOpenLessonDetails: (lesson: Lesson) => void;
}

export const StudentsPage: React.FC<StudentsPageProps> = ({
  currentRole,
  students,
  instructors,
  lessons,
  onShowToast,
  onOpenLessonDetails,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIko, setSelectedIko] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // New student form states
  const [newName, setNewName] = useState('');
  const [newIko, setNewIko] = useState<IkoLevel>('beginner');
  const [newWeight, setNewWeight] = useState('70');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');

  // Filter students by search query and IKO level
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.email && student.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesIko = selectedIko === 'all' || student.ikoLevel === selectedIko;
    return matchesSearch && matchesIko;
  });

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddStudentOpen(false);
    onShowToast('To demonstracja — dane nowego kursanta nie zostały zapisane.');
  };

  const handleEditStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditProfileOpen(false);
    onShowToast('To demonstracja — profil kursanta nie został zmodyfikowany.');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-card border border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-ocean-strong">
              Baza Szkoleniowa & Paszporty IKO
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sand-200 text-navy">
              {students.length} kursantów
            </span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-navy">
            Kursanci KiteSchool
          </h1>
          <p className="text-xs text-muted mt-1">
            Przeglądaj profile, historię godzin na wodzie oraz postępy certyfikacji IKO
          </p>
        </div>

        <button
          onClick={() => setIsAddStudentOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-ocean hover:bg-ocean-strong text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors self-start md:self-auto"
        >
          <Plus size={16} />
          Dodaj kursanta
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-card border border-border flex flex-col sm:flex-row items-center gap-4 justify-between">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search size={18} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Szukaj kursanta (imię, e-mail)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border text-xs text-navy focus:outline-none focus:border-ocean focus:ring-1 focus:ring-ocean bg-sand-50/50"
          />
        </div>

        {/* IKO Level Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-muted mr-1 hidden lg:inline">Poziom:</span>
          {[
            { id: 'all', label: 'Wszyscy' },
            { id: 'beginner', label: 'Początkujący' },
            { id: 'iko1', label: 'IKO 1' },
            { id: 'iko2', label: 'IKO 2' },
            { id: 'iko3', label: 'IKO 3' },
          ].map((tab) => {
            const isActive = selectedIko === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedIko(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-navy text-white'
                    : 'bg-sand hover:bg-sand-200 text-muted'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-white rounded-2xl shadow-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-sand-50/80 text-[11px] font-bold uppercase tracking-wider text-muted">
                <th className="py-4 px-6">Kursant</th>
                <th className="py-4 px-4">Poziom IKO</th>
                <th className="py-4 px-4">Waga</th>
                <th className="py-4 px-4">Odbyte lekcje</th>
                <th className="py-4 px-4">Ostatnie zajęcia</th>
                <th className="py-4 px-6 text-right">Akcja</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-sm">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const prefInstructor = instructors.find(i => i.id === student.preferredInstructorId);

                  return (
                    <tr
                      key={student.id}
                      onClick={() => setSelectedStudent(student)}
                      className="hover:bg-sand-50/70 cursor-pointer transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {student.avatar ? (
                            <img
                              src={student.avatar}
                              alt={student.fullName}
                              className="w-10 h-10 rounded-xl object-cover ring-1 ring-border group-hover:ring-ocean transition-all"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-sand-200 text-navy font-bold flex items-center justify-center text-xs">
                              {student.fullName.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-navy group-hover:text-ocean-strong transition-colors">
                              {student.fullName}
                            </p>
                            <p className="text-xs text-muted">
                              {student.email || 'Brak e-mail'}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <IkoBadge level={student.ikoLevel} />
                      </td>

                      <td className="py-4 px-4 text-xs font-semibold text-navy">
                        {student.weightKg ? `${student.weightKg} kg` : '—'}
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-bold text-navy text-xs px-2.5 py-1 rounded-lg bg-sand-100">
                          {student.completedLessonCount} ({student.completedLessonCount * 2}h na wodzie)
                        </span>
                      </td>

                      <td className="py-4 px-4 text-xs text-muted">
                        {student.lastLessonDate ? (
                          <span className="font-medium text-navy">{student.lastLessonDate}</span>
                        ) : (
                          <span className="text-sand-300 italic">Brak wcześniejszych</span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStudent(student);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-sand group-hover:bg-ocean group-hover:text-white text-navy text-xs font-semibold transition-all"
                        >
                          Zobacz profil
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted">
                    <p className="text-sm font-semibold">Nie znaleziono kursantów spełniających kryteria</p>
                    <button
                      onClick={() => { setSearchTerm(''); setSelectedIko('all'); }}
                      className="mt-2 text-xs font-bold text-ocean-strong hover:underline"
                    >
                      Wyczyść filtry wyszukiwania
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer: Profil Kursanta (US-008) */}
      <Drawer
        isOpen={Boolean(selectedStudent)}
        onClose={() => setSelectedStudent(null)}
        title={selectedStudent?.fullName || 'Profil kursanta'}
        subtitle={`Paszport szkoleniowy · ${selectedStudent?.ikoLevel.toUpperCase()}`}
        footer={
          <>
            <button
              onClick={() => setSelectedStudent(null)}
              className="px-4 py-2.5 rounded-xl border border-border text-navy text-sm font-semibold hover:bg-sand transition-colors"
            >
              Zamknij
            </button>
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-navy hover:bg-navy-light text-white text-sm font-semibold flex items-center gap-2 transition-colors"
            >
              <Edit3 size={15} />
              Edytuj profil
            </button>
          </>
        }
      >
        {selectedStudent && (
          <div className="space-y-6">
            {/* Header info card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-sand-100/60 border border-border">
              {selectedStudent.avatar ? (
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.fullName}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-ocean"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-sand-300 text-navy font-bold text-xl flex items-center justify-center">
                  {selectedStudent.fullName.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-lg text-navy">{selectedStudent.fullName}</h3>
                  <IkoBadge level={selectedStudent.ikoLevel} />
                </div>
                <p className="text-xs text-muted flex items-center gap-3">
                  <span className="flex items-center gap-1"><Scale size={13} className="text-ocean" /> Waga: <strong>{selectedStudent.weightKg} kg</strong></span>
                  <span>•</span>
                  <span>Odbyte lekcje: <strong>{selectedStudent.completedLessonCount}</strong></span>
                </p>
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold uppercase tracking-wider text-muted">Dane kontaktowe</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white border border-border flex items-center gap-2">
                  <Phone size={15} className="text-ocean" />
                  <span className="font-medium text-navy">{selectedStudent.phone || 'Brak telefonu'}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-border flex items-center gap-2">
                  <Mail size={15} className="text-ocean" />
                  <span className="font-medium text-navy truncate">{selectedStudent.email || 'Brak email'}</span>
                </div>
              </div>
            </div>

            {/* Paszport IKO Status progress bar */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-ocean-50 to-sand-100 border border-ocean-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-ocean-strong" />
                  <h4 className="font-heading font-bold text-sm text-navy">
                    Status Certyfikacji IKO
                  </h4>
                </div>
                <span className="text-xs font-bold text-ocean-strong uppercase">
                  {selectedStudent.ikoLevel}
                </span>
              </div>
              <p className="text-xs text-muted">
                {selectedStudent.ikoLevel === 'beginner' && 'Wstęp do kitesurfingu, zasady bezpieczeństwa, kontrola małego latawca na lądzie.'}
                {selectedStudent.ikoLevel === 'iko1' && 'Start latawca z wody, bodydragi z wiatrem i pod wiatr, self-rescue.'}
                {selectedStudent.ikoLevel === 'iko2' && 'Start na desce (waterstart), pływanie w obu halsach, kontrola prędkości.'}
                {selectedStudent.ikoLevel === 'iko3' && 'Samodzielny kitesurfer: zwroty, pływanie ostro pod wiatr, pierwsze skoki.'}
              </p>
            </div>

            {/* Nadchodzące zajęcia */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-muted mb-2">
                Nadchodzące zajęcia kursanta
              </h4>
              {lessons.filter(l => l.studentId === selectedStudent.id && (l.status === 'planned' || l.status === 'needs-change')).length > 0 ? (
                <div className="space-y-2">
                  {lessons
                    .filter(l => l.studentId === selectedStudent.id && (l.status === 'planned' || l.status === 'needs-change'))
                    .map(l => {
                      const inst = instructors.find(i => i.id === l.instructorId);
                      return (
                        <div
                          key={l.id}
                          onClick={() => onOpenLessonDetails(l)}
                          className="p-3 rounded-xl border border-border bg-white hover:border-ocean cursor-pointer flex items-center justify-between transition-colors"
                        >
                          <div>
                            <p className="text-xs font-bold text-navy">
                              {l.date} · godz. {l.startTime} – {l.endTime}
                            </p>
                            <p className="text-[11px] text-muted">
                              Instruktor: {inst?.fullName} · {l.spot}
                            </p>
                          </div>
                          <LessonStatusBadge status={l.status} />
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-sand text-xs text-muted text-center italic">
                  Brak zaplanowanych kolejnych lekcji
                </div>
              )}
            </div>

            {/* Historia odbytych lekcji */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-muted mb-2">
                Historia odbytych lekcji
              </h4>
              {lessons.filter(l => l.studentId === selectedStudent.id && l.status === 'completed').length > 0 ? (
                <div className="space-y-2">
                  {lessons
                    .filter(l => l.studentId === selectedStudent.id && l.status === 'completed')
                    .map(l => {
                      const inst = instructors.find(i => i.id === l.instructorId);
                      return (
                        <div
                          key={l.id}
                          onClick={() => onOpenLessonDetails(l)}
                          className="p-3 rounded-xl border border-border bg-sand-50/50 hover:bg-sand cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <p className="text-xs font-bold text-navy">
                              {l.date} (2h na wodzie)
                            </p>
                            <p className="text-[11px] text-muted">
                              Instruktor: {inst?.fullName}
                            </p>
                          </div>
                          <ConfirmationBadge status={l.confirmationStatus} />
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-sand text-xs text-muted text-center italic">
                  Brak wcześniejszej historii w systemie
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>

      {/* Drawer: Dodaj nowego kursanta (US-009) */}
      <Drawer
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        title="Nowy kursant"
        subtitle="Formularz rejestracji kursanta w bazie KiteSchool"
        footer={
          <>
            <button
              onClick={() => setIsAddStudentOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-border text-navy text-sm font-semibold hover:bg-sand transition-colors"
            >
              Anuluj
            </button>
            <button
              onClick={handleAddStudentSubmit}
              className="px-5 py-2.5 rounded-xl bg-ocean hover:bg-ocean-strong text-white text-sm font-semibold shadow-md shadow-ocean/20 transition-colors"
            >
              Zapisz kursanta
            </button>
          </>
        }
      >
        <form onSubmit={handleAddStudentSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
              Imię i nazwisko *
            </label>
            <input
              type="text"
              required
              placeholder="np. Anna Kowalska"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm text-navy focus:border-ocean focus:ring-1 focus:ring-ocean"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Poziom IKO *
              </label>
              <select
                value={newIko}
                onChange={(e) => setNewIko(e.target.value as IkoLevel)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm text-navy bg-white"
              >
                <option value="beginner">Początkujący</option>
                <option value="iko1">IKO 1</option>
                <option value="iko2">IKO 2</option>
                <option value="iko3">IKO 3</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Waga (kg) *
              </label>
              <input
                type="number"
                min="35"
                max="150"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm text-navy"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
              Numer telefonu
            </label>
            <input
              type="tel"
              placeholder="+48 600 000 000"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm text-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
              Adres e-mail
            </label>
            <input
              type="email"
              placeholder="kursant@example.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm text-navy"
            />
          </div>

          <div className="p-3 bg-ocean-50 rounded-xl border border-ocean-100 text-xs text-ocean-strong">
            Waga jest kluczowa dla bezpiecznego doboru powierzchni latawca (m²) do aktualnej siły wiatru.
          </div>
        </form>
      </Drawer>

      {/* Drawer: Edycja profilu kursanta */}
      <Drawer
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        title="Edytuj profil kursanta"
        subtitle={selectedStudent?.fullName}
        footer={
          <>
            <button
              onClick={() => setIsEditProfileOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-border text-navy text-sm font-semibold hover:bg-sand transition-colors"
            >
              Anuluj
            </button>
            <button
              onClick={handleEditStudentSubmit}
              className="px-5 py-2.5 rounded-xl bg-ocean hover:bg-ocean-strong text-white text-sm font-semibold transition-colors"
            >
              Zapisz zmiany
            </button>
          </>
        }
      >
        <form onSubmit={handleEditStudentSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
              Imię i nazwisko
            </label>
            <input
              type="text"
              defaultValue={selectedStudent?.fullName}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm text-navy"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Poziom IKO
              </label>
              <select
                defaultValue={selectedStudent?.ikoLevel}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm text-navy bg-white"
              >
                <option value="beginner">Początkujący</option>
                <option value="iko1">IKO 1</option>
                <option value="iko2">IKO 2</option>
                <option value="iko3">IKO 3</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
                Waga (kg)
              </label>
              <input
                type="number"
                defaultValue={selectedStudent?.weightKg}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm text-navy"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
              Telefon
            </label>
            <input
              type="tel"
              defaultValue={selectedStudent?.phone}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm text-navy"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy mb-1.5">
              E-mail
            </label>
            <input
              type="email"
              defaultValue={selectedStudent?.email}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border text-sm text-navy"
            />
          </div>
        </form>
      </Drawer>
    </div>
  );
};
