export interface LessonStage {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  conceptSummary: string;
  content: {
    heading: string;
    points: string[];
    highlightBox?: {
      title: string;
      content: string;
      type: 'tip' | 'formula' | 'warning' | 'fact';
    };
    formulas?: {
      label: string;
      latex: string;
      description: string;
    }[];
  };
  interactiveSimulation?: 'circuit' | 'graph' | 'wire';
  checkQuestion: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const LESSON_STAGES: LessonStage[] = [
  {
    id: 'stage-1',
    title: '1. Điện trở là gì?',
    subtitle: 'Khái niệm & Bản chất cản trở dòng điện',
    badge: 'Khái niệm cơ bản',
    conceptSummary: 'Điện trở biểu thị mức độ cản trở dòng điện nhiều hay ít của một vật dẫn điện.',
    content: {
      heading: 'Bản chất của điện trở trong mạch điện',
      points: [
        'Mọi vật dẫn điện đều có tác dụng **cản trở dòng điện** ở các mức độ khác nhau.',
        'Khi các electron tự do dịch chuyển qua vật dẫn, chúng va chạm liên tục với các ion ở nút mạng tinh thể, làm cản trở dòng chuyển động đó.',
        'Đại lượng đặc trưng cho tính cản trở dòng điện của vật dẫn gọi là **Điện trở** (kí hiệu là $R$).',
        'Vật dẫn có điện trở càng lớn thì khả năng cản trở dòng điện càng mạnh (dòng điện chạy qua càng nhỏ).'
      ],
      highlightBox: {
        title: 'Ký hiệu trong sơ đồ mạch điện',
        content: 'Điện trở thường được ký hiệu hình chữ nhật hoặc đường zíc-zắc kèm theo chữ $R$. Ký hiệu đơn vị là $\\Omega$ (Ohm - Ôm).',
        type: 'tip'
      },
      formulas: [
        {
          label: 'Ký hiệu & Đơn vị điện trở',
          latex: 'R = \\frac{U}{I} \\quad [\\Omega]',
          description: 'R là điện trở, đơn vị là Ôm (kí hiệu: Ω).'
        }
      ]
    },
    interactiveSimulation: 'circuit',
    checkQuestion: {
      id: 'chk-1',
      question: 'Khi thay thế một điện trở $R_1 = 10\\,\\Omega$ bằng điện trở $R_2 = 30\\,\\Omega$ trong cùng một mạch điện thì khả năng cản trở dòng điện của đoạn mạch sẽ như thế nào?',
      options: [
        'Giảm đi 3 lần',
        'Tăng lên 3 lần',
        'Không thay đổi',
        'Giảm về 0'
      ],
      correctIndex: 1,
      explanation: 'Điện trở đặc trưng cho mức độ cản trở dòng điện. $R_2 = 30\\,\\Omega$ lớn gấp 3 lần $R_1 = 10\\,\\Omega$, do đó tác dụng cản trở dòng điện tăng lên 3 lần.'
    }
  },
  {
    id: 'stage-2',
    title: '2. U và I thay đổi như thế nào?',
    subtitle: 'Mối liên hệ thực nghiệm giữa Hiệu điện thế & Cường độ dòng điện',
    badge: 'Thực nghiệm vật lí',
    conceptSummary: 'Với một đoạn dây dẫn xác định, cường độ dòng điện I tỉ lệ thuận với hiệu điện thế U đặt vào hai đầu dây.',
    content: {
      heading: 'Khảo sát thực nghiệm mạch điện',
      points: [
        'Khi tăng hiệu điện thế $U$ giữa hai đầu dây dẫn, các electron chuyển động có hướng nhanh và mạnh hơn, làm cường độ dòng điện $I$ tăng theo.',
        'Khi $U$ tăng (hoặc giảm) bao nhiêu lần thì $I$ cũng tăng (hoặc giảm) bấy nhiêu lần.',
        'Thương số $\\frac{U}{I}$ đối với một dây dẫn xác định là một hằng số không đổi (chính là giá trị điện trở $R$ của dây dẫn đó).'
      ],
      highlightBox: {
        title: 'Quy luật tỉ lệ thuận',
        content: '$\\frac{U_1}{I_1} = \\frac{U_2}{I_2} = R \\implies \\frac{U_1}{U_2} = \\frac{I_1}{I_2}$',
        type: 'formula'
      },
      formulas: [
        {
          label: 'Tỉ số thực nghiệm',
          latex: '\\frac{U_1}{U_2} = \\frac{I_1}{I_2}',
          description: 'Cường độ dòng điện tỉ lệ thuận với hiệu điện thế đặt vào hai đầu dây.'
        }
      ]
    },
    interactiveSimulation: 'circuit',
    checkQuestion: {
      id: 'chk-2',
      question: 'Khi đặt vào hai đầu dây dẫn hiệu điện thế $6\\,\\text{V}$ thì dòng điện qua dây là $0{,}3\\,\\text{A}$. Nếu tăng hiệu điện thế lên $12\\,\\text{V}$ thì cường độ dòng điện qua dây là bao nhiêu?',
      options: [
        '0,15 A',
        '0,3 A',
        '0,6 A',
        '1,2 A'
      ],
      correctIndex: 2,
      explanation: 'Vì $I$ tỉ lệ thuận với $U$, khi hiệu điện thế tăng từ $6\\,\\text{V}$ lên $12\\,\\text{V}$ (gấp 2 lần) thì cường độ dòng điện cũng tăng 2 lần: $I_2 = 0{,}3 \\times 2 = 0{,}6\\,\\text{A}$.'
    }
  },
  {
    id: 'stage-3',
    title: '3. Khám phá đồ thị I - U',
    subtitle: 'Đường đặc trưng Vôn - Ampe',
    badge: 'Biểu diễn đồ thị',
    conceptSummary: 'Đồ thị biểu diễn mối quan hệ giữa I và U là một đường thẳng đi qua gốc tọa độ O(0,0).',
    content: {
      heading: 'Đặc điểm đường đặc trưng I - U',
      points: [
        'Trục hoành biểu diễn hiệu điện thế $U$ (đơn vị V), trục tung biểu diễn cường độ dòng điện $I$ (đơn vị A).',
        'Khi $U = 0$ thì $I = 0$, do đó đồ thị luôn đi qua gốc tọa độ $O(0,0)$.',
        'Dạng đồ thị là một **đường thẳng**, chứng minh mối quan hệ tỉ lệ thuận giữa $I$ và $U$.',
        'Độ dốc của đường thẳng biểu thị giá trị dẫn điện $\\frac{1}{R}$. Dây có điện trở $R$ càng nhỏ thì đường đồ thị càng dốc đứng (nghiêng về trục I).'
      ],
      highlightBox: {
        title: 'Mẹo đọc đồ thị',
        content: 'Cùng một giá trị $U$, dây dẫn nào cho dòng điện $I$ lớn hơn thì dây đó có điện trở $R$ nhỏ hơn!',
        type: 'fact'
      },
      formulas: [
        {
          label: 'Hệ số góc đồ thị',
          latex: 'k = \\frac{I}{U} = \\frac{1}{R}',
          description: 'Hệ số góc càng lớn thì điện trở $R$ càng nhỏ.'
        }
      ]
    },
    interactiveSimulation: 'graph',
    checkQuestion: {
      id: 'chk-3',
      question: 'Đồ thị biểu diễn sự phụ thuộc của cường độ dòng điện $I$ vào hiệu điện thế $U$ của một đoạn dây dẫn có dạng là:',
      options: [
        'Một đường cong parabol đi qua gốc tọa độ',
        'Một đường thẳng đi qua gốc tọa độ',
        'Một đường thẳng song song với trục hoành U',
        'Một đường cong hyperbol không qua gốc'
      ],
      correctIndex: 1,
      explanation: 'Vì $I$ tỉ lệ thuận với $U$, đồ thị $I - U$ là một đường thẳng đi qua gốc tọa độ $O(0,0)$.'
    }
  },
  {
    id: 'stage-4',
    title: '4. Định luật Ohm',
    subtitle: 'Nội dung cốt lõi của Bài 11 KHTN 9',
    badge: 'Định luật cốt lõi',
    conceptSummary: 'Cường độ dòng điện chạy qua dây dẫn tỉ lệ thuận với hiệu điện thế giữa hai đầu dây và tỉ lệ nghịch với điện trở của dây.',
    content: {
      heading: 'Phát biểu và công thức toán học',
      points: [
        'Nhà vật lí học người Đức Georg Simon Ohm (1789–1854) đã khám phá ra định luật mang tên ông.',
        '**Nội dung:** Cường độ dòng điện chạy qua dây dẫn tỉ lệ thuận với hiệu điện thế giữa hai đầu dây và tỉ lệ nghịch với điện trở của dây.',
        'Từ công thức gốc, ta có thể suy ra cách tính hiệu điện thế $U$ hoặc điện trở $R$ dễ dàng thông qua "Tam giác Ohm" thần thánh.'
      ],
      highlightBox: {
        title: 'Quy tắc Tam Giác Ohm',
        content: 'Che đại lượng cần tìm:\n• Che I $\\implies I = \\frac{U}{R}$\n• Che U $\\implies U = I \\cdot R$\n• Che R $\\implies R = \\frac{U}{I}$',
        type: 'formula'
      },
      formulas: [
        {
          label: 'Công thức Định luật Ohm',
          latex: 'I = \\frac{U}{R}',
          description: 'I đo bằng Ampe (A), U đo bằng Vôn (V), R đo bằng Ôm (Ω).'
        },
        {
          label: 'Tính Hiệu điện thế',
          latex: 'U = I \\cdot R',
          description: 'Hiệu điện thế giữa hai đầu điện trở.'
        },
        {
          label: 'Tính Điện trở',
          latex: 'R = \\frac{U}{I}',
          description: 'Giá trị điện trở của đoạn dây dẫn.'
        }
      ]
    },
    interactiveSimulation: 'circuit',
    checkQuestion: {
      id: 'chk-4',
      question: 'Một bóng đèn có điện trở $R = 24\\,\\Omega$, được mắc vào nguồn điện có hiệu điện thế $U = 12\\,\\text{V}$. Cường độ dòng điện qua bóng đèn là:',
      options: [
        '2 A',
        '0,5 A',
        '288 A',
        '12 A'
      ],
      correctIndex: 1,
      explanation: 'Áp dụng định luật Ohm: $I = \\frac{U}{R} = \\frac{12}{24} = 0{,}5\\,\\text{A}$.'
    }
  },
  {
    id: 'stage-5',
    title: '5. Đơn vị điện trở',
    subtitle: 'Ôm (Ω) và các ước số, bội số thường gặp',
    badge: 'Đơn vị đo lường',
    conceptSummary: '1 Ôm (1 Ω) là điện trở của một vật dẫn khi đặt vào hai đầu hiệu điện thế 1 V thì có dòng điện 1 A chạy qua.',
    content: {
      heading: 'Hệ đơn vị Ôm và quy đổi',
      points: [
        'Đơn vị của điện trở là **Ôm** (kí hiệu: $\\Omega$).',
        'Định nghĩa: $1\\,\\Omega = \\frac{1\\,\\text{V}}{1\\,\\text{A}}$.',
        'Trong thực tế đời sống và kĩ thuật điện tử, người ta còn dùng các bội số lớn hơn như kilôôm ($k\\Omega$) và mêgaôm ($M\\Omega$).',
        'Cũng có thể gặp milixôm ($m\\Omega$) khi đo các vật dẫn điện cực tốt.'
      ],
      highlightBox: {
        title: 'Bảng quy đổi đơn vị cần nhớ',
        content: '• $1\\,\\text{k}\\Omega = 1\\,000\\,\\Omega = 10^3\\,\\Omega$\n• $1\\,\\text{M}\\Omega = 1\\,000\\,000\\,\\Omega = 10^6\\,\\Omega$\n• $1\\,\\Omega = 0{,}001\\,\\text{k}\\Omega = 10^{-3}\\,\\text{k}\\Omega$',
        type: 'tip'
      },
      formulas: [
        {
          label: 'Quan hệ thứ nguyên',
          latex: '1\\,\\Omega = \\frac{1\\,\\text{V}}{1\\,\\text{A}}',
          description: 'Định nghĩa đơn vị Ôm.'
        }
      ]
    },
    interactiveSimulation: 'circuit',
    checkQuestion: {
      id: 'chk-5',
      question: 'Một điện trở ghi giá trị $0{,}47\\,\\text{k}\\Omega$. Giá trị này tương ứng với bao nhiêu Ôm ($\\Omega$)?',
      options: [
        '4,7 Ω',
        '47 Ω',
        '470 Ω',
        '4700 Ω'
      ],
      correctIndex: 2,
      explanation: 'Đổi từ $\\text{k}\\Omega$ sang $\\Omega$: $0{,}47 \\times 1000 = 470\\,\\Omega$.'
    }
  },
  {
    id: 'stage-6',
    title: '6. Điện trở của dây dẫn',
    subtitle: 'Sự phụ thuộc vào chiều dài, tiết diện và vật liệu',
    badge: 'Bản chất vật lí',
    conceptSummary: 'Điện trở của một đoạn dây dẫn tỉ lệ thuận với chiều dài l, tỉ lệ nghịch với tiết diện S và phụ thuộc vào vật liệu làm dây.',
    content: {
      heading: 'Công thức tính điện trở dây dẫn',
      points: [
        '**Chiều dài $l$**: Dây càng dài, các electron chuyển động va chạm càng nhiều $\\implies$ điện trở càng lớn ($R \\propto l$).',
        '**Tiết diện $S$**: Tiết diện (độ dày) càng rộng, lối đi càng thông thoáng $\\implies$ điện trở càng nhỏ ($R \\propto \\frac{1}{S}$).',
        '**Vật liệu làm dây**: Mỗi chất liệu có cấu trúc nguyên tử khác nhau, đặc trưng bởi **điện trở suất $\\rho$** (đo bằng $\\Omega \\cdot \\text{m}$).',
        'Vật liệu có $\\rho$ nhỏ (như bạc, đồng, nhôm) dẫn điện tốt; vật liệu có $\\rho$ lớn (như niken-crôm) dùng làm dây mayso đốt nóng.'
      ],
      highlightBox: {
        title: 'Công thức quan trọng',
        content: '$$R = \\rho \\frac{l}{S}$$\n• $\\rho$: điện trở suất ($\\Omega \\cdot \\text{m}$)\n• $l$: chiều dài dây dẫn ($\\text{m}$)\n• $S$: tiết diện dây dẫn ($\\text{m}^2$)',
        type: 'formula'
      },
      formulas: [
        {
          label: 'Công thức điện trở dây dẫn',
          latex: 'R = \\rho \\frac{l}{S}',
          description: 'l tăng thì R tăng; S tăng thì R giảm; ρ tăng thì R tăng.'
        },
        {
          label: 'Tính tiết diện hình tròn',
          latex: 'S = \\pi \\cdot r^2 = \\frac{\\pi \\cdot d^2}{4}',
          description: 'r là bán kính, d là đường kính tiết diện dây.'
        }
      ]
    },
    interactiveSimulation: 'wire',
    checkQuestion: {
      id: 'chk-6',
      question: 'Nếu tăng chiều dài của một đoạn dây dẫn lên gấp đôi và giảm tiết diện của nó đi một nửa (giữ nguyên vật liệu) thì điện trở của đoạn dây sẽ:',
      options: [
        'Không thay đổi',
        'Tăng lên gấp đôi',
        'Tăng lên gấp 4 lần',
        'Giảm đi 4 lần'
      ],
      correctIndex: 2,
      explanation: 'Theo công thức $R = \\rho \\frac{l}{S}$, khi $l$ tăng 2 lần và $S$ giảm 2 lần thì $R\' = \\rho \\frac{2l}{S/2} = 4 \\rho \\frac{l}{S} = 4R$ (tăng 4 lần).'
    }
  },
  {
    id: 'stage-7',
    title: '7. Tổng kết & Sơ đồ kiến thức',
    subtitle: 'Hệ thống hóa toàn bộ Bài 11 KHTN 9',
    badge: 'Tổng kết bài học',
    conceptSummary: 'Ghi nhớ trọn vẹn Định luật Ohm và các công thức tính toán cốt lõi để chuẩn bị chinh phục các thử thách.',
    content: {
      heading: 'Ghi nhớ trọng tâm',
      points: [
        'Điện trở $R$ đặc trưng cho khả năng cản trở dòng điện của vật dẫn.',
        'Định luật Ohm: $I = \\frac{U}{R}$ (I tỉ lệ thuận với U, tỉ lệ nghịch với R).',
        'Đồ thị $I - U$ là một đường thẳng đi qua gốc toạ độ $O(0,0)$.',
        'Điện trở dây dẫn: $R = \\rho \\frac{l}{S}$ (phụ thuộc vào bản chất vật liệu $\\rho$, chiều dài $l$, tiết diện $S$).',
        'Đơn vị chuẩn: $U$ đo bằng Vôn (V), $I$ đo bằng Ampe (A), $R$ đo bằng Ôm ($\\Omega$), $\\rho$ đo bằng $\\Omega \\cdot \\text{m}$.'
      ],
      highlightBox: {
        title: 'Lời khuyên của Ohm Master',
        content: 'Hãy nhớ đổi đơn vị chuẩn trước khi tính toán: $1\\,\\text{mA} = 10^{-3}\\,\\text{A}$, $1\\,\\text{k}\\Omega = 10^3\\,\\Omega$, $1\\,\\text{mm}^2 = 10^{-6}\\,\\text{m}^2$!',
        type: 'tip'
      },
      formulas: [
        {
          label: 'Bộ 3 công thức vàng',
          latex: 'I = \\frac{U}{R} \\iff U = I \\cdot R \\iff R = \\frac{U}{I}',
          description: 'Hệ thống công thức biến đổi của Định luật Ohm.'
        },
        {
          label: 'Công thức dây dẫn',
          latex: 'R = \\rho \\frac{l}{S}',
          description: 'Tính điện trở theo kích thước hình học và vật liệu.'
        }
      ]
    },
    interactiveSimulation: 'circuit',
    checkQuestion: {
      id: 'chk-7',
      question: 'Để đo điện trở của một dụng cụ điện, người ta dùng vôn kế và ampe kế. Cách mắc đúng là:',
      options: [
        'Vôn kế mắc song song, Ampe kế mắc nối tiếp với dụng cụ điện',
        'Vôn kế mắc nối tiếp, Ampe kế mắc song song với dụng cụ điện',
        'Cả hai đều mắc nối tiếp với dụng cụ điện',
        'Cả hai đều mắc song song với dụng cụ điện'
      ],
      correctIndex: 0,
      explanation: 'Vôn kế đo hiệu điện thế nên phải mắc song song với hai đầu dụng cụ; Ampe kế đo cường độ dòng điện chạy qua nên phải mắc nối tiếp với dụng cụ.'
    }
  }
];
