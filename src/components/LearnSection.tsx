import React, { useState } from 'react';
import { LESSON_STAGES } from '../data/lessons';
import { MathRenderer } from './MathRenderer';
import { OhmTriangle } from './OhmTriangle';
import { Simulation } from './Simulation';
import { OhmieMascot } from './OhmieMascot';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  ChevronRight,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Check,
  Zap,
  Info,
  Sliders,
  Award,
  Lightbulb,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LearnSectionProps {
  unlockedStageId: number; // 1 to 7
  onUnlockStage: (stageNum: number) => void;
  onScoreEarned: (pts: number) => void;
}

const OHMIE_TIPS = [
  'Chào bạn! Điện trở giống như "gờ giảm tốc" trên đường vậy, electron qua đây sẽ bị cản trở lại nè! Cùng xem nhé!',
  'U tăng thì I tăng theo, tỉ lệ thuận cực kì chuẩn xác! Khi U gấp đôi thì I cũng gấp đôi luôn nha!',
  'Đồ thị I - U là đường thẳng luôn luôn đi qua gốc tọa độ O(0,0). Đường dốc hơn nghĩa là điện trở nhỏ hơn, dòng điện mạnh hơn!',
  'Bí kíp Tam Giác Ohm: Che đại lượng cần tìm là suy ra ngay công thức tính, không bao giờ lo nhầm lẫn!',
  'Kỹ năng số 1: Nhớ đổi đơn vị chuẩn: $1\\,\\text{k}\\Omega = 1\\,000\\,\\Omega$, $1\\,\\text{M}\\Omega = 10^6\\,\\Omega$. Thầy cô rất hay ra câu này đó!',
  'Dây dẫn càng dài thì R càng lớn, tiết diện càng rộng thì R càng nhỏ: $R = \\rho \\frac{l}{S}$. Rất trực quan và dễ nhớ!',
  'Tuyệt vời quá! Bạn đã nắm trọn vẹn toàn bộ lý thuyết Bài 11. Giờ thì tự tin 100% bước vào Chinh Phục Ohm thôi nào!',
];

