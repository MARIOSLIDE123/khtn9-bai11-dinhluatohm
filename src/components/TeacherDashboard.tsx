import React, { useState, useMemo } from 'react';
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

  // Default teacher passcode: OHM2025
  const CORRECT_PASSCODE = 'OHM2025';

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim().toUpperCase() === CORRECT_PASSCODE) {
      setIsUnlocked(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Mật mã không đúng! Vui lòng thử lại (Gợi ý mặc định: OHM2025)');
    }
  };

  const handleSyncGoogleSheet = async () => {
    setIsLoadingSheet(true);
    setSyncStatus('Đang tải dữ liệu...');
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
        setSyncStatus(`Đã tải ${mapped.length} học sinh`);
      } else {
        setSyncStatus('Chưa có dòng dữ liệu trên Sheet');
      }
    } catch {
      setSyncStatus('Lỗi kết nối Sheet');
    } finally {
      setIsLoadingSheet(false);
    }
  };

  // Combine current session + cloud sessions / historical / demo class sessions
  const sessionsList = useMemo(() => {
    if (cloudSessions.length > 0) {
      // Nếu đã có dữ liệu tải từ Google Sheets về
      const exists = cloudSessions.some((s) => s.id === currentSession.id);
      return exists ? cloudSessions : [currentSession, ...cloudSessions];
    }

    const list = [currentSession, ...allSessions];
    // Add sample class data if list is short to demonstrate full teacher capabilities
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

  // Aggregate stats
  const totalStudents = sessionsList.length;
  const avgScore = Math.round(
    sessionsList.reduce((sum, s) => sum + s.score, 0) / (totalStudents || 1)
  );
  const totalAnswers = sessionsList.reduce((sum, s) => sum + s.answersCount, 0);
  const totalCorrect = sessionsList.reduce((sum, s) => sum + s.correctAnswersCount, 0);
  const classAccuracy = totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : 0;

  // Most common wrong questions analysis
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
          questionText: question ? question.question : qid,
          difficulty: question ? question.difficulty : 'nhận biết',
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [sessionsList]);

  // Export to CSV
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

  if (!isUnlocked) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center max-w-md mx-auto space-y-5 shadow-sm">
        <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 mx-auto flex items-center justify-center">
          <Lock className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-800">
            Bảng Quản Lý Giáo Viên
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Khu vực dành cho giáo viên theo dõi tiến độ, phân tích lỗi sai và xuất điểm
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-3">
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Nhập mã bảo vệ (mặc định: OHM2025)..."
            className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-center font-bold tracking-widest text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errorMsg && (
            <p className="text-xs text-rose-600 font-medium">{errorMsg}</p>
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
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-1.5">
            <Users className="w-3.5 h-3.5" />
            Teacher Dashboard • Quản Lý Lớp Học
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800">
            Thống Kê Học Tập Bài 11: Định Luật Ohm
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Theo dõi năng lực học sinh, nhận diện lỗ hổng kiến thức và xuất bảng điểm
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {syncStatus && (
            <span className="text-[11px] text-slate-500 font-medium hidden md:inline bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
              {syncStatus}
            </span>
          )}
          <button
            onClick={handleSyncGoogleSheet}
            disabled={isLoadingSheet}
            className="px-3.5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 border border-blue-200"
            title="Đồng bộ kết quả học sinh theo thời gian thực từ Google Sheets"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSheet ? 'animate-spin' : ''}`} />
            {isLoadingSheet ? 'Đang tải...' : 'Làm mới từ Sheets'}
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

      {/* Overview Stat Cards */}
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
          <span className="text-[11px] text-emerald-600 mt-1 block font-medium">Mức độ đạt: Khá - Giỏi</span>
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
            <FileSpreadsheet className="w-4 h-4 text-purple-500" />
            Đồng bộ Cloud
          </div>
          <div className="text-sm font-black text-slate-800 flex items-center gap-1.5 mt-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Sẵn sàng
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">Vercel Serverless Ready</span>
        </div>
      </div>

      {/* Analysis: Top Common Mistakes */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-800">
              Phân Tích Lỗ Hổng Kiến Thức (Các Câu Hay Sai Nhất)
            </h3>
            <p className="text-xs text-slate-500">
              Giúp giáo viên củng cố trọng tâm trên lớp cho học sinh
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {wrongQuestionsMap.length === 0 ? (
            <div className="text-center py-6 text-slate-400 text-xs">
              Chưa ghi nhận câu hỏi sai nào từ các phiên học sinh hiện tại.
            </div>
          ) : (
            wrongQuestionsMap.map((item, idx) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100 flex flex-wrap items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5 flex-1 min-w-[240px]">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-rose-700">
                      Top {idx + 1} ({item.count} lượt sai)
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white border border-rose-200 text-rose-800 font-semibold text-[10px]">
                      {item.difficulty}
                    </span>
                  </div>
                  <p className="text-slate-700 font-medium line-clamp-2">
                    {item.questionText}
                  </p>
                </div>
                <span className="text-[11px] font-bold text-rose-600 shrink-0">
                  Cần ôn luyện lại
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Student Sessions List Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base font-black text-slate-800">
            Danh Sách Học Sinh & Kết Quả
          </h3>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên học sinh..."
              className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                      <td className="py-3 px-4 font-bold text-slate-800">
                        {st.studentName}
                        {st.id === currentSession.id && (
                          <span className="ml-2 px-2 py-0.5 rounded-full text-[9px] bg-blue-100 text-blue-800 font-black">
                            Đang học
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">{st.className || '9A'}</td>
                      <td className="py-3 px-4 font-medium text-slate-500">{st.schoolName || '-'}</td>
                      <td className="py-3 px-4 font-black text-blue-600">{st.score} đ</td>
                      <td className="py-3 px-4 font-bold text-slate-700">Level {st.currentLevel}</td>
                      <td className="py-3 px-4">
                        {st.correctAnswersCount} / {st.answersCount}
                      </td>
                      <td className="py-3 px-4">
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
                      <td className="py-3 px-4 text-slate-400">
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
