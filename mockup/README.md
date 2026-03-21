# 연영회 웹사이트 목업

로컬에서 바로 실행 가능한 연영회 웹사이트 목업입니다.

## 실행 방법

### 방법 1: 브라우저에서 직접 열기
1. `mockup` 폴더에서 `index.html` 파일을 더블클릭하거나
2. 브라우저에서 파일을 드래그 앤 드롭하세요

### 방법 2: Live Server 사용 (권장)
VS Code의 Live Server 확장 프로그램을 사용하면 더 편리합니다:
1. VS Code에서 `mockup` 폴더를 열기
2. `index.html`에서 우클릭 → "Open with Live Server" 클릭

## 주요 기능

### 🔧 관리자 모드
- 좌측 상단의 **공구 아이콘**을 클릭하여 관리자 모드를 활성화/비활성화
- 관리자 모드 시 콘텐츠 편집 및 이미지 업로드 가능

### 📷 이미지 업로드
- 관리자 모드에서 **편집 버튼(✎)**을 클릭하여 이미지 변경
- 드래그 앤 드롭 또는 클릭하여 이미지 선택
- 업로드된 이미지는 **로컬 저장소(LocalStorage)**에 Base64 형태로 저장됨

### 📂 페이지 구성
| 페이지 | 파일 | 설명 |
|--------|------|------|
| 메인 | `index.html` | 홈페이지 |
| 소개 | `about.html` | 연영회 소개 |
| 활동 기록 | `records.html` | 활동 기록 갤러리 |
| 전시회 | `exhibitions.html` | 전시회 목록 |
| 링크트리 | `linktree.html` | 소셜 미디어 링크 |
| 후원 안내 | `donate.html` | 후원 정보 |

## 데이터 관리

### 데이터 저장 위치
- 모든 데이터는 브라우저의 **LocalStorage**에 저장됩니다
- 브라우저 캐시를 삭제하면 데이터도 초기화됩니다

### 데이터 초기화
브라우저 개발자 도구(F12)에서 Console 탭을 열고 다음 명령어 입력:
```javascript
localStorage.clear();
location.reload();
```

### 이미지 경로
- 기본 이미지는 `../public/images/` 폴더의 이미지를 사용합니다
- 업로드한 이미지는 Base64 형태로 저장되어 로컬 저장소에 보관됩니다

## 폴더 구조

```
mockup/
├── index.html          # 메인 페이지
├── about.html          # 소개 페이지
├── records.html        # 활동 기록 페이지
├── exhibitions.html    # 전시회 페이지
├── linktree.html       # 링크트리 페이지
├── donate.html         # 후원 안내 페이지
├── css/                # 스타일시트
│   ├── globals.css     # 전역 스타일
│   ├── navigation.css  # 네비게이션 스타일
│   ├── hero.css        # 히어로 섹션 스타일
│   ├── home.css        # 홈페이지 스타일
│   ├── footer.css      # 푸터 스타일
│   ├── about.css       # 소개 페이지 스타일
│   ├── records.css     # 활동 기록 스타일
│   ├── exhibitions.css # 전시회 스타일
│   ├── linktree.css    # 링크트리 스타일
│   └── donate.css      # 후원 안내 스타일
└── js/                 # 자바스크립트
    ├── data.js         # 데이터 및 유틸리티 함수
    └── main.js         # 메인 기능 스크립트
```

## 기술 스택

- **HTML5**: 마크업
- **CSS3**: 스타일링 (변수, 그리드, 플렉스박스)
- **Vanilla JavaScript**: 동적 기능, LocalStorage API
- **File API**: 로컬 이미지 업로드

## 브라우저 지원

- Chrome (권장)
- Firefox
- Safari
- Edge

## 주의사항

1. **이미지 용량**: 큰 이미지를 많이 업로드하면 LocalStorage 용량 제한(약 5MB)에 도달할 수 있습니다
2. **브라우저 간 데이터 공유 불가**: LocalStorage는 브라우저별로 분리되어 있습니다
3. **프라이빗 브라우징**: 시크릿/프라이빗 모드에서는 데이터가 저장되지 않을 수 있습니다
