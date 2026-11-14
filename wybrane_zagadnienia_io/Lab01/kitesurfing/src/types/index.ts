export type Role = 'manager' | 'instructor' | 'student';

export type IkoLevel = 'beginner' | 'iko1' | 'iko2' | 'iko3';

export type LessonStatus = 'planned' | 'needs-change' | 'cancelled' | 'completed';

export type ConfirmationStatus = 'not-applicable' | 'pending' | 'confirmed';

export type InstructorAvailabilityStatus = 'available' | 'teaching' | 'absent';

export interface Student {
  id: string;
  fullName: string;
  avatar?: string;
  weightKg?: number;
  ikoLevel: IkoLevel;
  phone?: string;
  email?: string;
  preferredInstructorId?: string;
  completedLessonCount: number;
  lastLessonDate?: string;
  historyLessonIds: string[];
  upcomingLessonIds: string[];
}

export interface Instructor {
  id: string;
  fullName: string;
  avatar?: string;
  weightKg: number;
  experienceYears: number;
  availabilityStatus: InstructorAvailabilityStatus;
  plannedLessonCount: number;
  assignedStudentIds: string[];
  upcomingLessonIds: string[];
}

export interface Lesson {
  id: string;
  studentId: string;
  instructorId: string;
  date: string; // YYYY-MM-DD (np. '2026-07-15')
  startTime: string; // '08:00', '10:00', etc.
  endTime: string; // '10:00', '12:00', etc.
  ikoLevel: IkoLevel;
  status: LessonStatus;
  confirmationStatus: ConfirmationStatus;
  weatherFixtureId: string;
  candidateInstructorIds?: string[];
  equipmentInfo?: string;
  spot?: string;
}

export interface ChangeIssue {
  id: string;
  lessonId: string;
  reasonType: 'instructor_absence' | 'low_wind' | 'high_waves';
  reasonText: string;
  resolutionStatus: 'pending' | 'resolved';
  candidateInstructorIds: string[];
}

export interface NotificationItem {
  id: string;
  recipientRole: Role;
  recipientId: string;
  type: 'sms' | 'system' | 'weather';
  sentAtLabel: string;
  status: 'sent' | 'pending' | 'error';
  title: string;
  body: string;
}

export interface WeatherFixture {
  id: string;
  locationLabel: string;
  temperatureC: number;
  waterTempC: number;
  windKmh: number;
  windKnots: number;
  windDirection: string;
  description: string;
  updatedAtLabel: string;
}
