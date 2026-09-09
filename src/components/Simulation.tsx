import React, { useState, useMemo, useEffect } from 'react';
import { MathRenderer } from './MathRenderer';
import { OhmGraph } from './OhmGraph';
import { Play, Pause, RotateCcw, Power, Zap, Sliders, Layers } from 'lucide-react';

interface SimulationProps {
  initialU?: number;
  initialR?: number;
  onValuesChange?: (u: number, r: number, i: number) => void;
}

const MATERIALS = [
  { name: 'Bạc (Ag)', rho: 1.6e-8, color: '#94a3b8', desc: 'Dẫn điện tốt nhất' },
  { name: 'Đồng (Cu)', rho: 1.7e-8, color: '#ea580c', desc: 'Dùng làm lõi dây điện' },
  { name: 'Nhôm (Al)', rho: 2.8e-8, color: '#64748b', desc: 'Làm đường dây cao thế' },
  { name: 'Vonfram (W)', rho: 5.5e-8, color: '#f59e0b', desc: 'Làm dây tóc bóng đèn' },
  { name: 'Sắt (Fe)', rho: 12.0e-8, color: '#475569', desc: 'Dẫn điện trung bình' },
  { name: 'Niken-crôm (Nicrom)', rho: 110e-8, color: '#dc2626', desc: 'Làm dây mayso đốt nóng' },
];

