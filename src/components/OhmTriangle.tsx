import React, { useState } from 'react';
import { MathRenderer } from './MathRenderer';
import { Sparkles, Hand } from 'lucide-react';

export const OhmTriangle: React.FC = () => {
  const [selectedVar, setSelectedVar] = useState<'U' | 'I' | 'R'>('I');

  return (
    <div className="bg-gradient-to-br from-white via-sky-50/30 to-amber-50/20 rounded-3xl p-5 sm:p-6 border border-sky-100 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Bí Kíp Độc Quyền • Tam Giác Ohm
          </div>
          <h4 className="text-base sm:text-lg font-black text-slate-800">
            Tam Giác Ohm Kì Diệu (Bàn Tay Che Ảo)
          </h4>
          <p className="text-xs text-slate-500 font-semibold">
            Bấm vào chữ <strong className="text-sky-600">U</strong>, <strong className="text-emerald-600">I</strong> hoặc <strong className="text-amber-600">R</strong> để bàn tay ảo che đại lượng và hiện công thức!
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {(['U', 'I', 'R'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setSelectedVar(v)}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                selectedVar === v
                  ? v === 'U'
                    ? 'bg-sky-500 text-white shadow-sm ring-2 ring-sky-200'
                    : v === 'I'
                    ? 'bg-emerald-500 text-white shadow-sm ring-2 ring-emerald-200'
                    : 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-200'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {v === 'U' ? 'Che U' : v === 'I' ? 'Che I' : 'Che R'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
        {/* Interactive SVG Triangle (5 cols) */}
        <div className="sm:col-span-5 flex justify-center p-2">
          <svg viewBox="0 0 280 240" className="w-60 h-auto select-none drop-shadow-sm">
            {/* Outer Triangle background */}
            <polygon
              points="140,16 24,216 256,216"
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Horizontal divider line */}
            <line x1="72" y1="130" x2="208" y2="130" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
            {/* Vertical divider line */}
            <line x1="140" y1="130" x2="140" y2="216" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />

            {/* Top Area: U */}
            <polygon
              points="140,24 78,124 202,124"
              fill={selectedVar === 'U' ? '#38bdf8' : '#e0f2fe'}
              stroke="#0284c7"
              strokeWidth={selectedVar === 'U' ? '3' : '1.5'}
              className="cursor-pointer transition-all duration-200 hover:opacity-90"
              onClick={() => setSelectedVar('U')}
            />
            <text
              x="140"
              y="88"
              textAnchor="middle"
              className={`text-3xl font-black cursor-pointer transition-all ${
                selectedVar === 'U' ? 'fill-white' : 'fill-sky-700'
              }`}
              onClick={() => setSelectedVar('U')}
            >
              U
            </text>

            {/* Bottom-Left Area: I */}
            <polygon
              points="72,134 32,212 136,212 136,134"
              fill={selectedVar === 'I' ? '#34d399' : '#d1fae5'}
              stroke="#059669"
              strokeWidth={selectedVar === 'I' ? '3' : '1.5'}
              className="cursor-pointer transition-all duration-200 hover:opacity-90"
              onClick={() => setSelectedVar('I')}
            />
            <text
              x="86"
              y="182"
              textAnchor="middle"
              className={`text-3xl font-black cursor-pointer transition-all ${
                selectedVar === 'I' ? 'fill-white' : 'fill-emerald-700'
              }`}
              onClick={() => setSelectedVar('I')}
            >
              I
            </text>

            {/* Bottom-Right Area: R */}
            <polygon
              points="144,134 144,212 248,212 208,134"
              fill={selectedVar === 'R' ? '#fbbf24' : '#fef3c7'}
              stroke="#d97706"
              strokeWidth={selectedVar === 'R' ? '3' : '1.5'}
              className="cursor-pointer transition-all duration-200 hover:opacity-90"
              onClick={() => setSelectedVar('R')}
            />
            <text
              x="194"
              y="182"
              textAnchor="middle"
              className={`text-3xl font-black cursor-pointer transition-all ${
                selectedVar === 'R' ? 'fill-white' : 'fill-amber-700'
              }`}
              onClick={() => setSelectedVar('R')}
            >
              R
            </text>
          </svg>
        </div>

        {/* Dynamic Formula Display Box (7 cols) */}
        <div className="sm:col-span-7 bg-white p-5 rounded-2xl border border-sky-100 shadow-xs space-y-3">
          {selectedVar === 'U' && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-sky-700">
                <Hand className="w-4 h-4 text-sky-500" />
                <span>Đang che U $\implies$ Tìm Hiệu điện thế:</span>
              </div>
              <div className="p-3 bg-sky-50/80 rounded-xl border border-sky-200 text-center">
                <MathRenderer math="U = I \times R" inline={false} className="text-2xl font-black text-sky-900" />
              </div>
              <div className="text-xs text-slate-600 leading-relaxed space-y-1.5">
                <div>
                  👉 <strong>Quy tắc:</strong> Khi che chữ <strong>U</strong>, ở dưới còn <strong>I</strong> và <strong>R</strong> đứng cạnh nhau $\implies$ làm phép tính <strong>NHÂN</strong> (<MathRenderer math="I \cdot R" inline={true} />).
                </div>
                <div className="text-slate-600 pt-1 border-t border-slate-100 flex items-center gap-1">
                  🏷️ <strong>Đơn vị:</strong>
                  <MathRenderer math="1\,\text{V} = 1\,\text{A} \times 1\,\Omega" inline={true} />
                </div>
              </div>
            </div>
          )}

          {selectedVar === 'I' && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-700">
                <Hand className="w-4 h-4 text-emerald-500" />
                <span>Đang che I $\implies$ Tìm Cường độ dòng điện (Định luật Ohm):</span>
              </div>
              <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-center">
                <MathRenderer math="I = \frac{U}{R}" inline={false} className="text-2xl font-black text-emerald-900" />
              </div>
              <div className="text-xs text-slate-600 leading-relaxed space-y-1.5">
                <div>
                  👉 <strong>Quy tắc:</strong> Khi che chữ <strong>I</strong>, còn chữ <strong>U</strong> ở trên và chữ <strong>R</strong> ở dưới $\implies$ làm phép tính <strong>CHIA</strong> (<MathRenderer math="U / R" inline={true} />).
                </div>
                <div className="text-slate-600 pt-1 border-t border-slate-100 flex items-center gap-1">
                  🏷️ <strong>Đơn vị:</strong>
                  <MathRenderer math="1\,\text{A} = \frac{1\,\text{V}}{1\,\Omega}" inline={true} />
                </div>
              </div>
            </div>
          )}

          {selectedVar === 'R' && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-700">
                <Hand className="w-4 h-4 text-amber-500" />
                <span>Đang che R $\implies$ Tìm Điện trở của vật dẫn:</span>
              </div>
              <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-center">
                <MathRenderer math="R = \frac{U}{I}" inline={false} className="text-2xl font-black text-amber-900" />
              </div>
              <div className="text-xs text-slate-600 leading-relaxed space-y-1.5">
                <div>
                  👉 <strong>Quy tắc:</strong> Khi che chữ <strong>R</strong>, còn chữ <strong>U</strong> ở trên và chữ <strong>I</strong> ở dưới $\implies$ làm phép tính <strong>CHIA</strong> (<MathRenderer math="U / I" inline={true} />).
                </div>
                <div className="text-slate-600 pt-1 border-t border-slate-100 flex items-center gap-1">
                  🏷️ <strong>Đơn vị:</strong>
                  <MathRenderer math="1\,\Omega = \frac{1\,\text{V}}{1\,\text{A}}" inline={true} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
