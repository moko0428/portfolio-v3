export const INTRO = {
  name: '이준영',
  englishName: 'Junyoung Lee',
  title: 'Frontend Developer',
  description: [
    '저는 AI 시대에, AI를 대체제가 아닌 “도구”로 활용하는 프론트엔드 개발자가 되고 싶습니다.',
    '반복적이거나 소모적인 작업은 AI에게 맡기고, 저는 문제 정의와 설계, 사용자 경험에 더 집중함으로써, 하고자 하는 것에 더 많은 에너지를 쓰고 최상의 컨디션을 유지하는 것을 목표로 합니다.',
  ],
  image: '/images/profile.jpg',
  links: [
    {
      label: 'GitHub',
      url: 'https://github.com/moko0428',
    },
    // 필요하다면 여기에 LinkedIn, Velog 등을 추가할 수 있습니다.
  ],
};

export type StackCategory = {
  category: string;
  items: string[];
};

export const STACKS: StackCategory[] = [
  {
    category: 'Frontend',
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Shadcn/UI',
      'Framer Motion',
      'Supabase',
      'Git',
      'Notion',
      'Vercel',
      'Cursor',
      'Figma',
    ],
  },
];

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  name: string;
  period: string;
  description: string;
  slug?: string;
  tags?: string[];
  skills?: string[];
  teamName?: string;
  member?: string;
  comment?: string;
  contributions?: string[];
  links?: ProjectLink[];
};

export const PROJECTS: Project[] = [
  {
    name: '포트폴리오 v3',
    period: '2025',
    description:
      '나를 가장 잘 설명할 수 있는 단일 페이지 포트폴리오입니다. 스크롤을 내리면서 자연스럽게 저를 알아갈 수 있도록 설계했습니다.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    name: '잇집 ITZIP',
    period: '2024.06 ~ 2025.03',
    slug: 'itzip',
    description:
      '개발자 취준생을 위한 종합 취업 준비 플랫폼으로, 블로그, 학습, 구인 정보 등을 제공하는 웹 서비스.',
    teamName: 'Itzip',
    member: 'fe 4명, be 5명, de 4명',
    comment:
      '프로그래머스 부트캠프를 수료하고 그곳에서 만난 사람들과 지인들로 구성되었고, 처음으로 많은 인원의 대규모 프로젝트를 경험할 수 있었습니다.',
    skills: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Jotai', 'Zod'],
    contributions: [
      '사용자 인증 플로우 구현',
      '사용자 프로필 관리 시스템 구현',
      '토큰 기반 자동 인증 갱신 시스템 구현',
    ],
    links: [],
  },
  {
    name: 'Brandmarket | 외주',
    period: '2025.05 ~ 2025.07',
    slug: 'brandmarket',
    description: '국내 brandmarket 여성 의류 매장 위치 공유 사이트.',
    teamName: '개인',
    member: '1인 개발',
    skills: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Supabase',
      'Kakao Maps SDK',
    ],
    links: [
      {
        label: '배포',
        url: 'https://brandmarket.vercel.app/',
      },
      {
        label: '블로그 시리즈',
        url: 'https://velog.io/@moko0428/series/%EB%82%98%EC%9D%98-%EC%B2%AB-%ED%92%80%EC%8A%A4%ED%83%9D-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B0%9C%EB%B0%9C%EC%9D%BC%EA%B8%B0',
      },
    ],
  },
  {
    name: '스탭 알바 구인 사이트',
    period: '2025.11 ~ 2025.12',
    slug: 'staffmoa',
    description:
      '이벤트 행사 스탭 알바 매칭 플랫폼으로, 매니저가 공고를 작성하고 일반 회원·비회원이 지원하며 관리자가 전체를 관리하는 구조의 서비스입니다.',
    teamName: '개인',
    member: '1인 개발',
    skills: ['Next.js 15', 'TypeScript', 'Tailwind CSS'],
    contributions: [
      '이벤트 스탭 공고/지원/관리 플로우를 역할 기반(RBAC)으로 설계',
      '스탭/매니저/관리자 각각의 주요 사용 시나리오를 반영한 화면/기능 설계',
      '반응형 UI와 Tailwind CSS를 활용한 카드·달력 뷰 기반 레이아웃 구현',
    ],
  },
  {
    name: '일단 나와 (멋쟁이사자처럼 중앙 해커톤)',
    period: '2024.07 ~ 2024.08',
    slug: 'likelionton',
    description:
      'react native 기반의 크로스플랫폼 모바일 서비스로, 위치·카메라·알림 권한을 활용해 사용자의 일상적인 외출 루틴을 돕는 앱입니다.',
    teamName: '독수리 오형제',
    member: 'fe 2, be 2, de 1',
    skills: ['JavaScript', 'React Native', 'Expo', 'React Context API'],
    contributions: [
      '온보딩 플로우 및 약관 동의·권한 허용 화면 전체 설계 및 구현',
      '위치/카메라/알림 권한 상태를 통합적으로 관리하는 Permission 플로우 설계',
      '구글 OAuth 기반 소셜 로그인 구현 및 딥링크를 활용한 인증 플로우 구축',
    ],
  },
];

