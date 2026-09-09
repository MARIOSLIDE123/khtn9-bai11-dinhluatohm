import React, { useState } from 'react';
import { User, School, GraduationCap, Sparkles, Check, ArrowRight } from 'lucide-react';
import { OhmieMascot } from './OhmieMascot';

interface StudentRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialName?: string;
  initialClass?: string;
  initialSchool?: string;
  onSave: (name: string, className: string, schoolName: string) => void;
  isFirstTime?: boolean;
}

export const StudentRegistrationModal: React.FC<StudentRegistrationModalProps> = ({
  isOpen,
  onClose,
  initialName = '',
  initialClass = '9A',
  initialSchool = '',
  onSave,
  isFirstTime = false,
}) => {
  const [name, setName] = useState<string>(initialName);
  const [className, setClassName] = useState<string>(initialClass);
  const [schoolName, setSchoolName] = useState<string>(initialSchool);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập họ và tên của bạn nhé!');
      return;
    }
    if (!className.trim()) {
      setError('Vui lòng nhập tên lớp của bạn!');
      return;
    }

    onSave(name.trim(), className.trim(), schoolName.trim() || 'THCS');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-sky-100 relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-sky-100 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-amber-100 rounded-full blur-2xl pointer-events-none" />

        {/* Mascot & Heading */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0">
            <OhmieMascot
              size="sm"
              mood="happy"
              showSpeech={false}
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200 mb-1">
              <Sparkles className="w-3 h-3 text-sky-500" />
              {isFirstTime ? 'Chào mừng bạn đến với Lớp học Ohm!' : 'Hồ Sơ Học Sinh'}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">
              {isFirstTime ? 'Nhập thông tin của bạn' : 'Cập nhật thông tin học tập'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Để lưu tiến trình học tập, bảng điểm và huy hiệu đạt được nhé!
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Họ và tên */}
          <div>
            <label className="block text-xs sm:text-sm font-black text-slate-700 mb-1.5 flex items-center gap-1.5">
              <User className="w-4 h-4 text-sky-600" />
              Họ và tên học sinh <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="Ví dụ: Nguyễn Văn An"
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none focus:ring-4 focus:ring-sky-100 text-slate-800 font-bold text-sm sm:text-base transition-all bg-slate-50/50 hover:bg-white focus:bg-white"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Lớp */}
            <div>
              <label className="block text-xs sm:text-sm font-black text-slate-700 mb-1.5 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                Lớp học <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={className}
                onChange={(e) => {
                  setClassName(e.target.value);
                  setError('');
                }}
                placeholder="Ví dụ: 9A1"
                className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 text-slate-800 font-bold text-sm sm:text-base transition-all bg-slate-50/50 hover:bg-white focus:bg-white"
              />
            </div>

            {/* Trường */}
            <div>
              <label className="block text-xs sm:text-sm font-black text-slate-700 mb-1.5 flex items-center gap-1.5">
                <School className="w-4 h-4 text-emerald-600" />
                Trường học
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="Ví dụ: THCS Chu Văn An"
                className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100 text-slate-800 font-bold text-sm sm:text-base transition-all bg-slate-50/50 hover:bg-white focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center gap-3">
            {!isFirstTime && (
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-3 px-4 rounded-2xl border-2 border-slate-200 font-bold text-xs sm:text-sm text-slate-600 hover:bg-slate-100 transition-all"
              >
                Hủy bỏ
              </button>
            )}

            <button
              type="submit"
              className={`${
                !isFirstTime ? 'w-2/3' : 'w-full'
              } py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-black text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2`}
            >
              <span>{isFirstTime ? '🚀 Bắt đầu học ngay!' : 'Lưu thông tin'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
