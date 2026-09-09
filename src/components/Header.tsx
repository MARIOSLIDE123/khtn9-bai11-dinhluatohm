import React, { useState } from 'react';
import {
  Zap,
  Award,
  BookOpen,
  GitFork,
  Gamepad2,
  Cpu,
  User,
  Check,
  Edit2,
  ShieldAlert,
  Star,
  Sparkles,
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'learn' | 'mindmap' | 'game' | 'apply' | 'teacher';
  onTabChange: (tab: 'learn' | 'mindmap' | 'game' | 'apply' | 'teacher') => void;
  studentName: string;
  className: string;
  schoolName?: string;
  onUpdateProfile: (name: string, cls: string, school?: string) => void;
  onOpenProfileModal?: () => void;
  score: number;
  progressPercent: number;
  onOpenBadges: () => void;
  badgesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  studentName,
  className,
  schoolName,
  onUpdateProfile,
  onOpenProfileModal,
  score,
  progressPercent,
  onOpenBadges,
  badgesCount,
}) => {
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(studentName);
  const [tempClass, setTempClass] = useState<string>(className);
  const [tempSchool, setTempSchool] = useState<string>(schoolName || '');

  React.useEffect(() => {
    setTempName(studentName);
    setTempClass(className);
    setTempSchool(schoolName || '');
  }, [studentName, className, schoolName]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onUpdateProfile(tempName.trim(), tempClass.trim() || '9A', tempSchool.trim());
      setIsEditingProfile(false);
    }
  };

  const navTabs = [
    {
      id: 'learn' as const,
      label: '1. HỌC KIẾN THỨC',
      emoji: '📘',
      icon: BookOpen,
      activeColor: 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25',
      inactiveColor: 'text-slate-600 hover:text-sky-700 hover:bg-sky-50/80',
    },
    {
      id: 'mindmap' as const,
      label: '2. SƠ ĐỒ TƯ DUY',
      emoji: '🧠',
      icon: GitFork,
      activeColor: 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/25',
      inactiveColor: 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/80',
    },
    {
      id: 'game' as const,
      label: '3. CHINH PHỤC OHM',
      emoji: '🎮',
      icon: Gamepad2,
      activeColor: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25',
      inactiveColor: 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/80',
    },
    {
      id: 'apply' as const,
      label: '4. VẬN DỤNG',
      emoji: '🚀',
      icon: Cpu,
      activeColor: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-orange-500/25',
      inactiveColor: 'text-slate-600 hover:text-amber-700 hover:bg-amber-50/80',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100/80 shadow-xs">
      <div className="w-full px-3 sm:px-6 lg:px-8 2xl:px-12">
        {/* Upper Bar: Branding, Student Profile, Score, Progress */}
        <div className="py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-100">
          {/* Brand Logo & Subtitle */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-sky-500 to-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 ring-2 ring-white">
              <Zap className="w-5 h-5 fill-yellow-200 stroke-white drop-shadow-sm animate-pulse-glow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-lg font-black tracking-tight bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  OHM MASTER
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-900 border border-amber-200/80 inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  KHTN 9
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-semibold line-clamp-1">
                Bài 11 – Điện trở & Định luật Ohm
              </p>
            </div>
          </div>

          {/* Student Info, Score, Badges, Progress */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Student Name Card (Clickable to edit or open registration modal) */}
            <button
              id="btn-edit-student"
              onClick={() => {
                if (onOpenProfileModal) {
                  onOpenProfileModal();
                } else {
                  setIsEditingProfile(true);
                }
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-sky-50/80 hover:bg-sky-100 border border-sky-200/70 text-left transition-all"
              title="Bấm để cập nhật Họ tên, Lớp, Trường"
            >
              <div className="w-6 h-6 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-500 text-white flex items-center justify-center text-xs shadow-xs">
                <User className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-black text-slate-800 block leading-tight truncate max-w-[90px] sm:max-w-[130px]">
                  {studentName}
                </span>
                <span className="text-[10px] text-sky-600 font-bold block leading-none truncate max-w-[90px] sm:max-w-[140px]">
                  Lớp {className}{schoolName ? ` • ${schoolName}` : ''}
                </span>
              </div>
              <Edit2 className="w-3 h-3 text-sky-400 opacity-70 ml-0.5" />
            </button>

            {/* Score Badge */}
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 text-amber-900 shadow-xs">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500 shrink-0" />
              <div className="flex flex-col leading-none">
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700">Điểm</span>
                <span className="text-xs sm:text-sm font-black text-amber-600">
                  {score}
                </span>
              </div>
            </div>

            {/* Badges Button */}
            <button
              id="btn-open-badges"
              onClick={onOpenBadges}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 transition-all shadow-xs"
              title="Xem huy hiệu bạn đã đạt được"
            >
              <Award className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-black">{badgesCount}</span>
            </button>

            {/* Overall Progress Widget */}
            <div className="hidden md:flex flex-col items-end gap-1 w-24 sm:w-28">
              <div className="flex items-center justify-between w-full text-[10px] font-bold text-slate-500">
                <span>Tiến trình</span>
                <span className="text-sky-600 font-black">{progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-sky-400 to-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Bar: 4 Main Navigation Areas strictly per UX guideline */}
        <div className="py-2 flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
          <nav className="flex items-center gap-1.5 sm:gap-2">
            {navTabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              const IconComp = tab.icon;

              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected ? tab.activeColor : tab.inactiveColor
                  }`}
                >
                  <span className="text-sm">{tab.emoji}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Teacher Dashboard Entry Button */}
          <button
            id="nav-tab-teacher"
            onClick={() => onTabChange('teacher')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
              activeTab === 'teacher'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Giáo viên</span>
          </button>
        </div>
      </div>
    </header>
  );
};
