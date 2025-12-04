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

export type ProjectTroubleshooting = {
  title: string;
  problem: string;
  analysis: string;
  solution: string;
};

export type Project = {
  name: string;
  period: string;
  coverImage?: string;
  video?: string;
  description: string;
  slug?: string;
  tags?: string[];
  skills?: string[];
  teamName?: string;
  member?: string;
  comment?: string;
  contributions?: string[];
  troubleshooting?: string[];
  troubleshootingDetails?: ProjectTroubleshooting[];
  links?: ProjectLink[];
};

export const PROJECTS: Project[] = [
  {
    name: '잇집 ITZIP',
    period: '2024.06 ~ 2025.03',
    slug: 'itzip',
    coverImage: '/images/itzip-cover.png',
    video: '',
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
    troubleshooting: [
      '만료된 토큰으로 인한 401 무한 루프 문제를 \u005fretry 플래그와 isRefreshing/refreshSubscribers 큐를 도입해 한 번만 토큰 갱신이 일어나도록 개선했습니다.',
      'secure, sameSite 옵션 오설정으로 인해 쿠키가 저장·전송되지 않던 문제를 환경별 옵션 분기와 TokenSync 컴포넌트를 통해 쿠키↔전역 상태 동기화로 해결했습니다.',
      '인증이 필요 없는 API에도 Authorization 헤더가 붙던 문제를 noAuth 커스텀 헤더를 도입해, 비인증/인증 API를 명확히 분리하는 방식으로 해결했습니다.',
    ],
    troubleshootingDetails: [
      {
        title: '401 무한 루프 & 토큰 갱신 문제',
        problem:
          '액세스 토큰 만료 후 API 요청 시 401이 발생하고, 동일 요청이 계속 재시도되면서 401 무한 루프가 발생했다.',
        analysis:
          '토큰이 만료된 요청을 인터셉터에서 다시 instance(originalRequest)로 호출하면서, \u005fretry 플래그나 isRefreshing 제어 없이 동일한 인터셉터 로직을 계속 타는 구조였다. 동시에 여러 요청이 401을 받으면 각 요청이 각각 리프레시 토큰으로 갱신을 시도했다.',
        solution:
          '요청 config에 \u005fretry 플래그를 추가해 한 번 갱신을 시도한 요청은 다시 갱신 로직을 타지 않도록 막고, isRefreshing 플래그와 refreshSubscribers 큐를 두어 첫 401 요청에서만 실제 리프레시를 호출하고 나머지 요청은 새 토큰을 받은 뒤 재시도하도록 구조를 변경했다.',
      },
      {
        title: '쿠키에 저장한 토큰이 안 보이거나 전송되지 않는 문제',
        problem:
          '로그인 후 토큰을 쿠키에 저장했음에도 새로고침 이후 일부 환경에서 토큰이 읽히지 않거나, API 요청 시 인증이 되지 않는 문제가 발생했다.',
        analysis:
          'secure, sameSite 옵션을 잘못 설정해 로컬 개발 환경에서 쿠키가 저장되지 않거나 전송되지 않는 경우가 있었고, 새로고침 시점에 쿠키 → 전역 상태(jotai) 동기화 타이밍을 고려하지 않아 초기 렌더링에는 토큰이 없는 상태로 요청이 나갔다.',
        solution:
          '개발/운영 환경에 따라 secure 옵션을 분기 처리하고 sameSite 설정을 재검토했으며, TokenSync 컴포넌트를 만들어 최초 렌더링 시 쿠키에서 토큰을 읽어와 jotai 상태에 동기화하도록 수정해 새로고침 이후에도 일관되게 토큰이 유지되도록 했다.',
      },
      {
        title: '인증이 필요 없는 API에 토큰이 붙어 에러가 나는 문제',
        problem:
          '회원가입, 이메일 중복 확인, 인증 코드 전송 등 인증이 필요 없는 API 호출에서도 Authorization 헤더가 항상 붙어 서버에서 인증 에러가 발생했다.',
        analysis:
          'axios 요청 인터셉터에서 모든 요청에 무조건 Authorization 헤더를 추가하고 있어서, 비로그인 상태에서 호출하는 비인증 API에도 잘못된 토큰이 함께 전송되고 있었다.',
        solution:
          'axios 인스턴스에 noAuth라는 커스텀 헤더를 정의하고, noAuth: true가 설정된 요청은 인터셉터에서 Authorization 헤더를 추가하지 않도록 분기 처리해 비인증/인증 API를 명확히 분리했다.',
      },
    ],
    links: [],
  },
  {
    name: 'Brandmarket | 외주',
    period: '2025.05 ~ 2025.07',
    slug: 'brandmarket',
    coverImage: '/images/brandmarket-cover.png',
    video: '/images/brandmarket-video.gif',
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
    troubleshooting: [
      '카카오맵이 해외(예: 베트남)에서 열리지 않던 문제를, 초기 진입 시 currentMarker를 고정 좌표로 설정해 매장 위치를 한눈에 보이도록 하고 국내 접속 시에만 현재 위치를 반영하는 방식으로 해결했습니다.',
      '카카오맵 JS API를 직접 커스텀하기 어려웠던 문제를 react-kakao-maps-sdk를 도입해 지도, 마커, 오버레이 커스텀을 단순화하는 방향으로 해결했습니다.',
    ],
    troubleshootingDetails: [
      {
        title: '카카오맵이 해외에서 열리지 않는 문제',
        problem:
          '외국(예: 베트남)에서 사이트 접속 시 카카오맵이 열리지 않아 매장 위치를 확인할 수 없었다.',
        analysis:
          '카카오맵 특성상 해외에서 초기 로딩이 원활하지 않고, 현재 위치 기반으로만 지도를 표시하는 구조라 국내가 아닌 위치에서는 매장들이 화면에 나타나지 않았다.',
        solution:
          '맵 진입 시 currentMarker를 고정된 좌표로 설정해 모든 매장이 한눈에 보이도록 하고, 국내에서 접속한 경우에만 현재 위치를 currentMarker로 설정해 거리 계산과 위치 기반 기능을 제공하도록 변경했다.',
      },
      {
        title: '카카오맵 API 커스텀 난이도 문제',
        problem:
          '순수 카카오맵 JS API를 사용해 지도, 마커, 오버레이를 구현하려 했으나, 리액트 컴포넌트 구조와 맞지 않아 원하는 수준의 커스텀을 하기가 어려웠다.',
        analysis:
          'DOM 기반의 기존 JS API를 리액트 상태/컴포넌트 구조와 직접 맞추려다 보니 코드 복잡도가 빠르게 증가했고, 재사용성과 유지보수성이 떨어지는 레이어가 생겼다.',
        solution:
          'react-kakao-maps-sdk를 도입해 지도, 마커, 오버레이를 리액트 컴포넌트로 다루도록 전환함으로써, props와 상태 기반으로 UI를 제어하고 커스텀할 수 있는 구조로 리팩터링했다.',
      },
    ],
  },
  {
    name: '스탭 알바 구인 사이트',
    period: '2025.11 ~ 2025.12',
    slug: 'staffmoa',
    coverImage: '/images/staffmoa-cover.png',
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
    troubleshooting: [
      '서버/클라이언트 렌더링 불일치로 Hydration 에러가 발생하던 문제를 isMounted 플래그와 useEffect를 활용해 클라이언트에서만 localStorage에 접근하도록 분리해 해결했습니다.',
      '모바일에서 카드 레이아웃이 깨지고 텍스트/여백이 어색하던 문제를 Tailwind 커스텀 브레이크포인트(mobile: 390px)와 Mobile-first 스타일링으로 개선했습니다.',
      '목록 스크롤과 화면 스크롤이 충돌하던 문제를, 모바일에서는 가로 스크롤 목록으로 변경하는 UX 수정으로 해결했습니다.',
      '달력 카드가 스크롤 시 수축되어 내용이 잘리던 문제를 h-full 제거와 min-h, CardContent 고정 높이 설정으로 안정적인 레이아웃을 확보하는 방식으로 해결했습니다.',
    ],
    troubleshootingDetails: [
      {
        title: 'Hydration 에러 문제',
        problem:
          '서버 렌더링과 클라이언트 렌더링 결과가 달라 Hydration 에러가 발생했다.',
        analysis:
          '클라이언트 전용 API인 localStorage에 서버 렌더링 단계에서 접근하면서 초기 렌더링 시점에 서버/클라이언트 상태가 달라졌다.',
        solution:
          'isMounted 상태를 두고 useEffect 안에서만 localStorage에 접근하도록 분리하여, 서버와 동일한 초기 상태로 렌더링한 뒤 클라이언트에서만 실제 상태를 동기화하도록 변경했다.',
      },
      {
        title: '모바일 레이아웃 깨짐 문제',
        problem:
          '모바일 환경에서 카드 레이아웃이 깨지고 텍스트 크기와 여백이 어색하게 보였다.',
        analysis:
          '데스크톱 기준으로 먼저 스타일을 잡고 모바일에 맞춰 축소하는 방식이라, 실제 모바일 뷰포트(특히 390px 기준)에서 요소들이 비율에 맞지 않게 줄어들었다.',
        solution:
          'Tailwind 커스텀 브레이크포인트(mobile: 390px)를 추가하고 Mobile-first 접근으로 기본을 모바일 스타일로 맞춘 뒤 sm:, md:로 확장해 반응형을 재설계했다.',
      },
      {
        title: '목록 스크롤과 화면 스크롤 충돌 문제',
        problem:
          '모바일에서 세로 스크롤 목록과 전체 화면 스크롤이 겹쳐 사용성이 떨어졌다.',
        analysis:
          '세로 스크롤 영역이 화면 높이와 겹치면서 터치 제스처가 어느 스크롤에 우선 적용될지 모호해졌다.',
        solution:
          '모바일에서는 목록을 가로 스크롤로 전환해 세로 스크롤은 페이지 전체, 가로 스크롤은 목록에만 적용되도록 UX를 분리했다.',
      },
      {
        title: '달력 카드 높이 수축 문제',
        problem:
          '모바일에서 스크롤 시 달력 카드의 높이가 수축되어 달력이 카드 영역을 넘치는 문제가 발생했다.',
        analysis:
          '달력 카드에 h-full을 사용해 부모 컨텍스트 변화에 따라 높이가 의도치 않게 줄어들었고, 내부 콘텐츠 높이를 고려하지 않은 고정 레이아웃이었다.',
        solution:
          'h-full을 제거하고 min-h-[360px], sm:min-h-[420px]와 CardContent 고정 높이를 설정해, 스크롤 상황에서도 달력이 안정적으로 표시되도록 수정했다.',
      },
    ],
  },
  {
    name: '일단 나와 (멋쟁이사자처럼 중앙 해커톤)',
    period: '2024.07 ~ 2024.08',
    slug: 'likelionton',
    coverImage: '/images/likelion-cover.png',
    video: '/images/likelion-video.gif',
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
    troubleshooting: [
      '구글 OAuth 딥링크 연동 시 iOS에서만 인증 후 앱이 열리지 않거나 쿼리 파라미터가 비어 있던 문제를, 리다이렉트 URL과 iOS URL Scheme을 통일하고 딥링크 쿼리 파싱 로직을 공통 유틸로 리팩터링해 해결했습니다.',
      '안드로이드·iOS 간 딥링크 포맷 차이로 인가 코드를 받지 못하던 문제를 공통 콜백 URL(myapp://oauth/callback) 설계와 백엔드 토큰 발급 플로우 전체 점검을 통해 안정화했습니다.',
    ],
    troubleshootingDetails: [
      {
        title: 'iOS에서 구글 OAuth 딥링크가 동작하지 않는 문제',
        problem:
          '안드로이드에서는 구글 OAuth 인증 후 앱으로 잘 돌아오지만, iOS에서는 브라우저에서 인증 완료 후 앱이 열리지 않거나, 열려도 쿼리 파라미터가 비어 있는 문제가 발생했다.',
        analysis:
          'iOS Info.plist에 등록한 URL Scheme 값과 실제 구글 OAuth 리다이렉트 URL의 스킴이 일치하지 않았고, 딥링크를 처리하는 쿼리 파라미터 파싱 로직이 안드로이드 포맷에만 맞춰져 있어 iOS에서 넘어오는 URL을 제대로 처리하지 못했다.',
        solution:
          '구글 콘솔과 서버에 등록된 리다이렉트 URL을 myapp://oauth/callback 형식으로 통일하고, iOS Info.plist의 URL Types에 동일한 스킴과 호스트를 등록했다. 이후 딥링크 수신 로직을 공통 유틸 함수로 리팩터링해 myapp://oauth/callback?code=...&state=... 형태를 양 플랫폼에서 동일하게 파싱하도록 수정했다.',
      },
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
