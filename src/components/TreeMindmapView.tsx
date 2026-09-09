import React, { useState } from 'react';
import { MINDMAP_DATA, MindmapBranch } from '../data/mindmap';
import { MathRenderer } from './MathRenderer';
import { Zap, Activity, Cpu, Sliders, Award, Lightbulb, ChevronRight, Sparkles, CheckCircle2, Info, Eye } from 'lucide-react';

interface TreeMindmapViewProps {
  onSelectBranch?: (branchId: string) => void;
  activeBranchId?: string;
}

export const TreeMindmapView: React.FC<TreeMindmapViewProps> = ({
  onSelectBranch,
  activeBranchId,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(activeBranchId || 'branch-ohm');
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);

  // Group branches into Left Wing and Right Wing for an organic, balanced mindmap tree layout
  const branches = MINDMAP_DATA.branches;
  const leftBranches = branches.slice(0, 3); // Điện trở, U và I, Định luật Ohm
  const rightBranches = branches.slice(3, 6); // Dây dẫn, Đơn vị, Ứng dụng

  const selectedBranch = branches.find((b) => b.id === selectedNodeId) || branches[2];
  const selectedSub = selectedBranch.subBranches.find((s) => s.id === selectedSubId);

  const getBranchIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'Activity': return <Activity className="w-4 h-4" />;
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'Sliders': return <Sliders className="w-4 h-4" />;
      case 'Award': return <Award className="w-4 h-4" />;
      case 'Lightbulb': return <Lightbulb className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getBranchStyles = (color: string, isSelected: boolean) => {
    switch (color) {
      case 'blue':
        return {
          border: 'border-blue-300',
          bg: isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 ring-4 ring-blue-100' : 'bg-blue-50 text-blue-900 hover:bg-blue-100/90',
          badge: 'bg-blue-100 text-blue-700 border-blue-200',
          line: '#3b82f6',
          accent: 'text-blue-600',
        };
      case 'indigo':
        return {
          border: 'border-indigo-300',
          bg: isSelected ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 ring-4 ring-indigo-100' : 'bg-indigo-50 text-indigo-900 hover:bg-indigo-100/90',
          badge: 'bg-indigo-100 text-indigo-700 border-indigo-200',
          line: '#6366f1',
          accent: 'text-indigo-600',
        };
      case 'cyan':
        return {
          border: 'border-cyan-300',
          bg: isSelected ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/25 ring-4 ring-cyan-100' : 'bg-cyan-50 text-cyan-900 hover:bg-cyan-100/90',
          badge: 'bg-cyan-100 text-cyan-700 border-cyan-200',
          line: '#06b6d4',
          accent: 'text-cyan-600',
        };
      case 'amber':
        return {
          border: 'border-amber-300',
          bg: isSelected ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/25 ring-4 ring-amber-100' : 'bg-amber-50 text-amber-900 hover:bg-amber-100/90',
          badge: 'bg-amber-100 text-amber-700 border-amber-200',
          line: '#f59e0b',
          accent: 'text-amber-600',
        };
      case 'emerald':
        return {
          border: 'border-emerald-300',
          bg: isSelected ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 ring-4 ring-emerald-100' : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100/90',
          badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
          line: '#10b981',
          accent: 'text-emerald-600',
        };
      case 'purple':
        return {
          border: 'border-purple-300',
          bg: isSelected ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 ring-4 ring-purple-100' : 'bg-purple-50 text-purple-900 hover:bg-purple-100/90',
          badge: 'bg-purple-100 text-purple-700 border-purple-200',
          line: '#a855f7',
          accent: 'text-purple-600',
        };
      default:
        return {
          border: 'border-slate-300',
          bg: isSelected ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-800',
          badge: 'bg-slate-100 text-slate-700 border-slate-200',
          line: '#64748b',
          accent: 'text-slate-600',
        };
    }
  };

  const handleBranchClick = (branchId: string) => {
    setSelectedNodeId(branchId);
    setSelectedSubId(null);
    if (onSelectBranch) onSelectBranch(branchId);
  };

  const handleSubClick = (branchId: string, subId: string) => {
    setSelectedNodeId(branchId);
    setSelectedSubId(subId);
    if (onSelectBranch) onSelectBranch(branchId);
  };

  return (
    <div className="space-y-6">
      {/* Interactive Mindmap Tree Canvas */}
      <div className="bg-gradient-to-br from-slate-50 via-white to-sky-50/40 rounded-3xl p-4 sm:p-8 border-2 border-slate-200/80 shadow-inner relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Header indicator */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200/60 relative z-10">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Sơ Đồ Cây Tư Duy Trực Quan (Bấm vào nhánh để khám phá)
            </span>
          </div>
          <div className="text-xs font-semibold text-slate-400 hidden sm:block">
            6 Nhánh chính • 18 Nhánh phụ logic
          </div>
        </div>

        {/* Mindmap Layout Container: Left Wings - Center Root - Right Wings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
          {/* LEFT WING (3 Branches) */}
          <div className="lg:col-span-4 space-y-4">
            {leftBranches.map((b, idx) => {
              const isSelected = b.id === selectedNodeId;
              const styles = getBranchStyles(b.color, isSelected);
              return (
                <div key={b.id} className="relative group">
                  {/* Main Branch Card */}
                  <div
                    onClick={() => handleBranchClick(b.id)}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-200 ${styles.border} ${styles.bg}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-white/20 text-white' : styles.badge}`}>
                          {getBranchIcon(b.icon)}
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase tracking-wider opacity-80">
                            Nhánh 0{idx + 1}
                          </div>
                          <div className="text-sm font-black">{b.name}</div>
                        </div>
                      </div>
                      {b.formula && (
                        <div className={`text-xs px-2.5 py-1 rounded-xl font-mono font-bold shrink-0 flex items-center justify-center ${
                          isSelected ? 'bg-white/25 text-white' : 'bg-white/95 text-slate-800 shadow-xs border border-slate-200/60'
                        }`}>
                          <MathRenderer math={b.formula} inline={true} />
                        </div>
                      )}
                    </div>

                    {/* Sub-branches preview inside branch */}
                    <div className="mt-3 pt-2.5 border-t border-black/10 space-y-1.5">
                      {b.subBranches.map((sub) => {
                        const isSubSelected = isSelected && selectedSubId === sub.id;
                        return (
                          <div
                            key={sub.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSubClick(b.id, sub.id);
                            }}
                            className={`px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between gap-2 transition-all cursor-pointer ${
                              isSubSelected
                                ? 'bg-white text-slate-900 font-black shadow-xs ring-2 ring-white/50'
                                : isSelected
                                ? 'bg-white/15 text-white/90 hover:bg-white/25 font-semibold'
                                : 'bg-white/70 text-slate-700 hover:bg-white font-medium'
                            }`}
                          >
                            <span className="truncate flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0 opacity-70" />
                              {sub.title}
                            </span>
                            <ChevronRight className="w-3 h-3 opacity-60 shrink-0" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CENTER ROOT NODE */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-4">
            <div className="relative group w-full max-w-xs">
              {/* Outer pulsing ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse" />

              {/* Main Core Node */}
              <div className="relative bg-white rounded-3xl p-6 border-2 border-indigo-200 shadow-2xl text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 mb-3 transform group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-black">Ω</span>
                </div>

                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
                  Trọng tâm kiến thức KHTN 9
                </span>

                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  BÀI 11: ĐIỆN TRỞ & ĐỊNH LUẬT OHM
                </h3>

                <div className="mt-3 p-2 bg-indigo-50/70 rounded-2xl border border-indigo-100 w-full text-xs font-mono font-bold text-indigo-900">
                  <MathRenderer math="I = \frac{U}{R} \iff R = \rho \frac{l}{S}" inline={true} />
                </div>

                <p className="text-[11px] text-slate-500 font-medium mt-2">
                  Gốc rễ mọi định luật mạch điện một chiều!
                </p>
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="text-xs text-slate-400 font-bold">
                💡 Bấm vào bất kỳ nhánh nào để phóng to bài học
              </span>
            </div>
          </div>

          {/* RIGHT WING (3 Branches) */}
          <div className="lg:col-span-4 space-y-4">
            {rightBranches.map((b, idx) => {
              const isSelected = b.id === selectedNodeId;
              const styles = getBranchStyles(b.color, isSelected);
              return (
                <div key={b.id} className="relative group">
                  {/* Main Branch Card */}
                  <div
                    onClick={() => handleBranchClick(b.id)}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all duration-200 ${styles.border} ${styles.bg}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-white/20 text-white' : styles.badge}`}>
                          {getBranchIcon(b.icon)}
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase tracking-wider opacity-80">
                            Nhánh 0{idx + 4}
                          </div>
                          <div className="text-sm font-black">{b.name}</div>
                        </div>
                      </div>
                      {b.formula && (
                        <div className={`text-xs px-2.5 py-1 rounded-xl font-mono font-bold shrink-0 flex items-center justify-center ${
                          isSelected ? 'bg-white/25 text-white' : 'bg-white/95 text-slate-800 shadow-xs border border-slate-200/60'
                        }`}>
                          <MathRenderer math={b.formula} inline={true} />
                        </div>
                      )}
                    </div>

                    {/* Sub-branches preview inside branch */}
                    <div className="mt-3 pt-2.5 border-t border-black/10 space-y-1.5">
                      {b.subBranches.map((sub) => {
                        const isSubSelected = isSelected && selectedSubId === sub.id;
                        return (
                          <div
                            key={sub.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSubClick(b.id, sub.id);
                            }}
                            className={`px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between gap-2 transition-all cursor-pointer ${
                              isSubSelected
                                ? 'bg-white text-slate-900 font-black shadow-xs ring-2 ring-white/50'
                                : isSelected
                                ? 'bg-white/15 text-white/90 hover:bg-white/25 font-semibold'
                                : 'bg-white/70 text-slate-700 hover:bg-white font-medium'
                            }`}
                          >
                            <span className="truncate flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0 opacity-70" />
                              {sub.title}
                            </span>
                            <ChevronRight className="w-3 h-3 opacity-60 shrink-0" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Branch Detailed Focus Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-200">
              {getBranchIcon(selectedBranch.icon)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                  Chi tiết nhánh: {selectedBranch.name}
                </span>
                {selectedBranch.formula && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-bold text-xs">
                    <MathRenderer math={selectedBranch.formula} inline={true} />
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                {selectedBranch.summary}
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-semibold bg-slate-50 px-3 py-1.5 rounded-xl">
            {selectedSub ? `Đang xem: ${selectedSub.title}` : 'Bấm vào thẻ con bên dưới để học sâu'}
          </div>
        </div>

        {/* Sub-branch Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          {selectedBranch.subBranches.map((sub, sIdx) => {
            const isSubActive = selectedSubId === sub.id;
            return (
              <div
                key={sub.id}
                onClick={() => setSelectedSubId(isSubActive ? null : sub.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSubActive
                    ? 'border-indigo-500 bg-indigo-50/50 shadow-md ring-2 ring-indigo-200'
                    : 'border-slate-200/90 bg-slate-50/40 hover:bg-white hover:border-indigo-200 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                    Ý {sIdx + 1}
                  </span>
                  {sub.formula && (
                    <span className="text-xs font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-100">
                      <MathRenderer math={sub.formula} inline={true} />
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-black text-slate-800 mb-1.5">
                  {sub.title}
                </h4>
                <div className="text-xs text-slate-600 leading-relaxed">
                  <MathRenderer math={sub.description} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
