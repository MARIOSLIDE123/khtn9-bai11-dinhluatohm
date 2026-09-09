import { Badge } from '../types';

export const BADGES_LIST: Badge[] = [
  {
    id: 'badge-1',
    name: 'Tân binh Ohm',
    title: 'Tân binh Ohm',
    description: 'Bắt đầu hành trình và hoàn thành chặng học lý thuyết đầu tiên.',
    iconName: 'Zap',
    requirement: 'Hoàn thành ít nhất 1 chặng học lý thuyết hoặc đạt 30 điểm.',
    unlocked: false
  },
  {
    id: 'badge-2',
    name: 'Thợ săn điện trở',
    title: 'Thợ săn điện trở',
    description: 'Chinh phục thành công các câu hỏi tính toán về điện trở dây dẫn.',
    iconName: 'Sliders',
    requirement: 'Đạt từ 150 điểm và vượt qua Level 2 trong Chinh phục Ohm.',
    unlocked: false
  },
  {
    id: 'badge-3',
    name: 'Bậc thầy công thức',
    title: 'Bậc thầy công thức',
    description: 'Thành thạo quy tắc Tam giác Ohm và biến đổi nhanh các hệ thức.',
    iconName: 'Cpu',
    requirement: 'Trả lời đúng liên tiếp 5 câu hỏi tính toán mà không dùng gợi ý.',
    unlocked: false
  },
  {
    id: 'badge-4',
    name: 'Chiến binh mạch điện',
    title: 'Chiến binh mạch điện',
    description: 'Lắp ráp chuẩn xác mạch đo định luật Ohm và vượt qua Đấu trường Ohm.',
    iconName: 'ShieldAlert',
    requirement: 'Vượt qua Level 3 & Level 4 trong Chinh phục Ohm.',
    unlocked: false
  },
  {
    id: 'badge-5',
    name: 'Master Ohm',
    title: 'Master Ohm',
    description: 'Đỉnh cao tri thức Bài 11! Đánh bại Boss điện trở và hoàn thành toàn bộ vận dụng.',
    iconName: 'Crown',
    requirement: 'Đạt trên 400 điểm, đánh bại Boss điện trở (Level 5) và mở khóa tất cả các mục.',
    unlocked: false
  }
];

export function checkBadgesUnlocked(
  totalScore: number,
  completedLessonsCount: number,
  unlockedGameLevel: number,
  accuracy: number,
  currentBadges: string[]
): string[] {
  const newBadges = new Set<string>(currentBadges);

  if (totalScore >= 30 || completedLessonsCount >= 1) {
    newBadges.add('badge-1'); // Tân binh Ohm
  }
  if (totalScore >= 150 && unlockedGameLevel >= 2) {
    newBadges.add('badge-2'); // Thợ săn điện trở
  }
  if (totalScore >= 250 && accuracy >= 70) {
    newBadges.add('badge-3'); // Bậc thầy công thức
  }
  if (unlockedGameLevel >= 4 && totalScore >= 320) {
    newBadges.add('badge-4'); // Chiến binh mạch điện
  }
  if (unlockedGameLevel >= 5 && totalScore >= 450) {
    newBadges.add('badge-5'); // Master Ohm
  }

  return Array.from(newBadges);
}