export const Simulation: React.FC<SimulationProps> = ({
  initialU = 12,
  initialR = 10,
  onValuesChange,
}) => {
  const [activeTab, setActiveTab] = useState<'circuit' | 'wire'>('circuit');
  const [u, setU] = useState<number>(initialU);
  const [r, setR] = useState<number>(initialR);
  const [switchClosed, setSwitchClosed] = useState<boolean>(true);
  const [compareR, setCompareR] = useState<number | null>(null);

  // Wire simulation states
  const [selectedMaterialIdx, setSelectedMaterialIdx] = useState<number>(1); // Default Cu
  const [wireLength, setWireLength] = useState<number>(50); // meters
  const [wireAreaMm2, setWireAreaMm2] = useState<number>(1.0); // mm^2

  // Computed Current
  const currentI = useMemo(() => {
    if (!switchClosed || r <= 0) return 0;
    return u / r;
  }, [u, r, switchClosed]);

  // Computed Wire Resistance
  const computedWireR = useMemo(() => {
    const mat = MATERIALS[selectedMaterialIdx];
    const sM2 = wireAreaMm2 * 1e-6;
    return (mat.rho * wireLength) / sM2;
  }, [selectedMaterialIdx, wireLength, wireAreaMm2]);

  // Electron animation counter for visual current movement
  const [tick, setTick] = useState<number>(0);
  useEffect(() => {
    if (!switchClosed || currentI <= 0) return;
    // Speed proportional to current
    const speed = Math.max(20, Math.min(120, Math.round(100 / (currentI * 1.5 + 0.2))));
    const interval = setInterval(() => {
      setTick((prev) => (prev + 1) % 100);
    }, speed);
    return () => clearInterval(interval);
  }, [switchClosed, currentI]);

  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(u, r, currentI);
    }
  }, [u, r, currentI, onValuesChange]);

  const handleApplyWireToCircuit = () => {
    const roundedR = Math.max(1, Math.min(100, Math.round(computedWireR * 10) / 10));
    setR(roundedR);
    setActiveTab('circuit');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
      {/* Simulation Header & Tabs */}
      <div className="bg-slate-50/80 border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Phòng Thí Nghiệm Ảo: Định Luật Ohm & Dây Dẫn
            </h3>
            <p className="text-xs text-slate-500">Mô phỏng trực quan, thời gian thực theo chuẩn Bài 11</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-slate-200/70 p-1 rounded-xl">
          <button
            id="tab-circuit-sim"
            onClick={() => setActiveTab('circuit')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'circuit'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mạch điện & Đồ thị I-U
          </button>
          <button
            id="tab-wire-sim"
            onClick={() => setActiveTab('wire')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'wire'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kích thước & Vật liệu Dây dẫn
          </button>
        </div>
      </div>

      {/* Main Simulation Viewport */}
      {activeTab === 'circuit' ? (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Circuit Interactive SVG & Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Realtime Meters Bar */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-blue-50/80 border border-blue-200/70 rounded-2xl p-3 text-center">
                <span className="text-xs font-medium text-blue-700 block mb-0.5">Hiệu điện thế U</span>
                <span className="text-xl sm:text-2xl font-black text-blue-900">
                  {u} <span className="text-sm font-semibold">V</span>
                </span>
              </div>
              <div className="bg-amber-50/80 border border-amber-200/70 rounded-2xl p-3 text-center">
                <span className="text-xs font-medium text-amber-700 block mb-0.5">Điện trở R</span>
                <span className="text-xl sm:text-2xl font-black text-amber-900">
                  {r} <span className="text-sm font-semibold">Ω</span>
                </span>
              </div>
              <div className="bg-emerald-50/80 border border-emerald-200/70 rounded-2xl p-3 text-center">
                <span className="text-xs font-medium text-emerald-700 block mb-0.5">Dòng điện I</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-900">
                  {switchClosed ? currentI.toFixed(2) : '0.00'}{' '}
                  <span className="text-sm font-semibold">A</span>
                </span>
                <span className="text-[10px] text-emerald-600 block mt-0.5">
                  ({switchClosed ? Math.round(currentI * 1000) : 0} mA)
                </span>
              </div>
            </div>

            {/* Interactive Schematic Circuit Canvas */}
            <div className="relative bg-slate-900 rounded-2xl p-4 text-white overflow-hidden shadow-inner border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      switchClosed ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
                    }`}
                  ></span>
                  Trạng thái: {switchClosed ? 'Mạch kín (Có dòng điện)' : 'Mạch hở (Ngắt điện)'}
                </div>
                <button
                  id="btn-toggle-switch"
                  onClick={() => setSwitchClosed(!switchClosed)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    switchClosed
                      ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  {switchClosed ? 'Mở khóa K' : 'Đóng khóa K'}
                </button>
              </div>

              {/* Circuit SVG Diagram */}
              <svg viewBox="0 0 540 280" className="w-full h-auto select-none">
                {/* Circuit Wires Main Loop */}
                {/* Top wire */}
                <line x1="80" y1="60" x2="460" y2="60" stroke="#38bdf8" strokeWidth="3" />
                {/* Right wire */}
                <line x1="460" y1="60" x2="460" y2="220" stroke="#38bdf8" strokeWidth="3" />
                {/* Bottom wire */}
                <line x1="460" y1="220" x2="80" y2="220" stroke="#38bdf8" strokeWidth="3" />
                {/* Left wire */}
                <line x1="80" y1="220" x2="80" y2="60" stroke="#38bdf8" strokeWidth="3" />

                {/* Animated electron dots along the wire loop */}
                {switchClosed && currentI > 0 && (
                  <g fill="#fde047" opacity="0.9">
                    {[0, 20, 40, 60, 80].map((offset) => {
                      const pos = (tick * 4 + offset) % 100;
                      // Determine coordinate along rectangular path
                      // Perimeter: top (380) + right (160) + bottom (380) + left (160) = 1080
                      const totalP = 1080;
                      const d = (pos / 100) * totalP;
                      let cx = 80;
                      let cy = 60;
                      if (d < 380) {
                        cx = 80 + d;
                        cy = 60;
                      } else if (d < 380 + 160) {
                        cx = 460;
                        cy = 60 + (d - 380);
                      } else if (d < 380 + 160 + 380) {
                        cx = 460 - (d - 540);
                        cy = 220;
                      } else {
                        cx = 80;
                        cy = 220 - (d - 920);
                      }
                      return <circle key={offset} cx={cx} cy={cy} r="3" />;
                    })}
                  </g>
                )}

                {/* Left: DC Power Source (Battery) */}
                <rect x="55" y="115" width="50" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <line x1="70" y1="130" x2="70" y2="150" stroke="#f87171" strokeWidth="4" />
                <line x1="90" y1="125" x2="90" y2="155" stroke="#60a5fa" strokeWidth="2" />
                <text x="65" y="122" className="text-[10px] font-bold fill-red-400">+</text>
                <text x="86" y="122" className="text-[10px] font-bold fill-blue-400">-</text>
                <text x="80" y="180" textAnchor="middle" className="text-[11px] font-bold fill-slate-300">
                  Nguồn: {u}V
                </text>

                {/* Top: Switch K */}
                <circle cx="210" cy="60" r="4" fill="#38bdf8" />
                <circle cx="250" cy="60" r="4" fill="#38bdf8" />
                {switchClosed ? (
                  <line x1="210" y1="60" x2="250" y2="60" stroke="#4ade80" strokeWidth="3" />
                ) : (
                  <line x1="210" y1="60" x2="242" y2="40" stroke="#f87171" strokeWidth="3" />
                )}
                <text x="230" y="32" textAnchor="middle" className="text-[10px] font-bold fill-slate-300">
                  Khóa K ({switchClosed ? 'Đóng' : 'Mở'})
                </text>

                {/* Right: Resistor R */}
                <rect x="425" y="115" width="70" height="46" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="460" y="136" textAnchor="middle" className="text-[12px] font-bold fill-amber-400">
                  R = {r} Ω
                </text>
                <text x="460" y="152" textAnchor="middle" className="text-[9px] fill-slate-400">
                  Điện trở
                </text>

                {/* Voltmeter V (Connected in Parallel across Resistor) */}
                {/* Branches */}
                <path d="M 460,95 L 515,95 L 515,115" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />
                <path d="M 460,185 L 515,185 L 515,165" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />
                <circle cx="515" cy="140" r="16" fill="#0f172a" stroke="#60a5fa" strokeWidth="2" />
                <text x="515" y="144" textAnchor="middle" className="text-[11px] font-black fill-blue-400">
                  V
                </text>
                <text x="515" y="168" textAnchor="middle" className="text-[9px] font-semibold fill-blue-300">
                  {switchClosed ? u : 0}V
                </text>

                {/* Bottom: Ammeter A (Connected in Series) */}
                <circle cx="270" cy="220" r="18" fill="#0f172a" stroke="#34d399" strokeWidth="2" />
                <text x="270" y="225" textAnchor="middle" className="text-[12px] font-black fill-emerald-400">
                  A
                </text>
                <text x="270" y="254" textAnchor="middle" className="text-[11px] font-bold fill-emerald-300">
                  {switchClosed ? currentI.toFixed(2) : '0.00'} A
                </text>
              </svg>
            </div>

            {/* Circuit Sliders & Controls */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-4">
              {/* Voltage Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="slider-u" className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    Hiệu điện thế nguồn U:
                  </label>
                  <span className="text-xs font-black text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-md">
                    {u} V
                  </span>
                </div>
                <input
                  id="slider-u"
                  type="range"
                  min="0"
                  max="24"
                  step="1"
                  value={u}
                  onChange={(e) => setU(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>0V (Tắt nguồn)</span>
                  <span>6V</span>
                  <span>12V (Tiêu chuẩn)</span>
                  <span>18V</span>
                  <span>24V (Tối đa)</span>
                </div>
              </div>

              {/* Resistance Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="slider-r" className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Điện trở đoạn mạch R:
                  </label>
                  <span className="text-xs font-black text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md">
                    {r} Ω
                  </span>
                </div>
                <input
                  id="slider-r"
                  type="range"
                  min="1"
                  max="60"
                  step="1"
                  value={r}
                  onChange={(e) => setR(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>1 Ω (Cản trở ít)</span>
                  <span>15 Ω</span>
                  <span>30 Ω</span>
                  <span>45 Ω</span>
                  <span>60 Ω (Cản trở nhiều)</span>
                </div>
              </div>

              {/* Quick Presets & Compare R */}
              <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-500 font-medium">Đặt nhanh R:</span>
                  {[5, 10, 20, 30].map((val) => (
                    <button
                      key={val}
                      onClick={() => setR(val)}
                      className={`px-2 py-0.5 rounded text-xs font-medium border ${
                        r === val
                          ? 'bg-amber-500 text-white border-amber-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {val}Ω
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <button
                    id="btn-compare-r"
                    onClick={() => setCompareR(compareR ? null : r === 20 ? 10 : 20)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                      compareR
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {compareR ? `Đang so sánh với R₂=${compareR}Ω (Bấm tắt)` : 'So sánh với R₂ khác'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time I-U Graph (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <OhmGraph currentU={u} currentR={r} compareR={compareR} />

            {/* Formula Card Box */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 rounded-2xl p-4 border border-blue-200/70">
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
                Công thức Định luật Ohm áp dụng:
              </h4>
              <MathRenderer math="I = \frac{U}{R}" inline={false} className="text-lg font-black text-blue-800" />
              <div className="mt-2 text-xs text-slate-700 bg-white/80 rounded-xl p-2.5 border border-blue-100 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Thay số hiện tại:</span>
                  <span className="font-bold text-slate-800">
                    <MathRenderer
                      math={`I = \\frac{${u}}{${r}} = ${currentI.toFixed(2)}\\,\\text{A}`}
                      inline={true}
                    />
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 space-y-1">
                  <p>• Giữ nguyên R = {r} Ω, khi tăng U thì I tăng tỉ lệ thuận.</p>
                  <p>• Giữ nguyên U = {u} V, khi tăng R thì I giảm tỉ lệ nghịch.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Wire Dimensions Simulation Viewport */
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Wire Visual Representation (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-inner">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs text-slate-300 font-semibold flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  Mô phỏng hình học đoạn dây dẫn đồng chất
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {MATERIALS[selectedMaterialIdx].name}
                </span>
              </div>

              {/* Wire 3D Cylinder SVG Preview */}
              <div className="h-44 flex items-center justify-center bg-slate-950/60 rounded-xl border border-slate-800/80 p-4">
                <svg viewBox="0 0 500 160" className="w-full h-auto select-none">
                  {/* Dynamic cylinder based on wireLength & wireAreaMm2 */}
                  {(() => {
                    const mat = MATERIALS[selectedMaterialIdx];
                    // Length maps from 1-100m to 100-420px
                    const svgLen = 100 + (wireLength / 100) * 300;
                    // Thickness maps from 0.1-5.0mm^2 to 10-60px height
                    const svgRadiusY = 12 + Math.sqrt(wireAreaMm2) * 16;
                    const startX = 250 - svgLen / 2;
                    const endX = 250 + svgLen / 2;
                    const centerY = 80;

                    return (
                      <g>
                        {/* Shadow */}
                        <ellipse
                          cx={250}
                          cy={centerY + svgRadiusY + 14}
                          rx={svgLen / 2 + 10}
                          ry="8"
                          fill="#000000"
                          opacity="0.4"
                        />

                        {/* Cylinder Body */}
                        <rect
                          x={startX}
                          y={centerY - svgRadiusY}
                          width={svgLen}
                          height={svgRadiusY * 2}
                          fill={mat.color}
                          opacity="0.9"
                        />

                        {/* Metallic Gradient Highlight on cylinder */}
                        <rect
                          x={startX}
                          y={centerY - svgRadiusY * 0.4}
                          width={svgLen}
                          height={svgRadiusY * 0.5}
                          fill="#ffffff"
                          opacity="0.25"
                        />

                        {/* Left End Ellipse */}
                        <ellipse
                          cx={startX}
                          cy={centerY}
                          rx="14"
                          ry={svgRadiusY}
                          fill={mat.color}
                          stroke="#ffffff"
                          strokeWidth="1"
                        />

                        {/* Right End Ellipse (Cross Section S) */}
                        <ellipse
                          cx={endX}
                          cy={centerY}
                          rx="14"
                          ry={svgRadiusY}
                          fill="#ffffff"
                          opacity="0.3"
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                        <ellipse
                          cx={endX}
                          cy={centerY}
                          rx="10"
                          ry={svgRadiusY * 0.7}
                          fill={mat.color}
                        />

                        {/* Dimensions Annotation */}
                        {/* Length arrow */}
                        <line
                          x1={startX}
                          y1={centerY - svgRadiusY - 15}
                          x2={endX}
                          y2={centerY - svgRadiusY - 15}
                          stroke="#38bdf8"
                          strokeWidth="1.5"
                        />
                        <text
                          x="250"
                          y={centerY - svgRadiusY - 20}
                          textAnchor="middle"
                          className="text-[11px] font-bold fill-sky-400"
                        >
                          Chiều dài l = {wireLength} m
                        </text>

                        {/* Section arrow */}
                        <text
                          x={endX + 22}
                          y={centerY + 4}
                          className="text-[11px] font-bold fill-amber-300"
                        >
                          S = {wireAreaMm2} mm²
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              {/* Wire Result Computed */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">Vật liệu</span>
                  <span className="font-bold text-white truncate block">
                    {MATERIALS[selectedMaterialIdx].name.split(' ')[0]}
                  </span>
                </div>
                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">Điện trở suất ρ</span>
                  <span className="font-bold text-amber-400">
                    {(MATERIALS[selectedMaterialIdx].rho * 1e8).toFixed(1)}×10⁻⁸
                  </span>
                </div>
                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">Chiều dài l</span>
                  <span className="font-bold text-sky-400">{wireLength} m</span>
                </div>
                <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">Tiết diện S</span>
                  <span className="font-bold text-emerald-400">{wireAreaMm2} mm²</span>
                </div>
              </div>
            </div>

            {/* Wire Dimension Sliders */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-4">
              {/* Material selection */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  1. Chọn Vật liệu chế tạo dây dẫn:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {MATERIALS.map((mat, idx) => (
                    <button
                      key={mat.name}
                      onClick={() => setSelectedMaterialIdx(idx)}
                      className={`p-2 rounded-xl text-left border transition-all text-xs ${
                        selectedMaterialIdx === idx
                          ? 'bg-white border-blue-600 shadow-sm ring-2 ring-blue-600/20'
                          : 'bg-white/60 border-slate-200 hover:bg-white text-slate-600'
                      }`}
                    >
                      <div className="font-bold text-slate-800 flex items-center justify-between">
                        <span>{mat.name}</span>
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-white"
                          style={{ backgroundColor: mat.color }}
                        ></span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5 truncate">
                        {mat.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Length Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-700">2. Chiều dài dây l:</span>
                  <span className="text-xs font-black text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md">
                    {wireLength} m
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="200"
                  step="1"
                  value={wireLength}
                  onChange={(e) => setWireLength(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>1 m (ngắn)</span>
                  <span>100 m</span>
                  <span>200 m (rất dài)</span>
                </div>
              </div>

              {/* Area Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-700">3. Tiết diện ngang S:</span>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    {wireAreaMm2} mm²
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="5.0"
                  step="0.1"
                  value={wireAreaMm2}
                  onChange={(e) => setWireAreaMm2(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>0.1 mm² (dây mảnh)</span>
                  <span>2.5 mm² (dây gia đình)</span>
                  <span>5.0 mm² (dây to)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wire Formula & Output Card (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl p-5 border border-amber-200/80">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-amber-600" />
                Công thức Điện trở Dây dẫn:
              </h4>
              <MathRenderer math="R = \rho \frac{l}{S}" inline={false} className="text-xl font-black text-amber-900" />

              <div className="mt-4 p-4 rounded-xl bg-white/90 border border-amber-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs text-slate-500">Điện trở tính được:</span>
                  <span className="text-2xl font-black text-amber-700">
                    {computedWireR < 1
                      ? computedWireR.toFixed(3)
                      : computedWireR < 10
                      ? computedWireR.toFixed(2)
                      : computedWireR.toFixed(1)}{' '}
                    <span className="text-sm font-semibold">Ω</span>
                  </span>
                </div>

                <div className="text-xs text-slate-700 space-y-1.5 pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <MathRenderer math="Chiều dài $l$ càng lớn $\implies$ điện trở $R$ càng lớn (tỉ lệ thuận)" inline={true} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <MathRenderer math="Tiết diện $S$ càng to $\implies$ điện trở $R$ càng nhỏ (tỉ lệ nghịch)" inline={true} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-blue-600 font-bold">•</span>
                    <MathRenderer math="Điện trở suất $\rho$ càng nhỏ $\implies$ vật liệu dẫn điện càng tốt" inline={true} />
                  </div>
                </div>

                <button
                  id="btn-apply-wire-to-circuit"
                  onClick={handleApplyWireToCircuit}
                  className="w-full mt-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Zap className="w-4 h-4" />
                  Đưa điện trở này vào Mạch Điện thử nghiệm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
