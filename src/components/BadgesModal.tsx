import React from 'react';
import { BADGES_LIST } from '../data/badges';
import { Award, Zap, Sliders, Cpu, ShieldAlert, Crown, X, CheckCircle2 } from 'lucide-react';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedBadgeIds: string[];
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  onClose,
  unlockedBadgeIds,
}) => {
  if (!isOpen) return null;

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Sliders': return <Sliders className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6" />;
      case 'Crown': return <Crown className="w-6 h-6" />;
      default: return <Award className="w-6 h-6" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800">
                Bộ Sưu Tập Huy Hiệu Ohm
              </h3>
              <p className="text-xs text-slate-500">
                Đã mở khóa {unlockedBadgeIds.length} / {BADGES_LIST.length} huy hiệu
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {BADGES_LIST.map((b) => {
            const isUnlocked = unlockedBadgeIds.includes(b.id);

            return (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-amber-50/70 to-orange-50/50 border-amber-300'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-amber-500/20'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {getBadgeIcon(b.iconName)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`text-sm font-black ${
                        isUnlocked ? 'text-amber-950' : 'text-slate-500'
                      }`}
                    >
                      {b.name}
                    </h4>
                    {isUnlocked && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3 h-3 text-amber-600" /> Đã đạt
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{b.description}</p>
                  <div className="mt-1.5 text-[11px] font-medium text-slate-400">
                    <span className="font-semibold text-slate-600">Yêu cầu: </span>
                    {b.requirement}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
