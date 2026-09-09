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

  // 1. Tải dữ liệu lưu trữ cục bộ ngay từ lần khởi tạo đầu tiên (tránh race condition / flash state)
  const initialLocal = useMemo(() => loadLocalSession(), []);

  // Student Profile: Đọc trực tiếp từ session đã lưu hoặc localStorage
  const [studentName, setStudentName] = useState<string>(() => {
    return initialLocal?.studentName || localStorage.getItem('ohm_student_name') || '';
  });
  const [className, setClassName] = useState<string>(() => {
    return initialLocal?.className || localStorage.getItem('ohm_student_class') || '9A';
  });
  const [schoolName, setSchoolName] = useState<string>(() => {
    return initialLocal?.schoolName || localStorage.getItem('ohm_student_school') || '';
  });

  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState<boolean>(() => {
    const isRegistered = localStorage.getItem('ohm_registered') === 'true';
    const hasValidName = !!(initialLocal?.studentName && initialLocal.studentName !== 'Học Sinh Lớp 9' && initialLocal.studentName !== 'Học sinh');
    return !isRegistered || !hasValidName;
  });

  // Điểm số & Thành tích: Kế thừa và cộng dồn vĩnh viễn từ phiên trước
  const [score, setScore] = useState<number>(() => initialLocal?.score || 0);
  const [unlockedStageId, setUnlockedStageId] = useState<number>(() => {
    if (initialLocal?.completedStages && initialLocal.completedStages.length > 0) {
      return Math.min(7, Math.max(...initialLocal.completedStages) + 1);
    }
    return 1;
  });
  const [unlockedGameLevel, setUnlockedGameLevel] = useState<number>(() => initialLocal?.currentLevel || 1);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(() => {
    return initialLocal?.badgesEarned && initialLocal.badgesEarned.length > 0
      ? initialLocal.badgesEarned
      : ['badge-1'];
  });
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState<boolean>(false);

  // Thống kê câu hỏi: Giữ nguyên số câu đã làm và câu đúng
  const [answersCount, setAnswersCount] = useState<number>(() => initialLocal?.answersCount || 0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(() => initialLocal?.correctAnswersCount || 0);
  const [wrongQuestionIds, setWrongQuestionIds] = useState<string[]>(() => initialLocal?.wrongQuestionIds || []);

  // MÃ ĐỊNH DANH HỌC SINH CỐ ĐỊNH (Không bao giờ đổi khi reload trang để ghi đè đúng dòng trong Sheet)
  const [sessionId] = useState<string>(() => {
    if (initialLocal?.id) return initialLocal.id;
    const persistentId = localStorage.getItem('ohm_persistent_student_id');
    if (persistentId) return persistentId;
    const newId = `student-${Date.now()}`;
    localStorage.setItem('ohm_persistent_student_id', newId);
    return newId;
  });

  // THỜI GIAN BẮT ĐẦU: Duy trì mốc thời gian lần đầu vào học
  const [startTime] = useState<string>(() => {
    if (initialLocal?.startTime) return initialLocal.startTime;
    const savedStartTime = localStorage.getItem('ohm_session_start_time');
    if (savedStartTime) return savedStartTime;
    const nowTime = new Date().toISOString();
    localStorage.setItem('ohm_session_start_time', nowTime);
    return nowTime;
  });

  // Tăng điểm và kiểm tra mở khóa huy hiệu
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
    const cleanName = name.trim();
    const cleanClass = cls.trim() || '9A';
    const cleanSchool = school.trim();

    setStudentName(cleanName);
    setClassName(cleanClass);
    setSchoolName(cleanSchool);

    localStorage.setItem('ohm_registered', 'true');
    localStorage.setItem('ohm_student_name', cleanName);
    localStorage.setItem('ohm_student_class', cleanClass);
    localStorage.setItem('ohm_student_school', cleanSchool);

    setIsRegistrationModalOpen(false);
  };

  // Tính phần trăm tiến trình tổng thể
  const progressPercent = useMemo(() => {
    const stageWeight = (unlockedStageId / 7) * 40;
    const gameWeight = (unlockedGameLevel / 5) * 40;
    const badgeWeight = (unlockedBadges.length / 5) * 20;
    return Math.min(100, Math.round(stageWeight + gameWeight + badgeWeight));
  }, [unlockedStageId, unlockedGameLevel, unlockedBadges]);

  // Đối tượng phiên học sinh đồng bộ
  const currentSession: StudentSession = useMemo(
    () => ({
      id: sessionId,
      studentName: studentName || 'Học Sinh',
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

  // Tự động đồng bộ lên Cloud & Google Sheets
  useEffect(() => {
    // Chỉ gửi lên database khi học sinh ĐÃ ĐĂNG KÝ HỌ TÊN THẬT (không bao giờ gửi tên mặc định "Học Sinh Lớp 9")
    const isRegistered = localStorage.getItem('ohm_registered') === 'true';
    const hasValidName = studentName && studentName.trim() !== '' && studentName !== 'Học Sinh Lớp 9' && studentName !== 'Học sinh';

    if (!isRegistered || !hasValidName) {
      return;
    }

    submitSessionResult(currentSession);
  }, [currentSession, studentName]);

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
