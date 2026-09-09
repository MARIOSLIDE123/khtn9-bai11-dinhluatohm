import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { LearnSection } from './components/LearnSection';
import { MindMap } from './components/MindMap';
import { GameSection } from './components/GameSection';
import { ApplicationSection } from './components/ApplicationSection';
import { TeacherDashboard } from './components/TeacherDashboard';
import { BadgesModal } from './components/BadgesModal';
import { StudentRegistrationModal } from './components/StudentRegistrationModal';
import { StudentSession } from './types';
import { checkBadgesUnlocked } from './data/badges';
import { loadLocalSession, submitSessionResult, loadAllLocalSessions } from './services/api';
import confetti from 'canvas-confetti';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'learn' | 'mindmap' | 'game' | 'apply' | 'teacher'>('learn');

  // Student Profile
  const [studentName, setStudentName] = useState<string>('Học Sinh Lớp 9');
  const [className, setClassName] = useState<string>('9A');
  const [schoolName, setSchoolName] = useState<string>('');
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Learning Progress
  const [unlockedStageId, setUnlockedStageId] = useState<number>(1);
  const [unlockedGameLevel, setUnlockedGameLevel] = useState<number>(1);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(['badge-1']);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState<boolean>(false);

  // Performance metrics
  const [answersCount, setAnswersCount] = useState<number>(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [wrongQuestionIds, setWrongQuestionIds] = useState<string[]>([]);
  const [sessionId] = useState<string>(() => `session-${Date.now()}`);
  const [startTime] = useState<string>(() => new Date().toISOString());

  // Load initial session and check if registration modal should pop up
  useEffect(() => {
    const hasRegistered = localStorage.getItem('ohm_registered');
    const saved = loadLocalSession();
    if (saved) {
      if (saved.studentName) setStudentName(saved.studentName);
      if (saved.className) setClassName(saved.className);
      if (saved.schoolName) setSchoolName(saved.schoolName);
      if (saved.score) setScore(saved.score);
      if (saved.currentLevel) setUnlockedGameLevel(saved.currentLevel);
      if (saved.completedStages && saved.completedStages.length > 0) {
        setUnlockedStageId(Math.min(7, Math.max(...saved.completedStages) + 1));
      }
      if (saved.badgesEarned) setUnlockedBadges(saved.badgesEarned);
      if (saved.answersCount) setAnswersCount(saved.answersCount);
      if (saved.correctAnswersCount) setCorrectAnswersCount(saved.correctAnswersCount);
      if (saved.wrongQuestionIds) setWrongQuestionIds(saved.wrongQuestionIds);
    }

    if (!hasRegistered || !saved?.studentName || saved.studentName === 'Học Sinh Lớp 9') {
      setIsRegistrationModalOpen(true);
    }
  }, []);

  // Update badges whenever score, stage or game level increases
  const handleScoreEarned = (pts: number) => {
    setScore((prev) => {
      const newScore = prev + pts;
      const acc = answersCount > 0 ? Math.round((correctAnswersCount / answersCount) * 100) : 100;
      const updatedBadges = checkBadgesUnlocked(
        newScore,
        unlockedStageId,
        unlockedGameLevel,
        acc,
        unlockedBadges
      );
      if (updatedBadges.length > unlockedBadges.length) {
        setUnlockedBadges(updatedBadges);
        try {
          confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
        } catch {}
      }
      return newScore;
    });
  };

  const handleUnlockStage = (stageNum: number) => {
    setUnlockedStageId((prev) => Math.max(prev, stageNum));
  };

  const handleUnlockGameLevel = (lvl: number) => {
    setUnlockedGameLevel((prev) => Math.max(prev, lvl));
  };

  const handleQuestionCompleted = (qId: string, correct: boolean) => {
    setAnswersCount((prev) => prev + 1);
    if (correct) {
      setCorrectAnswersCount((prev) => prev + 1);
    } else {
      setWrongQuestionIds((prev) => (prev.includes(qId) ? prev : [...prev, qId]));
    }
  };

  const handleSaveStudentProfile = (name: string, cls: string, school: string) => {
    setStudentName(name);
    setClassName(cls);
    setSchoolName(school);
    localStorage.setItem('ohm_registered', 'true');
    setIsRegistrationModalOpen(false);
  };

  // Compute Overall Progress % (based on 7 stages, 5 game levels, badges)
  const progressPercent = useMemo(() => {
    const stageWeight = (unlockedStageId / 7) * 40;
    const gameWeight = (unlockedGameLevel / 5) * 40;
    const badgeWeight = (unlockedBadges.length / 5) * 20;
    return Math.min(100, Math.round(stageWeight + gameWeight + badgeWeight));
  }, [unlockedStageId, unlockedGameLevel, unlockedBadges]);

  // Current session object for sync & teacher dashboard
  const currentSession: StudentSession = useMemo(
    () => ({
      id: sessionId,
      studentName,
      className,
      schoolName,
      startTime,
      endTime: new Date().toISOString(),
      score,
      currentLevel: unlockedGameLevel,
      completedStages: Array.from({ length: unlockedStageId }, (_, i) => i + 1),
      badgesEarned: unlockedBadges,
      answersCount,
      correctAnswersCount,
      wrongQuestionIds,
    }),
    [
      sessionId,
      studentName,
      className,
      schoolName,
      startTime,
      score,
      unlockedGameLevel,
      unlockedStageId,
      unlockedBadges,
      answersCount,
      correctAnswersCount,
      wrongQuestionIds,
    ]
  );

  // Auto-sync session to localStorage & cloud
  useEffect(() => {
    submitSessionResult(currentSession);
  }, [currentSession]);

  return (
    <div className="min-h-screen bg-slate-100/60 font-sans text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Sticky Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        studentName={studentName}
        className={className}
        schoolName={schoolName}
        onUpdateProfile={(name, cls, school) => handleSaveStudentProfile(name, cls, school || '')}
        onOpenProfileModal={() => setIsRegistrationModalOpen(true)}
        score={score}
        progressPercent={progressPercent}
        onOpenBadges={() => setIsBadgesModalOpen(true)}
        badgesCount={unlockedBadges.length}
      />

      {/* Main Container - Full Width & Full Screen Responsive */}
      <main className="flex-1 w-full px-3 sm:px-6 lg:px-8 2xl:px-12 py-6">
        {activeTab === 'learn' && (
          <LearnSection
            unlockedStageId={unlockedStageId}
            onUnlockStage={handleUnlockStage}
            onScoreEarned={handleScoreEarned}
          />
        )}

        {activeTab === 'mindmap' && (
          <MindMap
            onScoreEarned={handleScoreEarned}
            onMindmapCompleted={() => handleScoreEarned(50)}
          />
        )}

        {activeTab === 'game' && (
          <GameSection
            unlockedLevel={unlockedGameLevel}
            onUnlockLevel={handleUnlockGameLevel}
            onScoreEarned={handleScoreEarned}
            onQuestionCompleted={handleQuestionCompleted}
          />
        )}

        {activeTab === 'apply' && (
          <ApplicationSection onScoreEarned={handleScoreEarned} />
        )}

        {activeTab === 'teacher' && (
          <TeacherDashboard
            currentSession={currentSession}
            allSessions={loadAllLocalSessions()}
          />
        )}
      </main>

      {/* Footer - Full Width */}
      <footer className="bg-white border-t border-slate-200/80 py-5 text-center text-xs text-slate-500">
        <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-12 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <b>KHTN 9 - Bài 11: Điện trở & Định luật Ohm</b> • Phiên bản học tập tương tác
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Dễ dùng • Trực quan • Vận dụng thực tế</span>
          </div>
        </div>
      </footer>

      {/* Badges Modal */}
      <BadgesModal
        isOpen={isBadgesModalOpen}
        onClose={() => setIsBadgesModalOpen(false)}
        unlockedBadgeIds={unlockedBadges}
      />

      {/* Student Registration Modal */}
      <StudentRegistrationModal
        isOpen={isRegistrationModalOpen}
        initialName={studentName === 'Học Sinh Lớp 9' ? '' : studentName}
        initialClass={className}
        initialSchool={schoolName}
        onSave={handleSaveStudentProfile}
        onClose={() => setIsRegistrationModalOpen(false)}
      />
    </div>
  );
}
