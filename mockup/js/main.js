// DOM Elements
const navigation = document.getElementById('navigation');
const adminToggle = document.getElementById('adminToggle');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const heroSlider = document.getElementById('heroSlider');
const heroIndicators = document.getElementById('heroIndicators');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const previewGrid = document.getElementById('previewGrid');
const uploadModal = document.getElementById('uploadModal');
const heroEditBtn = document.getElementById('heroEditBtn');
const heroImageInput = document.getElementById('heroImageInput');
const heroBg = document.getElementById('heroBg');

// State
let currentSlide = 0;
let slideInterval = null;
let exhibitions = [];
let activities = [];
let uploadedImages = [];
let currentUploadTarget = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAdminMode();
  initHeroSlider();
  initPreviewGrid();
  initUploadModal();
  initHeroEdit();
});

// Navigation
function initNavigation() {
  let lastScrollY = window.scrollY;
  let ticking = false;

  // Scroll effect with smart hide/show
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        // 스크롤이 50px 이상일 때 scrolled 클래스 추가
        if (currentScrollY > 50) {
          navigation.classList.add('scrolled');
        } else {
          navigation.classList.remove('scrolled');
        }
        
        // 스크롤 방향에 따라 네비게이션 숨기기/보이기
        // 페이지 상단에서는 항상 표시
        if (currentScrollY <= 50) {
          navigation.classList.remove('nav-hidden');
        }
        // 아래로 스크롤 → 숨기기
        else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          navigation.classList.add('nav-hidden');
        }
        // 위로 스크롤 → 보이기
        else if (currentScrollY < lastScrollY) {
          navigation.classList.remove('nav-hidden');
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  });

  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });
}

// Admin Mode
function initAdminMode() {
  const isAdmin = getAdminMode();
  updateAdminUI(isAdmin);

  if (adminToggle) {
    adminToggle.addEventListener('click', () => {
      const newMode = !getAdminMode();
      setAdminMode(newMode);
      updateAdminUI(newMode);
    });
  }
}

function updateAdminUI(isAdmin) {
  if (isAdmin) {
    document.body.classList.add('admin-mode');
    adminToggle?.classList.add('active');
  } else {
    document.body.classList.remove('admin-mode');
    adminToggle?.classList.remove('active');
  }
}

// Hero Slider
function initHeroSlider() {
  exhibitions = getExhibitions();
  const latestExhibition = exhibitions[0];

  if (latestExhibition) {
    const titleEl = document.getElementById('exhibitionTitle');
    const infoEl = document.getElementById('exhibitionInfo');
    
    if (titleEl) titleEl.textContent = latestExhibition.title;
    if (infoEl) infoEl.textContent = `${latestExhibition.date} | ${latestExhibition.location}`;

    renderSlides(latestExhibition.images || []);
    startSlideshow();
  }

  // Navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      resetSlideshow();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      resetSlideshow();
    });
  }
}

function renderSlides(images) {
  if (!heroSlider) return;
  
  heroSlider.innerHTML = '';
  heroIndicators.innerHTML = '';

  if (images.length === 0) {
    heroSlider.innerHTML = '<div class="hero-placeholder"><p>전시 이미지가 없습니다.</p></div>';
    return;
  }

  images.forEach((image, index) => {
    // Slide
    const slide = document.createElement('div');
    slide.className = `hero-slide ${index === 0 ? 'active' : ''}`;
    slide.innerHTML = `<img src="${image}" alt="전시 이미지 ${index + 1}">`;
    heroSlider.appendChild(slide);

    // Indicator
    const indicator = document.createElement('button');
    indicator.className = index === 0 ? 'active' : '';
    indicator.setAttribute('aria-label', `배너 ${index + 1}로 이동`);
    indicator.addEventListener('click', () => {
      goToSlide(index);
      resetSlideshow();
    });
    heroIndicators.appendChild(indicator);
  });
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.hero-indicators button');
  
  if (slides.length === 0) return;

  // Wrap around
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  currentSlide = index;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('active', i === index);
  });
}

function startSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length <= 1) return;

  slideInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 3000);
}

function resetSlideshow() {
  if (slideInterval) {
    clearInterval(slideInterval);
    startSlideshow();
  }
}

// Preview Grid
function initPreviewGrid() {
  activities = getActivities();
  renderActivities(activities.slice(0, 6));
}

