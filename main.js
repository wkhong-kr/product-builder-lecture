// 테마 토글 로직
const themeBtn = document.getElementById('theme-btn');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeBtn) {
    themeBtn.innerText = theme === 'dark' ? '☀️' : '🌙';
  }
  localStorage.setItem('theme', theme);
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });
}

// 초기 테마 설정 로드
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// 로또 생성 로직 (index.html에서만 작동)
const generateBtn = document.getElementById('generate-btn');
if (generateBtn) {
  generateBtn.addEventListener('click', generateLottoGames);
  
  function generateLottoNumbers() {
    const numbers = [];
    while (numbers.length < 6) {
      const r = Math.floor(Math.random() * 45) + 1;
      if (numbers.indexOf(r) === -1) numbers.push(r);
    }
    return numbers.sort((a, b) => a - b);
  }

  function getBallClass(num) {
    if (num <= 10) return 'ball-1';
    if (num <= 20) return 'ball-11';
    if (num <= 30) return 'ball-21';
    if (num <= 40) return 'ball-31';
    return 'ball-41';
  }

  function generateLottoGames() {
    const resultsContainer = document.getElementById('lotto-results');
    if (!resultsContainer) return;
    resultsContainer.innerHTML = ''; 

    for (let i = 0; i < 5; i++) {
      const gameNumbers = generateLottoNumbers();
      const gameDiv = document.createElement('div');
      gameDiv.className = 'lotto-set';

      gameNumbers.forEach(num => {
        const ball = document.createElement('div');
        ball.className = `ball ${getBallClass(num)}`;
        ball.innerText = num;
        gameDiv.appendChild(ball);
      });

      resultsContainer.appendChild(gameDiv);
    }
  }

  // 초기 로드시 한 번 생성
  generateLottoGames();
}

// 후기 시스템 로직
const reviewForm = document.getElementById('review-form');
const reviewsList = document.getElementById('reviews-list');

// 초기 후기 데이터 (Seed Data)
const initialReviews = [
  { name: '행운의신', rating: 5, content: '여기서 뽑은 번호로 4등 당첨됐어요! 감사합니다.', date: '2026-02-15' },
  { name: '로또매니아1', rating: 4, content: '디자인이 깔끔하고 번호 생성도 빨라서 좋아요.', date: '2026-02-17' }
];

function loadReviews() {
  const savedReviews = JSON.parse(localStorage.getItem('lotto-reviews')) || initialReviews;
  renderReviews(savedReviews);
}

function renderReviews(reviews) {
  if (!reviewsList) return;
  reviewsList.innerHTML = '';
  
  // 최신순으로 정렬
  reviews.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(review => {
    const reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';
    
    const stars = '⭐'.repeat(review.rating);
    
    reviewItem.innerHTML = `
      <div class="review-header">
        <div class="reviewer-info">
          <span class="name">${review.name}</span>
          <span class="rating">${stars}</span>
        </div>
        <span class="review-date">${review.date}</span>
      </div>
      <p class="review-text">${review.content}</p>
    `;
    reviewsList.appendChild(reviewItem);
  });
}

if (reviewForm) {
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('reviewer-name').value;
    const rating = parseInt(document.getElementById('reviewer-rating').value);
    const content = document.getElementById('review-content').value;
    const date = new Date().toISOString().split('T')[0];
    
    const newReview = { name, rating, content, date };
    
    const savedReviews = JSON.parse(localStorage.getItem('lotto-reviews')) || initialReviews;
    savedReviews.push(newReview);
    localStorage.setItem('lotto-reviews', JSON.stringify(savedReviews));
    
    renderReviews(savedReviews);
    reviewForm.reset();
    alert('후기가 성공적으로 등록되었습니다!');
  });
}

// 페이지 로드시 후기 불러오기
loadReviews();