/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: HỆ THỐNG DATABASE ĐÁNH GIÁ THỜI GIAN THỰC
 * DỰ ÁN: BÀI 11 - ĐỊNH LUẬT OHM (KHTN 9)
 * =========================================================================
 * 
 * Chức năng chính:
 * 1. Tự động khởi tạo cấu trúc bảng tính với màu sắc & tiêu chuẩn sư phạm.
 * 2. Lưu trữ & Cập nhật thời gian thực (Real-time Upsert): Mỗi học sinh/phiên
 *    chỉ chiếm 1 dòng duy nhất và liên tục cập nhật điểm số, thời gian, cửa ải.
 * 3. Hỗ trợ LockService chống nghẽn khi hàng chục học sinh cùng nộp bài cùng lúc.
 * 4. Tự động tính toán: Thời lượng học (phút), Tỉ lệ đúng (%), Xếp loại học lực.
 * 5. Cung cấp API GET để Bảng Quản Lý Giáo Viên (Teacher Dashboard) đọc dữ liệu.
 */

// Tên trang tính lưu trữ dữ liệu
const SHEET_NAME = 'Dữ liệu học tập';

/**
 * Cấu hình các cột trong Google Sheet
 */
const HEADERS = [
  'Mã phiên (ID)',
  'Cập nhật lần cuối',
  'Họ và tên học sinh',
  'Lớp',
  'Trường',
  'Thời gian vào học',
  'Thời gian kết thúc',
  'Thời lượng (phút)',
  'Điểm số',
  'Cửa ải (Level)',
  'Chặng hoàn thành',
  'Số câu đã làm',
  'Số câu đúng',
  'Tỉ lệ đúng (%)',
  'Số huy hiệu',
  'Lỗ hổng kiến thức (Câu sai)',
  'Xếp loại đánh giá'
];

/**
 * Xử lý yêu cầu POST từ App gửi lên (Lưu / Cập nhật dữ liệu học sinh)
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  // Khóa tối đa 10 giây để tránh ghi đè dữ liệu khi cả lớp nộp cùng lúc
  try {
    lock.waitLock(10000);
  } catch (err) {
    return createJsonResponse({
      status: 'error',
      message: 'Hệ thống đang bận, vui lòng thử lại sau giây lát.'
    }, 429);
  }

  try {
    const sheet = getOrCreateSheet();
    let data;

    // Phân tích dữ liệu JSON gửi lên (hỗ trợ cả postData thô và qua parameter)
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter && e.parameter.data) {
      data = JSON.parse(e.parameter.data);
    } else {
      throw new Error('Không tìm thấy dữ liệu hợp lệ trong yêu cầu POST.');
    }

    // Trích xuất các trường thông tin
    const sessionId = data.id || ('session-' + new Date().getTime());
    const studentName = data.studentName || 'Học sinh ẩn danh';
    const className = data.className || '';
    const schoolName = data.schoolName || '';
    const startTimeStr = data.startTime || new Date().toISOString();
    const endTimeStr = data.endTime || new Date().toISOString();
    const score = Number(data.score) || 0;
    const currentLevel = Number(data.currentLevel) || 1;
    const completedStages = Array.isArray(data.completedStages) ? data.completedStages.join(', ') : (data.completedStages || '1');
    const answersCount = Number(data.answersCount) || 0;
    const correctAnswersCount = Number(data.correctAnswersCount) || 0;
    const badgesEarned = Array.isArray(data.badgesEarned) ? data.badgesEarned.length : (Number(data.badgesEarned) || 0);
    const wrongQuestionIds = Array.isArray(data.wrongQuestionIds) ? data.wrongQuestionIds.join(', ') : (data.wrongQuestionIds || '');

    // Tính toán số liệu thống kê
    const startDate = new Date(startTimeStr);
    const endDate = new Date(endTimeStr);
    const durationMinutes = Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / 60000));
    const accuracy = answersCount > 0 ? Math.round((correctAnswersCount / answersCount) * 100) : 0;

    // Đánh giá xếp loại năng lực theo thang điểm & độ chính xác
    let classification = 'Cần cố gắng thêm';
    if (score >= 400 && accuracy >= 80) {
      classification = 'Xuất sắc ⭐⭐⭐';
    } else if (score >= 300 && accuracy >= 70) {
      classification = 'Giỏi ⭐⭐';
    } else if (score >= 200 && accuracy >= 50) {
      classification = 'Khá ⭐';
    } else if (answersCount > 0) {
      classification = 'Đạt yêu cầu';
    }

    const nowFormatted = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');
    const startFormatted = Utilities.formatDate(startDate, Session.getScriptTimeZone() || 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');
    const endFormatted = Utilities.formatDate(endDate, Session.getScriptTimeZone() || 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm:ss');

    const rowData = [
      sessionId,                // Cột 1: Mã phiên
      nowFormatted,             // Cột 2: Cập nhật lần cuối
      studentName,              // Cột 3: Họ tên
      className,                // Cột 4: Lớp
      schoolName,               // Cột 5: Trường
      startFormatted,           // Cột 6: Bắt đầu
      endFormatted,             // Cột 7: Kết thúc
      durationMinutes,          // Cột 8: Thời lượng (phút)
      score,                    // Cột 9: Điểm
      currentLevel,             // Cột 10: Cửa ải Game
      completedStages,          // Cột 11: Chặng hoàn thành
      answersCount,             // Cột 12: Tổng câu
      correctAnswersCount,      // Cột 13: Câu đúng
      accuracy + '%',           // Cột 14: Tỉ lệ đúng
      badgesEarned,             // Cột 15: Huy hiệu
      wrongQuestionIds || 'Không có', // Cột 16: Câu sai
      classification            // Cột 17: Xếp loại
    ];

    // Kiểm tra xem mã phiên (sessionId) này đã tồn tại trong Sheet chưa để Real-time Upsert
    const lastRow = sheet.getLastRow();
    let existingRowIndex = -1;

    if (lastRow > 1) {
      const idValues = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
      for (let i = 0; i < idValues.length; i++) {
        if (String(idValues[i][0]) === String(sessionId)) {
          existingRowIndex = i + 2; // Vị trí dòng thực tế (1-based, bỏ qua header)
          break;
        }
      }
    }

    if (existingRowIndex > 0) {
      // Cập nhật dòng hiện có theo thời gian thực
      sheet.getRange(existingRowIndex, 1, 1, rowData.length).setValues([rowData]);
    } else {
      // Thêm dòng mới cho học sinh mới vào học
      sheet.appendRow(rowData);
    }

    return createJsonResponse({
      status: 'success',
      message: existingRowIndex > 0 ? 'Cập nhật tiến độ học tập thành công!' : 'Đã ghi nhận học sinh mới!',
      data: {
        sessionId: sessionId,
        studentName: studentName,
        score: score,
        accuracy: accuracy,
        classification: classification,
        updatedAt: nowFormatted
      }
    });

  } catch (err) {
    return createJsonResponse({
      status: 'error',
      message: err.toString()
    }, 500);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Xử lý yêu cầu GET: Cho phép Teacher Dashboard đọc danh sách học sinh theo thời gian thực
 */
