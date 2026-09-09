export interface MindmapBranch {
  id: string;
  name: string;
  color: string;
  icon: string;
  summary: string;
  formula?: string;
  subBranches: {
    id: string;
    title: string;
    description: string;
    formula?: string;
  }[];
}

export interface MindmapQuizItem {
  id: string;
  branchId: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  positionDesc: string;
}

export const MINDMAP_DATA: {
  root: string;
  description: string;
  branches: MindmapBranch[];
} = {
  root: 'BÀI 11 – ĐIỆN TRỞ & ĐỊNH LUẬT OHM',
  description: 'Hệ thống hóa toàn diện kiến thức Bài 11 theo các nhánh tư duy logic.',
  branches: [
    {
      id: 'branch-resistor',
      name: 'Điện trở',
      color: 'blue',
      icon: 'Zap',
      summary: 'Khái niệm, tác dụng cản trở dòng điện và ký hiệu trong sơ đồ mạch điện.',
      formula: 'R',
      subBranches: [
        {
          id: 'res-1',
          title: 'Tác dụng cản trở',
          description: 'Cản trở dòng điện của vật dẫn; điện trở càng lớn thì dòng điện chạy qua càng nhỏ.'
        },
        {
          id: 'res-2',
          title: 'Bản chất vật lí',
          description: 'Sự va chạm của các electron tự do với các ion tại nút mạng tinh thể kim loại.'
        },
        {
          id: 'res-3',
          title: 'Ký hiệu sơ đồ',
          description: 'Hình chữ nhật hoặc đường răng cưa zíc-zắc kèm ký hiệu chữ R.'
        }
      ]
    },
    {
      id: 'branch-ui',
      name: 'U và I',
      color: 'indigo',
      icon: 'Activity',
      summary: 'Mối quan hệ thực nghiệm giữa hiệu điện thế và cường độ dòng điện.',
      formula: '\\frac{U_1}{U_2} = \\frac{I_1}{I_2}',
      subBranches: [
        {
          id: 'ui-1',
          title: 'Tỉ lệ thuận',
          description: 'Cường độ dòng điện I tỉ lệ thuận với hiệu điện thế U giữa hai đầu vật dẫn.'
        },
        {
          id: 'ui-2',
          title: 'Đồ thị I - U',
          description: 'Là đường thẳng đi qua gốc tọa độ O(0,0). Khi U = 0 thì I = 0.'
        },
        {
          id: 'ui-3',
          title: 'Ý nghĩa độ dốc',
          description: 'Độ dốc (hệ số góc) k = I/U = 1/R; đồ thị càng dốc thì điện trở R càng nhỏ.'
        }
      ]
    },
    {
      id: 'branch-ohm',
      name: 'Định luật Ohm',
      color: 'cyan',
      icon: 'Cpu',
      summary: 'Định luật nền tảng liên hệ trực tiếp giữa I, U và R trong đoạn mạch.',
      formula: 'I = \\frac{U}{R}',
      subBranches: [
        {
          id: 'ohm-1',
          title: 'Phát biểu định luật',
          description: 'I tỉ lệ thuận với hiệu điện thế U và tỉ lệ nghịch với điện trở R của đoạn dây.'
        },
        {
          id: 'ohm-2',
          title: 'Công thức gốc',
          description: 'Cường độ dòng điện I = U / R',
          formula: 'I = \\frac{U}{R}'
        },
        {
          id: 'ohm-3',
          title: 'Các hệ quả biến đổi',
          description: 'U = I · R (tính hiệu điện thế), R = U / I (tính điện trở).',
          formula: 'U = I \\cdot R \\quad ; \\quad R = \\frac{U}{I}'
        }
      ]
    },
    {
      id: 'branch-wire',
      name: 'Dây dẫn',
      color: 'amber',
      icon: 'Sliders',
      summary: 'Sự phụ thuộc của điện trở vào kích thước hình học và vật liệu làm dây.',
      formula: 'R = \\rho\\frac{l}{S}',
      subBranches: [
        {
          id: 'wire-1',
          title: 'Chiều dài l',
          description: 'Điện trở R tỉ lệ thuận với chiều dài l của dây dẫn (l tăng bao nhiêu lần thì R tăng bấy nhiêu).'
        },
        {
          id: 'wire-2',
          title: 'Tiết diện S',
          description: 'Điện trở R tỉ lệ nghịch với tiết diện ngang S của dây (dây càng to thì R càng nhỏ).'
        },
        {
          id: 'wire-3',
          title: 'Điện trở suất ρ',
          description: 'Đặc trưng cho vật liệu làm dây (đo bằng Ω·m). Dẫn điện tốt: Bạc, Đồng, Nhôm.'
        }
      ]
    },
    {
      id: 'branch-unit',
      name: 'Đơn vị',
      color: 'emerald',
      icon: 'Award',
      summary: 'Hệ thống đơn vị chuẩn SI và quy tắc chuyển đổi các đại lượng vật lí.',
      formula: '1\\,\\Omega = \\frac{1\\,\\text{V}}{1\\,\\text{A}}',
      subBranches: [
        {
          id: 'unit-1',
          title: 'Đơn vị Ôm (Ω)',
          description: '1 Ω = 1 V / 1 A, mang tên nhà bác học Georg Simon Ohm.'
        },
        {
          id: 'unit-2',
          title: 'Bội số thường gặp',
          description: '1 kΩ = 1.000 Ω (10³ Ω); 1 MΩ = 1.000.000 Ω (10⁶ Ω).'
        },
        {
          id: 'unit-3',
          title: 'Đơn vị khác',
          description: 'Hiệu điện thế: Vôn (V); Cường độ dòng điện: Ampe (A); Điện trở suất: Ω·m.'
        }
      ]
    },
    {
      id: 'branch-app',
      name: 'Ứng dụng',
      color: 'purple',
      icon: 'Lightbulb',
      summary: 'Ứng dụng thực tế của điện trở và định luật Ohm trong đời sống & kỹ thuật.',
      formula: 'R_{\\text{tt}}',
      subBranches: [
        {
          id: 'app-1',
          title: 'Biến trở điều khiển',
          description: 'Thay đổi điện trở để điều chỉnh cường độ dòng điện (chiết áp quạt, đèn học mờ dần).'
        },
        {
          id: 'app-2',
          title: 'Bộ phận đốt nóng',
          description: 'Dây mayso trong bàn là, ấm đun nước, bếp điện làm từ hợp kim nicrom có điện trở suất lớn.'
        },
        {
          id: 'app-3',
          title: 'Bảo vệ mạch điện',
          description: 'Điện trở hạn dòng bảo vệ đèn LED, linh kiện nhạy cảm khỏi bị cháy hỏng.'
        }
      ]
    }
  ]
};