function renderActivities(items) {
  if (!previewGrid) return;

  previewGrid.innerHTML = '';

  items.forEach(activity => {
    const item = document.createElement('a');
    item.className = 'preview-item';
    item.href = `record-detail.html?id=${activity.id}`;
    item.innerHTML = `
      <div class="preview-image">
        <img src="${activity.coverImage}" alt="${activity.title}">
      </div>
      <div class="preview-overlay">
        <h3>${activity.title}</h3>
        <p class="preview-date">${activity.date}</p>
      </div>
      <button class="edit-btn admin-only" data-id="${activity.id}" title="편집">✎</button>
    `;
    previewGrid.appendChild(item);
  });

  // Edit button events
  document.querySelectorAll('.preview-item .edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      editActivity(id);
    });
  });
}

function editActivity(id) {
  const activity = activities.find(a => a.id === id);
  if (!activity) return;

  currentUploadTarget = { type: 'activity', id };
  uploadedImages = [...activity.images];
  showUploadModal();
  renderUploadPreviews();
}

// Hero Background Edit
function initHeroEdit() {
  // Load saved hero background
  const savedBg = getHeroBg();
  if (heroBg && savedBg) {
    heroBg.querySelector('img').src = savedBg;
  }

  if (heroEditBtn) {
    heroEditBtn.addEventListener('click', () => {
      heroImageInput?.click();
    });
  }

  if (heroImageInput) {
    heroImageInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target.result;
          saveHeroBg(dataUrl);
          if (heroBg) {
            heroBg.querySelector('img').src = dataUrl;
          }
          alert('배경 이미지가 변경되었습니다.');
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

// Upload Modal
function initUploadModal() {
  const uploadArea = document.getElementById('uploadArea');
  const uploadInput = document.getElementById('uploadInput');
  const modalClose = document.getElementById('modalClose');
  const modalCancel = document.getElementById('modalCancel');
  const modalConfirm = document.getElementById('modalConfirm');

  if (uploadArea) {
    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      handleFiles(e.dataTransfer.files);
    });
  }

  if (uploadInput) {
    uploadInput.addEventListener('change', (e) => {
      handleFiles(e.target.files);
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', hideUploadModal);
  }

  if (modalCancel) {
    modalCancel.addEventListener('click', hideUploadModal);
  }

  if (modalConfirm) {
    modalConfirm.addEventListener('click', confirmUpload);
  }
}

function showUploadModal() {
  if (uploadModal) {
    uploadModal.classList.add('active');
  }
}

function hideUploadModal() {
  if (uploadModal) {
    uploadModal.classList.remove('active');
    uploadedImages = [];
    currentUploadTarget = null;
    document.getElementById('uploadInput').value = '';
    renderUploadPreviews();
  }
}

function handleFiles(files) {
  Array.from(files).forEach(file => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedImages.push(e.target.result);
        renderUploadPreviews();
      };
      reader.readAsDataURL(file);
    }
  });
}

function renderUploadPreviews() {
  const previewContainer = document.getElementById('previewImages');
  if (!previewContainer) return;

  previewContainer.innerHTML = '';

  uploadedImages.forEach((image, index) => {
    const item = document.createElement('div');
    item.className = 'preview-item';
    item.innerHTML = `
      <img src="${image}" alt="미리보기 ${index + 1}">
      <button class="remove-btn" data-index="${index}">&times;</button>
    `;
    previewContainer.appendChild(item);
  });

  // Remove button events
  previewContainer.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      uploadedImages.splice(index, 1);
      renderUploadPreviews();
    });
  });
}

function confirmUpload() {
  if (!currentUploadTarget || uploadedImages.length === 0) {
    hideUploadModal();
    return;
  }

  if (currentUploadTarget.type === 'activity') {
    const index = activities.findIndex(a => a.id === currentUploadTarget.id);
    if (index !== -1) {
      activities[index].images = uploadedImages;
      activities[index].coverImage = uploadedImages[0];
      saveActivities(activities);
      renderActivities(activities.slice(0, 6));
    }
  }

  hideUploadModal();
  alert('이미지가 저장되었습니다.');
}

// Utility function to add new activity
function addNewActivity(title, date, images) {
  const newActivity = {
    id: Date.now(),
    title,
    date,
    coverImage: images[0] || '',
    images
  };
  
  activities.unshift(newActivity);
  saveActivities(activities);
  renderActivities(activities.slice(0, 6));
  
  return newActivity;
}

// Export functions for use in other pages
window.mockupUtils = {
  getActivities,
  saveActivities,
  getExhibitions,
  saveExhibitions,
  addNewActivity,
  getAdminMode,
  setAdminMode
};