function doGet(e) {
  try {
    const sheet = getOrCreateSheet();
    const lastRow = sheet.getLastRow();

    if (lastRow <= 1) {
      return createJsonResponse({
        status: 'success',
        count: 0,
        data: []
      });
    }

    const data = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
    const results = data.map(function(row) {
      return {
        id: row[0],
        lastUpdated: row[1],
        studentName: row[2],
        className: row[3],
        schoolName: row[4],
        startTime: row[5],
        endTime: row[6],
        durationMinutes: row[7],
        score: row[8],
        currentLevel: row[9],
        completedStages: row[10],
        answersCount: row[11],
        correctAnswersCount: row[12],
        accuracy: row[13],
        badgesEarned: row[14],
        wrongQuestionIds: row[15],
        classification: row[16]
      };
    });

    return createJsonResponse({
      status: 'success',
      count: results.length,
      data: results
    });

  } catch (err) {
    return createJsonResponse({
      status: 'error',
      message: err.toString()
    }, 500);
  }
}

/**
 * Lấy hoặc tự động khởi tạo Sheet với định dạng chuẩn sư phạm
 */
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  // Nếu sheet chưa có tiêu đề, tự động tạo và định dạng chuyên nghiệp
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);

    // Định dạng dòng tiêu đề
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground('#1E40AF'); // Xanh dương đậm
    headerRange.setFontColor('#FFFFFF'); // Chữ trắng
    headerRange.setFontWeight('bold');
    headerRange.setFontSize(11);
    headerRange.setHorizontalAlignment('center');
    headerRange.setVerticalAlignment('middle');

    sheet.setRowHeight(1, 40);
    sheet.setFrozenRows(1); // Cố định dòng tiêu đề

    // Tự động căn chỉnh độ rộng cột
    for (let col = 1; col <= HEADERS.length; col++) {
      sheet.autoResizeColumn(col);
    }
  }

  return sheet;
}

/**
 * Tạo phản hồi JSON chuẩn
 */
function createJsonResponse(obj, statusCode) {
  const output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