export type Study = {
  title: string;
  period?: string;
  description: string | string[];
};

export const STUDIES: Study[] = [
  {
    title: '프론트엔드 기술 면접 스터디',
    period: '2023.09 - 2024.02',
    description: [
      'JavaScript, TypeScript, React 등 자신이 알고 있는 기술적 지식을 정리하며 질문, 답변하는 스터디입니다.',
      '매주 같은 질문에 대해서 다양한 시각으로 답변을 하며 서로에게 피드백을 주고 받으며 운영되었습니다.',
    ],
  },
  {
    title: '노마드코더의 웹 기초 스터디',
    period: '2023.06 - 2023.09',
    description: [
      '웹 기초를 배우며 HTML/CSS, JavaScript의 기초를 배울 수 있었습니다.',
      '일일 스프린트를 작성하며 매일 어떤 공부를 해야할지 계획하는 습관을 기를 수 있었습니다.',
    ],
  },
];

export const HOBBIES = [
  {
    label: '운동',
    description:
      '꾸준한 운동으로 에너지를 관리하고 집중력을 유지하는 것을 좋아합니다.',
  },
  {
    label: '드론 & 사진',
    description: '일상의 순간을 다른 시선에서 바라보며 기록하는 것을 즐깁니다.',
  },
  {
    label: '기록하기',
    description:
      '배운 것과 느낀 것을 글로 남기며 다음 시도를 더 좋게 만드는 것을 좋아합니다.',
  },
];

export const ACTIVITIES = [
  {
    title: '멋쟁이 사자처럼 12th 중앙 헤커톤',
    period: '2024.07.16 ~ 2024.07.18',
    content: '세종대 학생들과 함께 참여한 헤커톤 대회',
    description: [
      '프로그래머스 데브코스 서브멘토 활동 당시 멘티 중 한명과 함께 참여한 헤커톤 대회',
    ],
  },
  {
    title: '프로그래머스 데브코스',
    period: '2024.05 ~ 2024.09',
    content: 'Cloud Application Engineering Course - 서브멘토',
    description: [
      '프로그래머스 데브코스 1기를 수료하여 2기 서브멘토 활동을 진행하였습니다.',
    ],
  },
  {
    title: '프로그래머스 데브코스',
    period: '2023.12 ~ 2024.05',
    content: 'Cloud Application Engineering Course - 1기',
    description: ['react native를 활용한 실무 교육을 진행하였습니다.'],
  },
  {
    title: '2023 DMU 캡스톤 대회',
    period: '2023.10 ~ 2023.11',
    content: '대학교 졸업작품 대회',
    description: ['밀키터리 팀으로 참여하여 장려상을 수상하였습니다.'],
  },
  {
    title: '2022 DMU 캡스톤 대회',
    period: '2022.10 ~ 2022.11',
    content: '대학교 졸업작품 대회',
    description: ['유니티 기반 VR 공포 탈출 게임으로 장려상을 수상하였습니다.'],
  },
];
