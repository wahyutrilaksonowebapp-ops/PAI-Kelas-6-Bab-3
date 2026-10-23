export type GameZone = 'map' | 'zone1' | 'zone2' | 'zone3' | 'boss';

export type AppMode = 'student' | 'teacher' | 'projector';

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  score: number;
  streak: number;
  maxStreak: number;
  zoneProgress: {
    zone1: boolean;
    zone2: boolean;
    zone3: boolean;
    boss: boolean;
  };
  badges: string[];
  lastActive: string;
  completedAt?: string;
  answers?: Record<string, boolean>; // questionId -> isCorrect
}

export interface NeighborCharacter {
  id: string;
  name: string;
  relation: string;
  religion: string;
  correctRights: 1 | 2 | 3;
  description: string;
  dalilClue: string;
}

export interface CipherWord {
  id: number;
  text: string;
  correctIndex: number;
}

export interface TrueFalseQuestion {
  id: string;
  statement: string;
  isCorrect: boolean;
  explanation: string;
  dalil: string;
}

export interface BossQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'tetangga' | 'non-muslim' | 'hewan';
}

export interface LearningGap {
  topic: string;
  concept: string;
  failureRate: number; // 0 to 100
  affectedCount: number;
  totalTested: number;
  status: 'critical' | 'moderate' | 'mastered';
  recommendation: string;
}

export interface BadgeInfo {
  id: string;
  title: string;
  description: string;
  icon: string;
  criteria: string;
}
