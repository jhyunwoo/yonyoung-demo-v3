# 연영회 웹사이트 목업 프로젝트 인수인계 문서

## 📌 프로젝트 개요

연세대학교 중앙사진동아리 "연영회"의 웹사이트 목업입니다.
기존 Next.js 프로젝트(`C:\Users\kimse\Desktop\aeao`)를 참고하여 순수 HTML/CSS/JavaScript로 제작된 로컬 목업입니다.

### 목적
- 배포 없이 로컬에서 바로 확인 가능한 웹사이트 목업
- 관리자 모드를 통한 이미지 업로드 및 데이터 수정 기능
- LocalStorage를 활용한 데이터 영속성

---

## 📁 폴더 구조

```
mockup/
├── index.html          # 메인 페이지 (홈) - 연영회 소개 페이지 역할
├── about.html          # 연혁 페이지
├── photographers.html  # 사진가 목록 페이지
├── recruiting.html     # 모집 안내 페이지
├── records.html        # 활동 기록 페이지
├── exhibitions.html    # 전시회 페이지
├── linktree.html       # 링크트리 페이지
├── market.html         # 연영장터 페이지 (중고거래)
├── donate.html         # 후원 페이지
├── css/
│   ├── globals.css     # 전역 스타일 (변수, 리셋, 타이포그래피)
│   ├── navigation.css  # 네비게이션 스타일
│   ├── hero.css        # 히어로 섹션 스타일
│   ├── home.css        # 홈페이지 최신 활동 섹션
│   ├── footer.css      # 푸터 스타일
│   ├── about.css       # 연혁 페이지 스타일
│   ├── photographers.css # 사진가 페이지 스타일
│   ├── recruiting.css  # 모집 페이지 스타일
│   ├── records.css     # 활동 기록 스타일
│   ├── exhibitions.css # 전시회 스타일
│   ├── linktree.css    # 링크트리 스타일
│   └── donate.css      # 후원 페이지 스타일
├── js/
│   └── data.js         # 공통 데이터 및 유틸리티 함수
├── HANDOVER.md         # 인수인계 문서 (현재 파일)
└── README.md           # 사용 방법 안내
```

---

## 🗂️ 네비게이션 메뉴 구조

```
ABOUT (→ index.html)
├── 연영회 소개 (→ index.html)
├── 연혁 (→ about.html)
├── PHOTOGRAPHERS (→ photographers.html)
└── RECRUITING (→ recruiting.html)

ARCHIVE (→ records.html)
├── 활동 기록 (→ records.html)
└── 전시회 (→ exhibitions.html)

FOR MEMBERS (→ linktree.html)
├── 연영장터 (→ market.html)
└── LINKTREE (→ linktree.html)

DONATE US (→ donate.html)
```

---

## 🔧 주요 기능

### 1. 관리자 모드
- **토글 방법**: 네비게이션 왼쪽의 🔧 아이콘 클릭
- **기능**: 
  - 콘텐츠 추가/수정/삭제 버튼 표시
  - 이미지 업로드 기능 활성화
- **저장**: LocalStorage에 `mockup_admin_mode` 키로 저장

### 2. 데이터 저장 (LocalStorage)
| 키 | 설명 |
|---|---|
| `mockup_admin_mode` | 관리자 모드 상태 |
| `mockup_activities` | 활동 기록 데이터 |
| `mockup_exhibitions` | 전시회 데이터 |
| `mockup_hero_bg` | 히어로 배경 이미지 (Base64) |
| `mockup_photographers_v2` | 사진가 데이터 (새 구조) |
| `mockup_linktree` | 링크트리 데이터 |
| `mockup_market_v2` | 연영장터 데이터 |

### 3. 이미지 업로드
- File API를 사용하여 로컬 이미지를 Base64로 변환
- LocalStorage에 저장되어 브라우저 새로고침 후에도 유지
- 관리자 모드에서만 업로드 버튼 표시

---

## 📄 페이지별 설명

### 메인 페이지 (index.html)
- **역할**: 연영회 소개 페이지
- **히어로 섹션**: 메인 타이틀 "연영회" + 배경 로고 이미지
- **전시회 슬라이더**: 최신 전시회 이미지 자동 슬라이드
- **최신 활동**: 최근 활동 그리드 표시 (→ "모든 활동 보기" 버튼)
- 배경 이미지 위치: `hero.css`의 `.hero-title-bg` (현재 x: +250px, y: -180px)

### 연혁 페이지 (about.html)
- **연간 활동**: 3월(신입 부원 모집), 5월(대동제), 6월(정기 MT), 8월(정기 사진전), 9월(연고전), 2월(신인 사진전)
- **연혁**: 1966(창립), 2025(YCAM 활동 시작), 2026(60주년)

### 사진가 페이지 (photographers.html)
- 기수별 사진가 목록
- 정회원(금색)/준회원(남색) 구분
- **모달 정보** (1:1 정사각형):
  - 기수, 이름, 회원 구분
  - 협업 가능 여부 (가능/불가능 배지)
  - 이메일 주소, 개인 링크
- 대표 작품 섹션 삭제됨

