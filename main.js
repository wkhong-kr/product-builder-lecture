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

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// 공통 함수
function getBallClass(num) {
  if (num <= 10) return 'ball-1';
  if (num <= 20) return 'ball-11';
  if (num <= 30) return 'ball-21';
  if (num <= 40) return 'ball-31';
  return 'ball-41';
}

// 로또 생성 로직
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
  generateLottoGames();
}

// 당첨 내역 렌더링
function renderHistory() {
  const historyBody = document.getElementById('history-body');
  if (!historyBody) return;
  const mockHistory = [
    { draw: 1210, nums: [5, 12, 18, 24, 33, 41], bonus: 10 },
    { draw: 1209, nums: [2, 15, 22, 29, 38, 45], bonus: 3 },
    { draw: 1208, nums: [8, 14, 21, 27, 35, 42], bonus: 11 },
    { draw: 1207, nums: [1, 9, 17, 23, 30, 44], bonus: 6 },
    { draw: 1206, nums: [4, 13, 19, 25, 34, 40], bonus: 21 },
    { draw: 1205, nums: [7, 11, 20, 26, 31, 43], bonus: 15 },
    { draw: 1204, nums: [3, 16, 28, 32, 36, 39], bonus: 1 },
    { draw: 1203, nums: [6, 10, 22, 28, 35, 42], bonus: 7 },
    { draw: 1202, nums: [12, 18, 24, 30, 36, 41], bonus: 5 },
    { draw: 1201, nums: [5, 15, 25, 35, 40, 45], bonus: 8 }
  ];
  historyBody.innerHTML = mockHistory.map(row => `
    <tr>
      <td><strong>${row.draw}회</strong></td>
      <td>
        <div class="history-balls">
          ${row.nums.map(n => `<div class="ball ball-sm ${getBallClass(n)}">${n}</div>`).join('')}
        </div>
      </td>
      <td><div class="ball ball-sm ${getBallClass(row.bonus)}">${row.bonus}</div></td>
    </tr>
  `).join('');
}

// 번호별 빈도 렌더링
function renderFrequency() {
  const freqGrid = document.getElementById('frequency-grid');
  if (!freqGrid) return;
  const frequencies = Array.from({ length: 45 }, (_, i) => ({
    num: i + 1,
    count: 150 + Math.floor(Math.random() * 50)
  }));
  const maxCount = Math.max(...frequencies.map(f => f.count));
  freqGrid.innerHTML = frequencies.map(f => `
    <div class="freq-item">
      <span class="freq-num">${f.num}</span>
      <span class="freq-count">${f.count}회</span>
      <div class="freq-bar-bg"><div class="freq-bar" style="width: ${(f.count / maxCount) * 100}%"></div></div>
    </div>
  `).join('');
}

// 후기 시스템
const reviewForm = document.getElementById('review-form');
const reviewsList = document.getElementById('reviews-list');
const initialReviews = [
  { name: '행운의신', rating: 5, content: '여기서 뽑은 번호로 4등 당첨됐어요!', date: '2026-02-15' },
  { name: '로또매니아1', rating: 4, content: '디자인이 깔끔해서 좋아요.', date: '2026-02-17' }
];

function renderReviews(reviews) {
  if (!reviewsList) return;
  reviewsList.innerHTML = reviews.sort((a, b) => new Date(b.date) - new Date(a.date)).map(review => `
    <div class="review-item">
      <div class="review-header">
        <div class="reviewer-info">
          <span class="name">${review.name}</span>
          <span class="rating">${'⭐'.repeat(review.rating)}</span>
        </div>
        <span class="review-date">${review.date}</span>
      </div>
      <p class="review-text">${review.content}</p>
    </div>
  `).join('');
}

if (reviewForm) {
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reviewer-name').value;
    const rating = parseInt(document.getElementById('reviewer-rating').value);
    const content = document.getElementById('review-content').value;
    const date = new Date().toISOString().split('T')[0];
    const savedReviews = JSON.parse(localStorage.getItem('lotto-reviews')) || initialReviews;
    savedReviews.push({ name, rating, content, date });
    localStorage.setItem('lotto-reviews', JSON.stringify(savedReviews));
    renderReviews(savedReviews);
    reviewForm.reset();
  });
}

// 실행
renderHistory();
renderFrequency();
renderReviews(JSON.parse(localStorage.getItem('lotto-reviews')) || initialReviews);