export const LearnSection: React.FC<LearnSectionProps> = ({
  unlockedStageId = 1,
  onUnlockStage,
  onScoreEarned,
}) => {
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [completedStages, setCompletedStages] = useState<number[]>([1]);

  const stage = LESSON_STAGES[currentStageIdx];
  const stageNumber = currentStageIdx + 1;

  const handleSelectStage = (idx: number) => {
    if (idx + 1 <= unlockedStageId) {
      setCurrentStageIdx(idx);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
    }
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionIndex(idx);
  };

  const handleSubmitCheckQuestion = () => {
    if (selectedOptionIndex === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedOptionIndex === stage.checkQuestion.correctIndex;
    if (isCorrect) {
      onScoreEarned(20);
      try {
        confetti({ particleCount: 45, spread: 65, origin: { y: 0.65 } });
      } catch {}

      if (!completedStages.includes(stageNumber)) {
        setCompletedStages((prev) => [...prev, stageNumber]);
      }
      if (stageNumber < 7 && unlockedStageId <= stageNumber) {
        onUnlockStage(stageNumber + 1);
      }
      onScoreEarned(30); // bonus completion
    }
  };

  const isCurrentStageFinished =
    completedStages.includes(stageNumber) ||
    (isAnswerSubmitted && selectedOptionIndex === stage.checkQuestion.correctIndex);

  const handleNextStage = () => {
    if (currentStageIdx < LESSON_STAGES.length - 1) {
      setCurrentStageIdx((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 7 Stages Stepper Ribbon */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-sky-100 shadow-sm">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-800 flex items-center gap-1.5">
                Bản Đồ 7 Chặng Khám Phá Kiến Thức
                <span className="text-xs text-amber-500">✨</span>
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Hoàn thành câu hỏi kiểm tra ở mỗi chặng để mở khóa chặng tiếp theo nhé!
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[11px] text-slate-400 font-bold block">Tiến độ chặng</span>
            <span className="text-xs sm:text-sm font-black text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200/80">
              Chặng {stageNumber} / 7
            </span>
          </div>
        </div>

        {/* Horizontal Stages Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {LESSON_STAGES.map((stg, idx) => {
            const stgNum = idx + 1;
            const isUnlocked = stgNum <= unlockedStageId;
            const isCurrent = idx === currentStageIdx;
            const isDone = completedStages.includes(stgNum);

            return (
              <button
                key={stg.id}
                id={`stage-nav-${stg.id}`}
                onClick={() => handleSelectStage(idx)}
                disabled={!isUnlocked}
                className={`p-2.5 rounded-2xl border text-left transition-all relative ${
                  !isUnlocked
                    ? 'bg-slate-50 border-slate-200/80 text-slate-400 cursor-not-allowed'
                    : isCurrent
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white border-sky-500 shadow-md ring-4 ring-sky-100'
                    : isDone
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100/70'
                    : 'bg-white hover:bg-sky-50/60 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                      isCurrent
                        ? 'bg-white/20 text-white'
                        : isDone
                        ? 'bg-emerald-200 text-emerald-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Chặng {stgNum}
                  </span>
                  {!isUnlocked ? (
                    <Lock className="w-3 h-3 text-slate-400" />
                  ) : isDone ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  ) : null}
                </div>
                <div className="text-xs font-black truncate">{stg.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mascot Speech Banner for Current Stage */}
      <OhmieMascot
        mood={isAnswerSubmitted && selectedOptionIndex === stage.checkQuestion.correctIndex ? 'cheering' : 'happy'}
        speechTitle={`Mách nhỏ Chặng ${stageNumber}`}
        speechText={OHMIE_TIPS[currentStageIdx]}
      />

      {/* Stage Main Content Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-sky-100 shadow-sm space-y-6">
        {/* Stage Header */}
        <div className="border-b border-slate-100 pb-5">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-black shadow-xs">
              Chặng {stageNumber}
            </span>
            <span className="text-xs font-black text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-lg border border-amber-200">
              🏷️ {stage.badge}
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
              {stage.subtitle}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800">
            {stage.title}
          </h2>
          <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50/60 border border-sky-100 text-sm text-sky-950 font-semibold leading-relaxed flex items-start gap-2.5">
            <Lightbulb className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-black text-sky-800">Khái niệm cốt lõi: </span>
              <MathRenderer math={stage.conceptSummary} inline={true} />
            </div>
          </div>
        </div>

        {/* Core Content: Heading & Points */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-sky-700 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-sky-500" />
            1. {stage.content.heading}:
          </h3>
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
            {stage.content.points.map((pt, pIdx) => (
              <div key={pIdx} className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 mt-2 shrink-0 ring-4 ring-sky-100"></span>
                <div className="flex-1">
                  <MathRenderer math={pt} inline={true} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight Box if present */}
        {stage.content.highlightBox && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50/90 to-yellow-50/80 border-2 border-amber-200/80 space-y-2 text-xs sm:text-sm text-amber-950">
            <div className="font-black flex items-center gap-2 text-amber-900 text-sm">
              <Info className="w-4 h-4 text-amber-600 fill-amber-300" />
              <span>{stage.content.highlightBox.title}</span>
            </div>
            <div className="leading-relaxed font-medium">
              <MathRenderer math={stage.content.highlightBox.content} inline={true} />
            </div>
          </div>
        )}

        {/* Formulas Highlight Cards if present */}
        {stage.content.formulas && stage.content.formulas.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
              2. Công thức & Định nghĩa Toán - Lý Trọng Tâm:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {stage.content.formulas.map((f, fIdx) => (
                <div
                  key={fIdx}
                  className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50/80 via-yellow-50/50 to-orange-50/40 border border-amber-200/80 space-y-2 shadow-xs"
                >
                  <div className="text-xs font-black text-amber-800 uppercase tracking-wide flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    {f.label}
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 py-1 text-center bg-white/80 rounded-xl border border-amber-100">
                    <MathRenderer math={f.latex} inline={false} />
                  </div>
                  <div className="text-xs font-semibold text-slate-600">
                    <MathRenderer math={f.description} inline={true} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ohm Triangle for Stage 3 or 4 */}
        {(stageNumber === 3 || stageNumber === 4) && <OhmTriangle />}

        {/* Interactive Simulation integration */}
        {stage.interactiveSimulation && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-500" />
              3. Thí nghiệm ảo tương tác trực quan:
            </h3>
            <Simulation />
          </div>
        )}

        {/* Stage Check Question to pass stage */}
        <div className="border-t border-slate-100 pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-sky-700 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-sky-500" />
              {stage.interactiveSimulation ? '4.' : '3.'} Câu Hỏi Kiểm Tra Vượt Chặng:
            </h3>
            <span className="text-xs font-black text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-full border border-amber-200 flex items-center gap-1">
              ⭐ +20 điểm đúng
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-50/40 to-slate-50 border border-sky-100 space-y-4">
            <div className="text-sm sm:text-base font-black text-slate-800 leading-relaxed">
              <MathRenderer math={stage.checkQuestion.question} inline={true} />
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-2.5">
              {stage.checkQuestion.options.map((opt, oIdx) => {
                const isSelected = selectedOptionIndex === oIdx;
                let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50';

                if (isAnswerSubmitted) {
                  if (oIdx === stage.checkQuestion.correctIndex) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-200';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                  } else {
                    btnStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-sky-50 border-sky-500 text-sky-950 font-bold ring-2 ring-sky-200';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(oIdx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <div>
                      <MathRenderer math={opt} inline={true} />
                    </div>
                    {isAnswerSubmitted && oIdx === stage.checkQuestion.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Check Action Button */}
            {!isAnswerSubmitted ? (
              <button
                id="btn-submit-stage-quiz"
                onClick={handleSubmitCheckQuestion}
                disabled={selectedOptionIndex === null}
                className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 disabled:opacity-50 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md shadow-sky-500/20 transition-all flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Kiểm tra câu trả lời
              </button>
            ) : (
              <div className="space-y-3 pt-2">
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm ${
                    selectedOptionIndex === stage.checkQuestion.correctIndex
                      ? 'bg-emerald-50 text-emerald-950 border border-emerald-200'
                      : 'bg-rose-50 text-rose-950 border border-rose-200'
                  }`}
                >
                  <span className="font-black block mb-1 text-sm">
                    {selectedOptionIndex === stage.checkQuestion.correctIndex
                      ? '🎉 Chính xác xuất sắc! Bạn được cộng +20 điểm và mở khóa chặng tiếp theo!'
                      : '❌ Chưa đúng rồi nè bạn ơi! Cùng xem giải thích nhé:'}
                  </span>
                  <div className="font-medium leading-relaxed">
                    <MathRenderer math={stage.checkQuestion.explanation} inline={true} />
                  </div>
                </div>

                {isCurrentStageFinished && currentStageIdx < LESSON_STAGES.length - 1 && (
                  <button
                    id="btn-next-stage"
                    onClick={handleNextStage}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md shadow-emerald-500/20 transition-all flex items-center gap-2"
                  >
                    <span>Tiếp tục sang Chặng {stageNumber + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
