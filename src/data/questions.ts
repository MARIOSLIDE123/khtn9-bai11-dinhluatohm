import { Question } from '../types';

// Breakdown:
// 25 Nhận biết (q_nb_01 -> q_nb_25)
// 30 Thông hiểu (q_th_01 -> q_th_30)
// 30 Tính toán (q_tt_01 -> q_tt_30)
// 15 Vận dụng (q_vd_01 -> q_vd_15)
// Total = 100 câu hỏi chất lượng cao, đúng chuẩn KHTN 9 Bài 11

export const QUESTION_BANK: Question[] = [
  // ==================== NHẬN BIẾT (25 CÂU) ====================
  {
    id: 'q_nb_01',
    topic: 'Điện trở',
    difficulty: 'nhan_biet',
    type: 'multiple_choice',
    question: 'Điện trở của một đoạn dây dẫn là đại lượng đặc trưng cho:',
    options: [
      'Khả năng tích điện của dây dẫn',
      'Mức độ cản trở dòng điện của dây dẫn',
      'Khả năng sinh ra dòng điện của dây dẫn',
      'Mức độ dẫn nhiệt của dây dẫn'
    ],
    correctAnswer: 'Mức độ cản trở dòng điện của dây dẫn',
    explanation: 'Điện trở biểu thị mức độ cản trở dòng điện nhiều hay ít của vật dẫn.',
    hints: [
      'Hãy nhớ lại ý nghĩa từ "trở" trong điện trở.',
      'Khi electron chuyển động qua dây dẫn gặp các nguyên tử cản lại.',
      'Điện trở đặc trưng cho mức độ cản trở dòng điện.'
    ],
    score: 10,
    estimatedTime: 20
  },
  {
    id: 'q_nb_02',
    topic: 'Đơn vị',
    difficulty: 'nhan_biet',
    type: 'multiple_choice',
    question: 'Ký hiệu đơn vị của điện trở theo hệ SI là:',
    options: ['V (Vôn)', 'A (Ampe)', 'Ω (Ôm)', 'W (Oát)'],
    correctAnswer: 'Ω (Ôm)',
    explanation: 'Đơn vị của điện trở là Ôm, ký hiệu là $\\Omega$.',
    hints: [
      'V là đơn vị hiệu điện thế, A là đơn vị cường độ dòng điện.',
      'Tên đơn vị được đặt theo nhà bác học Georg Simon Ohm.',
      'Ký hiệu là chữ cái Hy Lạp Omega: $\\Omega$.'
    ],
    score: 10,
    estimatedTime: 15
  },
  {
    id: 'q_nb_03',
    topic: 'Định luật Ohm',
    difficulty: 'nhan_biet',
    type: 'multiple_choice',
    question: 'Hệ thức đúng của Định luật Ohm đối với một đoạn mạch là:',
    options: ['$I = \\frac{U}{R}$', '$I = U \\cdot R$', '$I = \\frac{R}{U}$', '$I = \\frac{U^2}{R}$'],
    correctAnswer: '$I = \\frac{U}{R}$',
    explanation: 'Hệ thức của Định luật Ohm: $I = \\frac{U}{R}$.',
    hints: [
      'Cường độ dòng điện tỉ lệ thuận với hiệu điện thế.',
      'Cường độ dòng điện tỉ lệ nghịch với điện trở.',
      'Công thức chuẩn là $I = \\frac{U}{R}$.'
    ],
    score: 10,
    estimatedTime: 15
  },
  {
    id: 'q_nb_04',
    topic: 'U và I',
    difficulty: 'nhan_biet',
    type: 'true_false',
    question: 'Với một dây dẫn xác định, cường độ dòng điện chạy qua dây dẫn tỉ lệ thuận với hiệu điện thế đặt vào hai đầu dây dẫn.',
    options: ['Đúng', 'Sai'],
    correctAnswer: 'Đúng',
    explanation: 'Thực nghiệm chứng minh khi $U$ tăng bao nhiêu lần thì $I$ tăng bấy nhiêu lần.',
    hints: [
      'Nhớ lại đồ thị biểu diễn mối liên hệ giữa U và I.',
      'Khi U tăng thì dòng điện qua dây tăng hay giảm?',
      'Chúng tỉ lệ thuận với nhau: phát biểu này là Đúng.'
    ],
    score: 10,
    estimatedTime: 15
  },
  {
    id: 'q_nb_05',
    topic: 'Đồ thị I-U',
    difficulty: 'nhan_biet',
    type: 'multiple_choice',
    question: 'Đồ thị biểu diễn sự phụ thuộc của cường độ dòng điện vào hiệu điện thế giữa hai đầu dây dẫn là:',
    options: [
      'Đường thẳng đi qua gốc tọa độ',
      'Đường cong parabol',
      'Đường thẳng song song với trục hoành',
      'Đường tròn'
    ],
    correctAnswer: 'Đường thẳng đi qua gốc tọa độ',
    explanation: 'Mối quan hệ tỉ lệ thuận được biểu diễn bằng đường thẳng đi qua gốc tọa độ $O(0,0)$.',
    hints: [
      'Khi U = 0 thì I bằng bao nhiêu?',
      'I = 0 khi U = 0, đồ thị phải đi qua điểm (0,0).',
      'Vì tỉ lệ bậc nhất, đồ thị là đường thẳng đi qua gốc tọa độ.'
    ],
    score: 10,
    estimatedTime: 20
  },
  {
    id: 'q_nb_06',
    topic: 'Dây dẫn',
    difficulty: 'nhan_biet',
    type: 'multiple_choice',
    question: 'Công thức tính điện trở của dây dẫn hình trụ đồng chất là:',
    options: [
      '$R = \\rho \\frac{l}{S}$',
      '$R = \\rho \\frac{S}{l}$',
      '$R = \\frac{\\rho \\cdot S}{l^2}$',
      '$R = \\frac{l}{\\rho \\cdot S}$'
    ],
    correctAnswer: '$R = \\rho \\frac{l}{S}$',
    explanation: 'Điện trở tỉ lệ thuận với chiều dài $l$, tỉ lệ nghịch với tiết diện $S$: $R = \\rho \\frac{l}{S}$.',
    hints: [
      'Dây càng dài thì điện trở càng lớn ($l$ ở trên tử số).',
      'Dây càng to (tiết diện lớn) thì điện trở càng nhỏ ($S$ ở dưới mẫu số).',
      'Công thức chính xác là $R = \\rho \\frac{l}{S}$.'
    ],
    score: 10,
    estimatedTime: 20
  },
  {
    id: 'q_nb_07',
    topic: 'Dây dẫn',
    difficulty: 'nhan_biet',
    type: 'multiple_choice',
    question: 'Đại lượng $\\rho$ trong công thức $R = \\rho \\frac{l}{S}$ gọi là gì?',
    options: [
      'Điện trở suất của vật liệu',
      'Khối lượng riêng của dây',
      'Mật độ electron tự do',
      'Trọng lượng riêng của dây'
    ],
    correctAnswer: 'Điện trở suất của vật liệu',
    explanation: '$\\rho$ (đọc là rô) là điện trở suất của chất làm dây dẫn.',
    hints: [
      'Đại lượng này phụ thuộc vào bản chất vật liệu làm dây.',
      'Đơn vị đo của nó là $\\Omega \\cdot m$.',
      'Nó được gọi là điện trở suất.'
    ],
    score: 10,
    estimatedTime: 15
  },
  {
    id: 'q_nb_08',
    topic: 'Đơn vị',
    difficulty: 'nhan_biet',
    type: 'multiple_choice',
    question: 'Đơn vị đo của điện trở suất $\\rho$ trong hệ SI là:',
    options: ['$\\Omega / m$', '$\\Omega \\cdot m$', '$\\Omega / m^2$', '$V \\cdot m$'],
    correctAnswer: '$\\Omega \\cdot m$',
    explanation: 'Từ $\\rho = \\frac{R \\cdot S}{l} \\implies [\\rho] = \\frac{\\Omega \\cdot m^2}{m} = \\Omega \\cdot m$.',
    hints: [
      'Biến đổi từ công thức $R = \\rho \\frac{l}{S} \\implies \\rho = \\frac{R \\cdot S}{l}$.',
      'Đơn vị của R là $\\Omega$, S là $m^2$, l là m.',
      '$\\frac{\\Omega \\cdot m^2}{m} = \\Omega \\cdot m$.'
    ],
    score: 10,
    estimatedTime: 20
  },
  {
    id: 'q_nb_09',
    topic: 'Đơn vị',
    difficulty: 'nhan_biet',
    type: 'fill_blank',
    question: 'Mối quan hệ giữa $1\\,\\text{k}\\Omega$ và $\\Omega$ là: $1\\,\\text{k}\\Omega =$ [ ... ] $\\Omega$.',
    correctAnswer: '1000',
    acceptableAnswers: ['1000', '1.000', '10^3'],
    explanation: 'Tiền tố "kilo" có nghĩa là $10^3 = 1000$, do đó $1\\,\\text{k}\\Omega = 1000\\,\\Omega$.',
    hints: [
      'Giống như 1 km = 1000 m, 1 kg = 1000 g.',
      '1 k tương ứng với 1 nghìn.',
      'Đáp số là 1000.'
    ],
    score: 10,
    estimatedTime: 15
  },
  {
    id: 'q_nb_10',
    topic: 'Đơn vị',
    difficulty: 'nhan_biet',
    type: 'fill_blank',
    question: 'Quy đổi: $1\\,\\text{M}\\Omega =$ [ ... ] $\\Omega$.',
    correctAnswer: '1000000',
    acceptableAnswers: ['1000000', '1.000.000', '10^6'],
    explanation: 'Tiền tố "Mega" có nghĩa là một triệu ($10^6$), do đó $1\\,\\text{M}\\Omega = 1\\,000\\,000\\,\\Omega$.',
    hints: [
      'Chữ M viết hoa là tiền tố Mega.',
      'Mega tương ứng với một triệu ($10^6$).',
      'Đáp án là 1000000.'
    ],
    score: 10,
    estimatedTime: 15
  },
  {
    id: 'q_nb_11',
    topic: 'Dây dẫn',
    difficulty: 'nhan_biet',
    type: 'multiple_choice',
    question: 'Trong các kim loại sau, kim loại nào có khả năng dẫn điện tốt nhất ở điều kiện thường?',
    options: ['Bạc (Ag)', 'Đồng (Cu)', 'Nhôm (Al)', 'Sắt (Fe)'],
    correctAnswer: 'Bạc (Ag)',
    explanation: 'Bạc có điện trở suất nhỏ nhất (khoảng $1{,}6 \\times 10^{-8}\\,\\Omega \\cdot m$), dẫn điện tốt nhất.',
    hints: [
      'Vật liệu dẫn điện tốt nhất có điện trở suất nhỏ nhất.',
      'Đồng và nhôm rất phổ biến vì giá thành rẻ hơn kim loại này.',
      'Kim loại dẫn điện tốt nhất là Bạc.'
    ],
    score: 10,
    estimatedTime: 15
  },
  {
    id: 'q_nb_12',
    topic: 'Định luật Ohm',
    difficulty: 'nhan_biet',
    type: 'multiple_choice',
    question: 'Biểu thức suy ra để tính hiệu điện thế $U$ từ định luật Ohm là:',
    options: ['$U = I \\cdot R$', '$U = \\frac{I}{R}$', '$U = \\frac{R}{I}$', '$U = I^2 \\cdot R$'],
    correctAnswer: '$U = I \\cdot R$',
    explanation: 'Từ $I = \\frac{U}{R} \\implies U = I \\cdot R$.',
    hints: [
      'Áp dụng quy tắc nhân chéo từ $I = \\frac{U}{R}$.',
      'Nhân cả hai vế với R.',
      'Ta được $U = I \\cdot R$.'
    ],
    score: 10,
    estimatedTime: 15
  },
  {
    id: 'q_nb_13',
    topic: 'Định luật Ohm',
    difficulty: 'nhan_biet',
    type: 'multiple_choice',
    question: 'Biểu thức suy ra để tính điện trở $R$ từ định luật Ohm là:',
    options: ['$R = \\frac{U}{I}$', '$R = U \\cdot I$', '$R = \\frac{I}{U}$', '$R = \\frac{U^2}{I}$'],
    correctAnswer: '$R = \\frac{U}{I}$',
    explanation: 'Từ $I = \\frac{U}{R} \\implies R = \\frac{U}{I}$.',
    hints: [
      'R là tỉ số giữa hiệu điện thế và cường độ dòng điện.',
      'Lấy U chia cho I.',
      '$R = \\frac{U}{I}$.'
    ],
    score: 10,
    estimatedTime: 15
  },
  {
    id: 'q_nb_14',
    topic: 'Dụng cụ đo',
    difficulty: 'nhan_biet',
    type: 'multiple_choice',
    question: 'Để đo cường độ dòng điện chạy qua một điện trở, ta dùng dụng cụ nào và mắc như thế nào?',
    options: [
      'Ampe kế mắc nối tiếp với điện trở',
      'Ampe kế mắc song song với điện trở',
      'Vôn kế mắc nối tiếp với điện trở',
      'Vôn kế mắc song song với điện trở'
    ],
    correctAnswer: 'Ampe kế mắc nối tiếp với điện trở',
    explanation: 'Ampe kế dùng để đo dòng điện nên phải mắc nối tiếp để dòng điện đi qua nó.',
    hints: [
      'Dụng cụ đo cường độ dòng điện có đơn vị là Ampe.',
      'Dòng điện phải đi xuyên qua dụng cụ để đo được.',
      'Dùng Ampe kế và mắc nối tiếp.'
    ],
    score: 10,
    estimatedTime: 20
  },
  {
    id: 'q_nb_15',
    topic: 'Dụng cụ đo',
    difficulty: 'nhan_biet',
    type: 'multiple_choice',
    question: 'Để đo hiệu điện thế giữa hai đầu một điện trở, ta dùng dụng cụ nào và mắc như thế nào?',
    options: [
      'Vôn kế mắc song song với điện trở',
      'Vôn kế mắc nối tiếp với điện trở',
      'Ampe kế mắc song song với điện trở',
      'Ampe kế mắc nối tiếp với điện trở'
    ],
    correctAnswer: 'Vôn kế mắc song song với điện trở',
    explanation: 'Vôn kế đo hiệu điện thế giữa 2 điểm nên phải mắc song song với 2 đầu điện trở.',
    hints: [
      'Hiệu điện thế đo bằng Vôn kế.',
      'Muốn đo hiệu điện thế giữa hai đầu cần đặt hai que đo vào hai đầu.',
      'Vôn kế mắc song song.'
    ],
    score: 10,
    estimatedTime: 20
  },
  {
    id: 'q_nb_16',
    topic: 'Điện trở',
    difficulty: 'nhan_biet',
    type: 'true_false',
    question: 'Một vật dẫn có điện trở càng lớn thì dòng điện chạy qua nó càng dễ dàng.',
    options: ['Đúng', 'Sai'],
    correctAnswer: 'Sai',
    explanation: 'Điện trở càng lớn thì khả năng cản trở càng mạnh, dòng điện chạy qua càng khó khăn (cường độ dòng điện nhỏ đi).',
    hints: [
      'Điện trở có tác dụng cản trở dòng điện.',
      'Cản trở càng nhiều thì dòng điện càng khó qua.',
      'Phát biểu này là Sai.'
    ],
    score: 10,
    estimatedTime: 15
  },
  {
    id: 'q_nb_17',
    topic: 'Dây dẫn',
    difficulty: 'nhan_biet',
    type: 'multiple_choice',
    question: 'Khi chiều dài $l$ của dây dẫn tăng lên thì điện trở của dây dẫn sẽ:',
    options: ['Tăng lên', 'Giảm đi', 'Không thay đổi', 'Bằng 0'],
    correctAnswer: 'Tăng lên',
    explanation: 'Điện trở tỉ lệ thuận với chiều dài dây: $l$ tăng thì $R$ tăng.',
    hints: [
      'Dây càng dài thì quãng đường electron phải đi càng xa.',
      'Số lần va chạm tăng lên.',
      'Do đó điện trở tăng lên.'
    ],
    score: 10,
    estimatedTime: 15
  },
  {
    id: 'q_nb_18',
    topic: 'Dây dẫn',
    difficulty: 'nhan_biet',
    type: 'multiple_choice',
    question: 'Khi tiết diện $S$ của dây dẫn tăng lên thì điện trở của dây dẫn sẽ:',
    options: ['Giảm đi', 'Tăng lên', 'Không thay đổi', 'Biến mất'],
    correctAnswer: 'Giảm đi',
    explanation: 'Điện trở tỉ lệ nghịch với tiết diện: dây càng dày (tiết diện lớn) thì điện trở càng nhỏ.',
    hints: [
      'Đường càng rộng thì xe cộ di chuyển càng dễ hay khó?',
      'Tiết diện rộng thì electron dễ di chuyển hơn.',
      'Điện trở cản trở sẽ giảm đi.'
    ],
    score: 10,
    estimatedTime: 15
  },
  {
    id: 'q_nb_19',
    topic: 'Ứng dụng',
    difficulty: 'nhan_biet',
    type: 'multiple_choice',
    question: 'Dây đốt nóng trong các thiết bị như bàn là, ấm đun nước thường làm bằng vật liệu gì?',
    options: [
      'Hợp kim có điện trở suất lớn (như Niken-crôm)',
      'Kim loại có điện trở suất rất nhỏ (như Bạc)',
      'Đồng nguyên chất',
      'Nhôm lá mỏng'
    ],
    correctAnswer: 'Hợp kim có điện trở suất lớn (như Niken-crôm)',
    explanation: 'Dây đốt nóng cần điện trở lớn để tỏa nhiều nhiệt và chịu được nhiệt độ cao mà không bị nóng chảy.',
    hints: [
      'Mục đích của bàn là và ấm điện là tỏa nhiệt nóng.',
      'Cần điện trở lớn và nhiệt độ nóng chảy cao.',
      'Hợp kim Niken-crôm (Nicrom) có điện trở suất lớn được lựa chọn.'
    ],
    score: 10,
    estimatedTime: 20
  },
  {
    id: 'q_nb_20',
    topic: 'Ứng dụng',
    difficulty: 'nhan_biet',
    type: 'multiple_choice',
    question: 'Biến trở là một thiết bị có tác dụng:',
    options: [
      'Thay đổi trị số điện trở để điều chỉnh cường độ dòng điện',
      'Biến đổi dòng điện xoay chiều thành một chiều',
      'Đo trực tiếp công suất tiêu thụ',
      'Tích trữ năng lượng điện'
    ],
    correctAnswer: 'Thay đổi trị số điện trở để điều chỉnh cường độ dòng điện',
    explanation: 'Biến trở là điện trở có thể biến đổi giá trị, dùng để điều chỉnh cường độ dòng điện trong mạch.',
    hints: [
      'Từ "biến" nghĩa là có thể thay đổi/biến đổi.',
      'Nó điều chỉnh dòng điện to hay nhỏ (như nút vặn quạt gió).',
      'Thay đổi trị số điện trở để điều chỉnh cường độ dòng điện.'
    ],
    score: 10,
    estimatedTime: 20
  },
  {
    id: 'q_nb_21',
    topic: 'Đơn vị',
    difficulty: 'nhan_biet',
    type: 'multiple_choice',
    question: 'Một Ôm ($1\\,\\Omega$) tương đương với biểu thức nào sau đây?',
    options: ['$1\\,\\text{V} / 1\\,\\text{A}$', '$1\\,\\text{A} / 1\\,\\text{V}$', '$1\\,\\text{V} \\cdot 1\\,\\text{A}$', '$1\\,\\text{W} \\cdot 1\\,\\text{V}$'],
    correctAnswer: '$1\\,\\text{V} / 1\\,\\text{A}$',
    explanation: 'Từ $R = \\frac{U}{I} \\implies 1\\,\\Omega = \\frac{1\\,\\text{V}}{1\\,\\text{A}}$.',
    hints: [
      'Dùng công thức $R = \\frac{U}{I}$.',
      'Đơn vị của U là Vôn (V), I là Ampe (A).',
      '$1\\,\\Omega = 1\\,\\text{V} / 1\\,\\text{A}$.'
    ],
    score: 10,
    estimatedTime: 15
  },
  {
    id: 'q_nb_22',
    topic: 'Định luật Ohm',
    difficulty: 'nhan_biet',
    type: 'true_false',
    question: 'Định luật Ohm được đặt theo tên của nhà vật lý học người Pháp Andre-Marie Ampere.',
    options: ['Đúng', 'Sai'],
    correctAnswer: 'Sai',
    explanation: 'Định luật Ohm được đặt theo tên của nhà vật lý học người Đức Georg Simon Ohm.',
    hints: [
      'Định luật Ohm mang tên Ohm.',
      'Georg Simon Ohm là nhà vật lí học người Đức.',
      'Phát biểu này là Sai.'
    ],
    score: 10,
    estimatedTime: 15
  },
  {
    id: 'q_nb_23',
    topic: 'Dây dẫn',
    difficulty: 'nhan_biet',
    type: 'multiple_choice',
    question: 'Hai dây dẫn làm cùng chất liệu, cùng tiết diện, dây 1 dài $5\\,\\text{m}$, dây 2 dài $15\\,\\text{m}$. Nhận xét đúng là:',
    options: [
      'Điện trở dây 2 gấp 3 lần dây 1',
      'Điện trở dây 1 gấp 3 lần dây 2',
      'Hai dây có điện trở bằng nhau',
      'Điện trở dây 2 gấp 9 lần dây 1'
    ],
    correctAnswer: 'Điện trở dây 2 gấp 3 lần dây 1',
    explanation: 'Cùng chất liệu và tiết diện, điện trở tỉ lệ thuận với chiều dài. Vì $l_2 = 3 l_1$ nên $R_2 = 3 R_1$.',
    hints: [
      'Điện trở tỉ lệ thuận với chiều dài.',
      'Dây 2 dài 15m, dây 1 dài 5m (gấp 3 lần).',
      'Điện trở dây 2 gấp 3 lần dây 1.'
    ],
    score: 10,
    estimatedTime: 20
  },
  {
    id: 'q_nb_24',
    topic: 'Dây dẫn',
    difficulty: 'nhan_biet',
    type: 'multiple_choice',
    question: 'Hai dây nhôm cùng chiều dài, dây 1 có tiết diện $1\\,\\text{mm}^2$, dây 2 có tiết diện $2\\,\\text{mm}^2$. Nhận xét đúng là:',
    options: [
      'Điện trở dây 1 gấp 2 lần điện trở dây 2',
      'Điện trở dây 2 gấp 2 lần điện trở dây 1',
      'Điện trở hai dây bằng nhau',
      'Điện trở dây 1 bằng một nửa dây 2'
    ],
    correctAnswer: 'Điện trở dây 1 gấp 2 lần điện trở dây 2',
    explanation: 'Điện trở tỉ lệ nghịch với tiết diện. Tiết diện dây 2 gấp đôi dây 1 thì điện trở dây 2 chỉ bằng một nửa dây 1, tức $R_1 = 2 R_2$.',
    hints: [
      'Điện trở tỉ lệ nghịch với tiết diện.',
      'Dây càng dày thì cản trở càng ít (R càng bé).',
      'Dây 1 tiết diện bé hơn một nửa nên $R_1 = 2 R_2$.'
    ],
    score: 10,
    estimatedTime: 20
  },
  {
    id: 'q_nb_25',
    topic: 'Ký hiệu',
    difficulty: 'nhan_biet',
    type: 'multiple_choice',
    question: 'Trong sơ đồ mạch điện tiêu chuẩn, ký hiệu chữ cái của cường độ dòng điện là:',
    options: ['I', 'U', 'R', 'P'],
    correctAnswer: 'I',
    explanation: 'Cường độ dòng điện ký hiệu là I (Intensity).',
    hints: [
      'U là hiệu điện thế, R là điện trở.',
      'Chữ cái biểu thị cường độ dòng điện bắt đầu bằng chữ I.',
      'Đáp án là I.'
    ],
    score: 10,
    estimatedTime: 15
  },

  // ==================== THÔNG HIỂU (30 CÂU) ====================
  {
    id: 'q_th_01',
    topic: 'U và I',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Khi hiệu điện thế đặt vào hai đầu một dây dẫn tăng lên 3 lần thì cường độ dòng điện qua dây sẽ:',
    options: [
      'Tăng lên 3 lần',
      'Giảm đi 3 lần',
      'Không thay đổi',
      'Tăng lên 9 lần'
    ],
    correctAnswer: 'Tăng lên 3 lần',
    explanation: 'Cường độ dòng điện tỉ lệ thuận với hiệu điện thế: $I \\propto U$. Khi U tăng 3 lần thì I cũng tăng 3 lần.',
    hints: [
      'Mối quan hệ giữa I và U là tỉ lệ gì?',
      'Chúng tỉ lệ thuận với nhau.',
      'U tăng 3 lần thì I cũng tăng 3 lần.'
    ],
    score: 10,
    estimatedTime: 25
  },
  {
    id: 'q_th_02',
    topic: 'Định luật Ohm',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Giữ nguyên hiệu điện thế giữa hai đầu đoạn mạch, nếu thay điện trở $R$ bằng một điện trở $2R$ thì cường độ dòng điện trong mạch sẽ:',
    options: [
      'Giảm đi 2 lần',
      'Tăng lên 2 lần',
      'Không thay đổi',
      'Giảm đi 4 lần'
    ],
    correctAnswer: 'Giảm đi 2 lần',
    explanation: 'Theo định luật Ohm $I = \\frac{U}{R}$. Khi $R$ tăng 2 lần thì mẫu số tăng 2 lần, dòng điện $I$ giảm 2 lần.',
    hints: [
      'Công thức định luật Ohm là $I = \\frac{U}{R}$.',
      'U không đổi, R nằm ở mẫu số.',
      'Mẫu số tăng 2 lần thì giá trị của phân số giảm đi 2 lần.'
    ],
    score: 10,
    estimatedTime: 25
  },
  {
    id: 'q_th_03',
    topic: 'Đồ thị I-U',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Đồ thị $I - U$ của hai dây dẫn $R_1$ và $R_2$ đều là đường thẳng qua gốc tọa độ. Nếu đường của dây 1 dốc hơn (nghiêng về trục I hơn) đường của dây 2 thì kết luận nào đúng?',
    options: [
      '$R_1 < R_2$',
      '$R_1 > R_2$',
      '$R_1 = R_2$',
      'Không thể so sánh'
    ],
    correctAnswer: '$R_1 < R_2$',
    explanation: 'Độ dốc của đồ thị là $k = \\frac{I}{U} = \\frac{1}{R}$. Đường càng dốc thì $k$ càng lớn $\\implies R$ càng nhỏ, do đó $R_1 < R_2$.',
    hints: [
      'Cùng một giá trị U chiếu lên hai đường thẳng, đường nào cho giá trị I lớn hơn?',
      'Đường 1 dốc hơn cho $I_1 > I_2$ tại cùng U.',
      'Dòng điện lớn hơn nghĩa là điện trở cản trở nhỏ hơn: $R_1 < R_2$.'
    ],
    score: 10,
    estimatedTime: 30
  },
  {
    id: 'q_th_04',
    topic: 'Điện trở',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Một bạn học sinh kết luận: "Điện trở của một dây dẫn tỉ lệ thuận với hiệu điện thế và tỉ lệ nghịch với cường độ dòng điện theo công thức $R = \\frac{U}{I}$". Kết luận này đúng hay sai?',
    options: [
      'Sai, vì điện trở là thuộc tính của dây dẫn, không phụ thuộc vào U và I',
      'Đúng, vì công thức $R = U / I$ biểu diễn mối quan hệ tỉ lệ',
      'Đúng trong trường hợp nguồn điện ổn định',
      'Chỉ đúng khi dòng điện một chiều'
    ],
    correctAnswer: 'Sai, vì điện trở là thuộc tính của dây dẫn, không phụ thuộc vào U và I',
    explanation: 'Điện trở $R$ là đặc trưng của dây dẫn, chỉ phụ thuộc vào vật liệu, kích thước và nhiệt độ; $R = U/I$ chỉ là công thức để xác định giá trị của $R$. Khi $U$ thay đổi thì $I$ thay đổi theo sao cho tỉ số $U/I$ không đổi.',
    hints: [
      'Nếu ta chưa mắc dây dẫn vào nguồn điện ($U = 0$), dây dẫn đó có điện trở không?',
      'Dây vẫn có điện trở xác định do vật liệu và kích thước của nó.',
      'Công thức $R = U/I$ dùng để tính trị số, chứ R không phụ thuộc vào U và I.'
    ],
    score: 10,
    estimatedTime: 35
  },
  {
    id: 'q_th_05',
    topic: 'Dây dẫn',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Một đoạn dây dẫn bằng đồng có điện trở $R$. Cắt đôi đoạn dây dẫn này thành 2 nửa bằng nhau. Điện trở của mỗi nửa đoạn dây là:',
    options: ['$\\frac{R}{2}$', '$2R$', '$R$', '$\\frac{R}{4}$'],
    correctAnswer: '$\\frac{R}{2}$',
    explanation: 'Khi cắt đôi, chiều dài giảm đi một nửa ($l\' = \\frac{l}{2}$) trong khi vật liệu và tiết diện không đổi. Do $R \\propto l$ nên $R\' = \\frac{R}{2}$.',
    hints: [
      'Điện trở tỉ lệ thuận với chiều dài dây.',
      'Cắt đôi dây thì chiều dài mỗi đoạn giảm một nửa.',
      'Điện trở của mỗi đoạn sẽ là $R / 2$.'
    ],
    score: 10,
    estimatedTime: 25
  },
  {
    id: 'q_th_06',
    topic: 'Dây dẫn',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Chập hai đoạn dây dẫn giống hệt nhau (cùng chiều dài $l$, cùng tiết diện $S$, cùng vật liệu) song song thành một dây kép thì điện trở của dây mới sẽ:',
    options: [
      'Bằng một nửa điện trở dây ban đầu',
      'Gấp đôi điện trở dây ban đầu',
      'Gấp 4 lần điện trở dây ban đầu',
      'Không thay đổi'
    ],
    correctAnswer: 'Bằng một nửa điện trở dây ban đầu',
    explanation: 'Khi chập hai dây song song, chiều dài giữ nguyên $l$, tiết diện tăng gấp đôi ($S\' = 2S$). Theo công thức $R = \\rho \\frac{l}{S}$, điện trở giảm 2 lần ($R\' = R/2$).',
    hints: [
      'Chập hai dây song song làm tăng đại lượng nào của dây dẫn?',
      'Tiết diện tổng cộng tăng lên gấp đôi.',
      'Tiết diện tăng gấp đôi thì điện trở giảm một nửa.'
    ],
    score: 10,
    estimatedTime: 30
  },
  {
    id: 'q_th_07',
    topic: 'Dây dẫn',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Kéo dãn đều một đoạn dây kim loại hình trụ để chiều dài của nó tăng gấp đôi (thể tích dây không đổi). Điện trở của dây sau khi kéo dãn sẽ:',
    options: [
      'Tăng lên 4 lần',
      'Tăng lên 2 lần',
      'Không đổi',
      'Giảm đi 2 lần'
    ],
    correctAnswer: 'Tăng lên 4 lần',
    explanation: 'Vì thể tích $V = l \\cdot S$ không đổi, khi chiều dài $l$ tăng gấp đôi thì tiết diện $S$ phải giảm đi 2 lần. $R\' = \\rho \\frac{2l}{S/2} = 4 \\rho \\frac{l}{S} = 4R$.',
    hints: [
      'Thể tích kim loại không đổi: $V = l \\cdot S$.',
      'Nếu kéo dài gấp đôi ($l\' = 2l$) thì tiết diện dây phải teo nhỏ đi một nửa ($S\' = S/2$).',
      '$l$ tăng 2 làm R tăng 2, $S$ giảm 2 làm R tăng thêm 2 nữa $\\implies 2 \\times 2 = 4$ lần.'
    ],
    score: 10,
    estimatedTime: 40
  },
  {
    id: 'q_th_08',
    topic: 'Mạch điện',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Khi mắc vôn kế song song với một điện trở trong mạch điện đang hoạt động, điện trở của vôn kế lý tưởng phải như thế nào để không làm ảnh hưởng đến mạch?',
    options: [
      'Rất lớn (vô cùng lớn)',
      'Rất nhỏ (gần bằng 0)',
      'Bằng đúng giá trị điện trở cần đo',
      'Bằng một nửa điện trở cần đo'
    ],
    correctAnswer: 'Rất lớn (vô cùng lớn)',
    explanation: 'Vôn kế mắc song song, nếu điện trở của nó rất lớn thì dòng điện rẽ qua vôn kế coi như bằng 0, không làm thay đổi dòng điện và điện áp trong mạch chính.',
    hints: [
      'Vôn kế mắc song song với đoạn mạch.',
      'Ta không muốn dòng điện bị phân nhánh chảy vào vôn kế.',
      'Để dòng điện không đi qua vôn kế, điện trở của vôn kế phải rất lớn.'
    ],
    score: 10,
    estimatedTime: 30
  },
  {
    id: 'q_th_09',
    topic: 'Mạch điện',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Điện trở của một ampe kế lý tưởng mắc nối tiếp trong mạch cần phải có giá trị như thế nào?',
    options: [
      'Rất nhỏ (gần bằng 0)',
      'Rất lớn (vô cùng lớn)',
      'Bằng điện trở toàn mạch',
      'Bằng 100 Ω'
    ],
    correctAnswer: 'Rất nhỏ (gần bằng 0)',
    explanation: 'Ampe kế mắc nối tiếp, nếu điện trở của nó rất nhỏ thì độ giảm thế trên ampe kế coi như bằng 0, không làm cản trở dòng điện cần đo.',
    hints: [
      'Ampe kế mắc nối tiếp trong mạch.',
      'Nó không được làm tăng thêm điện trở đáng kể cho mạch điện.',
      'Do đó điện trở của ampe kế phải rất nhỏ.'
    ],
    score: 10,
    estimatedTime: 25
  },
  {
    id: 'q_th_10',
    topic: 'Dây dẫn',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Tại sao lõi dây dẫn điện trong mạng điện gia đình thường được làm bằng đồng hoặc nhôm mà không dùng sắt?',
    options: [
      'Đồng và nhôm có điện trở suất nhỏ hơn nhiều so với sắt, giúp giảm hao phí điện năng',
      'Sắt quá nhẹ và khó uốn cong',
      'Đồng và nhôm có nhiệt độ nóng chảy thấp hơn sắt',
      'Sắt dẫn điện tốt hơn nhưng độc hại'
    ],
    correctAnswer: 'Đồng và nhôm có điện trở suất nhỏ hơn nhiều so với sắt, giúp giảm hao phí điện năng',
    explanation: 'Điện trở suất của đồng và nhôm nhỏ (dẫn điện tốt), làm giảm điện trở của đường dây, hạn chế tỏa nhiệt hao phí.',
    hints: [
      'Yêu cầu quan trọng của dây dẫn điện là dẫn điện tốt hay cản trở dòng điện?',
      'Dẫn điện tốt nghĩa là điện trở suất $\\rho$ phải nhỏ.',
      'Đồng và nhôm có điện trở suất nhỏ hơn sắt rất nhiều.'
    ],
    score: 10,
    estimatedTime: 25
  },
  {
    id: 'q_th_11',
    topic: 'Dây dẫn',
    difficulty: 'thong_hieu',
    type: 'true_false',
    question: 'Hai dây dẫn có cùng chiều dài và cùng tiết diện nhưng làm từ hai chất liệu khác nhau thì chắc chắn có điện trở khác nhau.',
    options: ['Đúng', 'Sai'],
    correctAnswer: 'Đúng',
    explanation: 'Vì điện trở suất $\\rho$ của các vật liệu khác nhau là khác nhau, nên theo $R = \\rho \\frac{l}{S}$, điện trở của chúng sẽ khác nhau.',
    hints: [
      'Công thức $R = \\rho \\frac{l}{S}$.',
      'Hai chất liệu khác nhau thì $\\rho$ khác nhau.',
      'Cùng $l$ và $S$ nhưng khác $\\rho$ thì R khác nhau: Đúng.'
    ],
    score: 10,
    estimatedTime: 20
  },
  {
    id: 'q_th_12',
    topic: 'U và I',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Đặt vào hai đầu một dây dẫn hiệu điện thế ban đầu $U_1$. Để cường độ dòng điện qua dây giảm đi 4 lần thì hiệu điện thế $U_2$ phải bằng:',
    options: ['$\\frac{U_1}{4}$', '$4 U_1$', '$U_1 - 4$', '$2 U_1$'],
    correctAnswer: '$\\frac{U_1}{4}$',
    explanation: 'Vì $I$ tỉ lệ thuận với $U$, khi $I$ giảm 4 lần thì $U$ cũng phải giảm đi 4 lần: $U_2 = \\frac{U_1}{4}$.',
    hints: [
      'Tỉ số $\\frac{U_1}{U_2} = \\frac{I_1}{I_2}$.',
      'Dòng điện $I_2 = I_1 / 4$.',
      'Hiệu điện thế $U_2 = U_1 / 4$.'
    ],
    score: 10,
    estimatedTime: 25
  },
  {
    id: 'q_th_13',
    topic: 'Đồ thị I-U',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Khi đồ thị biểu diễn $I$ theo $U$ có dạng là đường thẳng nằm ngang song song với trục $U$, điều đó có nghĩa là:',
    options: [
      'Cường độ dòng điện không đổi khi hiệu điện thế thay đổi (không tuân theo định luật Ohm với điện trở thuần)',
      'Điện trở tuân theo định luật Ohm',
      'Dây dẫn có điện trở bằng 0',
      'Hiệu điện thế luôn bằng 0'
    ],
    correctAnswer: 'Cường độ dòng điện không đổi khi hiệu điện thế thay đổi (không tuân theo định luật Ohm với điện trở thuần)',
    explanation: 'Đối với điện trở tuân theo định luật Ohm, đồ thị $I - U$ phải là đường thẳng đi qua gốc tọa độ. Đường nằm ngang chứng tỏ dòng điện không đổi dù $U$ tăng, đây là đặc tính nguồn dòng không tuân theo định luật Ohm thuần.',
    hints: [
      'Đồ thị định luật Ohm chuẩn phải đi qua điểm nào?',
      'Nó phải là đường thẳng đi qua gốc tọa độ O(0,0).',
      'Đường song song không qua gốc thể hiện vật dẫn không tuân theo định luật Ohm thông thường.'
    ],
    score: 10,
    estimatedTime: 30
  },
  {
    id: 'q_th_14',
    topic: 'Dây dẫn',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Tiết diện hình tròn của dây dẫn có đường kính $d$. Nếu đường kính dây tăng gấp đôi thì điện trở của dây (giữ nguyên chiều dài và chất liệu) sẽ:',
    options: [
      'Giảm đi 4 lần',
      'Giảm đi 2 lần',
      'Tăng lên 4 lần',
      'Không thay đổi'
    ],
    correctAnswer: 'Giảm đi 4 lần',
    explanation: 'Tiết diện dây hình tròn $S = \\frac{\\pi d^2}{4}$. Khi đường kính $d$ tăng 2 lần thì tiết diện $S$ tăng $2^2 = 4$ lần. Do $R \\propto \\frac{1}{S}$, điện trở giảm 4 lần.',
    hints: [
      'Công thức tính diện tích hình tròn theo đường kính $d$ là gì?',
      '$S = \\pi \\frac{d^2}{4}$, diện tích tỉ lệ với bình phương đường kính.',
      'd tăng 2 lần thì S tăng 4 lần $\\implies$ R giảm 4 lần.'
    ],
    score: 10,
    estimatedTime: 35
  },
  {
    id: 'q_th_15',
    topic: 'Ứng dụng',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Khi dịch chuyển con chạy của biến trở làm tăng chiều dài của phần cuộn dây có dòng điện chạy qua, độ sáng của đèn trong mạch sẽ:',
    options: [
      'Tối dần đi (giảm độ sáng)',
      'Sáng rực lên (tăng độ sáng)',
      'Không thay đổi',
      'Chớp nháy liên tục'
    ],
    correctAnswer: 'Tối dần đi (giảm độ sáng)',
    explanation: 'Chiều dài cuộn dây tham gia mạch tăng $\\implies$ điện trở của biến trở tăng $\\implies$ điện trở toàn mạch tăng $\\implies$ cường độ dòng điện giảm $\\implies$ bóng đèn tối dần.',
    hints: [
      'Chiều dài dây tăng thì điện trở biến trở tăng hay giảm?',
      'Điện trở tăng cản trở dòng điện nhiều hơn.',
      'Dòng điện qua đèn giảm nên đèn tối dần.'
    ],
    score: 10,
    estimatedTime: 30
  },
  {
    id: 'q_th_16',
    topic: 'Định luật Ohm',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Cho hai điện trở $R_1 = 10\\,\\Omega$ và $R_2 = 20\\,\\Omega$ mắc vào cùng một hiệu điện thế $U$. Gọi $I_1, I_2$ lần lượt là dòng điện qua $R_1, R_2$. Tỉ số $\\frac{I_1}{I_2}$ bằng:',
    options: ['2', '0,5', '1', '4'],
    correctAnswer: '2',
    explanation: 'Cùng hiệu điện thế $U$: $I_1 = \\frac{U}{R_1}$ và $I_2 = \\frac{U}{R_2} \\implies \\frac{I_1}{I_2} = \\frac{R_2}{R_1} = \\frac{20}{10} = 2$.',
    hints: [
      'Vì U giống nhau, dòng điện tỉ lệ nghịch với điện trở.',
      '$\\frac{I_1}{I_2} = \\frac{R_2}{R_1}$.',
      'Thay số: $20 / 10 = 2$.'
    ],
    score: 10,
    estimatedTime: 30
  },
  {
    id: 'q_th_17',
    topic: 'Mạch điện',
    difficulty: 'thong_hieu',
    type: 'true_false',
    question: 'Nếu vô tình mắc nhầm ampe kế song song với nguồn điện thì sẽ gây ra hiện tượng đoản mạch làm cháy hỏng ampe kế hoặc hỏng nguồn.',
    options: ['Đúng', 'Sai'],
    correctAnswer: 'Đúng',
    explanation: 'Ampe kế có điện trở cực nhỏ. Nếu mắc song song với nguồn điện, dòng điện qua ampe kế sẽ cực lớn ($I = \\frac{U}{R_A} \\rightarrow \\infty$), gây đoản mạch và chập cháy.',
    hints: [
      'Ampe kế có điện trở rất nhỏ.',
      'Mắc trực tiếp vào hai cực nguồn điện tạo thành đường dẫn không có điện trở cản trở.',
      'Dòng điện tăng vọt gây đoản mạch chập cháy: Đúng.'
    ],
    score: 10,
    estimatedTime: 25
  },
  {
    id: 'q_th_18',
    topic: 'Dây dẫn',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Ý nghĩa của con số điện trở suất của đồng $\\rho = 1{,}7 \\times 10^{-8}\\,\\Omega \\cdot m$ là:',
    options: [
      'Một dây đồng hình trụ dài 1 m, tiết diện 1 m² có điện trở là 1,7 × 10⁻⁸ Ω',
      'Một dây đồng dài 1 m có điện trở là 1,7 × 10⁻⁸ Ω',
      'Một dây đồng nặng 1 kg có điện trở là 1,7 × 10⁻⁸ Ω',
      'Điện trở của đồng luôn không đổi bằng 1,7 × 10⁻⁸ Ω'
    ],
    correctAnswer: 'Một dây đồng hình trụ dài 1 m, tiết diện 1 m² có điện trở là 1,7 × 10⁻⁸ Ω',
    explanation: 'Điện trở suất của một chất bằng điện trở của một đoạn dây hình trụ làm bằng chất đó có chiều dài $1\\,\\text{m}$ và tiết diện $1\\,\\text{m}^2$.',
    hints: [
      'Xét công thức $R = \\rho \\frac{l}{S}$.',
      'Nếu chọn $l = 1\\,\\text{m}$ và $S = 1\\,\\text{m}^2$ thì $R = \\rho$.',
      'Đó là điện trở của khối dây dài 1m, tiết diện 1m².'
    ],
    score: 10,
    estimatedTime: 30
  },
  {
    id: 'q_th_19',
    topic: 'Điện trở',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Khi nhiệt độ của một dây kim loại tăng lên thì điện trở của nó thông thường sẽ:',
    options: [
      'Tăng lên',
      'Giảm đi',
      'Không thay đổi',
      'Bằng 0'
    ],
    correctAnswer: 'Tăng lên',
    explanation: 'Khi nhiệt độ tăng, các ion ở nút mạng tinh thể dao động mạnh hơn, cản trở chuyển động có hướng của các electron nhiều hơn, làm điện trở tăng.',
    hints: [
      'Nhiệt độ cao làm các hạt ion chuyển động nhiệt nhanh và hỗn loạn hơn.',
      'Sự va chạm với các electron chuyển động có hướng tăng lên.',
      'Do đó điện trở của kim loại tăng lên khi nóng.'
    ],
    score: 10,
    estimatedTime: 25
  },
  {
    id: 'q_th_20',
    topic: 'Định luật Ohm',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Một bóng đèn khi sáng bình thường có hiệu điện thế định mức $220\\,\\text{V}$ và cường độ dòng điện định mức $0{,}5\\,\\text{A}$. Điện trở của đèn khi đó là:',
    options: ['$440\\,\\Omega$', '$110\\,\\Omega$', '$220\\,\\Omega$', '$880\\,\\Omega$'],
    correctAnswer: '$440\\,\\Omega$',
    explanation: 'Áp dụng định luật Ohm: $R = \\frac{U}{I} = \\frac{220}{0{,}5} = 440\\,\\Omega$.',
    hints: [
      'Dùng công thức $R = \\frac{U}{I}$.',
      'Thay số $U = 220\\,\\text{V}, I = 0{,}5\\,\\text{A}$.',
      '$220 / 0{,}5 = 440\\,\\Omega$.'
    ],
    score: 10,
    estimatedTime: 25
  },
  {
    id: 'q_th_21',
    topic: 'U và I',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Hiệu điện thế giữa hai đầu dây dẫn giảm từ $18\\,\\text{V}$ xuống còn $6\\,\\text{V}$. Cường độ dòng điện qua dây dẫn sẽ:',
    options: [
      'Giảm 3 lần',
      'Giảm 2 lần',
      'Tăng 3 lần',
      'Không đổi'
    ],
    correctAnswer: 'Giảm 3 lần',
    explanation: 'Hiệu điện thế giảm $\\frac{18}{6} = 3$ lần, vì $I$ tỉ lệ thuận với $U$ nên $I$ cũng giảm 3 lần.',
    hints: [
      'Tỉ số hiệu điện thế: $18 / 6 = 3$.',
      'Hiệu điện thế giảm 3 lần.',
      'Dòng điện tỉ lệ thuận nên cũng giảm 3 lần.'
    ],
    score: 10,
    estimatedTime: 20
  },
  {
    id: 'q_th_22',
    topic: 'Dây dẫn',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Dây dẫn thứ nhất bằng đồng dài $10\\,\\text{m}$, dây thứ hai cũng bằng đồng dài $20\\,\\text{m}$. Cả hai có cùng tiết diện. Nhận xét nào đúng?',
    options: [
      'Dây 2 có khả năng cản trở dòng điện gấp đôi dây 1',
      'Dây 1 có khả năng cản trở dòng điện gấp đôi dây 2',
      'Khả năng cản trở dòng điện của hai dây là như nhau',
      'Dây 2 dẫn điện tốt hơn dây 1'
    ],
    correctAnswer: 'Dây 2 có khả năng cản trở dòng điện gấp đôi dây 1',
    explanation: 'Vì cùng vật liệu và tiết diện, $R \\propto l$. Dây 2 dài gấp 2 lần dây 1 nên $R_2 = 2 R_1$, tức khả năng cản trở dòng điện gấp đôi.',
    hints: [
      'Khả năng cản trở dòng điện chính là điện trở.',
      'Dây dài gấp đôi thì điện trở gấp đôi.',
      'Dây 2 cản trở dòng điện gấp đôi dây 1.'
    ],
    score: 10,
    estimatedTime: 25
  },
  {
    id: 'q_th_23',
    topic: 'Dây dẫn',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Để giảm điện trở của một dây dẫn điện dài mà không thay đổi chiều dài và vật liệu làm dây, người ta phải:',
    options: [
      'Tăng tiết diện của dây (dùng dây to hơn)',
      'Giảm tiết diện của dây (dùng dây mảnh hơn)',
      'Gấp đôi dây lại theo chiều dài',
      'Bọc thêm nhiều lớp cách điện'
    ],
    correctAnswer: 'Tăng tiết diện của dây (dùng dây to hơn)',
    explanation: 'Theo công thức $R = \\rho \\frac{l}{S}$, để giảm $R$ khi $l$ và $\\rho$ không đổi thì mẫu số $S$ (tiết diện) phải tăng lên.',
    hints: [
      'Nhìn vào công thức $R = \\rho \\frac{l}{S}$.',
      'S nằm ở mẫu số.',
      'Muốn phân số nhỏ đi thì mẫu số S phải to lên.'
    ],
    score: 10,
    estimatedTime: 25
  },
  {
    id: 'q_th_24',
    topic: 'Đơn vị',
    difficulty: 'thong_hieu',
    type: 'fill_blank',
    question: 'Đổi đơn vị: $500\\,\\text{mA} =$ [ ... ] $\\text{A}$.',
    correctAnswer: '0.5',
    acceptableAnswers: ['0.5', '0,5', '1/2'],
    explanation: '$1\\,\\text{A} = 1000\\,\\text{mA} \\implies 500\\,\\text{mA} = \\frac{500}{1000} = 0{,}5\\,\\text{A}$.',
    hints: [
      'Tiền tố mili (m) nghĩa là một phần nghìn ($10^{-3}$).',
      'Chia 500 cho 1000.',
      'Kết quả là 0.5 (hoặc 0,5).'
    ],
    score: 10,
    estimatedTime: 20
  },
  {
    id: 'q_th_25',
    topic: 'Đơn vị',
    difficulty: 'thong_hieu',
    type: 'fill_blank',
    question: 'Đổi đơn vị diện tích: $1\\,\\text{mm}^2 =$ [ ... ] $\\text{m}^2$ (viết dưới dạng số thập phân có 6 chữ số sau dấu phẩy: 0.000001).',
    correctAnswer: '0.000001',
    acceptableAnswers: ['0.000001', '0,000001', '10^-6'],
    explanation: '$1\\,\\text{m} = 1000\\,\\text{mm} \\implies 1\\,\\text{m}^2 = (1000)^2\\,\\text{mm}^2 = 1\\,000\\,000\\,\\text{mm}^2 \\implies 1\\,\\text{mm}^2 = 10^{-6}\\,\\text{m}^2 = 0{,}000001\\,\\text{m}^2$.',
    hints: [
      '$1\\,\\text{mm} = 10^{-3}\\,\\text{m}$.',
      '$1\\,\\text{mm}^2 = (10^{-3})^2 = 10^{-6}\\,\\text{m}^2$.',
      'Dưới dạng số thập phân là 0.000001.'
    ],
    score: 10,
    estimatedTime: 25
  },
  {
    id: 'q_th_26',
    topic: 'Mạch điện',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Trên một biến trở con chạy có ghi $50\\,\\Omega - 2\\,\\text{A}$. Con số $2\\,\\text{A}$ có ý nghĩa gì?',
    options: [
      'Cường độ dòng điện lớn nhất mà biến trở chịu được để không bị cháy hỏng',
      'Cường độ dòng điện nhỏ nhất để biến trở hoạt động',
      'Cường độ dòng điện luôn luôn bằng 2A',
      'Dòng điện khi điện trở bằng 50 Ω'
    ],
    correctAnswer: 'Cường độ dòng điện lớn nhất mà biến trở chịu được để không bị cháy hỏng',
    explanation: '$2\\,\\text{A}$ là cường độ dòng điện định mức tối đa cho phép chạy qua cuộn dây của biến trở.',
    hints: [
      'Đây là thông số kỹ thuật định mức.',
      'Nếu cho dòng điện lớn hơn 2A qua biến trở, nhiệt lượng quá lớn sẽ làm cháy lớp cách điện.',
      'Ý nghĩa là cường độ dòng điện lớn nhất cho phép chạy qua.'
    ],
    score: 10,
    estimatedTime: 30
  },
  {
    id: 'q_th_27',
    topic: 'Đồ thị I-U',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Từ đồ thị $I - U$ của một dây dẫn, tại điểm $U = 12\\,\\text{V}$ ta gióng sang trục $I$ thấy giá trị $I = 2\\,\\text{A}$. Điện trở của dây dẫn đó là:',
    options: ['$6\\,\\Omega$', '$24\\,\\Omega$', '$0{,}167\\,\\Omega$', '$10\\,\\Omega$'],
    correctAnswer: '$6\\,\\Omega$',
    explanation: '$R = \\frac{U}{I} = \\frac{12}{2} = 6\\,\\Omega$.',
    hints: [
      'Tọa độ điểm trên đồ thị cho ta cặp giá trị $U = 12\\,\\text{V}$ và $I = 2\\,\\text{A}$.',
      'Áp dụng công thức $R = \\frac{U}{I}$.',
      '$12 / 2 = 6\\,\\Omega$.'
    ],
    score: 10,
    estimatedTime: 25
  },
  {
    id: 'q_th_28',
    topic: 'Dây dẫn',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Nếu ta gập đôi một sợi dây dẫn đồng chất rồi xoắn lại thành một sợi dây mới, điện trở của sợi dây mới so với sợi dây ban đầu sẽ:',
    options: [
      'Giảm đi 4 lần',
      'Giảm đi 2 lần',
      'Tăng lên 2 lần',
      'Không thay đổi'
    ],
    correctAnswer: 'Giảm đi 4 lần',
    explanation: 'Gập đôi làm chiều dài giảm 2 lần ($l\' = l/2$) và tiết diện tăng gấp đôi ($S\' = 2S$). $R\' = \\rho \\frac{l/2}{2S} = \\frac{1}{4} \\rho \\frac{l}{S} = \\frac{R}{4}$.',
    hints: [
      'Gập đôi thì chiều dài thay đổi thế nào? Giảm 2 lần.',
      'Hai sợi xoắn lại thì tiết diện tăng thế nào? Tăng 2 lần.',
      'Chiều dài giảm 2 lần và tiết diện tăng 2 lần $\\implies$ điện trở giảm $2 \\times 2 = 4$ lần.'
    ],
    score: 10,
    estimatedTime: 35
  },
  {
    id: 'q_th_29',
    topic: 'Điện trở',
    difficulty: 'thong_hieu',
    type: 'true_false',
    question: 'Dòng điện chạy qua dây dẫn sinh ra nhiệt do sự va chạm giữa các electron tự do với các ion kim loại.',
    options: ['Đúng', 'Sai'],
    correctAnswer: 'Đúng',
    explanation: 'Sự va chạm này chính là nguồn gốc vật lí của điện trở và tác dụng nhiệt của dòng điện.',
    hints: [
      'Hiện tượng tỏa nhiệt Jun-Lenxơ trong dây dẫn.',
      'Các electron truyền động năng cho các ion ở nút mạng.',
      'Phát biểu này là Đúng.'
    ],
    score: 10,
    estimatedTime: 20
  },
  {
    id: 'q_th_30',
    topic: 'Định luật Ohm',
    difficulty: 'thong_hieu',
    type: 'multiple_choice',
    question: 'Trong mạch điện thắp sáng, khi ta tăng hiệu điện thế của nguồn cấp thì:',
    options: [
      'Dòng điện qua bóng đèn tăng lên',
      'Điện trở của bóng đèn giảm về 0',
      'Dòng điện qua bóng đèn giảm đi',
      'Hiệu điện thế hai đầu bóng đèn giảm'
    ],
    correctAnswer: 'Dòng điện qua bóng đèn tăng lên',
    explanation: 'Theo định luật Ohm, khi $U$ tăng thì $I$ tăng theo ($I = \\frac{U}{R}$).',
    hints: [
      'Nguồn điện cấp hiệu điện thế cao hơn.',
      'Cường độ dòng điện tỉ lệ thuận với hiệu điện thế.',
      'Dòng điện qua bóng đèn tăng lên.'
    ],
    score: 10,
    estimatedTime: 20
  },

  // ==================== TÍNH TOÁN (30 CÂU) ====================
  {
    id: 'q_tt_01',
    topic: 'Định luật Ohm',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Đặt hiệu điện thế $U = 24\\,\\text{V}$ vào hai đầu điện trở $R = 12\\,\\Omega$. Tính cường độ dòng điện $I$ (đơn vị Ampe) chạy qua điện trở.',
    correctAnswer: 2,
    acceptableAnswers: ['2', '2.0', '2,0'],
    unit: 'A',
    explanation: '$I = \\frac{U}{R} = \\frac{24}{12} = 2\\,\\text{A}$.',
    hints: [
      'Em cần tìm đại lượng I.',
      'Công thức liên hệ I, U, R là gì? $I = \\frac{U}{R}$.',
      'Thay số: $I = \\frac{24}{12} = 2\\,\\text{A}$.'
    ],
    score: 10,
    estimatedTime: 30
  },
  {
    id: 'q_tt_02',
    topic: 'Định luật Ohm',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Cường độ dòng điện qua một điện trở là $I = 1{,}5\\,\\text{A}$ khi hiệu điện thế là $U = 45\\,\\text{V}$. Trị số điện trở $R$ (đơn vị $\\Omega$) là:',
    correctAnswer: 30,
    acceptableAnswers: ['30', '30.0', '30,0'],
    unit: 'Ω',
    explanation: '$R = \\frac{U}{I} = \\frac{45}{1{,}5} = 30\\,\\Omega$.',
    hints: [
      'Em cần tìm đại lượng R.',
      'Công thức tính R từ định luật Ohm: $R = \\frac{U}{I}$.',
      'Thay số: $45 / 1{,}5 = 30\\,\\Omega$.'
    ],
    score: 10,
    estimatedTime: 30
  },
  {
    id: 'q_tt_03',
    topic: 'Định luật Ohm',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Một bếp điện có điện trở $R = 55\\,\\Omega$, dòng điện chạy qua bếp là $I = 4\\,\\text{A}$. Hiệu điện thế $U$ (đơn vị Vôn) đặt vào bếp là:',
    correctAnswer: 220,
    acceptableAnswers: ['220', '220.0'],
    unit: 'V',
    explanation: '$U = I \\cdot R = 4 \\times 55 = 220\\,\\text{V}$.',
    hints: [
      'Em cần tìm hiệu điện thế U.',
      'Công thức liên hệ là $U = I \\cdot R$.',
      'Thay số: $4 \\times 55 = 220\\,\\text{V}$.'
    ],
    score: 10,
    estimatedTime: 30
  },
  {
    id: 'q_tt_04',
    topic: 'U và I',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Khi đặt hiệu điện thế $12\\,\\text{V}$ vào hai đầu dây dẫn thì dòng điện qua dây là $0{,}4\\,\\text{A}$. Nếu tăng hiệu điện thế lên $36\\,\\text{V}$ thì dòng điện qua dây là bao nhiêu Ampe?',
    correctAnswer: 1.2,
    acceptableAnswers: ['1.2', '1,2'],
    unit: 'A',
    explanation: '$\\frac{U_1}{U_2} = \\frac{I_1}{I_2} \\implies I_2 = I_1 \\frac{U_2}{U_1} = 0{,}4 \\times \\frac{36}{12} = 0{,}4 \\times 3 = 1{,}2\\,\\text{A}$.',
    hints: [
      'Hiệu điện thế tăng từ 12V lên 36V là tăng gấp mấy lần?',
      'Tăng gấp 3 lần ($36 / 12 = 3$).',
      'Vì I tỉ lệ thuận với U, dòng điện cũng tăng 3 lần: $0{,}4 \\times 3 = 1{,}2\\,\\text{A}$.'
    ],
    score: 10,
    estimatedTime: 35
  },
  {
    id: 'q_tt_05',
    topic: 'U và I',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Một dây dẫn có dòng điện $0{,}8\\,\\text{A}$ chạy qua khi hiệu điện thế là $20\\,\\text{V}$. Muốn dòng điện giảm bớt $0{,}2\\,\\text{A}$ (còn $0{,}6\\,\\text{A}$) thì hiệu điện thế đặt vào phải là bao nhiêu Vôn?',
    correctAnswer: 15,
    acceptableAnswers: ['15', '15.0', '15,0'],
    unit: 'V',
    explanation: '$R = \\frac{U_1}{I_1} = \\frac{20}{0{,}8} = 25\\,\\Omega$. Khi dòng điện còn $0{,}6\\,\\text{A}$ thì $U_2 = I_2 \\cdot R = 0{,}6 \\times 25 = 15\\,\\text{V}$.',
    hints: [
      'Tính điện trở của dây trước: $R = 20 / 0{,}8 = 25\\,\\Omega$.',
      'Dòng điện mới là $I_2 = 0{,}8 - 0{,}2 = 0{,}6\\,\\text{A}$.',
      'Hiệu điện thế mới: $U_2 = 0{,}6 \\times 25 = 15\\,\\text{V}$.'
    ],
    score: 10,
    estimatedTime: 40
  },
  {
    id: 'q_tt_06',
    topic: 'Dây dẫn',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Một cuộn dây đồng có điện trở suất $\\rho = 1{,}7 \\times 10^{-8}\\,\\Omega \\cdot m$, chiều dài $l = 100\\,\\text{m}$, tiết diện $S = 1\\,\\text{mm}^2 = 10^{-6}\\,\\text{m}^2$. Điện trở của cuộn dây là bao nhiêu $\\Omega$?',
    correctAnswer: 1.7,
    acceptableAnswers: ['1.7', '1,7'],
    unit: 'Ω',
    explanation: '$R = \\rho \\frac{l}{S} = 1{,}7 \\times 10^{-8} \\times \\frac{100}{10^{-6}} = 1{,}7\\,\\Omega$.',
    hints: [
      'Áp dụng công thức $R = \\rho \\frac{l}{S}$.',
      'Chú ý tiết diện đã đổi ra mét vuông: $S = 10^{-6}\\,\\text{m}^2$.',
      '$R = 1{,}7 \\times 10^{-8} \\times \\frac{100}{10^{-6}} = 1{,}7\\,\\Omega$.'
    ],
    score: 10,
    estimatedTime: 45
  },
  {
    id: 'q_tt_07',
    topic: 'Dây dẫn',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Một dây nhôm có điện trở $R = 5{,}6\\,\\Omega$, điện trở suất $\\rho = 2{,}8 \\times 10^{-8}\\,\\Omega \\cdot m$, tiết diện $S = 0{,}5\\,\\text{mm}^2 = 0{,}5 \\times 10^{-6}\\,\\text{m}^2$. Tính chiều dài $l$ (đơn vị mét) của dây.',
    correctAnswer: 100,
    acceptableAnswers: ['100', '100.0'],
    unit: 'm',
    explanation: 'Từ $R = \\rho \\frac{l}{S} \\implies l = \\frac{R \\cdot S}{\\rho} = \\frac{5{,}6 \\times 0{,}5 \\times 10^{-6}}{2{,}8 \\times 10^{-8}} = 100\\,\\text{m}$.',
    hints: [
      'Biến đổi công thức tính chiều dài: $l = \\frac{R \\cdot S}{\\rho}$.',
      'Thay số: $R = 5{,}6$, $S = 0{,}5 \\times 10^{-6}$, $\\rho = 2{,}8 \\times 10^{-8}$.',
      'Tính ra $l = 100\\,\\text{m}$.'
    ],
    score: 10,
    estimatedTime: 45
  },
  {
    id: 'q_tt_08',
    topic: 'Dây dẫn',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Một dây dẫn bằng nicrom có chiều dài $l = 20\\,\\text{m}$, điện trở $R = 44\\,\\Omega$, điện trở suất $\\rho = 1{,}1 \\times 10^{-6}\\,\\Omega \\cdot m$. Tính tiết diện $S$ của dây theo đơn vị $\\text{mm}^2$.',
    correctAnswer: 0.5,
    acceptableAnswers: ['0.5', '0,5', '1/2'],
    unit: 'mm²',
    explanation: '$S = \\frac{\\rho \\cdot l}{R} = \\frac{1{,}1 \\times 10^{-6} \\times 20}{44} = 0{,}5 \\times 10^{-6}\\,\\text{m}^2 = 0{,}5\\,\\text{mm}^2$.',
    hints: [
      'Từ $R = \\rho \\frac{l}{S} \\implies S = \\frac{\\rho \\cdot l}{R}$.',
      '$S = \\frac{1{,}1 \\times 10^{-6} \\times 20}{44} = 0{,}5 \\times 10^{-6}\\,\\text{m}^2$.',
      'Đổi sang $mm^2$: $0{,}5 \\times 10^{-6}\\,\\text{m}^2 = 0{,}5\\,\\text{mm}^2$.'
    ],
    score: 10,
    estimatedTime: 45
  },
  {
    id: 'q_tt_09',
    topic: 'Định luật Ohm',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Đặt vào hai đầu một điện trở $R = 250\\,\\Omega$ hiệu điện thế $U = 50\\,\\text{V}$. Tính cường độ dòng điện theo đơn vị miliampe (mA).',
    correctAnswer: 200,
    acceptableAnswers: ['200', '200.0'],
    unit: 'mA',
    explanation: '$I = \\frac{U}{R} = \\frac{50}{250} = 0{,}2\\,\\text{A} = 200\\,\\text{mA}$.',
    hints: [
      'Tính cường độ dòng điện theo Ampe: $I = \\frac{U}{R} = \\frac{50}{250} = 0{,}2\\,\\text{A}$.',
      'Quy đổi từ Ampe sang miliampe: nhân với 1000.',
      '$0{,}2 \\times 1000 = 200\\,\\text{mA}$.'
    ],
    score: 10,
    estimatedTime: 30
  },
  {
    id: 'q_tt_10',
    topic: 'Định luật Ohm',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Một bóng đèn LED chịu được dòng điện tối đa $I = 20\\,\\text{mA} = 0{,}02\\,\\text{A}$. Khi mắc đèn vào nguồn điện $U = 3\\,\\text{V}$, điện trở tối thiểu của bóng đèn là bao nhiêu $\\Omega$?',
    correctAnswer: 150,
    acceptableAnswers: ['150', '150.0'],
    unit: 'Ω',
    explanation: '$R = \\frac{U}{I} = \\frac{3}{0{,}02} = 150\\,\\Omega$.',
    hints: [
      'Nhớ đổi 20mA sang Ampe: $20 / 1000 = 0{,}02\\,\\text{A}$.',
      'Công thức $R = \\frac{U}{I} = \\frac{3}{0{,}02}$.',
      '$3 / 0{,}02 = 150\\,\\Omega$.'
    ],
    score: 10,
    estimatedTime: 35
  },
  {
    id: 'q_tt_11',
    topic: 'Dây dẫn',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Hai dây đồng cùng chiều dài, dây thứ nhất có tiết diện $2\\,\\text{mm}^2$ và điện trở $10\\,\\Omega$. Dây thứ hai có tiết diện $5\\,\\text{mm}^2$ thì có điện trở là bao nhiêu $\\Omega$?',
    correctAnswer: 4,
    acceptableAnswers: ['4', '4.0', '4,0'],
    unit: 'Ω',
    explanation: 'Vì điện trở tỉ lệ nghịch với tiết diện: $\\frac{R_2}{R_1} = \\frac{S_1}{S_2} \\implies R_2 = R_1 \\times \\frac{S_1}{S_2} = 10 \\times \\frac{2}{5} = 4\\,\\Omega$.',
    hints: [
      'Điện trở tỉ lệ nghịch với tiết diện: $\\frac{R_2}{R_1} = \\frac{S_1}{S_2}$.',
      'Thay số: $R_2 = 10 \\times \\frac{2}{5}$.',
      '$R_2 = 4\\,\\Omega$.'
    ],
    score: 10,
    estimatedTime: 35
  },
  {
    id: 'q_tt_12',
    topic: 'Dây dẫn',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Hai dây nhôm có cùng tiết diện, dây 1 dài $40\\,\\text{m}$ có điện trở $6\\,\\Omega$. Dây 2 có chiều dài $120\\,\\text{m}$ thì có điện trở bao nhiêu $\\Omega$?',
    correctAnswer: 18,
    acceptableAnswers: ['18', '18.0'],
    unit: 'Ω',
    explanation: 'Điện trở tỉ lệ thuận với chiều dài: $\\frac{R_2}{R_1} = \\frac{l_2}{l_1} \\implies R_2 = 6 \\times \\frac{120}{40} = 6 \\times 3 = 18\\,\\Omega$.',
    hints: [
      'Chiều dài tăng từ 40m lên 120m (tăng gấp 3 lần).',
      'Điện trở tỉ lệ thuận với chiều dài.',
      '$6 \\times 3 = 18\\,\\Omega$.'
    ],
    score: 10,
    estimatedTime: 30
  },
  {
    id: 'q_tt_13',
    topic: 'Định luật Ohm',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Đặt vào hai đầu một điện trở $R = 80\\,\\Omega$ một hiệu điện thế $U = 20\\,\\text{V}$. Cường độ dòng điện qua điện trở là bao nhiêu Ampe?',
    correctAnswer: 0.25,
    acceptableAnswers: ['0.25', '0,25', '1/4'],
    unit: 'A',
    explanation: '$I = \\frac{U}{R} = \\frac{20}{80} = 0{,}25\\,\\text{A}$.',
    hints: [
      'Công thức định luật Ohm: $I = \\frac{U}{R}$.',
      'Thay $U = 20$, $R = 80$.',
      '$20 / 80 = 0{,}25\\,\\text{A}$.'
    ],
    score: 10,
    estimatedTime: 25
  },
  {
    id: 'q_tt_14',
    topic: 'U và I',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Một dây dẫn khi mắc vào hiệu điện thế $9\\,\\text{V}$ thì có dòng điện $0{,}3\\,\\text{A}$ chạy qua. Muốn dòng điện qua dây tăng thêm $0{,}2\\,\\text{A}$ (đạt $0{,}5\\,\\text{A}$) thì phải tăng hiệu điện thế lên thành bao nhiêu Vôn?',
    correctAnswer: 15,
    acceptableAnswers: ['15', '15.0'],
    unit: 'V',
    explanation: '$R = \\frac{9}{0{,}3} = 30\\,\\Omega$. Để dòng điện đạt $I\' = 0{,}5\\,\\text{A}$ thì $U\' = I\' \\cdot R = 0{,}5 \\times 30 = 15\\,\\text{V}$.',
    hints: [
      'Tìm điện trở trước: $R = 9 / 0{,}3 = 30\\,\\Omega$.',
      'Dòng điện mới là $0{,}3 + 0{,}2 = 0{,}5\\,\\text{A}$.',
      'Hiệu điện thế mới: $U\' = 0{,}5 \\times 30 = 15\\,\\text{V}$.'
    ],
    score: 10,
    estimatedTime: 35
  },
  {
    id: 'q_tt_15',
    topic: 'Dây dẫn',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Một dây dẫn bằng constantan có điện trở suất $\\rho = 0{,}5 \\times 10^{-6}\\,\\Omega \\cdot m$, chiều dài $l = 10\\,\\text{m}$, tiết diện $S = 0{,}25\\,\\text{mm}^2 = 0{,}25 \\times 10^{-6}\\,\\text{m}^2$. Điện trở $R$ của dây là bao nhiêu $\\Omega$?',
    correctAnswer: 20,
    acceptableAnswers: ['20', '20.0'],
    unit: 'Ω',
    explanation: '$R = \\rho \\frac{l}{S} = 0{,}5 \\times 10^{-6} \\times \\frac{10}{0{,}25 \\times 10^{-6}} = 20\\,\\Omega$.',
    hints: [
      'Công thức $R = \\rho \\frac{l}{S}$.',
      'Đại lượng $10^{-6}$ ở tử và mẫu triệt tiêu nhau.',
      'Ta có: $0{,}5 \\times 10 / 0{,}25 = 20\\,\\Omega$.'
    ],
    score: 10,
    estimatedTime: 35
  },
  {
    id: 'q_tt_16',
    topic: 'Định luật Ohm',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Một biến trở có điện trở lớn nhất là $R_{\\text{max}} = 100\\,\\Omega$. Mắc biến trở vào hiệu điện thế $U = 12\\,\\text{V}$. Cường độ dòng điện nhỏ nhất trong mạch là bao nhiêu Ampe?',
    correctAnswer: 0.12,
    acceptableAnswers: ['0.12', '0,12'],
    unit: 'A',
    explanation: 'Dòng điện nhỏ nhất khi điện trở lớn nhất: $I_{\\text{min}} = \\frac{U}{R_{\\text{max}}} = \\frac{12}{100} = 0{,}12\\,\\text{A}$.',
    hints: [
      'Dòng điện I tỉ lệ nghịch với R, nên $I_{\\text{min}}$ ứng với $R_{\\text{max}}$.',
      'Tính: $I_{\\text{min}} = \\frac{U}{R_{\\text{max}}}$.',
      '$12 / 100 = 0{,}12\\,\\text{A}$.'
    ],
    score: 10,
    estimatedTime: 30
  },
  {
    id: 'q_tt_17',
    topic: 'Định luật Ohm',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Khi hiệu điện thế giữa hai đầu dây dẫn là $30\\,\\text{V}$ thì cường độ dòng điện là $2\\,\\text{A}$. Nếu giảm hiệu điện thế đi $15\\,\\text{V}$ thì cường độ dòng điện còn lại là bao nhiêu Ampe?',
    correctAnswer: 1,
    acceptableAnswers: ['1', '1.0', '1,0'],
    unit: 'A',
    explanation: 'Hiệu điện thế giảm đi 15V còn lại $30 - 15 = 15\\,\\text{V}$ (giảm một nửa). Do đó cường độ dòng điện cũng giảm một nửa: $2 / 2 = 1\\,\\text{A}$.',
    hints: [
      'Hiệu điện thế lúc sau là $30 - 15 = 15\\,\\text{V}$.',
      'So sánh với lúc đầu: giảm 2 lần ($30 / 15 = 2$).',
      'Cường độ dòng điện lúc sau là $2 / 2 = 1\\,\\text{A}$.'
    ],
    score: 10,
    estimatedTime: 30
  },
  {
    id: 'q_tt_18',
    topic: 'Dây dẫn',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Dây dẫn bằng đồng dài $200\\,\\text{m}$, điện trở suất $\\rho = 1{,}7 \\times 10^{-8}\\,\\Omega \\cdot m$, điện trở đo được là $3{,}4\\,\\Omega$. Tiết diện dây dẫn là bao nhiêu $\\text{mm}^2$?',
    correctAnswer: 1,
    acceptableAnswers: ['1', '1.0', '1,0'],
    unit: 'mm²',
    explanation: '$S = \\frac{\\rho \\cdot l}{R} = \\frac{1{,}7 \\times 10^{-8} \\times 200}{3{,}4} = 10^{-6}\\,\\text{m}^2 = 1\\,\\text{mm}^2$.',
    hints: [
      'Công thức $S = \\frac{\\rho \\cdot l}{R}$.',
      '$S = \\frac{1{,}7 \\times 10^{-8} \\times 200}{3{,}4} = 10^{-6}\\,\\text{m}^2$.',
      'Đổi $10^{-6}\\,\\text{m}^2 = 1\\,\\text{mm}^2$.'
    ],
    score: 10,
    estimatedTime: 40
  },
  {
    id: 'q_tt_19',
    topic: 'Định luật Ohm',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Một vôn kế có điện trở $R_V = 20\\,\\text{k}\\Omega = 20\\,000\\,\\Omega$. Khi vôn kế chỉ $100\\,\\text{V}$, dòng điện chạy qua vôn kế là bao nhiêu miliampe (mA)?',
    correctAnswer: 5,
    acceptableAnswers: ['5', '5.0', '5,0'],
    unit: 'mA',
    explanation: '$I = \\frac{U}{R_V} = \\frac{100}{20\\,000} = 0{,}005\\,\\text{A} = 5\\,\\text{mA}$.',
    hints: [
      'Đổi $20\\,\\text{k}\\Omega = 20\\,000\\,\\Omega$.',
      'Tính I theo Ampe: $100 / 20\\,000 = 0{,}005\\,\\text{A}$.',
      'Đổi ra mA: $0{,}005 \\times 1000 = 5\\,\\text{mA}$.'
    ],
    score: 10,
    estimatedTime: 35
  },
  {
    id: 'q_tt_20',
    topic: 'Định luật Ohm',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Đặt một hiệu điện thế $U = 6\\,\\text{V}$ vào hai đầu dây dẫn. Dòng điện qua dây là $0{,}15\\,\\text{A}$. Điện trở của dây là bao nhiêu $\\Omega$?',
    correctAnswer: 40,
    acceptableAnswers: ['40', '40.0'],
    unit: 'Ω',
    explanation: '$R = \\frac{U}{I} = \\frac{6}{0{,}15} = 40\\,\\Omega$.',
    hints: [
      'Công thức tính điện trở: $R = \\frac{U}{I}$.',
      'Lấy 6 chia cho 0,15.',
      '$6 / 0{,}15 = 40\\,\\Omega$.'
    ],
    score: 10,
    estimatedTime: 25
  },
  {
    id: 'q_tt_21',
    topic: 'Định luật Ohm',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Một ampe kế có điện trở nhỏ $R_A = 0{,}1\\,\\Omega$. Khi dòng điện trong mạch là $5\\,\\text{A}$, hiệu điện thế giữa hai chốt của ampe kế là bao nhiêu Vôn?',
    correctAnswer: 0.5,
    acceptableAnswers: ['0.5', '0,5'],
    unit: 'V',
    explanation: '$U_A = I \\cdot R_A = 5 \\times 0{,}1 = 0{,}5\\,\\text{V}$.',
    hints: [
      'Áp dụng định luật Ohm cho ampe kế: $U_A = I \\cdot R_A$.',
      'Thay số: $5 \\times 0{,}1$.',
      '$U_A = 0{,}5\\,\\text{V}$.'
    ],
    score: 10,
    estimatedTime: 25
  },
  {
    id: 'q_tt_22',
    topic: 'Dây dẫn',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Một sợi dây tóc bóng đèn làm bằng vonfram có điện trở $24\\,\\Omega$ ở nhiệt độ phòng. Chiều dài dây tóc là $0{,}4\\,\\text{m}$, điện trở suất $\\rho = 5{,}5 \\times 10^{-8}\\,\\Omega \\cdot m$. Tiết diện của dây tóc bóng đèn là bao nhiêu phần triệu mét vuông ($10^{-6}\\,\\text{m}^2$) làm tròn 3 chữ số thập phân?',
    correctAnswer: 0.917,
    acceptableAnswers: ['0.917', '0,917', '0.92', '0,92'],
    unit: '10⁻⁶ m²',
    tolerance: 0.02,
    explanation: '$S = \\frac{\\rho \\cdot l}{R} = \\frac{5{,}5 \\times 10^{-8} \\times 0{,}4}{24} = 0{,}0917 \\times 10^{-6}\\,\\text{m}^2$ hay khoảng $0{,}917 \\times 10^{-7}\\,\\text{m}^2$.',
    hints: [
      'Công thức $S = \\frac{\\rho \\cdot l}{R}$.',
      'Tính: $5{,}5 \\times 10^{-8} \\times 0{,}4 / 24$.',
      'Xử lý số thập phân cẩn thận.'
    ],
    score: 10,
    estimatedTime: 45
  },
  {
    id: 'q_tt_23',
    topic: 'U và I',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Khi $U_1 = 4\\,\\text{V}$ thì $I_1 = 0{,}2\\,\\text{A}$. Hỏi khi hiệu điện thế tăng thêm $8\\,\\text{V}$ (tức $U_2 = 12\\,\\text{V}$) thì cường độ dòng điện tăng thêm bao nhiêu Ampe?',
    correctAnswer: 0.4,
    acceptableAnswers: ['0.4', '0,4'],
    unit: 'A',
    explanation: '$R = \\frac{4}{0{,}2} = 20\\,\\Omega$. Khi $U_2 = 12\\,\\text{V}$ thì $I_2 = \\frac{12}{20} = 0{,}6\\,\\text{A}$. Độ tăng là $\\Delta I = 0{,}6 - 0{,}2 = 0{,}4\\,\\text{A}$.',
    hints: [
      'Tính điện trở: $R = 4 / 0{,}2 = 20\\,\\Omega$.',
      'Khi $U_2 = 4 + 8 = 12\\,\\text{V}$, dòng điện mới $I_2 = 12 / 20 = 0{,}6\\,\\text{A}$.',
      'Độ tăng thêm: $\\Delta I = 0{,}6 - 0{,}2 = 0{,}4\\,\\text{A}$.'
    ],
    score: 10,
    estimatedTime: 40
  },
  {
    id: 'q_tt_24',
    topic: 'Định luật Ohm',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Một ấm siêu tốc hoạt động ở điện áp $220\\,\\text{V}$, dòng điện chạy qua ấm là $4{,}4\\,\\text{A}$. Điện trở của dây mayso bên trong ấm là bao nhiêu $\\Omega$?',
    correctAnswer: 50,
    acceptableAnswers: ['50', '50.0'],
    unit: 'Ω',
    explanation: '$R = \\frac{U}{I} = \\frac{220}{4{,}4} = 50\\,\\Omega$.',
    hints: [
      'Công thức $R = \\frac{U}{I}$.',
      'Lấy 220 chia cho 4,4.',
      '$220 / 4{,}4 = 50\\,\\Omega$.'
    ],
    score: 10,
    estimatedTime: 25
  },
  {
    id: 'q_tt_25',
    topic: 'Dây dẫn',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Một cuộn dây dẫn bằng nhôm có điện trở $14\\,\\Omega$, tiết diện $0{,}2\\,\\text{mm}^2 = 0{,}2 \\times 10^{-6}\\,\\text{m}^2$. Biết điện trở suất của nhôm là $2{,}8 \\times 10^{-8}\\,\\Omega \\cdot m$. Chiều dài của cuộn dây là bao nhiêu mét?',
    correctAnswer: 100,
    acceptableAnswers: ['100', '100.0'],
    unit: 'm',
    explanation: '$l = \\frac{R \\cdot S}{\\rho} = \\frac{14 \\times 0{,}2 \\times 10^{-6}}{2{,}8 \\times 10^{-8}} = 100\\,\\text{m}$.',
    hints: [
      'Công thức $l = \\frac{R \\cdot S}{\\rho}$.',
      'Tử số: $14 \\times 0{,}2 \\times 10^{-6} = 2{,}8 \\times 10^{-6}$.',
      'Mẫu số: $2{,}8 \\times 10^{-8} \\implies l = 100\\,\\text{m}$.'
    ],
    score: 10,
    estimatedTime: 40
  },
  {
    id: 'q_tt_26',
    topic: 'Định luật Ohm',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Hiệu điện thế giữa hai đầu một bóng đèn pin là $3\\,\\text{V}$, điện trở của đèn là $15\\,\\Omega$. Tính cường độ dòng điện qua đèn (Ampe).',
    correctAnswer: 0.2,
    acceptableAnswers: ['0.2', '0,2'],
    unit: 'A',
    explanation: '$I = \\frac{U}{R} = \\frac{3}{15} = 0{,}2\\,\\text{A}$.',
    hints: [
      'Công thức $I = \\frac{U}{R}$.',
      'Thay $U = 3\\,\\text{V}, R = 15\\,\\Omega$.',
      '$3 / 15 = 0{,}2\\,\\text{A}$.'
    ],
    score: 10,
    estimatedTime: 25
  },
  {
    id: 'q_tt_27',
    topic: 'Dây dẫn',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Dây dẫn 1 dài gấp 4 lần dây dẫn 2 ($l_1 = 4 l_2$), nhưng tiết diện dây 1 lại lớn gấp 2 lần dây 2 ($S_1 = 2 S_2$). Cả hai làm cùng chất liệu. Tỉ số điện trở $\\frac{R_1}{R_2}$ là:',
    correctAnswer: 2,
    acceptableAnswers: ['2', '2.0', '2,0'],
    unit: '',
    explanation: '$\\frac{R_1}{R_2} = \\frac{l_1}{l_2} \\times \\frac{S_2}{S_1} = 4 \\times \\frac{1}{2} = 2$.',
    hints: [
      'Tỉ số điện trở: $\\frac{R_1}{R_2} = \\frac{l_1}{l_2} \\times \\frac{S_2}{S_1}$.',
      'Thay $\\frac{l_1}{l_2} = 4$ và $\\frac{S_2}{S_1} = \\frac{1}{2}$.',
      '$4 \\times 0{,}5 = 2$.'
    ],
    score: 10,
    estimatedTime: 35
  },
  {
    id: 'q_tt_28',
    topic: 'Định luật Ohm',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Một dây dẫn có điện trở $R = 120\\,\\Omega$. Để có dòng điện $50\\,\\text{mA} = 0{,}05\\,\\text{A}$ chạy qua thì cần đặt vào hai đầu dây một hiệu điện thế bao nhiêu Vôn?',
    correctAnswer: 6,
    acceptableAnswers: ['6', '6.0'],
    unit: 'V',
    explanation: '$U = I \\cdot R = 0{,}05 \\times 120 = 6\\,\\text{V}$.',
    hints: [
      'Đổi $50\\,\\text{mA} = 0{,}05\\,\\text{A}$.',
      'Công thức $U = I \\cdot R$.',
      '$0{,}05 \\times 120 = 6\\,\\text{V}$.'
    ],
    score: 10,
    estimatedTime: 30
  },
  {
    id: 'q_tt_29',
    topic: 'Dây dẫn',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Một biến trở cuộn dây nicrom ($\\rho = 1{,}1 \\times 10^{-6}\\,\\Omega \\cdot m$) dài $40\\,\\text{m}$, tiết diện $0{,}5\\,\\text{mm}^2 = 0{,}5 \\times 10^{-6}\\,\\text{m}^2$. Điện trở toàn phần của biến trở là bao nhiêu $\\Omega$?',
    correctAnswer: 88,
    acceptableAnswers: ['88', '88.0'],
    unit: 'Ω',
    explanation: '$R = \\rho \\frac{l}{S} = 1{,}1 \\times 10^{-6} \\times \\frac{40}{0{,}5 \\times 10^{-6}} = 88\\,\\Omega$.',
    hints: [
      'Công thức $R = \\rho \\frac{l}{S}$.',
      'Rút gọn $10^{-6}$ ở tử và mẫu.',
      '$1{,}1 \\times 40 / 0{,}5 = 88\\,\\Omega$.'
    ],
    score: 10,
    estimatedTime: 35
  },
  {
    id: 'q_tt_30',
    topic: 'Định luật Ohm',
    difficulty: 'tinh_toan',
    type: 'numeric_input',
    question: 'Mắc điện trở $R = 15\\,\\Omega$ vào hai cực của ắc quy $12\\,\\text{V}$. Nếu dùng ampe kế đo được dòng điện $0{,}75\\,\\text{A}$ thì điện trở trong và dây nối của mạch đã cộng thêm vào bao nhiêu $\\Omega$?',
    correctAnswer: 1,
    acceptableAnswers: ['1', '1.0', '1,0'],
    unit: 'Ω',
    explanation: 'Điện trở toàn phần của mạch: $R_{\\text{tp}} = \\frac{U}{I} = \\frac{12}{0{,}75} = 16\\,\\Omega$. Do điện trở $R = 15\\,\\Omega$ nên phần điện trở phụ là $16 - 15 = 1\\,\\Omega$.',
    hints: [
      'Tính điện trở tổng cộng của mạch từ số chỉ U và I: $R_{\\text{tp}} = \\frac{12}{0{,}75} = 16\\,\\Omega$.',
      'Điện trở của riêng linh kiện là $15\\,\\Omega$.',
      'Phần cộng thêm của dây nối và nguồn: $16 - 15 = 1\\,\\Omega$.'
    ],
    score: 10,
    estimatedTime: 40
  },

  // ==================== VẬN DỤNG (15 CÂU) ====================
  {
    id: 'q_vd_01',
    topic: 'Vận dụng thực tế',
    difficulty: 'van_dung',
    type: 'multi_step',
    question: 'Đường dây tải điện từ trạm biến áp về một phân xưởng gồm hai dây đồng dài $l = 500\\,\\text{m}$, tiết diện mỗi dây $S = 25\\,\\text{mm}^2$. Biết điện trở suất của đồng $\\rho = 1{,}7 \\times 10^{-8}\\,\\Omega \\cdot m$. Dòng điện tải qua xưởng là $I = 20\\,\\text{A}$. Tính độ giảm thế $\\Delta U$ trên toàn bộ đường dây dẫn.',
    correctAnswer: 13.6,
    acceptableAnswers: ['13.6', '13,6'],
    unit: 'V',
    tolerance: 0.2,
    explanation: 'Đường dây gồm 2 dây dẫn đi và về nên tổng chiều dài là $L = 2 \\times 500 = 1000\\,\\text{m}$. Tiết diện $S = 25 \\times 10^{-6}\\,\\text{m}^2$. Điện trở toàn bộ đường dây: $R = \\rho \\frac{L}{S} = 1{,}7 \\times 10^{-8} \\times \\frac{1000}{25 \\times 10^{-6}} = 0{,}68\\,\\Omega$. Độ giảm thế: $\\Delta U = I \\cdot R = 20 \\times 0{,}68 = 13{,}6\\,\\text{V}$.',
    hints: [
      'Lưu ý đường dây điện gồm 2 sợi dây dẫn (dây pha và dây trung tính), tổng chiều dài là $2 \\times 500 = 1000\\,\\text{m}$.',
      'Tính điện trở tổng đường dây: $R = \\rho \\frac{L}{S} = 0{,}68\\,\\Omega$.',
      'Tính độ giảm thế $\\Delta U = I \\cdot R = 20 \\times 0{,}68 = 13{,}6\\,\\text{V}$.'
    ],
    score: 20,
    estimatedTime: 60
  },
  {
    id: 'q_vd_02',
    topic: 'Vận dụng thực tế',
    difficulty: 'van_dung',
    type: 'numeric_input',
    question: 'Một bóng đèn sợi đốt ghi $220\\,\\text{V} - 0{,}4\\,\\text{A}$. Muốn đèn sáng bình thường khi mắc vào nguồn điện có hiệu điện thế $240\\,\\text{V}$, người ta phải mắc nối tiếp với đèn một điện trở phụ $R_p$ có giá trị bằng bao nhiêu $\\Omega$?',
    correctAnswer: 50,
    acceptableAnswers: ['50', '50.0'],
    unit: 'Ω',
    explanation: 'Để đèn sáng bình thường thì dòng điện qua mạch là $I = 0{,}4\\,\\text{A}$ và hiệu điện thế trên đèn là $U_d = 220\\,\\text{V}$. Hiệu điện thế trên điện trở phụ phải gánh là $U_p = 240 - 220 = 20\\,\\text{V}$. Vậy $R_p = \\frac{U_p}{I} = \\frac{20}{0{,}4} = 50\\,\\Omega$.',
    hints: [
      'Hiệu điện thế nguồn là 240V, đèn cần 220V, vậy điện trở phụ phải gánh bao nhiêu Vôn?',
      '$U_p = 240 - 220 = 20\\,\\text{V}$.',
      'Dòng điện qua mạch là $I = 0{,}4\\,\\text{A}$. Điện trở phụ: $R_p = 20 / 0{,}4 = 50\\,\\Omega$.'
    ],
    score: 20,
    estimatedTime: 50
  },
  {
    id: 'q_vd_03',
    topic: 'Vận dụng thực tế',
    difficulty: 'van_dung',
    type: 'numeric_input',
    question: 'Người ta dùng dây nicrom có điện trở suất $\\rho = 1{,}1 \\times 10^{-6}\\,\\Omega \\cdot m$ và đường kính tiết diện $d = 0{,}4\\,\\text{mm}$ để quấn một biến trở có điện trở lớn nhất là $R = 70\\,\\Omega$. Tính chiều dài $l$ của dây dẫn (làm tròn số nguyên gần nhất, đơn vị mét, lấy $\\pi = 3{,}14$).',
    correctAnswer: 8,
    acceptableAnswers: ['8', '8.0'],
    unit: 'm',
    tolerance: 0.5,
    explanation: 'Bán kính $r = 0{,}2\\,\\text{mm} = 0{,}2 \\times 10^{-3}\\,\\text{m}$. Tiết diện $S = \\pi r^2 = 3{,}14 \\times (0{,}2 \\times 10^{-3})^2 = 1{,}256 \\times 10^{-7}\\,\\text{m}^2$. Chiều dài $l = \\frac{R \\cdot S}{\\rho} = \\frac{70 \\times 1{,}256 \\times 10^{-7}}{1{,}1 \\times 10^{-6}} \\approx 8\\,\\text{m}$.',
    hints: [
      'Tính tiết diện dây hình tròn từ đường kính: $S = \\frac{\\pi d^2}{4}$.',
      '$S = 3{,}14 \\times (0{,}4 \\times 10^{-3})^2 / 4 = 1{,}256 \\times 10^{-7}\\,\\text{m}^2$.',
      'Tính chiều dài: $l = \\frac{R \\cdot S}{\\rho} = \\frac{70 \\times 1{,}256 \\times 10^{-7}}{1{,}1 \\times 10^{-6}} \\approx 8\\,\\text{m}$.'
    ],
    score: 20,
    estimatedTime: 65
  },
  {
    id: 'q_vd_04',
    topic: 'Vận dụng mạch điện',
    difficulty: 'van_dung',
    type: 'multiple_choice',
    question: 'Khi di chuyển con chạy của biến trở, một bạn học sinh thấy chỉ số vôn kế đo hai đầu biến trở tăng lên. Hỏi chỉ số ampe kế trong mạch chính sẽ thay đổi như thế nào?',
    options: [
      'Giảm đi',
      'Tăng lên',
      'Không thay đổi',
      'Tăng giảm bất kì'
    ],
    correctAnswer: 'Giảm đi',
    explanation: 'Chỉ số vôn kế đo trên biến trở tăng nghĩa là điện trở tham gia của biến trở đã tăng lên. Điện trở toàn mạch tăng khiến cường độ dòng điện trong mạch giảm đi (số chỉ ampe kế giảm).',
    hints: [
      'Hiệu điện thế trên biến trở tăng nghĩa là điện trở biến trở tăng.',
      'Điện trở toàn mạch tăng thì cản trở dòng điện nhiều hơn.',
      'Cường độ dòng điện qua ampe kế giảm đi.'
    ],
    score: 20,
    estimatedTime: 40
  },
  {
    id: 'q_vd_05',
    topic: 'Vận dụng',
    difficulty: 'van_dung',
    type: 'numeric_input',
    question: 'Một thỏi đồng hình lăng trụ có khối lượng $m = 890\\,\\text{g}$, khối lượng riêng $D = 8900\\,\\text{kg/m}^3$. Người ta kéo thỏi đồng thành dây dẫn có tiết diện $S = 1\\,\\text{mm}^2 = 10^{-6}\\,\\text{m}^2$. Biết điện trở suất của đồng $\\rho = 1{,}7 \\times 10^{-8}\\,\\Omega \\cdot m$. Tính điện trở của sợi dây sau khi kéo (đơn vị $\\Omega$).',
    correctAnswer: 1.7,
    acceptableAnswers: ['1.7', '1,7'],
    unit: 'Ω',
    explanation: 'Thể tích của thỏi đồng: $V = \\frac{m}{D} = \\frac{0{,}89\\,\\text{kg}}{8900\\,\\text{kg/m}^3} = 10^{-4}\\,\\text{m}^3$. Chiều dài dây: $l = \\frac{V}{S} = \\frac{10^{-4}}{10^{-6}} = 100\\,\\text{m}$. Điện trở: $R = \\rho \\frac{l}{S} = 1{,}7 \\times 10^{-8} \\times \\frac{100}{10^{-6}} = 1{,}7\\,\\Omega$.',
    hints: [
      'Tính thể tích đồng từ khối lượng và khối lượng riêng: $V = m / D = 0{,}89 / 8900 = 10^{-4}\\,\\text{m}^3$.',
      'Tính chiều dài dây: $l = V / S = 10^{-4} / 10^{-6} = 100\\,\\text{m}$.',
      'Tính điện trở: $R = \\rho \\frac{l}{S} = 1{,}7 \\times 10^{-8} \\times 100 / 10^{-6} = 1{,}7\\,\\Omega$.'
    ],
    score: 20,
    estimatedTime: 65
  },
  {
    id: 'q_vd_06',
    topic: 'Vận dụng thực tế',
    difficulty: 'van_dung',
    type: 'numeric_input',
    question: 'Một sợi dây mayso bếp điện bị đứt ở chính giữa. Người ta gập bỏ đoạn cháy và nối lại một nửa đoạn dây còn lại vào đúng nguồn điện cũ $220\\,\\text{V}$. Cường độ dòng điện qua bếp bây giờ so với ban đầu gấp mấy lần?',
    correctAnswer: 2,
    acceptableAnswers: ['2', '2.0', '2,0'],
    unit: 'lần',
    explanation: 'Khi chiều dài giảm một nửa, điện trở giảm một nửa ($R\' = R/2$). Vì hiệu điện thế $U$ không đổi, dòng điện $I\' = \\frac{U}{R\'} = \\frac{U}{R/2} = 2 \\frac{U}{R} = 2I$ (gấp 2 lần).',
    hints: [
      'Cắt bỏ một nửa thì chiều dài dây giảm một nửa.',
      'Chiều dài giảm một nửa thì điện trở giảm một nửa.',
      'Hiệu điện thế không đổi, điện trở giảm 2 lần thì dòng điện tăng gấp 2 lần.'
    ],
    score: 20,
    estimatedTime: 40
  },
  {
    id: 'q_vd_07',
    topic: 'Vận dụng',
    difficulty: 'van_dung',
    type: 'numeric_input',
    question: 'Đặt hiệu điện thế $U = 18\\,\\text{V}$ vào hai đầu mạch gồm hai điện trở $R_1 = 6\\,\\Omega$ và $R_2 = 12\\,\\Omega$ mắc nối tiếp. Tính hiệu điện thế giữa hai đầu điện trở $R_2$ (đơn vị Vôn).',
    correctAnswer: 12,
    acceptableAnswers: ['12', '12.0'],
    unit: 'V',
    explanation: 'Điện trở tương đương của mạch nối tiếp: $R_{td} = R_1 + R_2 = 6 + 12 = 18\\,\\Omega$. Cường độ dòng điện trong mạch: $I = \\frac{U}{R_{td}} = \\frac{18}{18} = 1\\,\\text{A}$. Hiệu điện thế giữa hai đầu $R_2$: $U_2 = I \\cdot R_2 = 1 \\times 12 = 12\\,\\text{V}$.',
    hints: [
      'Tính điện trở tương đương của hai điện trở nối tiếp: $R_{td} = 6 + 12 = 18\\,\\Omega$.',
      'Tính cường độ dòng điện chung: $I = U / R_{td} = 18 / 18 = 1\\,\\text{A}$.',
      'Tính hiệu điện thế trên $R_2$: $U_2 = I \\cdot R_2 = 1 \\times 12 = 12\\,\\text{V}$.'
    ],
    score: 20,
    estimatedTime: 45
  },
  {
    id: 'q_vd_08',
    topic: 'Vận dụng',
    difficulty: 'van_dung',
    type: 'numeric_input',
    question: 'Một điện trở $R_1 = 30\\,\\Omega$ chịu được hiệu điện thế tối đa $U_1 = 15\\,\\text{V}$. Điện trở $R_2 = 20\\,\\Omega$ chịu được hiệu điện thế tối đa $U_2 = 8\\,\\text{V}$. Nếu mắc nối tiếp hai điện trở này thì hiệu điện thế tối đa an toàn có thể đặt vào hai đầu đoạn mạch là bao nhiêu Vôn?',
    correctAnswer: 20,
    acceptableAnswers: ['20', '20.0'],
    unit: 'V',
    explanation: 'Dòng điện tối đa qua $R_1$: $I_1 = \\frac{15}{30} = 0{,}5\\,\\text{A}$. Dòng điện tối đa qua $R_2$: $I_2 = \\frac{8}{20} = 0{,}4\\,\\text{A}$. Khi mắc nối tiếp, dòng điện qua cả hai phải bằng nhau và không vượt quá giá trị an toàn của linh kiện yếu hơn, do đó $I_{\\text{max}} = 0{,}4\\,\\text{A}$. Điện trở tương đương: $R_{td} = 30 + 20 = 50\\,\\Omega$. Hiệu điện thế tối đa: $U_{\\text{max}} = I_{\\text{max}} \\cdot R_{td} = 0{,}4 \\times 50 = 20\\,\\text{V}$.',
    hints: [
      'Tính dòng điện định mức an toàn của từng điện trở: $I_1 = 15/30 = 0{,}5\\,\\text{A}$; $I_2 = 8/20 = 0{,}4\\,\\text{A}$.',
      'Mắc nối tiếp thì dòng điện phải chung, nên chọn giá trị nhỏ hơn $I = 0{,}4\\,\\text{A}$ để không cháy linh kiện nào.',
      'Điện trở tổng là $30 + 20 = 50\\,\\Omega$. Hiệu điện thế an toàn: $0{,}4 \\times 50 = 20\\,\\text{V}$.'
    ],
    score: 20,
    estimatedTime: 55
  },
  {
    id: 'q_vd_09',
    topic: 'Vận dụng',
    difficulty: 'van_dung',
    type: 'numeric_input',
    question: 'Một bóng đèn xe máy $12\\,\\text{V} - 1{,}5\\,\\text{A}$. Để sử dụng bóng đèn này trên xe có ắc quy $24\\,\\text{V}$, người ta mắc nối tiếp bóng đèn với một biến trở. Cần điều chỉnh biến trở có giá trị bao nhiêu $\\Omega$ để đèn sáng bình thường?',
    correctAnswer: 8,
    acceptableAnswers: ['8', '8.0'],
    unit: 'Ω',
    explanation: 'Đèn cần $12\\,\\text{V}$ và dòng điện $1{,}5\\,\\text{A}$. Nguồn điện là $24\\,\\text{V}$ nên biến trở phải gánh hiệu điện thế $U_{bt} = 24 - 12 = 12\\,\\text{V}$. Giá trị của biến trở là: $R_{bt} = \\frac{U_{bt}}{I} = \\frac{12}{1{,}5} = 8\\,\\Omega$.',
    hints: [
      'Hiệu điện thế mà biến trở phải gánh: $U_{bt} = 24 - 12 = 12\\,\\text{V}$.',
      'Dòng điện qua mạch nối tiếp bằng dòng định mức của đèn: $I = 1{,}5\\,\\text{A}$.',
      'Điện trở biến trở: $R_{bt} = 12 / 1{,}5 = 8\\,\\Omega$.'
    ],
    score: 20,
    estimatedTime: 45
  },
  {
    id: 'q_vd_10',
    topic: 'Vận dụng',
    difficulty: 'van_dung',
    type: 'numeric_input',
    question: 'Một đoạn dây chì trong cầu chì dài $l = 2\\,\\text{cm} = 0{,}02\\,\\text{m}$, đường kính $d = 0{,}6\\,\\text{mm} = 0{,}6 \\times 10^{-3}\\,\\text{m}$. Biết điện trở suất của chì $\\rho = 2{,}1 \\times 10^{-7}\\,\\Omega \\cdot m$. Lấy $\\pi = 3{,}14$. Điện trở của đoạn dây chì này xấp xỉ bao nhiêu $\\Omega$ (làm tròn đến 2 chữ số thập phân)?',
    correctAnswer: 0.015,
    acceptableAnswers: ['0.015', '0,015', '0.01', '0,01', '0.02', '0,02'],
    unit: 'Ω',
    tolerance: 0.005,
    explanation: '$S = \\frac{\\pi d^2}{4} = \\frac{3{,}14 \\times (0{,}6 \\times 10^{-3})^2}{4} \\approx 0{,}2826 \\times 10^{-6}\\,\\text{m}^2$. Điện trở $R = \\rho \\frac{l}{S} = 2{,}1 \\times 10^{-7} \\times \\frac{0{,}02}{0{,}2826 \\times 10^{-6}} \\approx 0{,}015\\,\\Omega$.',
    hints: [
      'Tính tiết diện dây chì: $S = \\frac{\\pi d^2}{4} \\approx 0{,}2826 \\times 10^{-6}\\,\\text{m}^2$.',
      'Áp dụng công thức $R = \\rho \\frac{l}{S}$ với $l = 0{,}02\\,\\text{m}$.',
      'Kết quả xấp xỉ $0{,}015\\,\\Omega$.'
    ],
    score: 20,
    estimatedTime: 55
  },
  {
    id: 'q_vd_11',
    topic: 'Vận dụng',
    difficulty: 'van_dung',
    type: 'multiple_choice',
    question: 'Để kiểm tra xem một vật dẫn có tuân theo định luật Ohm hay không, người ta tiến hành thí nghiệm như thế nào?',
    options: [
      'Đo các cặp giá trị (U, I) ứng với các mức hiệu điện thế khác nhau và vẽ đồ thị I-U xem có phải là đường thẳng qua gốc tọa độ không',
      'Chỉ cần đo một lần duy nhất hiệu điện thế và dòng điện rồi tính thương số U/I',
      'Dùng ôm kế đo trực tiếp điện trở khi vật đang ngâm trong nước',
      'Nối vật với nguồn điện xoay chiều và quan sát bóng đèn'
    ],
    correctAnswer: 'Đo các cặp giá trị (U, I) ứng với các mức hiệu điện thế khác nhau và vẽ đồ thị I-U xem có phải là đường thẳng qua gốc tọa độ không',
    explanation: 'Để khẳng định tính tuân theo định luật Ohm, phải kiểm tra xem tỉ số $U/I$ có là hằng số với mọi $U$ hay không bằng cách đo nhiều điểm và vẽ đường đặc trưng $I-U$.',
    hints: [
      'Một thí nghiệm khoa học cần kiểm nghiệm tính quy luật qua nhiều giá trị.',
      'Cần thay đổi U và ghi nhận I tương ứng.',
      'Vẽ đồ thị kiểm tra dạng đường thẳng đi qua gốc tọa độ.'
    ],
    score: 20,
    estimatedTime: 40
  },
  {
    id: 'q_vd_12',
    topic: 'Vận dụng',
    difficulty: 'van_dung',
    type: 'numeric_input',
    question: 'Một cuộn dây bằng nhôm dài $l_1 = 50\\,\\text{m}$ có điện trở $R_1 = 7\\,\\Omega$. Một cuộn dây nhôm khác có cùng tiết diện nặng gấp đôi cuộn thứ nhất. Điện trở $R_2$ của cuộn thứ hai là bao nhiêu $\\Omega$?',
    correctAnswer: 14,
    acceptableAnswers: ['14', '14.0'],
    unit: 'Ω',
    explanation: 'Vì cùng chất liệu và tiết diện, khối lượng tỉ lệ thuận với chiều dài ($m = D \\cdot S \\cdot l$). Cuộn 2 nặng gấp đôi nghĩa là dài gấp đôi ($l_2 = 2 l_1$). Do $R \\propto l$ nên điện trở cuộn 2 gấp đôi: $R_2 = 2 R_1 = 2 \\times 7 = 14\\,\\Omega$.',
    hints: [
      'Cùng tiết diện và vật liệu, khối lượng dây tỉ lệ thuận với chiều dài dây.',
      'Khối lượng gấp đôi nghĩa là chiều dài cuộn dây gấp đôi ($l_2 = 2 l_1$).',
      'Chiều dài gấp đôi thì điện trở cũng gấp đôi: $7 \\times 2 = 14\\,\\Omega$.'
    ],
    score: 20,
    estimatedTime: 45
  },
  {
    id: 'q_vd_13',
    topic: 'Vận dụng',
    difficulty: 'van_dung',
    type: 'numeric_input',
    question: 'Một bóng đèn khi mắc vào hiệu điện thế $6\\,\\text{V}$ thì dòng điện là $0{,}5\\,\\text{A}$. Nếu muốn giảm dòng điện qua đèn xuống còn $0{,}3\\,\\text{A}$ bằng cách dùng một điện trở nối tiếp $R_n$ với cùng nguồn $6\\,\\text{V}$ (coi điện trở đèn không đổi). Trị số $R_n$ cần mắc thêm là bao nhiêu $\\Omega$?',
    correctAnswer: 8,
    acceptableAnswers: ['8', '8.0'],
    unit: 'Ω',
    explanation: 'Điện trở của đèn: $R_d = \\frac{6}{0{,}5} = 12\\,\\Omega$. Khi dòng điện mới là $0{,}3\\,\\text{A}$, điện trở toàn mạch cần là: $R_{tm} = \\frac{6}{0{,}3} = 20\\,\\Omega$. Điện trở phụ cần mắc nối tiếp: $R_n = R_{tm} - R_d = 20 - 12 = 8\\,\\Omega$.',
    hints: [
      'Tính điện trở của bóng đèn: $R_d = 6 / 0{,}5 = 12\\,\\Omega$.',
      'Để dòng điện là $0{,}3\\,\\text{A}$ ở hiệu điện thế 6V, điện trở toàn mạch phải là: $R_{tm} = 6 / 0{,}3 = 20\\,\\Omega$.',
      'Điện trở cần mắc nối tiếp thêm: $R_n = 20 - 12 = 8\\,\\Omega$.'
    ],
    score: 20,
    estimatedTime: 50
  },
  {
    id: 'q_vd_14',
    topic: 'Vận dụng',
    difficulty: 'van_dung',
    type: 'numeric_input',
    question: 'Một biến trở con chạy làm bằng dây niken-crôm có đường kính $0{,}5\\,\\text{mm}$ (tiết diện $S \\approx 0{,}196\\,\\text{mm}^2 = 0{,}196 \\times 10^{-6}\\,\\text{m}^2$). Cuộn dây được quấn đều 500 vòng quanh một lõi sứ hình trụ tròn có đường kính $2\\,\\text{cm}$ ($0{,}02\\,\\text{m}$). Cho $\\rho = 1{,}1 \\times 10^{-6}\\,\\Omega \\cdot m$ và $\\pi = 3{,}14$. Tính điện trở toàn phần của biến trở này (làm tròn số nguyên gần nhất, đơn vị $\\Omega$).',
    correctAnswer: 176,
    acceptableAnswers: ['176', '176.0', '175', '177'],
    unit: 'Ω',
    tolerance: 2,
    explanation: 'Chu vi một vòng dây: $C = \\pi \\cdot d_{sứ} = 3{,}14 \\times 0{,}02 = 0{,}0628\\,\\text{m}$. Chiều dài toàn bộ sợi dây: $l = 500 \\times C = 500 \\times 0{,}0628 = 31{,}4\\,\\text{m}$. Điện trở toàn phần: $R = \\rho \\frac{l}{S} = 1{,}1 \\times 10^{-6} \\times \\frac{31{,}4}{0{,}196 \\times 10^{-6}} \\approx 176\\,\\Omega$.',
    hints: [
      'Tính chiều dài một vòng quấn quanh lõi sứ: $C = \\pi \\cdot d = 3{,}14 \\times 0{,}02 = 0{,}0628\\,\\text{m}$.',
      'Cuộn 500 vòng nên tổng chiều dài: $l = 500 \\times 0{,}0628 = 31{,}4\\,\\text{m}$.',
      'Tính điện trở: $R = 1{,}1 \\times 10^{-6} \\times 31{,}4 / (0{,}196 \\times 10^{-6}) \\approx 176\\,\\Omega$.'
    ],
    score: 20,
    estimatedTime: 65
  },
  {
    id: 'q_vd_15',
    topic: 'Vận dụng thực tế',
    difficulty: 'van_dung',
    type: 'numeric_input',
    question: 'Ở mạng điện 220V gia đình, dây dẫn nguồn tổng từ đồng hồ vào nhà dài $30\\,\\text{m}$ (gồm 2 dây đi và về, tổng chiều dài $60\\,\\text{m}$), tiết diện dây $4\\,\\text{mm}^2 = 4 \\times 10^{-6}\\,\\text{m}^2$. Cho điện trở suất của đồng $\\rho = 1{,}7 \\times 10^{-8}\\,\\Omega \\cdot m$. Khi cả nhà bật bình nóng lạnh và điều hòa tiêu thụ dòng điện $I = 20\\,\\text{A}$, hiệu điện thế thực tế tại ổ cắm trong nhà bị sụt giảm bao nhiêu Vôn?',
    correctAnswer: 5.1,
    acceptableAnswers: ['5.1', '5,1'],
    unit: 'V',
    explanation: 'Điện trở đường dây nguồn: $R = \\rho \\frac{l}{S} = 1{,}7 \\times 10^{-8} \\times \\frac{60}{4 \\times 10^{-6}} = 0{,}255\\,\\Omega$. Độ sụt áp trên đường dây: $\\Delta U = I \\cdot R = 20 \\times 0{,}255 = 5{,}1\\,\\text{V}$.',
    hints: [
      'Tổng chiều dài 2 sợi dây nguồn là $2 \\times 30 = 60\\,\\text{m}$.',
      'Điện trở đường dây: $R = 1{,}7 \\times 10^{-8} \\times 60 / (4 \\times 10^{-6}) = 0{,}255\\,\\Omega$.',
      'Độ sụt áp: $\\Delta U = I \\cdot R = 20 \\times 0{,}255 = 5{,}1\\,\\text{V}$.'
    ],
    score: 20,
    estimatedTime: 55
  }
];
