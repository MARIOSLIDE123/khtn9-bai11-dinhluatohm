import { StudentSession } from '../types';

const LOCAL_STORAGE_SESSION_KEY = 'ohm_master_current_session';
const LOCAL_STORAGE_ALL_SESSIONS_KEY = 'ohm_master_all_sessions';

export const DEFAULT_GOOGLE_SCRIPT_URL =
  (import.meta as any).env?.VITE_GOOGLE_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbxvk2AdfffHI2ZmU_e2jKCJgzSia3L6IEpdD1NnHqsQ0Jzy6X7T2wslMF0ggtsjRa7g/exec';

export async function submitSessionResult(session: StudentSession): Promise<{ success: boolean; mode: 'api' | 'sheet' | 'local' }> {
  // Luôn lưu trữ cục bộ trước để phòng trường hợp mất mạng (offline resilience)
  saveSessionLocally(session);

  // 1. Thử gửi qua Vercel API proxy nếu triển khai full-stack
  try {
    const res = await fetch('/api/submit-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(session),
    });

    if (res.ok) {
      return { success: true, mode: 'api' };
    }
  } catch {
    // Tiếp tục fallback gửi trực tiếp tới Google Apps Script
  }

  // 2. Gửi trực tiếp tới Google Apps Script (Hỗ trợ chạy local Vite / GitHub Pages / Static hosting)
  if (DEFAULT_GOOGLE_SCRIPT_URL) {
    try {
      await fetch(DEFAULT_GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Cho phép cross-origin an toàn từ trình duyệt tới GAS
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(session),
      });
      return { success: true, mode: 'sheet' };
    } catch (err) {
      console.warn('Không thể đồng bộ với Google Sheets:', err);
    }
  }

  return { success: true, mode: 'local' };
}

export async function fetchSessionsFromGoogleSheet(): Promise<any[]> {
  // 1. Thử qua Vercel API proxy trước (tránh triệt để lỗi CORS khi chạy trên Vercel)
  try {
    const apiRes = await fetch('/api/submit-result', { method: 'GET' });
    if (apiRes.ok) {
      const apiData = await apiRes.json();
      if (apiData && apiData.status === 'success' && Array.isArray(apiData.data)) {
        return apiData.data;
      }
    }
  } catch {
    // Fallback qua gọi trực tiếp
  }

  // 2. Gọi trực tiếp tới URL Google Apps Script
  if (DEFAULT_GOOGLE_SCRIPT_URL) {
    try {
      const res = await fetch(DEFAULT_GOOGLE_SCRIPT_URL, {
        method: 'GET',
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.status === 'success' && Array.isArray(data.data)) {
          return data.data;
        }
      }
    } catch (err) {
      console.warn('Lỗi khi tải dữ liệu từ Google Sheets:', err);
    }
  }

  return [];
}

export function saveSessionLocally(session: StudentSession) {
  try {
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(session));

    const existingJson = localStorage.getItem(LOCAL_STORAGE_ALL_SESSIONS_KEY);
    const existingList: StudentSession[] = existingJson ? JSON.parse(existingJson) : [];
    const updated = existingList.filter((s) => s.id !== session.id);
    updated.unshift(session);
    localStorage.setItem(LOCAL_STORAGE_ALL_SESSIONS_KEY, JSON.stringify(updated.slice(0, 50)));
  } catch (err) {
    console.warn('LocalStorage save failed:', err);
  }
}

export function loadLocalSession(): StudentSession | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function loadAllLocalSessions(): StudentSession[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_ALL_SESSIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
