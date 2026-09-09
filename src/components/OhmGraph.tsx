import React, { useMemo } from 'react';
import { MathRenderer } from './MathRenderer';

interface OhmGraphProps {
  currentU: number; // in Volts, e.g. 0 to 24
  currentR: number; // in Ohms
  maxU?: number;
  compareR?: number | null;
}

export const OhmGraph: React.FC<OhmGraphProps> = ({
  currentU,
  currentR,
  maxU = 24,
  compareR = null,
}) => {
  const currentI = useMemo(() => {
    return currentR > 0 ? currentU / currentR : 0;
  }, [currentU, currentR]);

  // Max I on graph: based on maxU / currentR (or maxU / compareR if compareR is smaller)
  const maxI = useMemo(() => {
    const minRes = compareR ? Math.min(currentR, compareR) : currentR;
    const computedMax = minRes > 0 ? (maxU / minRes) * 1.2 : 5;
    return Math.max(1, Math.min(10, Math.ceil(computedMax)));
  }, [currentR, compareR, maxU]);

  // SVG dimensions
  const width = 440;
  const height = 280;
  const padding = { top: 30, right: 30, bottom: 45, left: 55 };

  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Scale functions
  const scaleX = (u: number) => padding.left + (u / maxU) * plotWidth;
  const scaleY = (i: number) => height - padding.bottom - (i / maxI) * plotHeight;

  // Points for line 1
  const x1_0 = scaleX(0);
  const y1_0 = scaleY(0);
  const x1_end = scaleX(maxU);
  const y1_end = scaleY(maxU / currentR);

  // Points for comparison line if present
  const compareEnd = compareR ? scaleY(maxU / compareR) : null;

  // Current operating point
  const curX = scaleX(currentU);
  const curY = scaleY(currentI);

  // Grid tick marks
  const uTicks = [0, maxU * 0.25, maxU * 0.5, maxU * 0.75, maxU];
  const iTicks = [0, maxI * 0.25, maxI * 0.5, maxI * 0.75, maxI];

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
            Đồ thị I - U (Đường đặc trưng Vôn - Ampe)
          </h4>
          <p className="text-xs text-slate-500">Đồ thị là đường thẳng đi qua gốc toạ độ O(0,0)</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            R = {currentR} Ω
          </span>
          {compareR && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              R₂ = {compareR} Ω
            </span>
          )}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative flex justify-center overflow-hidden bg-slate-50/70 rounded-xl border border-slate-100 p-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full max-w-[460px] h-auto select-none"
        >
          {/* Grid lines */}
          {uTicks.map((u, idx) => (
            <line
              key={`grid-x-${idx}`}
              x1={scaleX(u)}
              y1={padding.top}
              x2={scaleX(u)}
              y2={height - padding.bottom}
              stroke="#e2e8f0"
              strokeDasharray="3 3"
              strokeWidth="1"
            />
          ))}
          {iTicks.map((i, idx) => (
            <line
              key={`grid-y-${idx}`}
              x1={padding.left}
              y1={scaleY(i)}
              x2={width - padding.right}
              y2={scaleY(i)}
              stroke="#e2e8f0"
              strokeDasharray="3 3"
              strokeWidth="1"
            />
          ))}

          {/* Coordinate axes */}
          <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right + 15}
            y2={height - padding.bottom}
            stroke="#475569"
            strokeWidth="2"
            markerEnd="url(#arrow-x)"
          />
          <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={padding.left}
            y2={padding.top - 15}
            stroke="#475569"
            strokeWidth="2"
            markerEnd="url(#arrow-y)"
          />

          {/* Arrow markers */}
          <defs>
            <marker
              id="arrow-x"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M1,1 L7,4 L1,7 Z" fill="#475569" />
            </marker>
            <marker
              id="arrow-y"
              markerWidth="8"
              markerHeight="8"
              refX="4"
              refY="2"
              orient="auto"
            >
              <path d="M1,7 L4,1 L7,7 Z" fill="#475569" />
            </marker>
          </defs>

          {/* Axis Labels */}
          <text
            x={width - padding.right + 12}
            y={height - padding.bottom + 18}
            className="text-[12px] font-bold fill-slate-700"
          >
            U (V)
          </text>
          <text
            x={padding.left - 30}
            y={padding.top - 8}
            className="text-[12px] font-bold fill-slate-700"
          >
            I (A)
          </text>
          <text
            x={padding.left - 14}
            y={height - padding.bottom + 16}
            className="text-[11px] font-semibold fill-slate-500"
          >
            O
          </text>

          {/* Ticks text */}
          {uTicks.slice(1).map((u, idx) => (
            <text
              key={`u-lbl-${idx}`}
              x={scaleX(u)}
              y={height - padding.bottom + 18}
              textAnchor="middle"
              className="text-[10px] fill-slate-500"
            >
              {u}
            </text>
          ))}
          {iTicks.slice(1).map((i, idx) => (
            <text
              key={`i-lbl-${idx}`}
              x={padding.left - 8}
              y={scaleY(i) + 4}
              textAnchor="end"
              className="text-[10px] fill-slate-500"
            >
              {i.toFixed(1)}
            </text>
          ))}

          {/* Comparison line if enabled */}
          {compareR && compareEnd !== null && (
            <line
              x1={x1_0}
              y1={y1_0}
              x2={x1_end}
              y2={compareEnd}
              stroke="#f59e0b"
              strokeWidth="2.5"
              strokeDasharray="4 2"
            />
          )}

          {/* Main Characteristic Line (I = U / R) */}
          <line
            x1={x1_0}
            y1={y1_0}
            x2={x1_end}
            y2={y1_end}
            stroke="#2563eb"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Projected dashed lines for current point */}
          {currentU > 0 && (
            <>
              <line
                x1={curX}
                y1={height - padding.bottom}
                x2={curX}
                y2={curY}
                stroke="#3b82f6"
                strokeDasharray="3 3"
                strokeWidth="1.5"
              />
              <line
                x1={padding.left}
                y1={curY}
                x2={curX}
                y2={curY}
                stroke="#3b82f6"
                strokeDasharray="3 3"
                strokeWidth="1.5"
              />
            </>
          )}

          {/* Current Operating Point marker */}
          <circle
            cx={curX}
            cy={curY}
            r="6"
            fill="#2563eb"
            stroke="#ffffff"
            strokeWidth="2.5"
            className="transition-all duration-150"
          />

          {/* Coordinate Tooltip tag on point */}
          <g transform={`translate(${curX + 8}, ${curY - 12})`}>
            <rect
              x="-2"
              y="-14"
              width="78"
              height="20"
              rx="6"
              fill="#1e293b"
              opacity="0.9"
            />
            <text
              x="37"
              y="0"
              textAnchor="middle"
              className="text-[10px] font-bold fill-white"
            >
              ({currentU}V, {currentI.toFixed(2)}A)
            </text>
          </g>
        </svg>
      </div>

      {/* Dynamic Observation Note */}
      <div className="mt-3 p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between text-xs text-blue-900">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold">Điểm hoạt động hiện tại:</span>
          <span>
            <MathRenderer
              math={`U = ${currentU}\\,\\text{V} \\implies I = ${currentI.toFixed(2)}\\,\\text{A}`}
              inline={true}
            />
          </span>
        </div>
        <div className="font-medium text-slate-600">
          <MathRenderer
            math={`k = \\frac{1}{R} = ${(1 / currentR).toFixed(3)}`}
            inline={true}
          />
        </div>
      </div>
    </div>
  );
};
