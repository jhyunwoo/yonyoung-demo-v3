// 활동 데이터
const activitiesData = [
  {
    id: 1768674807800,
    title: "한빛 운동회 봉사활동",
    date: "2025.05.10",
    coverImage: "../public/images/gallery/1768674807789_KakaoTalk_20260118_031201964_11.jpg",
    images: [
      "../public/images/gallery/1768674807789_KakaoTalk_20260118_031201964_11.jpg"
    ]
  },
  {
    id: 1,
    title: "출사",
    date: "2025.05.01",
    coverImage: "../public/images/banner/김세헌_0025.jpg",
    images: [
      "../public/images/banner/김세헌_0025.jpg"
    ]
  },
  {
    id: 1768673770475,
    title: "대동제",
    date: "2025.05.25",
    coverImage: "../public/images/gallery/1768673770455_KakaoTalk_20260118_031201964_09.jpg",
    images: [
      "../public/images/gallery/1768673770455_KakaoTalk_20260118_031201964_09.jpg",
      "../public/images/gallery/1768740012887_0_KakaoTalk_20260118_031201964_06.jpg",
      "../public/images/gallery/1768740012888_1_KakaoTalk_20260118_031201964_07.jpg",
      "../public/images/gallery/1768740012888_2_KakaoTalk_20260118_031201964_08.jpg"
    ]
  },
  {
    id: 1768673631553,
    title: "달나라 출사",
    date: "2026.01.18",
    coverImage: "../public/images/gallery/1768673631532_KakaoTalk_20260118_031201964_01.jpg",
    images: [
      "../public/images/gallery/1768673631532_KakaoTalk_20260118_031201964_01.jpg"
    ]
  },
  {
    id: 1768674722985,
    title: "60기 정기 MT",
    date: "2025.06.26",
    coverImage: "../public/images/gallery/1768674722980_KakaoTalk_20260118_031201964_05.jpg",
    images: [
      "../public/images/gallery/1768674722980_KakaoTalk_20260118_031201964_05.jpg",
      "../public/images/gallery/1768739980602_0_KakaoTalk_20260118_031201964_02.jpg",
      "../public/images/gallery/1768739980602_1_KakaoTalk_20260118_031201964_03.jpg",
      "../public/images/gallery/1768739980603_2_KakaoTalk_20260118_031201964_04.jpg"
    ]
  },
  {
    id: 1768674837490,
    title: "60기 5조 가족제 출사",
    date: "2025.05.15",
    coverImage: "../public/images/gallery/1768674837486_KakaoTalk_20260118_031201964_10.jpg",
    images: [
      "../public/images/gallery/1768674837486_KakaoTalk_20260118_031201964_10.jpg"
    ]
  }
];

// 전시회 데이터
const exhibitionsData = [
  {
    id: 1768676006199,
    title: "연영회 60주년 특별 전시회: 피곤하다",
    date: "2026.10.01 ~ 2026.10.05",
    location: "연세대학교 교육과학관 교수학습자료실",
    images: [
      "../public/images/exhibitions/1768676006170_김세헌_신인전_2주차_3.jpg",
      "../public/images/exhibitions/1768739793219_0_DSC_2439.jpg",
      "../public/images/exhibitions/1768739793220_1_DSC_1713.jpg",
      "../public/images/exhibitions/1768739793220_2_DSC_2156.jpg",
      "../public/images/exhibitions/1768739793221_3_DSC_2196.jpg",
      "../public/images/exhibitions/1768739793221_4_DSC_2343.jpg"
    ]
  },
  {
    id: 1,
    title: "60기 신인사진전: 선(線) 보이다",
    date: "2026.02.12 ~ 2026.02.14",
    location: "연세대학교 백양누리 무악로타리홀",
    images: ["../public/images/exhibitions/DSC_3543.jpg"]
  },
  {
    id: 2,
    title: "59회 정기사진전",
    date: "2025.11.10 ~ 2025.11.15",
    location: "무악 1학사",
    images: ["../public/images/exhibitions/DSC_3655.jpg"]
  },
  {
    id: 3,
    title: "59기 신인사진전",
    date: "2025.03.12 ~ 2025.03.17",
    location: "백양누리 무악로타리홀",
    images: ["../public/images/exhibitions/DSC_3717.jpg"]
  },
  {
    id: 4,
    title: "58회 정기사진전",
    date: "2024.11.20 ~ 2024.11.25",
    location: "김민재 집 안방",
    images: ["../public/images/exhibitions/DSC_3393.jpg"]
  },
  {
    id: 5,
    title: "58기 신인사진전",
    date: "2024.03.10 ~ 2024.03.15",
    location: "백양누리 무악로타리홀",
    images: ["../public/images/exhibitions/DSC_2633-2.jpg"]
  },
  {
    id: 6,
    title: "57회 정기사진전",
    date: "2023.11.15 ~ 2023.11.20",
    location: "수원 왕갈비통닭 갤러리",
    images: ["../public/images/exhibitions/IMG_6137.jpg"]
  }
];

