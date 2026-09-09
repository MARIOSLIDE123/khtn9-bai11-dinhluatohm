export type QuestionDifficulty = 'nhan_biet' | 'thong_hieu' | 'tinh_toan' | 'van_dung';

export type QuestionType = 
  | 'multiple_choice' 
  | 'true_false' 
  | 'fill_blank' 
  | 'numeric_input' 
  | 'matching' 
  | 'order' 
  | 'multi_step';

export interface Question {
  id: string;
  topic: string;
  difficulty: QuestionDifficulty;
  type: QuestionType;
  question: string;
  options?: string[]; // For multiple choice / true_false
  matchingPairs?: { left: string; right: string }[]; // For matching
  orderItems?: string[]; // For ordering steps
  correctAnswer: string | number | boolean | string[] | { [key: string]: string };
  acceptableAnswers?: (string | number)[]; // Alternate accepted strings/numbers like '0.5' and '0,5'
  tolerance?: number; // Numeric tolerance for float comparisons
  explanation: string;
  hints: string[]; // 3 progressive hints
  score: number;
  estimatedTime: number; // in seconds
  unit?: string; // e.g., 'V', 'A', 'Ω'
  steps?: {
    stepNumber: number;
    prompt: string;
    formula?: string;
    correctAnswer: string | number;
    acceptableAnswers?: (string | number)[];
    explanation: string;
  }[];
}

export interface StudentProfile {
  studentId: string;
  name: string;
  class: string;
  createdAt: string;
  lastActive: string;
  totalScore: number;
  totalTime: number; // active seconds
  questionsDone: number;
  correctCount: number;
  accuracy: number; // percentage
  badges: string[];
}

export interface ProgressState {
  studentId: string;
  knowledge: number; // 0 - 100
  mindmap: number; // 0 - 100
  game: number; // 0 - 100
  practice: number; // 0 - 100
  application: number; // 0 - 100
  overallProgress: number;
  completedLessons: string[];
  completedQuestions: string[];
  unlockedGameLevels: number; // 1 to 5
  gameScores: { [level: number]: number };
  mindmapDone: boolean;
}

export interface QuizResultRecord {
  id?: string;
  timestamp: string;
  studentId: string;
  topic: string;
  activity: 'knowledge' | 'mindmap' | 'game' | 'application';
  level?: number | string;
  questionId: string;
  answer: any;
  correct: boolean;
  score: number;
  timeSeconds: number;
  hintUsed: number;
}

export interface SessionRecord {
  sessionId: string;
  studentId: string;
  startTime: string;
  endTime?: string;
  durationSeconds: number;
  device: string;
}

export interface StudentSession {
  id: string;
  studentName: string;
  className: string;
  schoolName?: string;
  startTime: string;
  endTime: string;
  score: number;
  currentLevel: number;
  completedStages: number[];
  badgesEarned: string[];
  answersCount: number;
  correctAnswersCount: number;
  wrongQuestionIds: string[];
}

export interface Badge {
  id: string;
  name: string;
  title: string;
  description: string;
  iconName: string;
  requirement: string;
  unlocked: boolean;
}
