import React, { useState, useEffect, useMemo } from 'react';
import { QUESTION_BANK } from '../data/questions';
import { Question } from '../types';
import { MathRenderer } from './MathRenderer';
import {
  Zap,
  Flame,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Trophy,
  ArrowRight,
  Shield,
  RotateCcw,
  Sparkles,
  Lock,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GameSectionProps {
  unlockedLevel: number; // 1 to 5
  onUnlockLevel: (lvl: number) => void;
  onScoreEarned: (pts: number) => void;
  onQuestionCompleted?: (qId: string, correct: boolean) => void;
}

export const GameSection: React.FC<GameSectionProps> = ({
  unlockedLevel = 1,
  onUnlockLevel,
  onScoreEarned,
  onQuestionCompleted,
}) => {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [levelState, setLevelState] = useState<'lobby' | 'playing' | 'completed'>('lobby');

  // Question index within level
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | number | null>(null);
  const [textInput, setTextInput] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  // Score & Streak
  const [levelScore, setLevelScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);

  // Level 4 Timer (15s per question)
  const [timeLeft, setTimeLeft] = useState<number>(15);

  // Level 3 (Lắp mạch) Interactive state
  const [l3Step, setL3Step] = useState<number>(0);
  const [l3SelectedAmmeter, setL3SelectedAmmeter] = useState<'series' | 'parallel' | null>(null);
  const [l3SelectedVoltmeter, setL3SelectedVoltmeter] = useState<'series' | 'parallel' | null>(null);
  const [l3CircuitCheckResult, setL3CircuitCheckResult] = useState<string | null>(null);

  // Level 5 (Boss điện trở) Boss HP state
  const [bossHp, setBossHp] = useState<number>(100);
  const [bossStepIdx, setBossStepIdx] = useState<number>(0);

  // Prepare questions for levels
  const levelQuestions = useMemo(() => {
    if (currentLevel === 1) {
      // 5 Nhận biết
      return QUESTION_BANK.filter((q) => q.difficulty === 'nhan_biet').slice(0, 5);
    } else if (currentLevel === 2) {
      // 10 Tính toán
      return QUESTION_BANK.filter((q) => q.difficulty === 'tinh_toan').slice(0, 10);
    } else if (currentLevel === 4) {
      // 10 Fast-paced mixed questions
      return QUESTION_BANK.filter((q) => q.difficulty === 'thong_hieu' || q.difficulty === 'tinh_toan').slice(5, 15);
    }
    return [];
  }, [currentLevel]);

  // Timer effect for Level 4
  useEffect(() => {
    if (levelState !== 'playing' || currentLevel !== 4 || isAnswered) return;
    if (timeLeft <= 0) {
      // Time's up
      handleTimeUp();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [levelState, currentLevel, timeLeft, isAnswered]);

  const handleTimeUp = () => {
    setIsAnswered(true);
    setIsCorrect(false);
    setStreak(0);
  };

  const startLevel = (lvl: number) => {
    setCurrentLevel(lvl);
    setLevelState('playing');
    setQuestionIdx(0);
    setSelectedOption(null);
    setTextInput('');
    setIsAnswered(false);
    setIsCorrect(false);
    setHintLevel(0);
    setShowSolution(false);
    setLevelScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(15);
    setBossHp(100);
    setBossStepIdx(0);
    setL3Step(0);
    setL3SelectedAmmeter(null);
    setL3SelectedVoltmeter(null);
    setL3CircuitCheckResult(null);
  };

  const currentQ: Question | undefined = levelQuestions[questionIdx];

  const checkAnswer = (answerGiven: string | number) => {
    if (isAnswered || !currentQ) return;
    setIsAnswered(true);

    let correct = false;
    if (currentQ.type === 'numeric_input') {
      const parsed = parseFloat(String(answerGiven).replace(',', '.'));
      const correctVal = parseFloat(String(currentQ.correctAnswer).replace(',', '.'));
      const tol = currentQ.tolerance ?? 0.05;
      correct = Math.abs(parsed - correctVal) <= tol;
      if (!correct && currentQ.acceptableAnswers) {
        correct = currentQ.acceptableAnswers.some(
          (a) => String(a).trim().replace(',', '.') === String(answerGiven).trim().replace(',', '.')
        );
      }
    } else {
      correct = String(answerGiven).trim() === String(currentQ.correctAnswer).trim();
    }

    setIsCorrect(correct);

    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      // Score calculation with combo bonus
      let basePts = currentQ.score || 10;
      if (hintLevel === 0) basePts += 5; // no-hint bonus
      let multiplier = 1;
      if (currentLevel === 4) {
        if (newStreak >= 5) multiplier = 2;
        else if (newStreak >= 3) multiplier = 1.5;
        else if (newStreak >= 2) multiplier = 1.2;
      }

      const totalEarned = Math.round(basePts * multiplier);
      setLevelScore((prev) => prev + totalEarned);
      onScoreEarned(totalEarned);

      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
      } catch {}
    } else {
      setStreak(0);
    }

    if (onQuestionCompleted && currentQ) {
      onQuestionCompleted(currentQ.id, correct);
    }
  };

  const handleNextQuestion = () => {
    if (questionIdx < levelQuestions.length - 1) {
      setQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setTextInput('');
      setIsAnswered(false);
      setIsCorrect(false);
      setHintLevel(0);
      setShowSolution(false);
      setTimeLeft(15);
    } else {
      finishLevel();
    }
  };

  const finishLevel = () => {
    setLevelState('completed');
    const completionBonus = 50;
    onScoreEarned(completionBonus);
    if (currentLevel < 5 && unlockedLevel <= currentLevel) {
      onUnlockLevel(currentLevel + 1);
    }
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
    } catch {}
  };

  // Level 3 (Circuit Assembly) Checks
  const handleL3CircuitSubmit = () => {
    if (l3SelectedAmmeter === 'series' && l3SelectedVoltmeter === 'parallel') {
      setL3CircuitCheckResult('CORRECT');
      setLevelScore((prev) => prev + 40);
      onScoreEarned(40);
      try {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      } catch {}
    } else {
      setL3CircuitCheckResult('WRONG');
    }
  };

  // Level 5 (Boss fight)
  const BOSS_STEPS = [
    {
      step: 1,
      title: 'Chiêu 1: Sóng xung kích hiệu điện thế',
      problem: 'Nguồn điện cấp $U_1 = 12\\,\\text{V}$, dòng điện qua đoạn mạch là $I_1 = 0{,}6\\,\\text{A}$. Tính điện trở $R$ của đoạn mạch này.',
      unit: 'Ω',
      correct: 20,
      damage: 35,
      hint: 'Áp dụng định luật Ohm: $R = U_1 / I_1 = 12 / 0{,}6$.',
      solution: '$R = \\frac{12}{0{,}6} = 20\\,\\Omega$.'
    },
    {
      step: 2,
      title: 'Chiêu 2: Bão nhiệt điện trở suất',
      problem: 'Đoạn dây làm bằng hợp kim nicrom có điện trở suất $\\rho = 1{,}1 \\times 10^{-6}\\,\\Omega \\cdot m$, tiết diện $S = 0{,}11\\,\\text{mm}^2 = 0{,}11 \\times 10^{-6}\\,\\text{m}^2$. Để đạt điện trở $R = 20\\,\\Omega$, chiều dài $l$ của dây là bao nhiêu mét?',
      unit: 'm',
      correct: 2,
      damage: 35,
      hint: 'Chiều dài $l = \\frac{R \\cdot S}{\\rho} = \\frac{20 \\times 0{,}11 \\times 10^{-6}}{1{,}1 \\times 10^{-6}}$.',
      solution: '$l = \\frac{20 \\times 0{,}11}{1{,}1} = 2\\,\\text{m}$.'
    },
    {
      step: 3,
      title: 'Chiêu cuối: Đòn kết liễu Master Ohm',
      problem: 'Nếu muốn dòng điện trong mạch giảm xuống còn $I_2 = 0{,}3\\,\\text{A}$ khi vẫn dùng nguồn $U = 12\\,\\text{V}$, cần mắc nối tiếp thêm một điện trở phụ $R_p$ bằng bao nhiêu $\\Omega$?',
      unit: 'Ω',
      correct: 20,
      damage: 35,
      hint: 'Điện trở toàn mạch lúc sau: $R_{tm} = 12 / 0{,}3 = 40\\,\\Omega$. Điện trở phụ: $R_p = R_{tm} - R = 40 - 20$.',
      solution: '$R_{tm} = \\frac{12}{0{,}3} = 40\\,\\Omega \\implies R_p = 40 - 20 = 20\\,\\Omega$.'
    }
  ];

  const handleBossAttack = () => {
    const currentBossStep = BOSS_STEPS[bossStepIdx];
    const val = parseFloat(textInput.replace(',', '.'));
    if (Math.abs(val - currentBossStep.correct) < 0.1) {
      // Hit boss!
      const newHp = Math.max(0, bossHp - currentBossStep.damage);
      setBossHp(newHp);
      setIsCorrect(true);
      setIsAnswered(true);
      setLevelScore((prev) => prev + 30);
      onScoreEarned(30);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {}
    } else {
      setIsCorrect(false);
      setIsAnswered(true);
    }
  };

  const handleNextBossStep = () => {
    if (bossStepIdx < BOSS_STEPS.length - 1) {
      setBossStepIdx((prev) => prev + 1);
      setTextInput('');
      setIsAnswered(false);
      setIsCorrect(false);
      setHintLevel(0);
      setShowSolution(false);
    } else {
      finishLevel();
    }
  };

  return (
    <div className="space-y-6">
      {/* Game Level Selector Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-1">
              <Zap className="w-3.5 h-3.5" />
              Chinh Phục Ohm – Game Vượt Ải 5 Cấp Độ
            </div>
            <h3 className="text-lg font-black text-slate-800">
              Chọn Cửa Ải Thử Thách
            </h3>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500 font-medium block">Cửa ải đã mở</span>
            <span className="text-sm font-black text-blue-600">
              Level {unlockedLevel} / 5
            </span>
          </div>
        </div>

        {/* 5 Levels Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {[
            { lvl: 1, name: 'Bật nguồn', sub: '5 câu nhận biết', icon: Zap },
            { lvl: 2, name: 'Thợ săn công thức', sub: '10 câu tính U/I/R', icon: Shield },
            { lvl: 3, name: 'Lắp mạch', sub: 'Phân tích Ampe/Vôn kế', icon: Sparkles },
            { lvl: 4, name: 'Đấu trường Ohm', sub: 'Tính giờ & Combo', icon: Flame },
            { lvl: 5, name: 'Boss điện trở', sub: 'Thử thách đa tầng', icon: Trophy },
          ].map((item) => {
            const isUnlocked = unlockedLevel >= item.lvl;
            const isSelected = currentLevel === item.lvl && levelState === 'playing';
            const IconComp = item.icon;

            return (
              <button
                key={item.lvl}
                id={`btn-level-${item.lvl}`}
                onClick={() => {
                  if (isUnlocked) startLevel(item.lvl);
                }}
                disabled={!isUnlocked}
                className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  !isUnlocked
                    ? 'bg-slate-100/70 border-slate-200 text-slate-400 cursor-not-allowed'
                    : isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-4 ring-blue-100'
                    : 'bg-slate-50 hover:bg-white text-slate-800 border-slate-200 hover:border-blue-300'
                }`}
              >
                {!isUnlocked && (
                  <div className="absolute top-2 right-2 text-slate-400">
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                )}
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : isUnlocked
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    LV {item.lvl}
                  </span>
                  <IconComp className="w-3.5 h-3.5 opacity-80" />
                </div>
                <div className="font-bold text-xs truncate">{item.name}</div>
                <div className={`text-[10px] truncate ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                  {item.sub}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Level Viewports */}
      {levelState === 'lobby' && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 mx-auto flex items-center justify-center">
            <Zap className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-slate-800">
            Sẵn sàng chinh phục Định luật Ohm?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Mỗi level sẽ thử thách một kỹ năng khác nhau: từ nhận biết nhanh, tính toán tốc độ, lắp ráp mạch điện an toàn cho đến đối đầu Boss điện trở khổng lồ!
          </p>
          <button
            id="btn-start-game-lvl-1"
            onClick={() => startLevel(1)}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-500/25 transition-all"
          >
            Bắt đầu từ Level 1: Bật nguồn ⚡
          </button>
        </div>
      )}

      {levelState === 'playing' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-6">
          {/* Level Header Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black">
                Level {currentLevel}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-700">
                {currentLevel === 1 && `Câu hỏi ${questionIdx + 1} / ${levelQuestions.length}`}
                {currentLevel === 2 && `Câu hỏi ${questionIdx + 1} / ${levelQuestions.length}`}
                {currentLevel === 3 && 'Thử thách: Mắc Ampe kế & Vôn kế chuẩn xác'}
                {currentLevel === 4 && `Đấu trường: Câu ${questionIdx + 1} / ${levelQuestions.length}`}
                {currentLevel === 5 && `Đối đầu Boss: Tầng ${bossStepIdx + 1} / ${BOSS_STEPS.length}`}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Level 4 Countdown Timer */}
              {currentLevel === 4 && (
                <div
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black ${
                    timeLeft <= 5
                      ? 'bg-red-100 text-red-700 animate-pulse'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  {timeLeft}s
                </div>
              )}

              {/* Combo Streak */}
              {streak > 1 && (
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-black animate-bounce">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" />
                  Combo x{streak}!
                </div>
              )}

              {/* Level Score */}
              <div className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                +{levelScore} đ
              </div>
            </div>
          </div>

          {/* ================= LEVEL 1, 2, 4 COMMON QUIZ ENGINE ================= */}
          {(currentLevel === 1 || currentLevel === 2 || currentLevel === 4) && currentQ && (
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Question Text */}
              <div className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
                <MathRenderer math={currentQ.question} inline={true} />
              </div>

              {/* Multiple Choice / True-False Options */}
              {currentQ.options && currentQ.options.length > 0 && (
                <div className="space-y-2.5">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedOption === opt;
                    let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                    if (isAnswered) {
                      if (opt === currentQ.correctAnswer) {
                        btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                      } else {
                        btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-blue-50 border-blue-500 text-blue-900 font-bold ring-2 ring-blue-200';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (!isAnswered) {
                            setSelectedOption(opt);
                            checkAnswer(opt);
                          }
                        }}
                        disabled={isAnswered}
                        className={`w-full p-3.5 rounded-2xl border text-left text-sm transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <div>
                          <MathRenderer math={opt} inline={true} />
                        </div>
                        {isAnswered && opt === currentQ.correctAnswer && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {isAnswered && isSelected && opt !== currentQ.correctAnswer && (
                          <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Numeric Input Question */}
              {currentQ.type === 'numeric_input' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Nhập số (vd: 2.5 hoặc 2,5)..."
                      disabled={isAnswered}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && textInput && !isAnswered) {
                          checkAnswer(textInput);
                        }
                      }}
                      className="flex-1 px-4 py-3 rounded-2xl border border-slate-300 text-base font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {currentQ.unit && (
                      <span className="text-base font-bold text-slate-600 bg-slate-100 px-3.5 py-3 rounded-2xl">
                        {currentQ.unit}
                      </span>
                    )}
                    <button
                      onClick={() => checkAnswer(textInput)}
                      disabled={!textInput || isAnswered}
                      className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm transition-all"
                    >
                      Trả lời
                    </button>
                  </div>
                </div>
              )}

              {/* 3 Progressive Hints Mechanism */}
              {!isAnswered && (
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-500 font-medium">Cần hỗ trợ tư duy?</span>
                    {hintLevel < 3 && (
                      <button
                        onClick={() => setHintLevel((h) => Math.min(3, h + 1))}
                        className="text-amber-600 font-bold hover:underline flex items-center gap-1"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        💡 Xem Gợi ý {hintLevel + 1}
                      </button>
                    )}
                  </div>

                  {hintLevel > 0 && (
                    <div className="space-y-1.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900">
                      {currentQ.hints.slice(0, hintLevel).map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-1.5">
                          <span className="font-bold shrink-0">💡 Gợi ý {hIdx + 1}:</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Post-Answer Feedback & Solution */}
              {isAnswered && (
                <div className="space-y-3">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm ${
                      isCorrect
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                        : 'bg-rose-50 text-rose-900 border border-rose-200'
                    }`}
                  >
                    <span className="font-bold block mb-1">
                      {isCorrect ? '🎉 Bạn đã trả lời đúng!' : '❌ Chưa chính xác!'}
                    </span>
                    {!isCorrect && !showSolution && (
                      <button
                        onClick={() => setShowSolution(true)}
                        className="text-xs font-bold text-blue-700 underline mt-1 block"
                      >
                        Bấm để xem lời giải chi tiết
                      </button>
                    )}
                    {(isCorrect || showSolution) && (
                      <div className="mt-2 text-xs text-slate-700 bg-white/70 p-3 rounded-xl border border-slate-200 space-y-1">
                        <span className="font-bold text-slate-800 block">Lời giải:</span>
                        <p>{currentQ.explanation}</p>
                      </div>
                    )}
                  </div>

                  {/* Next Question Button */}
                  <div className="flex justify-end">
                    <button
                      id="btn-game-next-q"
                      onClick={handleNextQuestion}
                      className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
                    >
                      {questionIdx < levelQuestions.length - 1 ? (
                        <>
                          Câu tiếp theo <ArrowRight className="w-4 h-4" />
                        </>
                      ) : (
                        'Hoàn thành Level! 🏆'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= LEVEL 3: LẮP MẠCH ĐIỆN TƯƠNG TÁC ================= */}
          {currentLevel === 3 && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h4 className="text-sm font-bold text-slate-800 mb-1">
                  Nhiệm vụ: Lắp ráp mạch đo Định luật Ohm
                </h4>
                <p className="text-xs text-slate-600">
                  Hãy chọn cách mắc đúng cho <b>Ampe kế (A)</b> và <b>Vôn kế (V)</b> đối với điện trở $R$ cần đo.
                </p>
              </div>

              {/* Selector 1: Ammeter */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-700 block">
                  1. Ampe kế (A) dùng để đo cường độ dòng điện chạy qua điện trở, cần mắc:
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setL3SelectedAmmeter('series')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      l3SelectedAmmeter === 'series'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    Mắc NỐI TIẾP với điện trở R
                  </button>
                  <button
                    onClick={() => setL3SelectedAmmeter('parallel')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      l3SelectedAmmeter === 'parallel'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    Mắc SONG SONG với điện trở R
                  </button>
                </div>
              </div>

              {/* Selector 2: Voltmeter */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-700 block">
                  2. Vôn kế (V) dùng để đo hiệu điện thế giữa hai đầu điện trở, cần mắc:
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setL3SelectedVoltmeter('parallel')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      l3SelectedVoltmeter === 'parallel'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    Mắc SONG SONG với hai đầu điện trở R
                  </button>
                  <button
                    onClick={() => setL3SelectedVoltmeter('series')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      l3SelectedVoltmeter === 'series'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    Mắc NỐI TIẾP với điện trở R
                  </button>
                </div>
              </div>

              {/* Check result display */}
              {l3CircuitCheckResult && (
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm ${
                    l3CircuitCheckResult === 'CORRECT'
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                      : 'bg-rose-50 text-rose-900 border border-rose-200'
                  }`}
                >
                  {l3CircuitCheckResult === 'CORRECT' ? (
                    <div>
                      <span className="font-bold block mb-1">
                        🎉 Tuyệt vời! Bạn đã lắp mạch điện hoàn toàn chuẩn xác!
                      </span>
                      <p>
                        Ampe kế mắc nối tiếp để dòng điện đi xuyên qua cuộn đo; Vôn kế mắc song song để đo độ chênh lệch điện thế giữa 2 đầu điện trở.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <span className="font-bold block mb-1">
                        ❌ Cảnh báo! Mắc sai sẽ làm hỏng thiết bị đo!
                      </span>
                      <p>
                        Ampe kế có điện trở cực nhỏ, nếu mắc song song sẽ gây đoản mạch chập cháy! Hãy nhớ: Ampe kế Nối tiếp - Vôn kế Song song.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Action button */}
              <div className="flex justify-end gap-3">
                {l3CircuitCheckResult !== 'CORRECT' ? (
                  <button
                    onClick={handleL3CircuitSubmit}
                    disabled={!l3SelectedAmmeter || !l3SelectedVoltmeter}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm rounded-2xl shadow-sm transition-all"
                  >
                    Kiểm tra sơ đồ mạch điện
                  </button>
                ) : (
                  <button
                    onClick={finishLevel}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-sm transition-all"
                  >
                    Hoàn thành thử thách Lắp Mạch 🏆
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ================= LEVEL 5: BOSS ĐIỆN TRỞ ================= */}
          {currentLevel === 5 && (
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Boss Status Bar */}
              <div className="bg-slate-900 text-white p-5 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
                    <span className="font-black text-sm text-red-400">BOSS: MEGA OHM GOLEM</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400">HP: {bossHp}%</span>
                </div>
                {/* Boss HP Bar */}
                <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${bossHp}%` }}
                  ></div>
                </div>
              </div>

              {/* Current Step Problem */}
              {(() => {
                const stepObj = BOSS_STEPS[bossStepIdx];
                return (
                  <div className="space-y-4">
                    <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100">
                      <span className="text-xs font-black text-blue-700 block mb-0.5">
                        {stepObj.title}
                      </span>
                      <p className="text-sm font-bold text-slate-800">{stepObj.problem}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        inputMode="decimal"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Nhập kết quả tính..."
                        disabled={isAnswered && isCorrect}
                        className="flex-1 px-4 py-3 rounded-2xl border border-slate-300 text-base font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-base font-bold text-slate-600 bg-slate-100 px-3.5 py-3 rounded-2xl">
                        {stepObj.unit}
                      </span>
                      {(!isAnswered || !isCorrect) && (
                        <button
                          onClick={handleBossAttack}
                          disabled={!textInput}
                          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-sm rounded-2xl shadow-sm transition-all flex items-center gap-1.5"
                        >
                          <Zap className="w-4 h-4" /> Tấn công
                        </button>
                      )}
                    </div>

                    {/* Hint / Solution */}
                    <div className="flex items-center justify-between text-xs">
                      {hintLevel === 0 ? (
                        <button
                          onClick={() => setHintLevel(1)}
                          className="text-amber-600 font-bold hover:underline"
                        >
                          💡 Xem gợi ý chiến thuật
                        </button>
                      ) : (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 w-full">
                          <span className="font-bold">Gợi ý: </span>
                          {stepObj.hint}
                        </div>
                      )}
                    </div>

                    {isAnswered && isCorrect && (
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm space-y-2">
                        <span className="font-bold block">
                          💥 Đòn đánh chí mạng thành công! Boss mất {stepObj.damage}% HP!
                        </span>
                        <div className="flex justify-end pt-1">
                          <button
                            onClick={handleNextBossStep}
                            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1"
                          >
                            {bossStepIdx < BOSS_STEPS.length - 1 ? (
                              <>
                                Tiếp tục tấn công <ChevronRight className="w-4 h-4" />
                              </>
                            ) : (
                              'Hạ gục Boss Ohm! 🏆'
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {levelState === 'completed' && (
        <div className="bg-white rounded-3xl p-8 border border-emerald-200 text-center max-w-xl mx-auto space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-slate-800">
            Chúc mừng! Vượt qua Level {currentLevel}!
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Bạn đã xuất sắc ghi được <b>+{levelScore} điểm</b> và nhận thêm thưởng vượt ải <b>+50 điểm</b>!
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setLevelState('lobby')}
              className="px-5 py-3 rounded-2xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs sm:text-sm transition-all"
            >
              Quay lại danh sách ải
            </button>
            {currentLevel < 5 && (
              <button
                onClick={() => startLevel(currentLevel + 1)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all"
              >
                Chinh phục Level {currentLevel + 1} ⚡
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
