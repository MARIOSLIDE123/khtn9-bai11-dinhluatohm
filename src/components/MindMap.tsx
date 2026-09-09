import React, { useState, useMemo } from 'react';
import { MINDMAP_DATA, MINDMAP_QUIZ_QUESTIONS, MindmapBranch } from '../data/mindmap';
import { MathRenderer } from './MathRenderer';
import { TreeMindmapView } from './TreeMindmapView';
import {
  Zap,
  Activity,
  Cpu,
  Sliders,
  Award,
  Lightbulb,
  CheckCircle2,
  HelpCircle,
  ChevronRight,
  X,
  Sparkles,
  GitFork,
  LayoutGrid,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MindMapProps {
  onScoreEarned?: (points: number) => void;
  onMindmapCompleted?: () => void;
}

export const MindMap: React.FC<MindMapProps> = ({
  onScoreEarned,
  onMindmapCompleted,
}) => {
  const [viewMode, setViewMode] = useState<'tree' | 'cards'>('tree');
  const [selectedBranchId, setSelectedBranchId] = useState<string>('branch-ohm');
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizAnswerSubmitted, setQuizAnswerSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);

  const selectedBranch = MINDMAP_DATA.branches.find((b) => b.id === selectedBranchId) || MINDMAP_DATA.branches[0];

  const getBranchIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Sliders': return <Sliders className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      case 'Lightbulb': return <Lightbulb className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  const getBranchColorClasses = (color: string, isSelected: boolean) => {
    switch (color) {
      case 'blue':
        return isSelected
          ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-4 ring-blue-100'
          : 'bg-blue-50/80 text-blue-800 border-blue-200 hover:bg-blue-100';
      case 'indigo':
        return isSelected
          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-4 ring-indigo-100'
          : 'bg-indigo-50/80 text-indigo-800 border-indigo-200 hover:bg-indigo-100';
      case 'cyan':
        return isSelected
          ? 'bg-cyan-600 text-white border-cyan-600 shadow-md ring-4 ring-cyan-100'
          : 'bg-cyan-50/80 text-cyan-800 border-cyan-200 hover:bg-cyan-100';
      case 'amber':
        return isSelected
          ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-4 ring-amber-100'
          : 'bg-amber-50/80 text-amber-800 border-amber-200 hover:bg-amber-100';
      case 'emerald':
        return isSelected
          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-4 ring-emerald-100'
          : 'bg-emerald-50/80 text-emerald-800 border-emerald-200 hover:bg-emerald-100';
      case 'purple':
        return isSelected
          ? 'bg-purple-600 text-white border-purple-600 shadow-md ring-4 ring-purple-100'
          : 'bg-purple-50/80 text-purple-800 border-purple-200 hover:bg-purple-100';
      default:
        return isSelected ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-800';
    }
  };

  const currentQuiz = MINDMAP_QUIZ_QUESTIONS[currentQuizIdx];

  // Randomize / shuffle the answer options for each quiz question so they are never in a fixed order
  const shuffledQuizOptions = useMemo(() => {
    if (!currentQuiz) return [];
    const arr = [...currentQuiz.options];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [currentQuizIdx, currentQuiz?.id]);

  const handleSelectQuizOption = (opt: string) => {
    if (quizAnswerSubmitted) return;
    setSelectedQuizOption(opt);
  };

  const handleSubmitQuizAnswer = () => {
    if (!selectedQuizOption || quizAnswerSubmitted) return;
    setQuizAnswerSubmitted(true);
    const isCorrect = selectedQuizOption === currentQuiz.correctAnswer;
    if (isCorrect) {
      const pts = 15;
      setQuizScore((prev) => prev + pts);
      if (onScoreEarned) onScoreEarned(pts);
      if (!completedQuizzes.includes(currentQuiz.id)) {
        setCompletedQuizzes((prev) => [...prev, currentQuiz.id]);
      }
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      } catch {}
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIdx < MINDMAP_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIdx((prev) => prev + 1);
      setSelectedQuizOption(null);
      setQuizAnswerSubmitted(false);
    } else {
      // Finished all mindmap quizzes
      if (onMindmapCompleted) onMindmapCompleted();
      if (onScoreEarned) onScoreEarned(50); // bonus
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      } catch {}
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Mode Toggle */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Sơ Đồ Tư Duy Tương Tác
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800">
            {MINDMAP_DATA.root}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Khám phá theo sơ đồ nhánh trực quan hoặc thử thách trí nhớ với phần kiểm tra điền khuyết!
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* View Mode Toggle: Tree Mindmap vs Cards */}
          {!quizMode && (
            <div className="p-1 bg-slate-100 rounded-2xl flex items-center gap-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('tree')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                  viewMode === 'tree'
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GitFork className="w-3.5 h-3.5" />
                Sơ đồ nhánh cây
              </button>
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                  viewMode === 'cards'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Thẻ chi tiết
              </button>
            </div>
          )}

          {/* Quiz Mode Button */}
          <button
            id="btn-mindmap-quiz-toggle"
            onClick={() => {
              setQuizMode(!quizMode);
              setSelectedQuizOption(null);
              setQuizAnswerSubmitted(false);
            }}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all ${
              quizMode
                ? 'bg-slate-800 text-white hover:bg-slate-900'
                : 'bg-amber-500 text-white hover:bg-amber-600 shadow-amber-500/20'
            }`}
          >
            {quizMode ? (
              <>
                <X className="w-4 h-4" />
                Đóng Kiểm Tra & Xem Sơ Đồ
              </>
            ) : (
              <>
                <HelpCircle className="w-4 h-4" />
                ⚡ KIỂM TRA MINDMAP (Đảo ngẫu nhiên)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quiz Mode View */}
      {quizMode ? (
        <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-xs">
                Câu {currentQuizIdx + 1} / {MINDMAP_QUIZ_QUESTIONS.length}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Vị trí: {currentQuiz.positionDesc}
              </span>
            </div>
            <div className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Điểm Mindmap: +{quizScore} đ
            </div>
          </div>

          <div className="max-w-2xl mx-auto space-y-5">
            <div className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <MathRenderer math={currentQuiz.prompt} inline={false} />
            </div>

            {/* Answer Options (Shuffled Order!) */}
            <div className="space-y-2.5">
              {shuffledQuizOptions.map((opt, idx) => {
                const optLetter = String.fromCharCode(65 + idx); // A, B, C, D
                const isSelected = selectedQuizOption === opt;
                let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                if (quizAnswerSubmitted) {
                  if (opt === currentQuiz.correctAnswer) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold ring-2 ring-emerald-200';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-50 border-rose-400 text-rose-800 ring-2 ring-rose-200';
                  } else {
                    btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-amber-50 border-amber-500 text-amber-900 font-bold ring-2 ring-amber-200';
                }

                return (
                  <button
                    key={`${currentQuiz.id}-opt-${idx}`}
                    onClick={() => handleSelectQuizOption(opt)}
                    disabled={quizAnswerSubmitted}
                    className={`w-full p-3.5 rounded-2xl border text-left text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {optLetter}
                      </span>
                      <div>
                        <MathRenderer math={opt} inline={true} />
                      </div>
                    </div>
                    {quizAnswerSubmitted && opt === currentQuiz.correctAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback message */}
            {quizAnswerSubmitted && (
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm animate-in fade-in ${
                  selectedQuizOption === currentQuiz.correctAnswer
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-rose-50 text-rose-900 border border-rose-200'
                }`}
              >
                <span className="font-bold block mb-1">
                  {selectedQuizOption === currentQuiz.correctAnswer ? '🎉 Chính xác! Bạn đã ghi nhớ rất tốt!' : '❌ Chưa chính xác! Hãy đọc kỹ giải thích dưới đây:'}
                </span>
                <div className="mt-1">
                  <MathRenderer math={currentQuiz.explanation} />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-between">
              {!quizAnswerSubmitted ? (
                <button
                  id="btn-submit-mindmap-quiz"
                  onClick={handleSubmitQuizAnswer}
                  disabled={!selectedQuizOption}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
                >
                  Xác nhận câu trả lời
                </button>
              ) : (
                <button
                  id="btn-next-mindmap-quiz"
                  onClick={handleNextQuiz}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-1.5 ml-auto"
                >
                  {currentQuizIdx < MINDMAP_QUIZ_QUESTIONS.length - 1 ? (
                    <>
                      Câu tiếp theo <ChevronRight className="w-4 h-4" />
                    </>
                  ) : (
                    'Hoàn thành thử thách Mindmap 🏆'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : viewMode === 'tree' ? (
        /* Sơ Đồ Nhánh Cây (Branching Tree Mindmap) */
        <TreeMindmapView
          onSelectBranch={setSelectedBranchId}
          activeBranchId={selectedBranchId}
        />
      ) : (
        /* Visual Interactive Cards View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Visual Branches Map (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-3">
            <div className="text-center py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-sm mb-4">
              <span className="text-[11px] uppercase tracking-wider text-blue-200 font-semibold block">
                Nút Gốc Trung Tâm
              </span>
              <h3 className="text-base font-black px-2">{MINDMAP_DATA.root}</h3>
            </div>

            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider px-1">
              6 Nhánh Trí Tuệ Bài 11:
            </p>

            <div className="space-y-2.5">
              {MINDMAP_DATA.branches.map((b) => {
                const isSelected = b.id === selectedBranchId;
                const styleClasses = getBranchColorClasses(b.color, isSelected);

                return (
                  <button
                    key={b.id}
                    id={`branch-btn-${b.id}`}
                    onClick={() => setSelectedBranchId(b.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${styleClasses}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white/20">{getBranchIcon(b.icon)}</div>
                      <div>
                        <span className="text-sm font-bold block">{b.name}</span>
                        <span className="text-[11px] opacity-80 block truncate max-w-[200px] sm:max-w-[260px]">
                          {b.summary}
                        </span>
                      </div>
                    </div>
                    {b.formula && (
                      <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-white/40 shrink-0">
                        <MathRenderer math={b.formula} inline={true} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Branch Details Display (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  {getBranchIcon(selectedBranch.icon)}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-800">
                    Nhánh: {selectedBranch.name}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedBranch.summary}</p>
                </div>
              </div>
              {selectedBranch.formula && (
                <div className="bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200 text-xs font-bold text-blue-900">
                  <MathRenderer math={selectedBranch.formula} inline={true} />
                </div>
              )}
            </div>

            {/* Sub-branches list */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Các nút chi tiết của nhánh:
              </h4>

              {selectedBranch.subBranches.map((sub, idx) => (
                <div
                  key={sub.id}
                  className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-blue-300 transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-blue-700">
                      {idx + 1}. {sub.title}
                    </span>
                    {sub.formula && (
                      <span className="text-xs font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800">
                        <MathRenderer math={sub.formula} inline={true} />
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-600 leading-relaxed">
                    <MathRenderer math={sub.description} inline={true} />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick check tip */}
            <div className="bg-amber-50/80 rounded-2xl p-3.5 border border-amber-200 flex items-center justify-between gap-2 text-xs text-amber-900">
              <span>Đã sẵn sàng ghi nhớ nhánh này? Hãy kiểm tra kiến thức ngay!</span>
              <button
                onClick={() => setQuizMode(true)}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shrink-0 text-xs"
              >
                Kiểm tra ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