// About 데이터
const aboutData = {
  activities: [
    { month: "3월", title: "신입 부원 모집" },
    { month: "5월", title: "대동제 보도사진전" },
    { month: "6월", title: "정기 MT" },
    { month: "8월", title: "정기 사진전" },
    { month: "9월", title: "연고전 보도사진전" },
    { month: "2월", title: "신인 사진전" }
  ],
  history: [
    { year: "1966", title: "연영회 창립" },
    { year: "2025", title: "YCAM 활동 시작 (연세대학교 홍보팀 협업)" },
    { year: "2026", title: "연영회 창립 60주년" }
  ]
};

// Linktree 데이터
const linktreeData = [
  {
    title: "Instagram",
    url: "https://instagram.com/yonyongpage",
    icon: "📷"
  },
  {
    title: "카카오톡 오픈채팅",
    url: "https://open.kakao.com/o/snVWZ4th",
    icon: "💬"
  },
  {
    title: "YouTube",
    url: "https://youtube.com/@yonyong",
    icon: "▶️"
  }
];

// 사진작가 데이터 (photographers.html에서 별도 정의)

// LocalStorage 키
const STORAGE_KEYS = {
  ACTIVITIES: 'mockup_activities',
  EXHIBITIONS: 'mockup_exhibitions',
  HERO_BG: 'mockup_hero_bg',
  ADMIN_MODE: 'mockup_admin_mode'
};

// 데이터 로드 함수
function loadData(key, defaultData) {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return defaultData;
    }
  }
  return defaultData;
}

// 데이터 저장 함수
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// 활동 데이터 가져오기
function getActivities() {
  return loadData(STORAGE_KEYS.ACTIVITIES, activitiesData);
}

// 활동 데이터 저장하기
function saveActivities(data) {
  saveData(STORAGE_KEYS.ACTIVITIES, data);
}

// 전시회 데이터 가져오기
function getExhibitions() {
  return loadData(STORAGE_KEYS.EXHIBITIONS, exhibitionsData);
}

// 전시회 데이터 저장하기
function saveExhibitions(data) {
  saveData(STORAGE_KEYS.EXHIBITIONS, data);
}

// Hero 배경 이미지 가져오기
function getHeroBg() {
  return localStorage.getItem(STORAGE_KEYS.HERO_BG) || "../KakaoTalk_20260206_205347389_01.png";
}

// Hero 배경 이미지 저장하기
function saveHeroBg(dataUrl) {
  localStorage.setItem(STORAGE_KEYS.HERO_BG, dataUrl);
}

// 관리자 모드 상태 가져오기
function getAdminMode() {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_MODE) === 'true';
}

// 관리자 모드 상태 저장하기
function setAdminMode(value) {
  localStorage.setItem(STORAGE_KEYS.ADMIN_MODE, String(value));
}
