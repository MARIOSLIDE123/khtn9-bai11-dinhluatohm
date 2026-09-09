import React, { useState, useMemo, useEffect } from 'react';
import { StudentSession } from '../types';
import { QUESTION_BANK } from '../data/questions';
import {
  Lock,
  Unlock,
  Users,
  Award,
  Clock,
  TrendingUp,
  Download,
  AlertTriangle,
  FileSpreadsheet,
  CheckCircle2,
  RefreshCw,
  Search,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Radio,
  Sparkles,
} from 'lucide-react';
import { fetchSessionsFromGoogleSheet } from '../services/api';

interface TeacherDashboardProps {
  currentSession: StudentSession;
  allSessions?: StudentSession[];
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  currentSession,
  allSessions = [],
}) => {
  const [passcode, setPasscode] = useState<string>('');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cloudSessions, setCloudSessions] = useState<StudentSession[]>([]);
  const [isLoadingSheet, setIsLoadingSheet] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string>('');
  const [lastSyncTime, setLastSyncTime] = useState<string>('');
  const [isAutoSyncEnabled, setIsAutoSyncEnabled] = useState<boolean>(true);

  // Mật mã truy cập mới: 2026 (đã xóa mật khẩu mặc định cũ)
  const CORRECT_PASSCODE = '2026';

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === CORRECT_PASSCODE) {
      setIsUnlocked(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Mật mã không đúng! Vui lòng kiểm tra lại.');
    }
  };

  // Đồng bộ dữ liệu học sinh từ Google Sheet theo thời gian thực
  const handleSyncGoogleSheet = async (isSilent = false) => {
    if (!isSilent) setIsLoadingSheet(true);
    try {
      const data = await fetchSessionsFromGoogleSheet();
      if (data && data.length > 0) {
        const mapped: StudentSession[] = data.map((item: any, idx: number) => ({
          id: item.id || `sheet-${idx}`,
          studentName: item.studentName || 'Học sinh',
          className: item.className || currentSession.className || '9A',
          schoolName: item.schoolName || currentSession.schoolName || '',
          startTime: item.startTime || new Date().toISOString(),
          endTime: item.endTime || new Date().toISOString(),
          score: Number(item.score) || 0,
          currentLevel: Number(item.currentLevel) || 1,
          completedStages: typeof item.completedStages === 'string'
            ? item.completedStages.split(',').map((n: string) => Number(n.trim())).filter(Boolean)
            : [1],
          badgesEarned: Array.from({ length: Number(item.badgesEarned) || 0 }, (_, i) => `badge-${i + 1}`),
          answersCount: Number(item.answersCount) || 0,
          correctAnswersCount: Number(item.correctAnswersCount) || 0,
          wrongQuestionIds: typeof item.wrongQuestionIds === 'string' && item.wrongQuestionIds !== 'Không có'
            ? item.wrongQuestionIds.split(',').map((s: string) => s.trim()).filter(Boolean)
            : [],
        }));
        setCloudSessions(mapped);
        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastSyncTime(timeNow);
        setSyncStatus(`Live lúc ${timeNow} (${mapped.length} học sinh)`);
      } else {
        if (!isSilent) setSyncStatus('Chưa có dòng dữ liệu trên Sheet');
      }
    } catch {
      if (!isSilent) setSyncStatus('Lỗi kết nối Google Sheet');
    } finally {
      if (!isSilent) setIsLoadingSheet(false);
    }
  };

  // Tự động polling dữ liệu từ Google Sheet mỗi 10 giây
  useEffect(() => {
    if (!isUnlocked) return;

    // Tải ngay lần đầu mở khóa
    handleSyncGoogleSheet();

    if (!isAutoSyncEnabled) return;
    const timer = setInterval(() => {
      handleSyncGoogleSheet(true);
    }, 10000);

    return () => clearInterval(timer);
  }, [isUnlocked, isAutoSyncEnabled]);

  // Kết hợp dữ liệu từ Sheet (ưu tiên số 1) + phiên hiện tại + lịch sử
  const sessionsList = useMemo(() => {
    if (cloudSessions.length > 0) {
      const exists = cloudSessions.some((s) => s.id === currentSession.id);
      return exists ? cloudSessions : [currentSession, ...cloudSessions];
    }

    const list = [currentSession, ...allSessions];
    // Dữ liệu mẫu demo để giáo viên xem thử nếu chưa có ai nộp
    if (list.length === 1) {
      list.push(
        {
          id: 'demo-1',
          studentName: 'Nguyễn Văn An',
          className: currentSession.className || '9A1',
          startTime: new Date(Date.now() - 45 * 60000).toISOString(),
          endTime: new Date().toISOString(),
          score: 420,
          currentLevel: 5,
          completedStages: [1, 2, 3, 4, 5, 6, 7],
          badgesEarned: ['badge-1', 'badge-2', 'badge-3'],
          answersCount: 32,
          correctAnswersCount: 28,
          wrongQuestionIds: ['q-nb-14', 'q-th-18', 'q-tt-22'],
        },
        {
          id: 'demo-2',
          studentName: 'Trần Thị Mai',
          className: currentSession.className || '9A1',
          startTime: new Date(Date.now() - 30 * 60000).toISOString(),
          endTime: new Date().toISOString(),
          score: 310,
          currentLevel: 3,
          completedStages: [1, 2, 3, 4],
          badgesEarned: ['badge-1', 'badge-2'],
          answersCount: 24,
          correctAnswersCount: 19,
          wrongQuestionIds: ['q-nb-14', 'q-vd-08', 'q-tt-11', 'q-tt-15'],
        },
        {
          id: 'demo-3',
          studentName: 'Lê Hoàng Nam',
          className: currentSession.className || '9A1',
          startTime: new Date(Date.now() - 60 * 60000).toISOString(),
          endTime: new Date().toISOString(),
          score: 510,
          currentLevel: 5,
          completedStages: [1, 2, 3, 4, 5, 6, 7],
          badgesEarned: ['badge-1', 'badge-2', 'badge-3', 'badge-4', 'badge-5'],
          answersCount: 40,
          correctAnswersCount: 38,
          wrongQuestionIds: ['q-vd-12'],
        }
      );
    }
    return list;
  }, [currentSession, allSessions, cloudSessions]);

  // Thống kê tổng hợp số liệu
  const totalStudents = sessionsList.length;
  const avgScore = Math.round(
    sessionsList.reduce((sum, s) => sum + s.score, 0) / (totalStudents || 1)
  );
  const totalAnswers = sessionsList.reduce((sum, s) => sum + s.answersCount, 0);
  const totalCorrect = sessionsList.reduce((sum, s) => sum + s.correctAnswersCount, 0);
  const classAccuracy = totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : 0;

  // PHÂN TÍCH BIỂU ĐỒ 1: Phổ điểm & Xếp loại năng lực
  const tierStats = useMemo(() => {
    let xuatSac = 0;
    let gioi = 0;
    let kha = 0;
    let canCoGang = 0;

    sessionsList.forEach((s) => {
      const acc = s.answersCount > 0 ? (s.correctAnswersCount / s.answersCount) * 100 : 0;
      if (s.score >= 400 && acc >= 80) xuatSac++;
      else if (s.score >= 300 && acc >= 70) gioi++;
      else if (s.score >= 200 && acc >= 50) kha++;
      else canCoGang++;
    });

    const total = sessionsList.length || 1;
    return {
      xuatSac,
      gioi,
      kha,
      canCoGang,
      pctXuatSac: Math.round((xuatSac / total) * 100),
      pctGioi: Math.round((gioi / total) * 100),
      pctKha: Math.round((kha / total) * 100),
      pctCanCoGang: Math.round((canCoGang / total) * 100),
    };
  }, [sessionsList]);

  // PHÂN TÍCH BIỂU ĐỒ 2: Phân bố cấp độ Cửa ải Game (Level 1 đến 5)
  const levelStats = useMemo(() => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    sessionsList.forEach((s) => {
      const lvl = Math.min(5, Math.max(1, s.currentLevel || 1));
      counts[lvl] = (counts[lvl] || 0) + 1;
    });
    return counts;
  }, [sessionsList]);

  // PHÂN TÍCH BIỂU ĐỒ 3: Phân khúc độ chính xác
  const accuracyTiers = useMemo(() => {
    let high = 0; // >= 80%
    let med = 0;  // 50% - 79%
    let low = 0;  // < 50%
    sessionsList.forEach((s) => {
      const acc = s.answersCount > 0 ? (s.correctAnswersCount / s.answersCount) * 100 : 0;
      if (acc >= 80) high++;
      else if (acc >= 50) med++;
      else low++;
    });
    const total = sessionsList.length || 1;
    return {
      high,
      med,
      low,
      pctHigh: Math.round((high / total) * 100),
      pctMed: Math.round((med / total) * 100),
      pctLow: Math.round((low / total) * 100),
    };
  }, [sessionsList]);

  // PHÂN TÍCH BIỂU ĐỒ 4: Top các câu hỏi sai nhiều nhất (Lỗ hổng kiến thức)
  const wrongQuestionsMap = useMemo(() => {
    const counts: Record<string, number> = {};
    sessionsList.forEach((s) => {
      s.wrongQuestionIds.forEach((qid) => {
        counts[qid] = (counts[qid] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([qid, count]) => {
        const question = QUESTION_BANK.find((q) => q.id === qid);
        return {
          id: qid,
          count,
          percentage: Math.round((count / (totalStudents || 1)) * 100),
          questionText: question ? question.question : qid,
          difficulty: question ? question.difficulty : 'nhận biết',
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [sessionsList, totalStudents]);

  // Xuất file CSV
  const handleExportCSV = () => {
    const headers = [
      'Mã học sinh',
      'Họ và tên',
      'Lớp',
      'Trường',
      'Điểm số',
      'Level đạt được',
      'Số câu làm',
      'Số câu đúng',
      'Tỉ lệ đúng (%)',
      'Thời gian bắt đầu',
    ];
    const rows = sessionsList.map((s) => [
      s.id,
      `"${s.studentName}"`,
      `"${s.className}"`,
      `"${s.schoolName || ''}"`,
      s.score,
      s.currentLevel,
      s.answersCount,
      s.correctAnswersCount,
      s.answersCount > 0 ? Math.round((s.correctAnswersCount / s.answersCount) * 100) : 0,
      s.startTime,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Ket_Qua_Bai_11_Ohm_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Màn hình khóa mật khẩu
  if (!isUnlocked) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center max-w-md mx-auto space-y-5 shadow-sm">
        <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 mx-auto flex items-center justify-center shadow-xs">
          <Lock className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-800">
            Bảng Quản Lý Giáo Viên
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Khu vực theo dõi kết quả, phân tích biểu đồ và đồng bộ dữ liệu thời gian thực
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-3">
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Nhập mật mã quản lý giáo viên..."
            className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-center font-bold tracking-widest text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            autoFocus
          />

          {errorMsg && (
            <p className="text-xs text-rose-600 font-semibold">{errorMsg}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Unlock className="w-4 h-4" /> Mở khóa Bảng Quản Lý
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      {/* Top Banner với Trạng thái Đồng Bộ Thời Gian Thực */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
              <Users className="w-3.5 h-3.5" />
              Teacher Dashboard • Quản Lý Lớp Học
            </span>

            {/* Trạng thái Live Google Sheets */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Real-time Google Sheet
              {lastSyncTime && <span className="text-[10px] font-medium text-emerald-600">({lastSyncTime})</span>}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-800">
            Thống Kê Học Tập Bài 11: Định Luật Ohm
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Dữ liệu học sinh được đồng bộ tự động từ Google Sheet theo thời gian thực (10 giây/lần)
          </p>
        </div>

        {/* Nút hành động */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => handleSyncGoogleSheet(false)}
            disabled={isLoadingSheet}
            className="px-3.5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 border border-blue-200"
            title="Đồng bộ kết quả học sinh từ Google Sheets ngay lập tức"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSheet ? 'animate-spin' : ''}`} />
            {isLoadingSheet ? 'Đang tải...' : 'Làm mới từ Sheets'}
          </button>

          <button
            onClick={() => setIsAutoSyncEnabled(!isAutoSyncEnabled)}
            className={`px-3 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 border ${
              isAutoSyncEnabled
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
            title="Bật/Tắt tự động đồng bộ mỗi 10 giây"
          >
            <Radio className="w-3.5 h-3.5" />
            {isAutoSyncEnabled ? 'Auto-sync: Bật' : 'Auto-sync: Tắt'}
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" /> Xuất Excel / CSV
          </button>

          <button
            onClick={() => setIsUnlocked(false)}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
          >
            Khóa lại
          </button>
        </div>
      </div>

      {/* 4 Thẻ Thống Kê Tổng Quan */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1">
            <Users className="w-4 h-4 text-blue-600" />
            Tổng số học sinh
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-800">
            {totalStudents} <span className="text-sm font-semibold text-slate-400">em</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Lớp: {currentSession.className || '9A'}</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1">
            <Award className="w-4 h-4 text-amber-500" />
            Điểm trung bình
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">
            {avgScore} <span className="text-sm font-semibold text-slate-400">điểm</span>
          </div>
          <span className="text-[11px] text-emerald-600 mt-1 block font-semibold">
            {avgScore >= 350 ? 'Đạt loại Giỏi' : avgScore >= 250 ? 'Đạt loại Khá' : 'Cần rèn luyện thêm'}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            Độ chính xác chung
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">
            {classAccuracy}%
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {totalCorrect} / {totalAnswers} câu đúng
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-1">
            <Activity className="w-4 h-4 text-purple-500" />
            Đồng bộ Cloud Sheet
          </div>
          <div className="text-sm font-black text-slate-800 flex items-center gap-1.5 mt-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Đang hoạt động
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">
            {cloudSessions.length > 0 ? `${cloudSessions.length} bản ghi trên Sheet` : 'Đang chờ học sinh...'}
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* KHU VỰC CÁC BIỂU ĐỒ PHÂN TÍCH CHỈ SỐ HỌC SINH (ANALYTICAL CHARTS) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BIỂU ĐỒ 1: Phổ điểm & Xếp loại năng lực học sinh */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-800">
                  Biểu Đồ Phổ Điểm & Xếp Loại Học Lực
                </h3>
                <p className="text-xs text-slate-500">Phân bố tỷ lệ theo 4 mức đánh giá</p>
              </div>
            </div>
            <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
              Sĩ số: {totalStudents} em
            </span>
          </div>

          {/* Thanh biểu đồ ngang Stacked Bar */}
          <div className="space-y-1.5">
            <div className="h-4 w-full rounded-full overflow-hidden flex bg-slate-100 p-0.5 border border-slate-200">
              <div
                style={{ width: `${tierStats.pctXuatSac}%` }}
                className="bg-emerald-500 h-full rounded-l-full transition-all duration-500"
                title={`Xuất sắc: ${tierStats.xuatSac} em (${tierStats.pctXuatSac}%)`}
              />
              <div
                style={{ width: `${tierStats.pctGioi}%` }}
                className="bg-blue-500 h-full transition-all duration-500"
                title={`Giỏi: ${tierStats.gioi} em (${tierStats.pctGioi}%)`}
              />
              <div
                style={{ width: `${tierStats.pctKha}%` }}
                className="bg-amber-500 h-full transition-all duration-500"
                title={`Khá: ${tierStats.kha} em (${tierStats.pctKha}%)`}
              />
              <div
                style={{ width: `${tierStats.pctCanCoGang}%` }}
                className="bg-rose-500 h-full rounded-r-full transition-all duration-500"
                title={`Cần cố gắng: ${tierStats.canCoGang} em (${tierStats.pctCanCoGang}%)`}
              />
            </div>
          </div>

          {/* 4 Thẻ chi tiết mức xếp loại */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">Xuất sắc</span>
              <span className="text-lg font-black text-emerald-600">{tierStats.xuatSac} <span className="text-xs font-normal">em</span></span>
              <span className="text-[10px] font-bold text-emerald-600 block">{tierStats.pctXuatSac}%</span>
            </div>

            <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200 text-center">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 block">Giỏi</span>
              <span className="text-lg font-black text-blue-600">{tierStats.gioi} <span className="text-xs font-normal">em</span></span>
              <span className="text-[10px] font-bold text-blue-600 block">{tierStats.pctGioi}%</span>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-center">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block">Khá</span>
              <span className="text-lg font-black text-amber-600">{tierStats.kha} <span className="text-xs font-normal">em</span></span>
              <span className="text-[10px] font-bold text-amber-600 block">{tierStats.pctKha}%</span>
            </div>

            <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-200 text-center">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 block">Cần cố gắng</span>
              <span className="text-lg font-black text-rose-600">{tierStats.canCoGang} <span className="text-xs font-normal">em</span></span>
              <span className="text-[10px] font-bold text-rose-600 block">{tierStats.pctCanCoGang}%</span>
            </div>
          </div>
        </div>

        {/* BIỂU ĐỒ 2: Tỷ lệ chinh phục Cửa ải Game & Độ chính xác */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <PieChart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-800">
                  Tiến Độ Vượt 5 Cửa Ải Game
                </h3>
                <p className="text-xs text-slate-500">Mức độ hoàn thành các màn chơi thử thách</p>
              </div>
            </div>
            <span className="text-xs font-black text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
              5 Cấp Độ
            </span>
          </div>

          {/* Các thanh tiến trình cấp độ */}
          <div className="space-y-2.5 pt-1">
            {[
              { lvl: 5, name: 'Cửa ải 5: Bậc thầy mạch điện Ohm', color: 'bg-purple-600', text: 'text-purple-700' },
              { lvl: 4, name: 'Cửa ải 4: Mạch nối tiếp & song song', color: 'bg-blue-600', text: 'text-blue-700' },
              { lvl: 3, name: 'Cửa ải 3: Điện trở của dây dẫn', color: 'bg-sky-500', text: 'text-sky-700' },
              { lvl: 2, name: 'Cửa ải 2: Khám phá định luật Ohm', color: 'bg-amber-500', text: 'text-amber-700' },
              { lvl: 1, name: 'Cửa ải 1: Nhận diện điện trở & đơn vị', color: 'bg-emerald-500', text: 'text-emerald-700' },
            ].map((item) => {
              const count = levelStats[item.lvl] || 0;
              const pct = Math.round((count / (totalStudents || 1)) * 100);
              return (
                <div key={item.lvl} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">{item.name}</span>
                    <span className={`${item.text} font-black`}>
                      {count} em ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${Math.max(5, pct)}%` }}
                      className={`h-full rounded-full ${item.color} transition-all duration-500`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* BIỂU ĐỒ 3 & 4: Phân Tích Lỗ Hổng Kiến Thức & Mức Độ Chính Xác */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800">
                Biểu Đồ Nhận Diện Lỗ Hổng Kiến Thức (Top 5 Câu Sai Nhiều Nhất)
              </h3>
              <p className="text-xs text-slate-500">
                Thống kê các câu hỏi có tỷ lệ sai cao giúp giáo viên tập trung ôn tập cho học sinh
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200">
              Đúng cao (≥80%): <b className="text-emerald-600">{accuracyTiers.high} em</b>
            </span>
            <span className="text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200">
              Cần hỗ trợ (&lt;50%): <b className="text-rose-600">{accuracyTiers.low} em</b>
            </span>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          {wrongQuestionsMap.length === 0 ? (
            <div className="text-center py-6 text-slate-400 text-xs bg-slate-50 rounded-2xl">
              Chưa ghi nhận câu hỏi sai nào. Lớp học đang nắm vững kiến thức rất tốt! 🎉
            </div>
          ) : (
            wrongQuestionsMap.map((item, idx) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100/90 space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white font-black text-[10px]">
                      Top {idx + 1}
                    </span>
                    <span className="font-bold text-slate-800">
                      Mã câu: {item.id}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white border border-rose-200 text-rose-800 font-semibold text-[10px] capitalize">
                      {item.difficulty}
                    </span>
                  </div>

                  <span className="font-black text-rose-600 text-xs">
                    {item.count} lượt sai ({item.percentage}% học sinh)
                  </span>
                </div>

                <p className="text-xs text-slate-700 font-medium line-clamp-2">
                  {item.questionText}
                </p>

                {/* Thanh biểu đồ đo tỷ lệ sai */}
                <div className="h-1.5 w-full bg-rose-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${Math.min(100, Math.max(8, item.percentage))}%` }}
                    className="h-full bg-rose-500 rounded-full"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* BẢNG KẾT QUẢ VÀ DANH SÁCH HỌC SINH THEO THỜI GIAN THỰC */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
              Danh Sách Học Sinh & Bảng Điểm Chi Tiết
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                {sessionsList.length} học sinh
              </span>
            </h3>
            <p className="text-xs text-slate-500">Cập nhật liên tục trực tiếp từ Google Sheet database</p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên học sinh..."
              className="pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 w-56 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Họ và tên</th>
                <th className="py-3 px-4">Lớp</th>
                <th className="py-3 px-4">Trường</th>
                <th className="py-3 px-4">Điểm số</th>
                <th className="py-3 px-4">Cửa ải (Level)</th>
                <th className="py-3 px-4">Đúng / Tổng câu</th>
                <th className="py-3 px-4">Tỉ lệ đúng</th>
                <th className="py-3 px-4">Xếp loại</th>
                <th className="py-3 px-4">Thời gian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sessionsList
                .filter((s) => s.studentName.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((st) => {
                  const acc =
                    st.answersCount > 0
                      ? Math.round((st.correctAnswersCount / st.answersCount) * 100)
                      : 0;

                  return (
                    <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span>{st.studentName}</span>
                          {st.id === currentSession.id && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] bg-blue-100 text-blue-800 font-black">
                              Phiên này
                            </span>
                          )}
                          {cloudSessions.some((c) => c.id === st.id) && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-100 text-emerald-800 font-bold">
                              Sheet
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">{st.className || '9A'}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-500">{st.schoolName || '-'}</td>
                      <td className="py-3.5 px-4 font-black text-blue-600 text-sm">{st.score} đ</td>
                      <td className="py-3.5 px-4 font-bold text-purple-700">Level {st.currentLevel}</td>
                      <td className="py-3.5 px-4 font-semibold">
                        {st.correctAnswersCount} / {st.answersCount}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`font-bold px-2 py-0.5 rounded ${
                            acc >= 80
                              ? 'bg-emerald-100 text-emerald-800'
                              : acc >= 50
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {acc}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-700">
                          {st.score >= 400 && acc >= 80
                            ? '⭐ Xuất sắc'
                            : st.score >= 300 && acc >= 70
                            ? 'Giỏi'
                            : st.score >= 200 && acc >= 50
                            ? 'Khá'
                            : 'Đạt yêu cầu'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {new Date(st.startTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
