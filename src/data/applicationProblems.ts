export interface ApplicationProblem {
  id: string;
  level: 'A' | 'B' | 'C' | 'D';
  levelName: string;
  levelBadge: string;
  title: string;
  scenario: string;
  givenData: { label: string; value: string; latex?: string }[];
  targetQuestion: string;
  targetUnit: string;
  correctAnswer: number;
  acceptableAnswers: (string | number)[];
  tolerance: number;
  hints: string[];
  stepByStepSolution: {
    step: number;
    title: string;
    calculation: string;
    result: string;
  }[];
}

export const APPLICATION_PROBLEMS: ApplicationProblem[] = [
  // ==================== CẤP ĐỘ A: CƠ BẢN ====================
  {
    id: 'app-a-1',
    level: 'A',
    levelName: 'Cơ bản',
    levelBadge: 'Nhập môn Ohm',
    title: 'Xác định dòng điện qua bóng đèn pin',
    scenario: 'Một bạn học sinh lắp một mạch điện thắp sáng đơn giản gồm một viên pin tiểu $1{,}5\\,\\text{V}$ cấp nguồn cho một bóng đèn sợi đốt có điện trở đo được là $3\\,\\Omega$.',
    givenData: [
      { label: 'Hiệu điện thế nguồn', value: '1,5 V', latex: 'U = 1{,}5\\,\\text{V}' },
      { label: 'Điện trở của đèn', value: '3 Ω', latex: 'R = 3\\,\\Omega' }
    ],
    targetQuestion: 'Cường độ dòng điện I chạy qua bóng đèn là bao nhiêu Ampe?',
    targetUnit: 'A',
    correctAnswer: 0.5,
    acceptableAnswers: [0.5, '0.5', '0,5', '1/2'],
    tolerance: 0.05,
    hints: [
      'Đại lượng cần tìm là cường độ dòng điện $I$.',
      'Áp dụng công thức Định luật Ohm: $I = \\frac{U}{R}$.',
      'Thay số: $I = \\frac{1{,}5}{3} = 0{,}5\\,\\text{A}$.'
    ],
    stepByStepSolution: [
      {
        step: 1,
        title: 'Áp dụng công thức Định luật Ohm',
        calculation: 'I = \\frac{U}{R}',
        result: 'Công thức biểu diễn mối quan hệ giữa $I, U$ và $R$.'
      },
      {
        step: 2,
        title: 'Thay số tính toán',
        calculation: 'I = \\frac{1{,}5}{3} = 0{,}5',
        result: 'Cường độ dòng điện qua bóng đèn là $0{,}5\\,\\text{A}$.'
      }
    ]
  },
  {
    id: 'app-a-2',
    level: 'A',
    levelName: 'Cơ bản',
    levelBadge: 'Nhập môn Ohm',
    title: 'Đo điện trở của bàn là gia đình',
    scenario: 'Khi cắm bàn là điện vào ổ cắm điện gia đình $220\\,\\text{V}$, ampe kế trong phòng chỉ dòng điện chạy qua bàn là là $2\\,\\text{A}$.',
    givenData: [
      { label: 'Hiệu điện thế lưới', value: '220 V', latex: 'U = 220\\,\\text{V}' },
      { label: 'Cường độ dòng điện', value: '2 A', latex: 'I = 2\\,\\text{A}' }
    ],
    targetQuestion: 'Điện trở R của bàn là điện bằng bao nhiêu Ôm (Ω)?',
    targetUnit: 'Ω',
    correctAnswer: 110,
    acceptableAnswers: [110, '110', '110.0'],
    tolerance: 1,
    hints: [
      'Đại lượng cần tìm là điện trở $R$.',
      'Biến đổi từ định luật Ohm: $R = \\frac{U}{I}$.',
      'Thay số: lấy $220$ chia cho $2$.'
    ],
    stepByStepSolution: [
      {
        step: 1,
        title: 'Biến đổi công thức định luật Ohm',
        calculation: 'R = \\frac{U}{I}',
        result: 'Tỉ số giữa hiệu điện thế và cường độ dòng điện.'
      },
      {
        step: 2,
        title: 'Thực hiện phép tính',
        calculation: 'R = \\frac{220}{2} = 110',
        result: 'Điện trở của bàn là là $110\\,\\Omega$.'
      }
    ]
  },

  // ==================== CẤP ĐỘ B: THÔNG HIỂU ====================
  {
    id: 'app-b-1',
    level: 'B',
    levelName: 'Thông hiểu',
    levelBadge: 'Thực hành vật lí',
    title: 'So sánh điện trở của hai đoạn dây dẫn',
    scenario: 'Phòng thí nghiệm có hai đoạn dây dẫn đồng chất cùng tiết diện: dây $A$ dài $12\\,\\text{m}$ có điện trở $4\\,\\Omega$. Dây $B$ dài $36\\,\\text{m}$.',
    givenData: [
      { label: 'Chiều dài dây A', value: '12 m', latex: 'l_A = 12\\,\\text{m}' },
      { label: 'Điện trở dây A', value: '4 Ω', latex: 'R_A = 4\\,\\Omega' },
      { label: 'Chiều dài dây B', value: '36 m', latex: 'l_B = 36\\,\\text{m}' }
    ],
    targetQuestion: 'Điện trở của đoạn dây B là bao nhiêu Ôm (Ω)?',
    targetUnit: 'Ω',
    correctAnswer: 12,
    acceptableAnswers: [12, '12', '12.0'],
    tolerance: 0.5,
    hints: [
      'Vì hai dây cùng vật liệu và cùng tiết diện, điện trở tỉ lệ thuận với chiều dài.',
      'Lập tỉ số: $\\frac{R_B}{R_A} = \\frac{l_B}{l_A} = \\frac{36}{12} = 3$.',
      'Điện trở $R_B = 3 \\times R_A = 3 \\times 4 = 12\\,\\Omega$.'
    ],
    stepByStepSolution: [
      {
        step: 1,
        title: 'Lập tỉ số phụ thuộc chiều dài',
        calculation: '\\frac{R_B}{R_A} = \\frac{l_B}{l_A}',
        result: 'Điện trở tỉ lệ thuận với chiều dài dây dẫn.'
      },
      {
        step: 2,
        title: 'Tính điện trở dây B',
        calculation: 'R_B = R_A \\cdot \\frac{l_B}{l_A} = 4 \\times \\frac{36}{12} = 12',
        result: 'Điện trở của dây $B$ là $12\\,\\Omega$.'
      }
    ]
  },
  {
    id: 'app-b-2',
    level: 'B',
    levelName: 'Thông hiểu',
    levelBadge: 'Thực hành vật lí',
    title: 'Tính toán điện trở dây dẫn từ kích thước hình học',
    scenario: 'Một cuộn dây nhôm dùng làm dây quấn có chiều dài $l = 200\\,\\text{m}$, tiết diện $S = 0{,}56\\,\\text{mm}^2 = 0{,}56 \\times 10^{-6}\\,\\text{m}^2$. Biết điện trở suất của nhôm là $\\rho = 2{,}8 \\times 10^{-8}\\,\\Omega \\cdot m$.',
    givenData: [
      { label: 'Chiều dài dây', value: '200 m', latex: 'l = 200\\,\\text{m}' },
      { label: 'Tiết diện dây', value: '0,56 mm²', latex: 'S = 0{,}56 \\times 10^{-6}\\,\\text{m}^2' },
      { label: 'Điện trở suất nhôm', value: '2,8 × 10⁻⁸ Ω·m', latex: '\\rho = 2{,}8 \\times 10^{-8}\\,\\Omega \\cdot m' }
    ],
    targetQuestion: 'Tính điện trở của cuộn dây dẫn này (đơn vị Ω)?',
    targetUnit: 'Ω',
    correctAnswer: 10,
    acceptableAnswers: [10, '10', '10.0'],
    tolerance: 0.5,
    hints: [
      'Công thức tính điện trở dây dẫn: $R = \\rho \\frac{l}{S}$.',
      'Đảm bảo tiết diện đã đổi ra đơn vị mét vuông: $S = 0{,}56 \\times 10^{-6}\\,\\text{m}^2$.',
      'Thay số: $R = 2{,}8 \\times 10^{-8} \\times \\frac{200}{0{,}56 \\times 10^{-6}} = 10\\,\\Omega$.'
    ],
    stepByStepSolution: [
      {
        step: 1,
        title: 'Áp dụng công thức điện trở vật liệu',
        calculation: 'R = \\rho \\frac{l}{S}',
        result: 'Công thức chuẩn phụ thuộc kích thước và vật liệu.'
      },
      {
        step: 2,
        title: 'Thay số và rút gọn lũy thừa',
        calculation: 'R = 2{,}8 \\times 10^{-8} \\times \\frac{200}{0{,}56 \\times 10^{-6}} = 10',
        result: 'Điện trở cuộn dây là $10\\,\\Omega$.'
      }
    ]
  },

  // ==================== CẤP ĐỘ C: VẬN DỤNG ====================
  {
    id: 'app-c-1',
    level: 'C',
    levelName: 'Vận dụng',
    levelBadge: 'Kỹ sư nhí',
    title: 'Biến trở điều khiển độ sáng bóng đèn',
    scenario: 'Một bóng đèn có ghi $6\\,\\text{V} - 0{,}5\\,\\text{A}$ được mắc nối tiếp với một biến trở con chạy vào nguồn điện không đổi có hiệu điện thế $U = 9\\,\\text{V}$.',
    givenData: [
      { label: 'Hiệu điện thế định mức đèn', value: '6 V', latex: 'U_d = 6\\,\\text{V}' },
      { label: 'Dòng điện định mức đèn', value: '0,5 A', latex: 'I_d = 0{,}5\\,\\text{A}' },
      { label: 'Hiệu điện thế nguồn cấp', value: '9 V', latex: 'U = 9\\,\\text{V}' }
    ],
    targetQuestion: 'Để đèn sáng bình thường thì phải điều chỉnh biến trở có điện trở là bao nhiêu Ôm (Ω)?',
    targetUnit: 'Ω',
    correctAnswer: 6,
    acceptableAnswers: [6, '6', '6.0'],
    tolerance: 0.2,
    hints: [
      'Để đèn sáng bình thường, dòng điện qua mạch nối tiếp là $I = 0{,}5\\,\\text{A}$.',
      'Hiệu điện thế trên biến trở là: $U_{bt} = U - U_d = 9 - 6 = 3\\,\\text{V}$.',
      'Tính điện trở biến trở: $R_{bt} = \\frac{U_{bt}}{I} = \\frac{3}{0{,}5} = 6\\,\\Omega$.'
    ],
    stepByStepSolution: [
      {
        step: 1,
        title: 'Tìm hiệu điện thế cần rơi trên biến trở',
        calculation: 'U_{bt} = U - U_d = 9 - 6 = 3\\,\\text{V}',
        result: 'Hiệu điện thế trên biến trở là $3\\,\\text{V}$.'
      },
      {
        step: 2,
        title: 'Tính điện trở biến trở theo Định luật Ohm',
        calculation: 'R_{bt} = \\frac{U_{bt}}{I} = \\frac{3}{0{,}5} = 6\\,\\Omega',
        result: 'Cần điều chỉnh biến trở về giá trị $6\\,\\Omega$.'
      }
    ]
  },
  {
    id: 'app-c-2',
    level: 'C',
    levelName: 'Vận dụng',
    levelBadge: 'Kỹ sư nhí',
    title: 'Thiết kế dây mayso cho ấm điện mini',
    scenario: 'Người ta cần quấn một dây mayso bếp điện mini có điện trở $44\\,\\Omega$ từ dây hợp kim niken-crôm có điện trở suất $\\rho = 1{,}1 \\times 10^{-6}\\,\\Omega \\cdot m$ và đường kính tiết diện $d = 0{,}5\\,\\text{mm}$ (tiết diện $S \\approx 0{,}196\\,\\text{mm}^2 = 0{,}196 \\times 10^{-6}\\,\\text{m}^2$).',
    givenData: [
      { label: 'Điện trở cần tạo', value: '44 Ω', latex: 'R = 44\\,\\Omega' },
      { label: 'Điện trở suất Nicrom', value: '1,1 × 10⁻⁶ Ω·m', latex: '\\rho = 1{,}1 \\times 10^{-6}\\,\\Omega \\cdot m' },
      { label: 'Tiết diện dây dẫn', value: '0,196 mm²', latex: 'S = 0{,}196 \\times 10^{-6}\\,\\text{m}^2' }
    ],
    targetQuestion: 'Tính chiều dài l của đoạn dây dẫn cần dùng (làm tròn đến số thập phân 1 chữ số, đơn vị mét)?',
    targetUnit: 'm',
    correctAnswer: 7.84,
    acceptableAnswers: [7.84, '7.84', '7,84', 7.8, '7.8', '7,8'],
    tolerance: 0.2,
    hints: [
      'Công thức tính chiều dài từ công thức $R = \\rho \\frac{l}{S} \\implies l = \\frac{R \\cdot S}{\\rho}$.',
      'Thay số: $l = \\frac{44 \\times 0{,}196 \\times 10^{-6}}{1{,}1 \\times 10^{-6}}$.',
      'Rút gọn $10^{-6}$ và tính: $\\frac{44 \\times 0{,}196}{1{,}1} = 40 \\times 0{,}196 = 7{,}84\\,\\text{m}$.'
    ],
    stepByStepSolution: [
      {
        step: 1,
        title: 'Biến đổi công thức tính chiều dài dây',
        calculation: 'l = \\frac{R \\cdot S}{\\rho}',
        result: 'Biểu thức xác định chiều dài cần thiết.'
      },
      {
        step: 2,
        title: 'Thực hiện phép tính rút gọn',
        calculation: 'l = \\frac{44 \\times 0{,}196 \\times 10^{-6}}{1{,}1 \\times 10^{-6}} = 7{,}84',
        result: 'Chiều dài đoạn dây cần cắt là $7{,}84\\,\\text{m}$ (xấp xỉ $7{,}8\\,\\text{m}$).'
      }
    ]
  },

  // ==================== CẤP ĐỘ D: THỰC TẾ ====================
  {
    id: 'app-d-1',
    level: 'D',
    levelName: 'Thực tế',
    levelBadge: 'Chuyên gia điện năng',
    title: 'Sụt áp trên đường dây truyền tải điện về xưởng sản xuất',
    scenario: 'Một xưởng cơ khí nhỏ sử dụng nguồn điện cách trạm biến áp $200\\,\\text{m}$. Đường dây kéo về xưởng gồm 2 sợi dây đồng riêng biệt (dây đi và dây về, tổng chiều dài $400\\,\\text{m}$), tiết diện mỗi sợi là $10\\,\\text{mm}^2 = 10 \\times 10^{-6}\\,\\text{m}^2$. Cho điện trở suất của đồng $\\rho = 1{,}7 \\times 10^{-8}\\,\\Omega \\cdot m$. Khi các máy móc cùng khởi động, dòng điện trên đường dây đo được là $I = 25\\,\\text{A}$.',
    givenData: [
      { label: 'Khoảng cách trạm - xưởng', value: '200 m (dây đôi: 400 m)', latex: 'L = 2 \\times 200 = 400\\,\\text{m}' },
      { label: 'Tiết diện dây đồng', value: '10 mm²', latex: 'S = 10 \\times 10^{-6}\\,\\text{m}^2' },
      { label: 'Dòng điện tiêu thụ', value: '25 A', latex: 'I = 25\\,\\text{A}' },
      { label: 'Điện trở suất đồng', value: '1,7 × 10⁻⁸ Ω·m', latex: '\\rho = 1{,}7 \\times 10^{-8}\\,\\Omega \\cdot m' }
    ],
    targetQuestion: 'Độ sụt áp ΔU trên toàn bộ đường dây tải điện là bao nhiêu Vôn?',
    targetUnit: 'V',
    correctAnswer: 17,
    acceptableAnswers: [17, '17', '17.0'],
    tolerance: 0.5,
    hints: [
      'Bước 1: Tính điện trở của toàn bộ đường dây đôi: $R = \\rho \\frac{L}{S}$ với $L = 400\\,\\text{m}$.',
      'Điện trở đường dây: $R = 1{,}7 \\times 10^{-8} \\times \\frac{400}{10 \\times 10^{-6}} = 0{,}68\\,\\Omega$.',
      'Bước 2: Áp dụng định luật Ohm tính độ sụt áp $\\Delta U = I \\cdot R = 25 \\times 0{,}68 = 17\\,\\text{V}$.'
    ],
    stepByStepSolution: [
      {
        step: 1,
        title: 'Tính tổng điện trở đường dây đôi',
        calculation: 'R = \\rho \\frac{L}{S} = 1{,}7 \\times 10^{-8} \\times \\frac{400}{10^{-5}} = 0{,}68\\,\\Omega',
        result: 'Điện trở tổng của hai dây dẫn là $0{,}68\\,\\Omega$.'
      },
      {
        step: 2,
        title: 'Tính độ giảm thế (sụt áp) theo Định luật Ohm',
        calculation: '\\Delta U = I \\cdot R = 25 \\times 0{,}68 = 17\\,\\text{V}',
        result: 'Điện áp bị sụt giảm trên đường dây là $17\\,\\text{V}$.'
      }
    ]
  },
  {
    id: 'app-d-2',
    level: 'D',
    levelName: 'Thực tế',
    levelBadge: 'Chuyên gia điện năng',
    title: 'Hao phí điện năng và nhiệt tỏa ra trên dây dẫn',
    scenario: 'Một máy bơm nước chạy điện gia đình có công suất lớn khiến dây dẫn nguồn dài $50\\,\\text{m}$ (tổng 2 dây là $100\\,\\text{m}$), tiết diện $2\\,\\text{mm}^2 = 2 \\times 10^{-6}\\,\\text{m}^2$ bị ấm lên. Điện trở suất đồng $\\rho = 1{,}7 \\times 10^{-8}\\,\\Omega \\cdot m$. Dòng điện qua máy bơm là $I = 10\\,\\text{A}$.',
    givenData: [
      { label: 'Tổng chiều dài dây', value: '100 m', latex: 'L = 100\\,\\text{m}' },
      { label: 'Tiết diện dây đồng', value: '2 mm²', latex: 'S = 2 \\times 10^{-6}\\,\\text{m}^2' },
      { label: 'Cường độ dòng điện', value: '10 A', latex: 'I = 10\\,\\text{A}' }
    ],
    targetQuestion: 'Hiệu điện thế hai đầu dây dẫn dẫn đến máy bơm đã làm mất đi bao nhiêu Vôn (độ sụt thế ΔU)?',
    targetUnit: 'V',
    correctAnswer: 8.5,
    acceptableAnswers: [8.5, '8.5', '8,5'],
    tolerance: 0.3,
    hints: [
      'Tính điện trở của $100\\,\\text{m}$ dây đồng: $R = \\rho \\frac{L}{S}$.',
      '$R = 1{,}7 \\times 10^{-8} \\times \\frac{100}{2 \\times 10^{-6}} = 0{,}85\\,\\Omega$.',
      'Độ sụt áp: $\\Delta U = I \\cdot R = 10 \\times 0{,}85 = 8{,}5\\,\\text{V}$.'
    ],
    stepByStepSolution: [
      {
        step: 1,
        title: 'Tính điện trở đường dây dẫn',
        calculation: 'R = \\rho \\frac{L}{S} = 1{,}7 \\times 10^{-8} \\times \\frac{100}{2 \\times 10^{-6}} = 0{,}85\\,\\Omega',
        result: 'Điện trở đường dây là $0{,}85\\,\\Omega$.'
      },
      {
        step: 2,
        title: 'Tính độ giảm áp trên đường dây',
        calculation: '\\Delta U = I \\cdot R = 10 \\times 0{,}85 = 8{,}5\\,\\text{V}',
        result: 'Độ sụt thế do dây dẫn gây ra là $8{,}5\\,\\text{V}$.'
      }
    ]
  }
];
