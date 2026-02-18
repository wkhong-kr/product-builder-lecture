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