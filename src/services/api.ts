import { StudentSession } from '../types';

const LOCAL_STORAGE_SESSION_KEY = 'ohm_master_current_session';
const LOCAL_STORAGE_ALL_SESSIONS_KEY = 'ohm_master_all_sessions';

export const DEFAULT_GOOGLE_SCRIPT_URL =
  (import.meta as any).env?.VITE_GOOGLE_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbxvk2AdfffHI2ZmU_e2jKCJgzSia3L6IEpdD1NnHqsQ0Jzy6X7T2wslMF0ggtsjRa7g/exec';

export async function submitSessionResult(session: StudentSession): Promise<{ success: boolean; mode: 'api' | 'sheet' | 'local' }> {
  // Luôn lưu trữ cục bộ trước để phòng trường hợp mất mạng (offline resilience)
  saveSessionLocally(session);

  let sentToCloud = false;

  // 1. Thử gửi qua Vercel API proxy nếu đã deploy và có backend
  try {
    const res = await fetch('/api/submit-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(session),
    });

    const isJson = res.headers.get('content-type')?.includes('application/json');
    if (res.ok && isJson) {
      const json = await res.json();
      if (json && json.status === 'success') {
        sentToCloud = true;
        return { success: true, mode: 'api' };
      }
    }
  } catch {
    // Không có Vercel API hoặc đang chạy local Vite -> chuyển sang gửi trực tiếp Google Apps Script
  }

  // 2. Gửi trực tiếp tới Google Apps Script Web App
  if (!sentToCloud && DEFAULT_GOOGLE_SCRIPT_URL) {
    try {
      await fetch(DEFAULT_GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Cho phép cross-origin an toàn từ trình duyệt tới GAS
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(session),
      });
      return { success: true, mode: 'sheet' };
    } catch (err) {
      console.warn('Không thể gửi dữ liệu trực tiếp tới Google Sheets:', err);
    }
  }

  return { success: true, mode: 'local' };
}

export async function fetchSessionsFromGoogleSheet(): Promise<any[]> {
  // 1. Thử qua Vercel API proxy trước (nếu có serverless backend)
  try {
    const apiRes = await fetch('/api/submit-result', { method: 'GET' });
    const isJson = apiRes.headers.get('content-type')?.includes('application/json');
    if (apiRes.ok && isJson) {
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