export const MINDMAP_QUIZ_QUESTIONS: MindmapQuizItem[] = [
  {
    id: 'mm-q1',
    branchId: 'branch-resistor',
    prompt: 'Trong sơ đồ tư duy, nhánh "Điện trở" thể hiện đại lượng đặc trưng cho tính chất nào của vật dẫn?',
    options: [
      'Mức độ cản trở dòng điện',
      'Khả năng sinh ra dòng điện',
      'Khả năng tích điện của vật',
      'Vận tốc truyền sóng điện từ'
    ],
    correctAnswer: 'Mức độ cản trở dòng điện',
    explanation: 'Điện trở đặc trưng cho mức độ cản trở dòng điện của vật dẫn. Kí hiệu là R, đơn vị là Ôm (Ω).',
    positionDesc: 'Nhánh Điện trở -> Khái niệm'
  },
  {
    id: 'mm-q2',
    branchId: 'branch-ui',
    prompt: 'Trong nhánh "U và I", đồ thị biểu diễn mối quan hệ giữa I và U có dạng hình học là gì?',
    options: [
      'Đường thẳng đi qua gốc tọa độ O(0,0)',
      'Đường cong elip',
      'Đường gấp khúc không quy luật',
      'Đường tròn tiếp xúc hai trục'
    ],
    correctAnswer: 'Đường thẳng đi qua gốc tọa độ O(0,0)',
    explanation: 'Vì I tỉ lệ thuận với U, đồ thị I - U là một đường thẳng đi qua gốc tọa độ.',
    positionDesc: 'Nhánh U và I -> Đồ thị I - U'
  },
  {
    id: 'mm-q3',
    branchId: 'branch-ohm',
    prompt: 'Điền vào chỗ trống trong nhánh "Định luật Ohm": Công thức tính cường độ dòng điện I theo định luật Ohm là: [ ... ]',
    options: [
      'I = U / R',
      'I = U · R',
      'I = R / U',
      'I = U² / R'
    ],
    correctAnswer: 'I = U / R',
    explanation: 'Công thức định luật Ohm là I = U / R: I tỉ lệ thuận với U và tỉ lệ nghịch với R.',
    positionDesc: 'Nhánh Định luật Ohm -> Công thức'
  },
  {
    id: 'mm-q4',
    branchId: 'branch-wire',
    prompt: 'Nhánh "Dây dẫn" nêu công thức tính điện trở của dây dẫn hình trụ đồng chất là:',
    options: [
      'R = ρ · l / S',
      'R = ρ · S / l',
      'R = l / (ρ · S)',
      'R = ρ · l · S'
    ],
    correctAnswer: 'R = ρ · l / S',
    explanation: 'R = ρ · l / S. Trong đó l là chiều dài, S là tiết diện, ρ là điện trở suất.',
    positionDesc: 'Nhánh Dây dẫn -> Công thức R'
  },
  {
    id: 'mm-q5',
    branchId: 'branch-unit',
    prompt: 'Nhánh "Đơn vị" nêu quy đổi nào sau đây là CHÍNH XÁC?',
    options: [
      '1 kΩ = 1.000 Ω',
      '1 kΩ = 100 Ω',
      '1 MΩ = 1.000 Ω',
      '1 Ω = 1.000 kΩ'
    ],
    correctAnswer: '1 kΩ = 1.000 Ω',
    explanation: 'Tiền tố kilo (k) tương ứng với 10³ = 1.000, do đó 1 kΩ = 1.000 Ω.',
    positionDesc: 'Nhánh Đơn vị -> Bội số'
  },
  {
    id: 'mm-q6',
    branchId: 'branch-app',
    prompt: 'Nhánh "Ứng dụng" cho biết thiết bị nào dùng để điều chỉnh cường độ dòng điện trong mạch nhờ thay đổi điện trở?',
    options: [
      'Biến trở',
      'Vôn kế',
      'Ampe kế',
      'Nguồn điện pin'
    ],
    correctAnswer: 'Biến trở',
    explanation: 'Biến trở là điện trở có thể thay đổi trị số, dùng để điều chỉnh cường độ dòng điện trong mạch.',
    positionDesc: 'Nhánh Ứng dụng -> Biến trở'
  }
];
