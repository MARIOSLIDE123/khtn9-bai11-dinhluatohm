import React, { useState } from 'react';
import { APPLICATION_PROBLEMS, ApplicationProblem } from '../data/applicationProblems';
import { MathRenderer } from './MathRenderer';
import { CheckCircle2, HelpCircle, ChevronRight, Calculator, AlertCircle, Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ApplicationSectionProps {
  onScoreEarned: (pts: number) => void;
}

export const ApplicationSection: React.FC<ApplicationSectionProps> = ({
  onScoreEarned,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [activeProblemId, setActiveProblemId] = useState<string>(APPLICATION_PROBLEMS[0].id);
  const [inputVal, setInputVal] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [hintStep, setHintStep] = useState<number>(0);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [completedProblems, setCompletedProblems] = useState<string[]>([]);

  const filteredProblems = APPLICATION_PROBLEMS.filter((p) => p.level === selectedLevel);
  const activeProblem = APPLICATION_PROBLEMS.find((p) => p.id === activeProblemId) || filteredProblems[0] || APPLICATION_PROBLEMS[0];

  const handleSelectProblem = (p: ApplicationProblem) => {
    setActiveProblemId(p.id);
    setInputVal('');
    setIsSubmitted(false);
    setIsCorrect(false);
    setHintStep(0);
    setShowSolution(false);
  };

  const handleLevelChange = (lvl: 'A' | 'B' | 'C' | 'D') => {
    setSelectedLevel(lvl);
    const firstOfLvl = APPLICATION_PROBLEMS.find((p) => p.level === lvl);
    if (firstOfLvl) {
      handleSelectProblem(firstOfLvl);
    }
  };

  const handleSubmitAnswer = () => {
    if (!inputVal.trim() || isSubmitted) return;
    setIsSubmitted(true);

    const userNum = parseFloat(inputVal.replace(',', '.'));
    const isNumMatch = !isNaN(userNum) && Math.abs(userNum - activeProblem.correctAnswer) <= activeProblem.tolerance;
    const isStringMatch = activeProblem.acceptableAnswers.some(
      (a) => String(a).trim().replace(',', '.') === inputVal.trim().replace(',', '.')
    );

    const correct = isNumMatch || isStringMatch;
    setIsCorrect(correct);

    if (correct) {
      let pts = 20;
      if (selectedLevel === 'C') pts = 30;
      if (selectedLevel === 'D') pts = 40;
      if (hintStep === 0) pts += 10; // no hint bonus

      onScoreEarned(pts);
      if (!completedProblems.includes(activeProblem.id)) {
        setCompletedProblems((prev) => [...prev, activeProblem.id]);
      }
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {}
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Vận Dụng & Tình Huống Thực Tế
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800">
            Khu Vực Vận Dụng Bài 11
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Giải quyết các bài toán vật lí và bài toán kỹ thuật từ cơ bản đến nâng cao
          </p>
        </div>

        {/* Level Selector Tabs */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
          {[
            { id: 'A', label: 'Cấp A: Cơ bản', color: 'blue' },
            { id: 'B', label: 'Cấp B: Thông hiểu', color: 'indigo' },
            { id: 'C', label: 'Cấp C: Vận dụng', color: 'amber' },
            { id: 'D', label: 'Cấp D: Thực tế', color: 'emerald' },
          ].map((tab) => {
            const isSelected = selectedLevel === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-app-level-${tab.id}`}
                onClick={() => handleLevelChange(tab.id as 'A' | 'B' | 'C' | 'D')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Problems List Sidebar (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Danh sách bài toán Cấp độ {selectedLevel}:
          </h3>

          <div className="space-y-2">
            {filteredProblems.map((prob, idx) => {
              const isSelected = prob.id === activeProblem.id;
              const isDone = completedProblems.includes(prob.id);

              return (
                <button
                  key={prob.id}
                  id={`prob-btn-${prob.id}`}
                  onClick={() => handleSelectProblem(prob)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-500 text-blue-900 shadow-sm'
                      : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                      Bài {idx + 1} • {prob.levelBadge}
                    </span>
                    {isDone && (
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đã xong
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-slate-800 line-clamp-2">
                    {prob.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Problem Solving Main Workspace (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
          {/* Problem Header */}
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold">
                Cấp độ {activeProblem.level}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {activeProblem.levelBadge}
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-800">
              {activeProblem.title}
            </h3>
          </div>

          {/* Scenario & Context Description */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 text-sm text-slate-700 leading-relaxed space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
              Tình huống bài toán:
            </span>
            <p>
              <MathRenderer math={activeProblem.scenario} inline={true} />
            </p>
          </div>

          {/* Given Data Cards */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Dữ kiện đã cho:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {activeProblem.givenData.map((d, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 p-3 rounded-xl shadow-xs"
                >
                  <span className="text-[10px] text-slate-400 font-medium block truncate">
                    {d.label}
                  </span>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">
                    {d.latex ? (
                      <MathRenderer math={d.latex} inline={true} />
                    ) : (
                      d.value
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Target Question & Answer Input Box */}
          <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-4">
            <div>
              <span className="text-xs font-black text-blue-600 uppercase tracking-wider block mb-1">
                Yêu cầu:
              </span>
              <div className="text-sm font-bold text-slate-800">
                <MathRenderer math={activeProblem.targetQuestion} inline={true} />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                inputMode="decimal"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Nhập số kết quả tính..."
                disabled={isSubmitted && isCorrect}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && inputVal) {
                    handleSubmitAnswer();
                  }
                }}
                className="flex-1 min-w-[180px] px-4 py-3 rounded-2xl border border-slate-300 bg-white font-bold text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="px-4 py-3 rounded-2xl bg-white border border-slate-300 font-bold text-slate-700 text-sm">
                {activeProblem.targetUnit}
              </span>
              <button
                id="btn-submit-app-answer"
                onClick={handleSubmitAnswer}
                disabled={!inputVal.trim() || (isSubmitted && isCorrect)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm rounded-2xl shadow-sm transition-all flex items-center gap-1.5"
              >
                <Calculator className="w-4 h-4" />
                Kiểm tra đáp án
              </button>
            </div>
          </div>

          {/* 3-Step Hints */}
          <div className="border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-500 font-medium">Hệ thống trợ giúp tư duy (3 bước):</span>
              {hintStep < 3 && (
                <button
                  id="btn-app-hint"
                  onClick={() => setHintStep((s) => Math.min(3, s + 1))}
                  className="text-amber-600 font-bold hover:underline flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  Mở Gợi ý bước {hintStep + 1}
                </button>
              )}
            </div>

            {hintStep > 0 && (
              <div className="space-y-2 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
                {activeProblem.hints.slice(0, hintStep).map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="font-bold text-amber-700 shrink-0">
                      💡 Bước {i + 1}:
                    </span>
                    <div>
                      <MathRenderer math={h} inline={true} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Feedback & Step-by-Step Solution */}
          {isSubmitted && (
            <div className="space-y-4">
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm ${
                  isCorrect
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-rose-50 text-rose-900 border border-rose-200'
                }`}
              >
                <span className="font-bold block mb-1">
                  {isCorrect
                    ? '🎉 Xuất sắc! Kết quả tính toán của bạn hoàn toàn chính xác!'
                    : '❌ Kết quả chưa chính xác! Hãy kiểm tra lại bước tính hoặc dùng gợi ý.'}
                </span>
                {!isCorrect && (
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="text-xs font-bold text-blue-700 underline mt-1"
                  >
                    {showSolution ? 'Ẩn lời giải' : 'Xem các bước giải chi tiết'}
                  </button>
                )}
              </div>

              {/* Step-by-step Detailed Solution Display */}
              {(isCorrect || showSolution) && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    Lời giải chi tiết từng bước:
                  </span>
                  <div className="space-y-2.5">
                    {activeProblem.stepByStepSolution.map((sol) => (
                      <div
                        key={sol.step}
                        className="bg-white p-3.5 rounded-xl border border-slate-200/80 text-xs space-y-1"
                      >
                        <div className="font-bold text-blue-700">
                          Bước {sol.step}: {sol.title}
                        </div>
                        <div className="font-mono text-slate-800 py-0.5">
                          <MathRenderer math={sol.calculation} inline={true} />
                        </div>
                        <div className="text-slate-600">
                          <MathRenderer math={sol.result} inline={true} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