### 모집 페이지 (recruiting.html)
- **지원 자격**: 사진에 대한 열정, 정기 활동 참여, 1년간 사진을 즐길 분
- **2026년도 지원 가이드**:
  - 지원서 작성 (26.03.01~26.03.09)
  - 면접 (26.03.14~26.03.16)
  - 최종 발표 (26.03.18)
- **문의**: 이메일/전화 (남색 강조)

### 활동 기록 페이지 (records.html)
- **4열 그리드** 레이아웃
- 최근 활동이 상단 좌측에 오도록 정렬

### 전시회 페이지 (exhibitions.html)
- 제목: 2rem
- 부제목: "연영회가 만들어온 전시 목록입니다"
- 제목 밑 가로선 제거됨

### 링크트리 페이지 (linktree.html)
- **4열 그리드** (홍보, 문의, 활동, 후원)
- 5번째 열(비공개) 삭제됨
- 배경색: 흰색

### 연영장터 페이지 (market.html)
- **중고거래 장터**
- **카드 정보**: 제품명, 상태, 가격, 판매완료 여부
- 카드 배경: 흰색, 이미지 없음 (클릭 시에만 이미지 표시)
- 부제목: 판매/구매 문의 연락처 포함

### 후원 페이지 (donate.html)
- 배경색: 흰색
- **후원금 사용 내역**: 전시회 운영비, 장비 유지보수, 동아리 행사 운영비
- 하단 메시지: 후원금 사용 내역 열람 안내 포함

---

## 🎨 스타일 가이드

### CSS 변수 (globals.css)
- `--primary-color`: #2C3357 (남색)
- `--background-color`: #ffffff
- `--text-color`: #333
- `--text-light`: #666

### 제목 크기 통일
- 활동 기록, 모집, 사진가, 링크트리, 후원, 전시회 페이지: **2rem**

### 네비게이션
- 배경: 흰색
- 텍스트/로고: 남색 (primary-color)
- 하단 경계선: #e0e0e0 (회색)
- 높이: 기본보다 3/4로 축소됨

---

## 📂 원본 프로젝트 참조

원본 Next.js 프로젝트 위치: `C:\Users\kimse\Desktop\aeao`

### 주요 원본 파일
- `src/app/page.tsx` - 홈페이지
- `src/app/about/page.tsx` - 소개 페이지
- `src/app/about/photographers/page.tsx` - 사진가 페이지
- `src/app/about/recruiting/page.tsx` - 모집 페이지
- `src/app/archive/exhibitions/page.tsx` - 전시회 페이지
- `src/app/linktree/page.tsx` - 링크트리 페이지
- `src/config/*.json` - 데이터 파일들
- `public/images/` - 이미지 파일들

---

## ⚠️ 주의사항

1. **이미지 경로**: `../public/images/` 형식으로 원본 프로젝트의 이미지 참조
2. **LocalStorage 초기화**: 개발자 도구 > Application > Local Storage에서 삭제 가능
3. **CSS 변수**: `globals.css`에 정의된 변수 사용
4. **반응형**: 768px, 1024px 브레이크포인트 적용
5. **LocalStorage 키 버전**: 데이터 구조 변경 시 `_v2` 등 버전 접미사 사용

---

## 🚀 실행 방법

1. `mockup/index.html` 파일을 브라우저에서 직접 열기
2. 또는 VS Code Live Server 등 로컬 서버 사용

---

## 📝 향후 작업 시 참고

- 새 페이지 추가 시 공통 네비게이션/푸터 구조 복사
- 네비게이션 메뉴 변경 시 **모든 HTML 파일** 동시 수정 필요
- 데이터 추가 시 `js/data.js`의 LocalStorage 키 패턴 참고
- 스타일 수정 시 해당 페이지의 CSS 파일 수정
- 관리자 모드 관련 요소는 `.admin-only` 클래스 사용

---

## 🔄 최근 작업 이력 (2026-02-05)

### 메뉴 구조 변경
- ABOUT 메뉴: "연영회 소개" 추가 (→ index.html), "소개" → "연혁"으로 변경
- ARCHIVE 메뉴: "서포터즈" 하위 메뉴 삭제
- LINKTREE → FOR MEMBERS로 변경, 하위 메뉴에 "연영장터" 추가
- archive.html 링크 → records.html로 수정 (파일 미존재 문제 해결)

### 페이지별 수정
- **메인**: "모든 작품 보기" → "모든 활동 보기", 버튼 스타일 통일
- **연혁**: 연간 활동 및 연혁 내용 업데이트
- **사진가**: 모달 1:1 정사각형, 대표작품 삭제, 협업 가능 여부 추가
- **모집**: 지원 자격/방법 내용 변경, 섹션 제목 크기 조정
- **활동 기록**: 4열 그리드, 최신순 정렬
- **전시회**: 부제목 추가, 제목 밑 가로선 제거
- **링크트리**: 5열 → 4열, 배경 흰색
- **연영장터**: 신규 생성, 흰색 카드 디자인
- **후원**: 배경 흰색, 사용 내역 변경

### 스타일 변경
- 제목 크기 2rem 통일 (여러 페이지)
- 네비게이션 높이 축소 (3/4)
- 네비게이션 하단 경계선 추가

---

*마지막 업데이트: 2026-02-05*
